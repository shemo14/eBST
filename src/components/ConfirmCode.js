import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions , I18nManager } from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast} from 'native-base'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import { userLogin, profile } from '../actions'
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class ConfirmCode extends Component {
    constructor(props){
        super(props);
        this.state = {
            codeStatus: 0,
            code: null,
            password: this.props.navigation.state.params.password,
            phone: this.props.navigation.state.params.phone,
            token: this.props.navigation.state.params.token,
            verifyCode: this.props.navigation.state.params.code,
            isSubmitted: false,
            userId: null
        }
    }

    componentWillMount() {
        this.setState({ userId: null })
        alert(this.state.verifyCode);
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        return (
            <Button onPress={() => this.onCheckCode()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
            </Button>
        );
    }

    onCheckCode(){
        if (this.state.code == this.state.verifyCode){
            this.setState({ isSubmitted: true })
            const { phone, password, token } = this.state;
            this.props.userLogin({ phone, password, token }, this.props.lang);
        }else{
            Toast.show({
                text: i18n.t('codeNotCorrect'),
                type: "danger",
                duration: 3000
            });
        }
    }

    componentWillReceiveProps(newProps){
        if (newProps.auth !== null && newProps.auth.status === 200){
            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('drawerNavigation');
        }

        if (this.props.profile !== null) {
            Toast.show({
                text: newProps.auth.msg,
                type: newProps.auth.status == 200 ? "success" : "danger",
                duration: 3000
            });
        }

        this.setState({ isSubmitted: false });
    }

    activeInput(type){
        if (type === 'code'){
            this.setState({ codeStatus: 1 })
        }
    }

    unActiveInput(type){
        if (type === 'code'){
            this.setState({ codeStatus: 0 })
        }
    }

    renderInputImage(type){
        let source ='';
        if (type === 'code'){
            if (this.state.codeStatus){
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
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('confirmCode') }</Label>
                                        <Input onChangeText={(code) =>  this.setState({ code }) } keyboardType={'number-pad'} onBlur={() => this.unActiveInput('code')} onFocus={() => this.activeInput('code')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}  />
                                    </Item>
                                    <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>
                            </Form>


                            <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                { this.renderSubmit() }
                            </View>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        loading: auth.loading,
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile })(ConfirmCode);