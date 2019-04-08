import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions , KeyboardAvoidingView } from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, CheckBox} from 'native-base'
import styles from '../../assets/styles'

const height = Dimensions.get('window').height;
class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
            passwordStatus: 0,
            verifyPasswordStatus: 0
        }
    }

    activeInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 1 })
        }else if (type === 'phone') {
            this.setState({phoneStatus: 1})
        }else if (type === 'mail') {
            this.setState({mailStatus: 1})
        }else if (type === 'password') {
            this.setState({passwordStatus: 1})
        } else
            this.setState({verifyPasswordStatus: 1})
    }

    unActiveInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 0})
        }else if (type === 'phone') {
            this.setState({phoneStatus: 0})
        }else if (type === 'mail') {
            this.setState({mailStatus: 0})
        }else if (type === 'password') {
            this.setState({passwordStatus: 0})
        } else
            this.setState({verifyPasswordStatus: 0})
    }

    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/lactic_phone.png')
            } else{
                source = require('../../assets/images/bold_gray_phone.png')
            }
        }else if (type === 'mail'){
            if (this.state.mailStatus ){
                source = require('../../assets/images/lactic_email.png')
            } else{
                source = require('../../assets/images/gray_email.png')
            }
        }else if (type === 'name'){
            if (this.state.nameStatus ){
                source = require('../../assets/images/lactic_user_name.png')
            } else{
                source = require('../../assets/images/gray_user_name.png')
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
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <KeyboardAvoidingView behavior={'position'} style={{width:'100%', height: null, flex: 1,}}>
                        <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                            <Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'}/>

                            <View style={styles.registerFormContainerStyle}>
                                <Form style={{width: '100%'}}>
                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.nameStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row' }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>اسم المستخدم</Label>
                                            <Input auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}/>
                                        </Item>
                                        <Image source={this.renderInputImage('name')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>رقم الجوال</Label>
                                            <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.mailStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{  borderBottomWidth: 0, top: -18,  marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13  }}>البريد الالكتروني</Label>
                                            <Input keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={{  width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('mail')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18,  marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>كلمة المرور الجديدة</Label>
                                            <Input secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('password')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.verifyPasswordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>تأكيد كلمة المرور الجديدة</Label>
                                            <Input secureTextEntry onBlur={() => this.unActiveInput('verifyPassword')} onFocus={() => this.activeInput('verifyPassword')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('verifyPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center'  }}>
                                        <CheckBox checked={false} style={{marginHorizontal: 20, borderRadius: 2}}
                                                  color='#26b5c4'/>
                                        <Text style={{fontFamily: 'cairo', color: '#6d6c72'}}>تسجيل كتاجر</Text>
                                    </View>
                                </Form>

                                <View style={{marginTop: 30}}>
                                    <Button onPress={() => this.props.navigation.navigate('confirm')} style={{ borderRadius: 25, width: 130, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                        <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }} />
                                        <Text style={{color: '#fff', fontSize: 15, fontFamily: 'cairo',}}>تسجيل</Text>
                                        <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }} />
                                    </Button>
                                </View>
                            </View>
                        </ImageBackground>
                    </KeyboardAvoidingView>

                </Content>

            </Container>
        );
    }
}


export default Register;