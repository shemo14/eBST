import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import {Container, Content, Form, Item, Input, Label, Button} from 'native-base'
import i18n from '../../locale/i18n'

const height = Dimensions.get('window').height;
class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0
        }
    }

    activeInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 1 })
        }
    }

    unActiveInput(type){
        if (type === 'phone'){
            this.setState({ phoneStatus: 0 })
        }
    }

    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            if (this.state.phoneStatus){
                source = require('../../assets/images/lactic_phone.png')
            } else{
                source = require('../../assets/images/bold_gray_phone.png')
            }
        }

        return source;
    }



    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={{ width: null, height: null, flex: 1, alignItems: 'center' }}>
                        <Image source={require('../../assets/images/logo.png')} style={{ width: 130, height: 130, top: 75 }} resizeMode={'contain'} />

                        <View style={{width: '100%', marginTop: 100, alignItems: 'center', padding: 20 }}>
                            <Form style={{ width: '100%' }}>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('phoneNumber') }</Label>
                                        <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                            </Form>


                            <View style={{ marginTop: 20 }}>
                                <Button onPress={() => this.props.navigation.navigate('verify')} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
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


export default ForgetPassword;