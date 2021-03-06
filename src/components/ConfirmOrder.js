import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground, Platform } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;


class ConfirmOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            title : this.props.navigation.state.params.title,
            msg : this.props.navigation.state.params.msg,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });
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
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0, marginTop: this.returnHeaderMarginTop()}} noShadow>
                    <ImageBackground source={ I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png') } style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ this.state.title }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    <View style={{ flexDirection:'column' , alignItems:'center' , justifyContent:'center' , marginTop:70 }}>
                        <Image source={require('../../assets/images/confirm_message.png')} style={{ width: (width*50)/100, height: (height*30)/100 , marginBottom:15}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:15 , color:'#6d6c72' , textAlign:'center'}} >{ this.state.msg }</Text>
                        <View style={{ marginTop: 20 , marginBottom:10 }}>
                            <Button onPress={() => this.props.navigation.navigate('home')} style={{ borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('home') }</Text>
                                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default ConfirmOrder;