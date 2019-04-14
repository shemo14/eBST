import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import {Container, Content, Form, Item, Input, Label, Button} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0,
            passwordStatus: 0
        }
    }


    activeInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 1 })
        }else
            this.setState({ passwordStatus: 1 })
    }

    unActiveInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 0 })
        }else
            this.setState({ passwordStatus: 0 })
    }

    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/lactic_phone.png')
            } else{
                source = require('../../assets/images/bold_gray_phone.png')
            }
        }else{
            if (this.state.passwordStatus){
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
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                        <View style={styles.loginFormContainerStyle}>
                            <Form style={{ width: '100%' }}>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('phoneNumber') }</Label>
                                        <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>


                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('password') }</Label>
                                        <Input secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('password')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>
                            </Form>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 17, width: '100%', paddingHorizontal: 15 }}>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('forgetPassword')}>
                                    <Text style={{ color: '#6d6c72', fontSize: 13, fontFamily: 'cairo', }}>{ i18n.t('forgetPass') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('home')}>
                                    <Text style={{ color: '#6d6c72', fontSize: 13, fontFamily: 'cairo', }}>{ i18n.t('visitor') }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 50 }}>
                                <Button onPress={() => this.props.navigation.navigate('home')} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('loginButton') }</Text>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                </Button>
                            </View>

                            <View style={{ marginTop: 50 }}>
                                <Button onPress={() => this.props.navigation.navigate('register')} bordered style={{ borderRadius: 25, width: 110, height: 40,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center', borderColor: '#e2b705', borderWidth: 1}}>
                                    <Text style={{color:'#e2b705' , fontSize:15, fontFamily: 'cairoBold' }}>{ i18n.t('registerButton') }</Text>
                                </Button>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>

            </Container>
        );
    }
}


export default Login;