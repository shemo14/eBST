import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Animated, Dimensions, Slider } from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, Icon, Input, Picker, Item, CheckBox } from 'native-base';
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from 'react-redux';



const width = Dimensions.get('window').width;
class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true,
            value: 50,
            selected1: undefined,
            starCount: 3,
            isGrid:true,
            itemId:this.props.navigation.state.params.id,
            products:[],
            status: null,
            search: '',
            refreshed: false,
            fadeAnim: new Animated.Value(0),
            availabel: 0,
        }
    }
    componentWillMount(){

        axios({ 
            url:CONST.url+'category_products' ,
            method:'POST' , 
            headers: {Authorization: this.props.user.token },
            data:{category_id:this.state.itemId}
         }).then(response=>{
            this.setState({products:response.data.data , status:response.data.status})
        })

    }
    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value),
            };
        });
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

        // console.log(item)
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, margin: 5, overflow: 'hidden' }}>
                <View style={{ width: '100%' }}>
                    <Image source={{uri:item.image}} resizeMode={'stretch'} style={{ width: '100%', height: 100, flex: 1 }} />
                </View>
                <View style={{ width: '100%', padding: 5 }}>
                    <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 17 }}>{item.name}</Text>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={item.rate}
                            fullStarColor={'#26b5c4'}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starSize={15}
                            starStyle={{ color: '#26b5c4', marginHorizontal: 1 }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
                        <Text style={{ color: '#e2b705', fontFamily: 'cairo', flex: 2, alignSelf: 'flex-start' }}>{item.price} {i18n.t('sr')}</Text>
                        <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                    </View>
                </View>
            </View>
        );
    }

    
    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 400, }}>
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
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noData') }</Text>
                </View>
            );
        }
    }

    search(){
        this.setState({ status: null, refreshed: true })
         

        axios({ 
            url:CONST.url+'products_search' ,
            method:'POST' , 
            headers: {Authorization: this.props.user.token },
            data:{search: this.state.search, lang: this.props.lang , category_id:this.state.itemId}
         }).then(response=>{

             console.log(response.data.data);
             
            this.setState({ products: response.data.data, status: response.data.status, refreshed: false })
        })

    }

    render() {
        const { value } = this.state;
        // console.log(this.state.products)

        let grid=require('../../assets/images/multi_product.png');
        let row=require('../../assets/images/gray_one_product.png');

        if(this.state.isGrid)
            grid=require('../../assets/images/yellow_multi_product.png');
        else
            row=require('../../assets/images/one_product.png');

        return (
            <Container>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>{i18n.t('products')}</Text>
                        </Body>
                        <Animated.View style={{ width: this.state.fadeAnim, height: 40, borderRadius: 30, flexDirection: 'row' ,backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: this.state.availabel ? 1 : 0, marginTop: 32, position: 'absolute', borderColor: '#e2b705', marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => this.setAnimate()} style={{ alignItems: 'center', justifyContent: 'center', left: 5, top: 5, width: 30, height: 30 }}>
                                <Icon name={'close'} type={'EvilIcons'} style={{ color: '#acabae', fontSize: this.state.availabel ? 25 : 0 }} />
                            </TouchableOpacity>
                            <Input onChangeText={(search) => this.setState({ search })} onKeyPress={() => this.search()} placeholder={'بحث ...'} placeholderTextColor={'#acabae'} style={{ width: '90%', height: this.state.availabel ? 35 : 0, paddingHorizontal: 5, backgroundColor: 'transparent', marginHorizontal: 3, color: '#6d6c72', fontFamily: 'cairo', }} />
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
                                    <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                            </View>
                        </Left>
                    </ImageBackground>
                </Header>
                <View style={{ flexDirection: 'row', height: 50, marginTop: -50, marginBottom: 10, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.setState({isGrid : true})}>
                        <Image source={grid} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.setState({isGrid : false})}>
                        <Image source={row} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <Content style={{ padding: 10 }}>

                    { this.renderLoader() }
                    { this.renderNoData() }
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'center' , height: this.state.isGrid ? 'auto' : 0}}>
                        <FlatList
                            data={this.state.products}
                            renderItem={({ item }) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state.refreshed}
                        />
                    </View>


                    <View style={{ marginTop: 10, alignItems: 'center' , height: this.state.isGrid ? 0 : 'auto'}}>
                        {
                            this.state.products.map(
                                            
                                (product , i) => {
                                        
                                    return(
                                        <View key={i} style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                                                <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                    <Image source={{uri:product.image}}  style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginHorizontal: 20, flex: 3 }} onPress={() => this.props.navigation.navigate('product')}>
                                                <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 16 }}>{product.name}</Text>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <StarRating
                                                        disabled={true}
                                                        maxStars={5}
                                                        rating={product.rate}
                                                        fullStarColor={'#26b5c4'}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                        starSize={15}
                                                        starStyle={{ color: '#26b5c4', marginHorizontal: 1 }}
                                                    />
                                                </View>
                                                <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>{product.price} {i18n.t('sr')}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                                <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            ) 
                        }
                    </View>

                </Content>

                <Modal isVisible={this.state.visibleModal === 1} onBackdropPress={() => this.setState({ visibleModal: null })}>
                    <View style={{ width: '115%', position: 'absolute', top: -20, backgroundColor: '#26b5c4', justifyContent: 'center', alignItems: 'center', height: 300, alignSelf: 'center' }}>
                        <View style={{ width: '100%', height: 40, top: -8, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 15 }} noShadow>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/check_mark.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center', fontFamily: 'cairo' }}>بحث متقدم</Text>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/cancel.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <View>
                                <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#fff', height: 50, marginTop: 5, borderRadius: 30, width: '80%', paddingHorizontal: '30%' }} regular >
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#fff" }}
                                        placeholder="المدن"
                                        placeholderStyle={{ color: "#fff" }}
                                        placeholderIconColor="#fff"
                                        selectedValue={this.state.selected1}
                                        onValueChange={(value) => this.setState({ selected1: value })}
                                    >
                                        <Picker.Item label="مصر" value="key0" />
                                        <Picker.Item label="فرنسا" value="key1" />
                                        <Picker.Item label="امريكا" value="key2" />
                                    </Picker>
                                    <Image source={require('../../assets/images/white_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                </Item>
                            </View>
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <Slider
                                    step={10}
                                    maximumValue={50}
                                    onValueChange={this.change.bind(this)}
                                    value={value}
                                    thumbTintColor={'#fff'}
                                    style={{ width: (width * 85) / 100 }}
                                    maximumTrackTintColor={"#e2b705"}
                                    minimumTrackTintColor={'#fff'}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, width: (width * 85) / 100, alignItems: 'center' }}>
                                    <Text style={{ color: '#fff' }}>10</Text>
                                    <Text style={{ color: '#fff' }}>20</Text>
                                    <Text style={{ color: '#fff' }}>30</Text>
                                    <Text style={{ color: '#fff' }}>40</Text>
                                    <Text style={{ color: '#fff' }}>50</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 30, borderColor: '#fff', borderWidth: 1, height: 50, marginTop: 20 }}>
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center', width: '80%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center', marginHorizontal: 30 }}>
                                <CheckBox checked={true} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#fff' />
                                <Text style={{ fontFamily: 'cairo', color: '#fff' }}>مزايدات</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center', marginHorizontal: 30 }}>
                                <CheckBox checked={false} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#fff' />
                                <Text style={{ fontFamily: 'cairo', color: '#fff' }}>مبادلات</Text>
                            </TouchableOpacity>
                        </View>
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