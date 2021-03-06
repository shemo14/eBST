import React, { Component } from "react";
import { View, Text, Image, ImageBackground, Dimensions , I18nManager, TouchableOpacity } from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Header, Right} from 'native-base'
import i18n from '../../locale/i18n'


class Verify extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0,
            passwordStatus: 0,
            verifyPasswordStatus: 0
        }
    }

    activeInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 1 })
        }else if (type === 'password') {
            this.setState({passwordStatus: 1})
        } else
            this.setState({verifyPasswordStatus: 1})
    }

    unActiveInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 0 })
        }else if (type === 'password') {
            this.setState({ passwordStatus: 0 })
        } else
            this.setState({verifyPasswordStatus: 0})
    }

    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/lactic_phone.png')
            } else{
                source = require('../../assets/images/gray_phone.png')
            }
        }else if (type === 'password'){
            if (this.state.passwordStatus ){
                source = require('../../assets/images/lactic_lock.png')
            } else{
                source = require('../../assets/images/gray_lock.png')
            }
        }
        else {
            if (this.state.verifyPasswordStatus ){
                source = require('../../assets/images/lactic_lock.png')
            } else{
                source = require('../../assets/images/gray_lock.png')
            }
        }

        return source;
    }



    render() {
        return (
            <Container>
                <Header style={{zIndex: 9999999, marginTop: 40, height: 10, backgroundColor: 'transparent', borderBottomWidth: 0}} noShadow>
                    <Right style={{ width: '100%', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.navigate(this.props.user ? 'notifications' : 'login')}>
                            <Image source={I18nManager.isRTL ? require('../../assets/images/colored_back.png') : require('../../assets/images/back.png')} style={{ width: 25, height: 25,  transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <Content style={{ zIndex: -99, marginTop: -60 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={{ width: null, height: null, flex: 1, alignItems: 'center' }}>
                        <Image source={require('../../assets/images/logo.png')} style={{ width: 130, height: 130, top: 75 }} resizeMode={'contain'} />

                        <View style={{width: '100%', marginTop: 100, alignItems: 'center', padding: 20 }}>
                            <Form style={{ width: '100%' }}>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('verifyCode') }</Label>
                                        <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign:I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>


                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('newPass') }</Label>
                                        <Input secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={{ width: 200, textAlign: I18nManager.isRTL?'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('password')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.verifyPasswordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('verifyNewPass') }</Label>
                                        <Input secureTextEntry onBlur={() => this.unActiveInput('verifyPassword')} onFocus={() => this.activeInput('verifyPassword')} style={{ width: 200, textAlign: I18nManager.isRTL?'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('verifyPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>
                            </Form>


                            <View style={{ marginTop: 20 }}>
                                <Button onPress={() => this.props.navigation.navigate('login')} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('verify') }</Text>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                </Button>
                            </View>

                        </View>
                    </ImageBackground>
                </Content>

            </Container>
        );
    }
}


export default Verify;