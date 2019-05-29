import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, BackHandler, Linking, AsyncStorage , I18nManager} from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import { connect } from 'react-redux';
import { userLogin, profile } from '../actions'
import { Permissions, Notifications } from 'expo'
import {DoubleBounce} from "react-native-loader";

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phoneStatus: 0,
            passwordStatus: 0,
            phone: '',
            password: '',
            token: '',
            userId: null,
            isLoaded: false
        }
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0 || this.state.phone.length !== 10) {
            isError = true;
            msg = i18n.t('phoneValidation');
        }else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('passwordRequired');
        }
        if (msg != ''){
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000
            });
        }
        return isError;
    };

    renderSubmit(){
        if (this.state.isLoaded){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        return (
            <Button onPress={() => this.onLoginPressed()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('loginButton') }</Text>
                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
            </Button>
        );
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

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isLoaded: true });
            const {phone, password, token} = this.state;
            this.props.userLogin({ phone, password, token }, this.props.lang);
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
        }else{
            if (this.state.passwordStatus){
                source = require('../../assets/images/lactic_lock.png')
            } else{
                source = require('../../assets/images/gray_lock.png')
            }
        }

        return source;
    }

    async componentWillMount() {

        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({ token, userId: null })
        AsyncStorage.setItem('deviceID', token);
        // alert(token);
        console.log('app lang', this.props.lang);

    }

    componentWillReceiveProps(newProps){
        // console.log(newProps);
        if (newProps.auth !== null && newProps.auth.status === 200){

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('DrawerNavigator');
        }

        if (this.props.profile !== null) {
            Toast.show({
                text: newProps.auth.msg,
                type: newProps.auth.status === 200 ? "success" : "danger",
                duration: 3000
            });
        }

        this.setState({ isLoaded: false });
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
                                        <Input onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL ? 'right' : 'left', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>


                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('password') }</Label>
                                        <Input autoCapitalize='none' onChangeText={(password) => this.setState({password})} secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={{ width: 200, textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('password')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>
                            </Form>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 17, width: '100%', paddingHorizontal: 15 }}>
                                <TouchableOpacity onPress={()=> this.props.navigation.navigate('forgetPassword')}>
                                    <Text style={{ color: '#6d6c72', fontSize: 13, fontFamily: 'cairo', }}>{ i18n.t('forgetPass') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerNavigator')}>
                                    <Text style={{ color: '#6d6c72', fontSize: 13, fontFamily: 'cairo', }}>{ i18n.t('visitor') }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 50 }}>
                                { this.renderSubmit() }
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


const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        loading: auth.loading,
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile })(Login);
