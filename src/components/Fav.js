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
    I18nManager
} from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, Icon, Input, } from 'native-base';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from 'react-redux';
import ProductBlock from './ProductBlock';
import ProductRow from './ProductRow';
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true,
            value: 50,
            isGrid:true,
            products:[],
            status: null,
            refreshed: false,
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

    componentWillMount() {
        this.setState({ refreshed: true })
        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'get_fav',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: { device_id: deviceID,}
            }).then(response => {
                this.setState({products: response.data.data, status: response.data.status, refreshed: true})
            })
        });
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('fav') ,
        drawerIcon: ( <Image source={require('../../assets/images/white_heart.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return (
            <ProductBlock refreshView={() => this.refreshView()} fromFav={true} data={item} navigation={this.props.navigation} />
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

    refreshView(){
        this.setState({ status: null });
        this.componentWillMount();
    }

    setView(isGrid){
        this.setState({isGrid , status: null });
        this.componentWillMount();
    }

    onFocus(payload){
        this.setState({ status: null });
        this.componentWillMount()
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
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 , borderBottomWidth: 0, marginTop: Platform.OS === 'ios' ? -18 : 0}} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>{i18n.t('fav')}</Text>
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

                    <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'center' , height: this.state.isGrid ? 'auto' : 0}}>
                        <FlatList
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
                                        <ProductRow key={i} fromFav={true} refreshView={() => this.refreshView()} data={product} navigation={this.props.navigation} />
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

const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(Fav);
