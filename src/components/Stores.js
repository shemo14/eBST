import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Platform,
    Dimensions,
    AsyncStorage,
    I18nManager, StyleSheet
} from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, Icon, Input, } from 'native-base';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from 'react-redux';
import {NavigationEvents} from "react-navigation";
import StarRating from 'react-native-star-rating';


const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true,
            value: 50,
            isGrid:true,
            stores:[],
            status: null,
            refreshed: false,
        }
    }


    renderNoData(){
        if (this.state.stores.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noData') }</Text>
                </View>
            );
        }
    }

    componentWillMount() {
        this.setState({ refreshed: true })
        axios({
            url: CONST.url + 'stores',
            method: 'GET',
        }).then(response => {
            this.setState({stores: response.data.data, status: response.data.status, refreshed: false})
        })
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    static navigationOptions = () => ({
        drawerLabel: () => null ,
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, margin: 5, overflow: 'hidden' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('storeProducts', { id: item.id })} style={{ width: '100%' }}>
                    <Image source={{uri:item.image}} resizeMode={'contain'} style={{ width: '100%', height: 100, flex: 1 }} />
                </TouchableOpacity>
                <View style={{ width: '100%', padding: 5 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('storeProducts', { id: item.id })}>
                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 17, alignSelf: 'flex-start' }}>{ item.name ? item.name.substring(0, 15) + '...' : ''}</Text>
                    </TouchableOpacity>
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
                </View>
            </View>
        );
    }

    refreshView(){
        this.setState({ status: null });
        this.componentWillMount();
    }

    setView(isGrid){
        this.setState({isGrid , status: null });
        this.componentWillMount();
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

    onFocus(payload){
        this.setState({ status: null });
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
                        <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>{ i18n.t('stores') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                                </Button>
                            </View>
                        </Left>
                    </ImageBackground>
                </Header>
                <View style={{ flexDirection: 'row', height: 50, marginTop: -50, marginBottom: 10, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ margin: 5, width: 50, height: 50 }} onPress={() => this.setView(true)}>
                        <Image source={grid} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 5, width: 50, height: 50 }} onPress={() => this.setView(false)}>
                        <Image source={row} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <Content>

                    { this.renderLoader() }
                    { this.renderNoData() }

                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' , height: this.state.isGrid ? 'auto' : 0}}>
                        <FlatList
                            data={this.state.stores}
                            renderItem={({ item }) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state.refreshed}
                        />
                    </View>

                    <View style={{ marginTop: 10, alignItems: 'center' , height: this.state.isGrid ? 0 : 'auto', overflow: this.state.isGrid ? 'hidden' : 'visible'}}>
                        {
                            this.state.stores.map(
                                (store , i) => {
                                    return(
                                        <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('storeProducts', { id: store.id })}>
                                                <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#c5c5c5', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                    <Image source={{uri:store.image}}  style={[styles.image, { borderRadius: 10 }]} resizeMode={'contain'} />
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginHorizontal: 20, flex: 3 }} onPress={() => this.props.navigation.navigate('storeProducts', { id: store.id })}>
                                                <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 16, alignSelf: 'flex-start' }}>{store.name.substring(0, 15)}...</Text>
                                                <View style={{ alignSelf: 'flex-start' }}>
                                                    <StarRating
                                                        disabled={true}
                                                        maxStars={5}
                                                        rating={store.rate}
                                                        fullStarColor={'#26b5c4'}
                                                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                        starSize={15}
                                                        starStyle={{ color: '#26b5c4', marginHorizontal: 1 }}
                                                    />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            )
                        }
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
        width: Platform.OS === 'ios' ? '120%' : '105%',
        height: Platform.OS === 'ios' ? '120%' : '105%',
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    },
    rowFront: {
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0,
        justifyContent: 'center',
        height: 85,
        backgroundColor: '#fff'
    },
    rowBack: {
        alignItems: 'flex-end',
        flex: 1,
        paddingLeft: 15,
        height: 75,
        marginHorizontal: 15,
        marginTop: 8
    },
});

const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(Stores);
