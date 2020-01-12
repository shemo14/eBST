import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground, Dimensions , KeyboardAvoidingView , I18nManager, AsyncStorage } from "react-native";
import {Container, Content, Form, Item, Input, Label, Button, CheckBox, Toast, Picker, Header, Right} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {DoubleBounce} from "react-native-loader";
import axios from 'axios';
import { userLogin, profile } from '../actions'
import {connect} from "react-redux";
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import CONST from '../consts'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            phone: '',
            email: '',
            password: '',
            verifyPassword: '',
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
            passwordStatus: 0,
            verifyPasswordStatus: 0,
            isTrader: false,
            isSubmitted: false,
            countries: [],
            selectedCountry: null,
            token: null,
            isAccepted: false
        }
    }

    async componentWillMount() {
        axios.post(CONST.url + 'countries', { lang: this.props.lang }).then(response => {
            this.setState({ countries: response.data.data })
        });

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
        this.setState({ token })
        AsyncStorage.setItem('deviceID', token);
      //  alert(token);
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
                source = require('../../assets/images/gray_phone.png')
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

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0 || this.state.phone.length !== 10) {
            isError = true;
            msg = i18n.t('phoneValidation');
        }else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('passwordRequired');
        }else if (this.state.password != this.state.verifyPassword) {
            isError = true;
            msg = i18n.t('verifyPassword');
        }else if (this.state.password.length < 6) {
            isError = true;
            msg = i18n.t('passwordLenght');
        }else if (this.state.email.length <= 0 || this.state.email.indexOf("@") === -1 || this.state.email.indexOf(".") === -1) {
            isError = true;
            msg = i18n.t('emailNotCorrect');
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

    onRegister(){
        const err = this.validate();
        if (!err){
            this.setState({ isSubmitted: true });
            axios.post(CONST.url + 'register' ,{
                name: this.state.username,
                phone: this.state.phone,
                password: this.state.password,
                email: this.state.email,
                country_id: this.state.selectedCountry,
                lang: this.props.lang,
                type: this.state.isTrader ? 1 : 0,
                device_id: this.state.token
            }).then(response => {
                this.setState({ isSubmitted: false });

                if (response.data.status == 200){
                    const {phone, password } = this.state;

					this.setState({ isSubmitted: true });
					this.props.userLogin({ phone, password, token: this.state.token }, this.props.lang);
                }

                Toast.show({
                    text: response.data.msg,
                    type: response.data.status == 200 ? "success" : "danger",
                    duration: 3000
                });
            }).catch(e => {
                this.setState({ loader: false });
                Toast.show({
                    text: 'يوجد خطأ ما الرجاء المحاولة مرة اخري',
                    type: "danger",
                    duration: 3000
                });
            })
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

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        if (this.state.username == '' || this.state.phone == '' || this.state.email == '' || this.state.password == '' || this.state.verifyPassword == '' || !this.state.isAccepted){
            return (
                <Button disabled style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('registerButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.onRegister()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('registerButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }
    }

    render() {
        console.log(this.state.isAccepted);
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
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                        <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                            <Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'}/>

                            <View style={styles.registerFormContainerStyle}>
                                <Form style={{width: '100%'}}>
                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.nameStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginBottom: 10 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('username') }</Label>
                                            <Input onChangeText={(username) => this.setState({ username })} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}/>
                                        </Item>
                                        <Image source={this.renderInputImage('name')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('phoneNumber') }</Label>
                                            <Input onChangeText={(phone) => this.setState({ phone })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.mailStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{  borderBottomWidth: 0, top: -18,  marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13  }}>{ i18n.t('email') }</Label>
                                            <Input onChangeText={(email) => this.setState({ email })} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={{  width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('mail')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View>
                                        <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#acabae', height: 50, marginTop: 20, borderRadius: 30, width: '100%', paddingHorizontal: '30%', padding: 5 }} regular >
                                            <Picker
                                                mode="dropdown"
                                                style={{ width: width - 80, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#c5c5c5" , fontWeight: 'normal' }}
                                                placeholderStyle={{ color: "#c5c5c5" }}
                                                selectedValue={this.state.selectedCountry}
                                                onValueChange={(value) => this.setState({ selectedCountry: value })}
                                                textStyle={{ color: "#acabae" }}
                                                itemTextStyle={{ color: '#c5c5c5' }}
                                            >
                                                <Picker.Item label={i18n.t('countries')} value={null} />
                                                {
                                                    this.state.countries.map((country, i) => (
                                                        <Picker.Item key={i} label={country.name} value={country.id} />
                                                    ))
                                                }
                                            </Picker>
                                            <Image source={require('../../assets/images/gray_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18,  marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('password') }</Label>
                                            <Input onChangeText={(password) => this.setState({ password })} secureTextEntry onBlur={() => this.unActiveInput('password')} onFocus={() => this.activeInput('password')} style={{ width: 200, textAlign: I18nManager.isRTL?'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('password')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.verifyPasswordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top: 15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('verifyNewPass') }</Label>
                                            <Input onChangeText={(verifyPassword) => this.setState({ verifyPassword })} secureTextEntry onBlur={() => this.unActiveInput('verifyPassword')} onFocus={() => this.activeInput('verifyPassword')} style={{ width: 200, textAlign: I18nManager.isRTL?'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}/>
                                        </Item>

                                        <Image source={this.renderInputImage('verifyPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                    </View>

                                    <TouchableOpacity onPress={() => this.setState({ isTrader: !this.state.isTrader })} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center'  }}>
                                        <CheckBox onPress={() => this.setState({ isTrader: !this.state.isTrader })} checked={this.state.isTrader} style={{marginHorizontal: 20, borderRadius: 2}} color='#26b5c4'/>
                                        <Text style={{fontFamily: 'cairo', color: '#6d6c72'}}>{ i18n.t('registerAsTrader') }</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.setState({ isAccepted: !this.state.isAccepted })} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center'  }}>
                                        <CheckBox onPress={() => this.setState({ isAccepted: !this.state.isAccepted })} checked={this.state.isAccepted} style={{marginHorizontal: 20, borderRadius: 2}} color='#26b5c4'/>
                                        <Text style={{fontFamily: 'cairo', color: '#6d6c72'}}>{ i18n.t('acceptTerms') }</Text>
                                    </TouchableOpacity>
                                </Form>
                                <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center'}}>
                                    { this.renderSubmit() }
                                </View>
                            </View>
                        </ImageBackground>
                    </KeyboardAvoidingView>
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

export default connect(mapStateToProps, {userLogin, profile})(Register);
