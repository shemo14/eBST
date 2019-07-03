import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Animated, Dimensions, AsyncStorage , I18nManager, Platform} from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, Icon, Input, Picker, Item, CheckBox } from 'native-base';
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from 'react-redux';
import ProductBlock from './ProductBlock';
import ProductRow from './ProductRow';
import {NavigationEvents} from "react-navigation";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;


class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true,
            value: 50,
            selectedCountry: undefined,
            starCount: null,
            isGrid:true,
            productsType:this.props.navigation.state.params.type,
            name:this.props.navigation.state.params.name,
            products:[],
            status: null,
            search: '',
            refreshed: false,
            fadeAnim: new Animated.Value(0),
            availabel: 0,
            countries: [],
            categories: [],
            selectedCategory: undefined,
            type: null,
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'products',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {device_id: deviceID, type: this.state.productsType, lang: this.props.lang}
            }).then(response => {
                this.setState({products: response.data.data, status: response.data.status})
            })
        });

        axios.post(CONST.url + 'countries', { lang: this.props.lang }).then(response => {
            this.setState({ countries: response.data.data })
        });

        axios.post(CONST.url + 'categories', { lang: this.props.lang }).then(response => {
            this.setState({ categories: response.data.data })
        })
    }

    renderType(){
        if (this.state.productsType === 3){
            return(
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, alignItems: 'center', width: '80%' }}>
                    <TouchableOpacity onPress={() => this.setFilterType(1)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                        <CheckBox onPress={() => this.setFilterType(1)} checked={this.state.type === 1 ? true : false} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#fff' />
                        <Text style={{ fontFamily: 'cairo', color: '#fff' }}>{ i18n.t('auction') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setFilterType(2)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center' }}>
                        <CheckBox onPress={() => this.setFilterType(2)} checked={this.state.type === 2 ? true : false} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#fff' />
                        <Text style={{ fontFamily: 'cairo', color: '#fff' }}>{ i18n.t('exchange') }</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    componentWillReceiveProps(newProps){
        this.setState({ name: newProps.navigation.state.params.name });
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _keyExtractor = (item, index) => item.id;

    setAnimate(){
        if (this.state.availabel === 0){
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: (width*67)/100,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 1 });
        }else {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 0 });
        }
    }

    renderItems = (item) => {
        return (
            <ProductBlock type={this.state.productsType} data={item} navigation={this.props.navigation} />
        );
    }

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height - 170, alignSelf:'center' , backgroundColor:'#fff' }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    renderNoData(){
        if (this.state.products.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noSearchResult') }</Text>
                </View>
            );
        }
    }

    search() {
        this.setState({status: null, refreshed: true})

        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'products_search',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {
                    search: this.state.search,
                    lang: this.props.lang,
                    category_id: this.state.itemId,
                    device_id: deviceID,
                    type: this.state.productsType
                }
            }).then(response => {
                this.setState({products: response.data.data, status: response.data.status, refreshed: false})
            })
        });
    }

    setFilterType = ( type ) => {
        if (type === this.state.type)
            this.setState({ type: null })
        else
            this.setState({ type })
    }

    productFilter(){
        this.setState({status: null, refreshed: true, visibleModal: null});

        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'products_filter',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {
                    country_id: this.state.selectedCountry,
                    type: this.state.type,
                    rate: this.state.starCount,
                    category_id: this.state.selectedCategory,
                    lang: this.props.lang,
                    device_id: deviceID,
                    product_type: this.state.productsType
                }
            }).then(response => {
                this.setState({products: response.data.data, status: response.data.status, refreshed: false})
            })
        });
    }

    setView(isGrid){
        this.setState({isGrid , status: null });
        this.componentWillMount();
    }

    onFocus(payload){
        console.log('this is onWillFocus', payload)
        const itemId = payload.action.params.id;
        const productsType = payload.action.params.type;

        if (productsType)
            this.setState({ itemId, productsType, status: null });
        else
            this.setState({ itemId, status: null });

        this.componentWillMount()
    }
    returnHeaderMarginTop(){
        if(isIphoneX)
            return -45;
        else if(Platform.OS == 'ios')
            return -18;
        else return 0;    
    }

    render() {
        let grid=require('../../assets/images/multi_product.png');
        let row=require('../../assets/images/gray_one_product.png');

        if(this.state.isGrid)
            grid=require('../../assets/images/yellow_multi_product.png');
        else
            row=require('../../assets/images/one_product.png');

        return (
            <Container>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0, marginTop: this.returnHeaderMarginTop()}} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>{ this.state.name }</Text>
                        </Body>
                        <Animated.View style={{ width: this.state.fadeAnim, height: 40, borderRadius: 30, flexDirection: 'row' ,backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: this.state.availabel ? 1 : 0, marginTop: 32, position: 'absolute', borderColor: '#e2b705', marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => this.setAnimate()} style={{ alignItems: 'center', justifyContent: 'center', left: 5, top: 5, width: 30, height: this.state.availabel ? 30 : 0 }}>
                                <Icon name={'close'} type={'EvilIcons'} style={{ color: '#acabae', fontSize: this.state.availabel ? 25 : 0, }} />
                            </TouchableOpacity>
                            <Input onChangeText={(search) => this.setState({ search })} onKeyPress={() => this.search()} placeholder={i18n.t('search') + '...'} placeholderTextColor={'#acabae'} style={{ width: '90%', height: this.state.availabel ? 35 : 0, paddingHorizontal: 5, backgroundColor: 'transparent', marginHorizontal: 3, color: '#6d6c72', fontFamily: 'cairo', textAlign: I18nManager.isRTL ? 'right' : 'left' }} />
                        </Animated.View>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => this.setAnimate()}>
                                    <Image source={require('../../assets/images/white_search.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                                <Button transparent onPress={() => this.setState({ visibleModal: 1 })}>
                                    <Image source={require('../../assets/images/white_filter.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 ,  transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                                </Button>
                            </View>
                        </Left>
                    </ImageBackground>
                </Header>
                <View style={{ flexDirection: 'row', height: 50, marginTop: -50, marginBottom: 10, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.setView(true)}>
                        <Image source={grid} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.setView(false)}>
                        <Image source={row} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <Content>

                    { this.renderLoader() }
                    { this.renderNoData() }

                    <View style={{ flexDirection: 'row', justifyContent: 'center' , height: this.state.isGrid ? 'auto' : 0, width: '100%', padding: 10 }}>
                        <FlatList
                            style={{ alignSelf: 'center', width: '100%'}}
                            data={this.state.products}
                            renderItem={({ item }) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state.refreshed}
                        />
                    </View>

                    <View style={{ marginTop: 10, alignItems: 'center' , height: this.state.isGrid ? 0 : 'auto', overflow: this.state.isGrid ? 'hidden' : 'visible'}}>
                        {
                            this.state.products.map(
                                (product , i) => {
                                    return(
                                        <ProductRow type={this.state.productsType} key={i} data={product} navigation={this.props.navigation} />
                                    )
                                }
                            )
                        }
                    </View>
                </Content>

                <Modal isVisible={this.state.visibleModal === 1} onBackdropPress={() => this.setState({ visibleModal: null })}>
                    <View style={{ width: '115%', position: 'absolute', top: -20, backgroundColor: '#26b5c4', justifyContent: 'center', alignItems: 'center', height: 320, alignSelf: 'center' }}>
                        <View style={{ width: '100%', height: 40, top: -8, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop:  Platform.OS === 'ios' ? 35 : 15 }} noShadow>
                            <TouchableOpacity onPress={() => this.productFilter()}>
                                <Image source={require('../../assets/images/check_mark.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center', fontFamily: 'cairo' }}>{ i18n.t('advancedSearch') }</Text>
                            <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
                                <Image source={require('../../assets/images/cancel.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <View>
                                <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#fff', height: 50, marginTop: 10, borderRadius: 30, width: '80%', paddingHorizontal: '30%' }} regular >
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: width - 100, backgroundColor: 'transparent', fontFamily: "cairoBold", fontWeight: 'normal', color: "#fff" }}
                                        placeholder={i18n.t('countries')}
                                        placeholderStyle={{ color: "#fff" }}
                                        textStyle={{ color: "#fff" }}
                                        selectedValue={this.state.selectedCountry}
                                        onValueChange={(value) => this.setState({ selectedCountry: value })}
                                    >
                                        {
                                            this.state.countries.map((country, i) => (
                                                <Picker.Item key={i} label={country.name} value={country.id} />
                                            ))
                                        }
                                    </Picker>
                                    <Image source={require('../../assets/images/white_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                </Item>
                            </View>

                            <View>
                                <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#fff', height: 50, marginTop: 10, borderRadius: 30, width: '80%', paddingHorizontal: '30%' }} regular >
                                    <Picker
                                        mode="dropdown"
                                        style={{ width: width - 100, backgroundColor: 'transparent', fontFamily: "cairoBold", fontWeight: 'normal', color: "#fff" }}
                                        placeholder={i18n.t('categories')}
                                        placeholderStyle={{ color: "#fff" }}
                                        textStyle={{ color: "#fff" }}
                                        selectedValue={this.state.selectedCategory}
                                        onValueChange={(value) => this.setState({ selectedCategory: value })}
                                    >
                                        {
                                            this.state.categories.map((category, i) => (
                                                <Picker.Item key={i} label={category.name} value={category.id} />
                                            ))
                                        }
                                    </Picker>
                                    <Image source={require('../../assets/images/white_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                </Item>
                            </View>

                            {/*<View style={{ width: '100%', marginTop: 20 }}>*/}
                            {/*    <Slider*/}
                            {/*        step={10}*/}
                            {/*        maximumValue={50}*/}
                            {/*        onValueChange={this.change.bind(this)}*/}
                            {/*        value={value}*/}
                            {/*        thumbTintColor={'#fff'}*/}
                            {/*        style={{ width: (width * 85) / 100 }}*/}
                            {/*        maximumTrackTintColor={"#e2b705"}*/}
                            {/*        minimumTrackTintColor={'#fff'}*/}
                            {/*    />*/}
                            {/*    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, width: (width * 85) / 100, alignItems: 'center' }}>*/}
                            {/*        <Text style={{ color: '#fff' }}>10</Text>*/}
                            {/*        <Text style={{ color: '#fff' }}>20</Text>*/}
                            {/*        <Text style={{ color: '#fff' }}>30</Text>*/}
                            {/*        <Text style={{ color: '#fff' }}>40</Text>*/}
                            {/*        <Text style={{ color: '#fff' }}>50</Text>*/}
                            {/*    </View>*/}
                            {/*</View>*/}

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 30, borderColor: '#fff', borderWidth: 1, height: 50, marginTop: 10 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#fff'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={20}
                                starStyle={{ color: '#fff', marginHorizontal: 2 }}
                            />
                        </View>
                        { this.renderType() }
                    </View>
                </Modal>
            </Container>
        );
    }
}


const styles = {
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        width: 70,
        height: 70,
        overflow: 'hidden'
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    },
};

const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(CategoryProducts);
