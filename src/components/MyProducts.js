import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ListView,
    ImageBackground,
    Animated,
    Dimensions,
    I18nManager,
    Platform
} from "react-native";
import { Container, Content, Header, Left, Right, Body, Button, Icon, Input } from 'native-base'
import StarRating from 'react-native-star-rating';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import _ from 'lodash'
import ProductRow from './ProductRow';
import {NavigationEvents} from "react-navigation";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let likesIDs = [];

class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            fadeAnim: new Animated.Value(0),
            availabel: 0,
            redHeart: false,
            isModalVisible: false,
            scrollY: 0,
            products: [],
            country: '',
            status: null,
            views: 0,
            rate: 0,
            likesIDs: _.uniq(likesIDs),
            search: '',
        };
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('MyProducts') ,
        drawerIcon: ( <Image source={require('../../assets/images/white_my_product.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    componentWillMount() {
        axios({
            url: CONST.url + 'my_products',
            method: 'POST',
            headers: {Authorization: this.props.user.token},
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                products: response.data.data.products,
                rate: response.data.data.rate,
                country: response.data.data.country,
                status: response.data.status,
                views: response.data.data.views,
            })

            response.data.data.products.map((product) => {
                if (product.isLiked){
                    likesIDs.push(product.id)
                }
            })
            this.setState({ likesIDs })
        })
    }

    setAnimate(){
        if (this.state.availabel === 0){
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: (width*77)/100,
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

        this.setState({ search: '' });
        this.search();
    }

    deleteRow(secId, rowId, rowMap, productId) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.products];
        newData.splice(rowId, 1);
        this.setState({ products: newData });

        axios({
            url: CONST.url + 'delete_product',
            method: 'POST',
            headers: {Authorization: this.props.user.token} ,
            data: {product_id: productId, lang: this.props.lang}
        })
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    search() {
        axios({
            url: CONST.url + 'search_my_products',
            method: 'POST',
            headers: {Authorization: this.props.user.token},
            data: {
                search: this.state.search,
                lang: this.props.lang,
            }
        }).then(response => {
            this.setState({products: response.data.data})
        })
    }

    renderHeader = () => {
        if (this.state.scrollY >= 220){
            console.log(this.state.scrollY);
            return(
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, zIndex: 3 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{ color: '#fff', fontSize: 30, marginTop: 8, left: -10 }} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 }}>الاعلانات</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name={'ios-arrow-back'} type='Ionicons' style={{ color: '#fff' }} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
            );
        }

        return(
            <Header style={{ zIndex: 3, marginTop: 40, height: 10, backgroundColor: 'transparent', paddingHorizontal: 10 }} noShadow>
                <Right style={{flex: 0, alignSelf: 'flex-start', marginHorizontal: 10}}>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/white_edit.png')} style={{width: 25, height: 25, top: 3}} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </Right>
                <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'center', color: '#fff', marginLeft: 20, fontSize: 20, fontFamily: 'cairo'}}>{ i18n.t('myProducts') }</Text>
                </Body>
                <Animated.View style={{ width: this.state.fadeAnim, height: 40, borderRadius: 30, flexDirection: 'row' ,backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: this.state.availabel ? 1 : 0, marginTop: -8, position: 'absolute', borderColor: '#e2b705', right: 75 }}>
                    <TouchableOpacity onPress={() => this.setAnimate()} style={{ alignItems: 'center', justifyContent: 'center', left: 5, top: 5, width: 30, height: 30 }}>
                        <Icon name={'close'} type={'EvilIcons'} style={{ color: '#acabae', fontSize: this.state.availabel ? 25 : 0 }} />
                    </TouchableOpacity>
                    <Input value={this.state.search} onChangeText={(search) => this.setState({ search })} onKeyPress={() => this.search()} placeholder={i18n.t('search') + '...'} placeholderTextColor={'#acabae'} style={{ width: '90%', height: this.state.availabel ? 35 : 0, paddingHorizontal: 5, backgroundColor: 'transparent', marginHorizontal: 3, color: '#6d6c72', fontFamily: 'cairo', }} />
                </Animated.View>
                <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                    <TouchableOpacity style={{ marginHorizontal: 5, marginRight: 10 }} onPress={() => this.setAnimate()}>
                        <Image source={require('../../assets/images/white_search.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                        <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                </Left>
            </Header>
        )
    };

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', height , position: 'absolute', backgroundColor: '#fff', zIndex: 999, width: '100%', paddingTop: (height*45)/100 }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    setLike(id){
        if (this.state.likesIDs.includes(id)){
            _.remove(likesIDs, function(n) {
                return n == id;
            });
        }else{
            likesIDs.push(id)
        }
        this.setState({ likesIDs })

        axios({
            url: CONST.url + 'set_fav',
            method: 'POST',
            headers: {Authorization: this.props.user.token} ,
            data: {product_id: id, lang: this.props.lang}
        })
    }

    renderHeart(isLiked, id){
        if (this.state.likesIDs.includes(id)){
            likesIDs.push(id);
            return(
                <Image source={require('../../assets/images/red_heart.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
            )
        }

        return (<Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />);
    }

    onFocus(){
        this.setState({ status: null })
        this.componentWillMount()
    }

    render() {
        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={{ zIndex: 3, marginTop: Platform.OS === 'ios' ? 15 : 45, height: Platform.OS === 'ios' ? 50 : 10, backgroundColor: 'transparent', paddingHorizontal: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={{flex: 0, alignSelf: 'flex-start', marginHorizontal: 10}}>
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.navigate('editProfile')}>
                            <Image source={require('../../assets/images/white_edit.png')} style={{width: 25, height: 25, top: 3}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Right>
                    <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'center', color: '#fff', marginLeft: 20, fontSize: 20, fontFamily: 'cairo'}}>{ i18n.t('myProducts') }</Text>
                    </Body>
                    <Animated.View style={{ width: this.state.fadeAnim, height: 40, borderRadius: 30, flexDirection: 'row' ,backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: this.state.availabel ? 1 : 0, marginTop: Platform.OS === 'ios' ? 10 : -8, position: 'absolute', borderColor: '#e2b705', right: 80 }}>
                        <TouchableOpacity onPress={() => this.setAnimate()} style={{ alignItems: 'center', justifyContent: 'center', left: 5, top: 5, width: 30, height: 30 }}>
                            <Icon name={'close'} type={'EvilIcons'} style={{ color: '#acabae', fontSize: this.state.availabel ? 25 : 0 }} />
                        </TouchableOpacity>
                        <Input value={this.state.search} onChangeText={(search) => this.setState({ search })} onKeyPress={() => this.search()} placeholder={i18n.t('search') + '...'} placeholderTextColor={'#acabae'} style={{ width: '90%', height: this.state.availabel ? 35 : 0, paddingHorizontal: 5, backgroundColor: 'transparent', marginHorizontal: 3, color: '#6d6c72', fontFamily: 'cairo', }} />
                    </Animated.View>
                    <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                        <TouchableOpacity style={{ marginHorizontal: 5, marginRight: 10 }} onPress={() => this.setAnimate()}>
                            <Image source={require('../../assets/images/white_search.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('home')} style={{ width: 30, height: 30 }}>
                            <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}}
                                   resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Left>
                </Header>
                <Content style={{ zIndex: -1, marginTop: Platform.OS === 'ios' ? -100 : -60 }} onScroll={e => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}>
                    <View style={{ height: 300 }}>
                        <View style={styles.slide}>
                            <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 2 }} />
                            <Image source={{ uri: this.props.user.avatar }} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                        </View>
                        <View style={{ top: -210, width: '100%', height: 0, zIndex: 4 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%', transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                        </View>
                    </View>
                    { this.renderLoader() }
                    <View style={{ padding: 20, marginTop: -80, zIndex: 5 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={require('../../assets/images/gray_store.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            <Text style={{
                                marginHorizontal: 5, color: '#6d6c72', borderBottomWidth: 1, borderBottomColor: '#6d6c72'
                                , fontFamily: 'cairo', fontSize: 15, top: -1
                            }}>{ this.props.user.name }</Text>
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={Math.round(this.state.rate)}
                                fullStarColor={'#26b5c4'}
                                starSize={17}
                                starStyle={{ color: '#26b5c4', marginHorizontal: 2 }}
                            />
                        </View>
                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 15, lineHeight: 20 }}>{ this.props.user.desc }</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Image source={require('../../assets/images/gray_location.png')} style={{ width: 20, height: 20, marginTop: 3 }} resizeMode={'contain'} />
                                    <Text style={{ color: '#6d6c72', fontSize: 15, marginHorizontal: 4, fontFamily: 'cairo' }}>{ this.state.country }</Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-start', flex: 5 }} onPress={this._toggleModal}>
                                        <Image source={require('../../assets/images/bold_gray_phone.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                        <Text style={{ color: '#6d6c72', fontSize: 15, marginHorizontal: 4, fontFamily: 'cairo' }}>{ this.props.user.phone }</Text>
                                    </TouchableOpacity>
                                    <View style={{ alignSelf: 'flex-end', flexDirection: 'row', flex: 1 }}>
                                        <Image source={require('../../assets/images/gray_seen.png')} style={{ width: 20, height: 20, marginTop: 3, marginHorizontal: 4 }} resizeMode={'contain'} />
                                        <Text style={{ color: '#6d6c72', fontSize: 15, marginHorizontal: 2, fontFamily: 'cairo' }}>{ this.state.views }</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <SwipeListView
                                dataSource={this.ds.cloneWithRows(this.state.products)}
                                renderRow={(data, secId, rowId, rowMap) =>
                                    (
                                        <SwipeRow
                                            disableLeftSwipe={ true }
                                            leftOpenValue={60}>
                                            <View style={styles.rowBack}>
                                                <TouchableOpacity style={{ padding: 5 }} onPress={() => this.props.navigation.navigate('editProduct', { id: data.id })}>
                                                    <Image source={require('../../assets/images/gray_edit.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                                </TouchableOpacity>
                                                <TouchableOpacity style={{ padding: 5 }} onPress={_ => this.deleteRow(secId, rowId, rowMap, data.id)}>
                                                    <Image source={require('../../assets/images/red_remove.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableHighlight
                                                style={styles.rowFront}
                                                underlayColor={'#AAA'}>
                                                <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '95%', marginBottom: 10, marginTop: 17, }}>
                                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product', {id: data.id})}>
                                                        <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#c5c5c5', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                                                        <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                            <Image source={{ uri: data.image }} style={[styles.image, { borderRadius: 10 }]} resizeMode={'contain'} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ marginHorizontal: 20, flex: 3 }} onPress={() => this.props.navigation.navigate('product', {id: data.id})}>
                                                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 16, alignSelf: 'flex-start' }}>{ data.name }</Text>
                                                        <View style={{ alignSelf: 'flex-start' }}>
                                                            <StarRating
                                                                disabled={true}
                                                                maxStars={5}
                                                                rating={Math.round(data.rate)}
                                                                fullStarColor={'#26b5c4'}
                                                                starSize={15}
                                                                starStyle={{ color: '#26b5c4', marginHorizontal: 1 }}
                                                            />
                                                        </View>
                                                        <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>{data.price} {i18n.t('sr')}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => this.setLike(data.id, data.isLiked)} style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                                        { this.renderHeart(data.isLiked, data.id) }
                                                    </TouchableOpacity>
                                                </View>
                                            </TouchableHighlight>
                                        </SwipeRow>
                                    )}
                            />
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    image: {
        width:  Platform.OS === 'ios' ? '120%' :  '105%',
        height: Platform.OS === 'ios' ? '120%' :  '105%',
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    },
    rowFront: {
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0,
        justifyContent: 'center',
        height: 85,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    rowBack: {
        alignItems: I18nManager.isRTL ? 'flex-end' : 'flex-start',
        flex: 1,
        paddingLeft: I18nManager.isRTL ? 15 : 0,
        height: 75,
        marginHorizontal: 15,
        marginTop: 12
    },
});


const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(MyProducts);