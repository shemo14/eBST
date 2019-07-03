import React, { Component } from "react";
import {View, Text, Image, Dimensions, ImageBackground, TouchableOpacity, I18nManager, Platform} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body , List, ListItem } from 'native-base'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            notifications: [],
            status: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        axios({
            url: CONST.url + 'notifications',
            method: 'POST',
            headers: {Authorization: this.props.user.token},
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                notifications: response.data.data,
                status: response.data.status,
            })
        })
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

    deleteNotification(id){
        this.setState({ status: null })
        axios({
            url: CONST.url + 'delete_notification',
            method: 'POST',
            headers: {Authorization: this.props.user.token},
            data: {lang: this.props.lang, notification_id: id}
        }).then(response => {
            this.componentWillMount()
        })
    }

    renderNoData(){
        if (this.state.aboutUs === '' && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noNotifications') }</Text>
                </View>
            );
        }
    }

    onFocus(payload){
        this.setState({ status: null })
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
        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0, marginTop: this.returnHeaderMarginTop() }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png') } style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{i18n.t('notifications')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{}}>

                    { this.renderLoader() }
                    { this.renderNoData() }

                    <View style={{ padding:15}}>
                        <List style={{width:'100%'}}>
                            {
                                this.state.notifications.map((notification, i) => {
                                    let navigator = '';
                                    if(notification.type == 3 || notification.type == 4)
                                        navigator = 'product';
                                    else if (notification.type == 2)
                                        navigator = 'offers';

                                    return (
                                        <ListItem key={i} style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '97%', marginLeft: 0, marginBottom: 15 , paddingTop:0, paddingBottom:0 , paddingRight:0 , borderLeftWidth:0 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate(navigator, { id: notification.product_id })} style={{ width:'100%' ,  borderLeftColor: i%2 == 0 ? '#e2b705' : '#26b5c4' , borderLeftWidth:4 , height:'101.8%' , borderRadius: 5 , padding:10}}>
                                                <View style={{ width:'100%' }}>
                                                    <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%'}}>
                                                        <Text style={{ color: '#6d6c72', fontFamily: 'cairoBold' , fontSize:13 }}>{ notification.title }</Text>
                                                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize:13 }}>{ notification.time }</Text>
                                                    </View>
                                                    <View style={{width:'100%'}}>
                                                        <Text style={{ color: '#6d6c72', fontFamily: 'cairo' , fontSize:12 }}>{ notification.body }</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                            <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                                <TouchableOpacity  onPress={() => this.deleteNotification(notification.id)} style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
                                                    <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                                </TouchableOpacity>
                                            </Left>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </View>
                </Content>

            </Container>
        );
    }
}


const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(Notifications);