import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    I18nManager,
    Dimensions,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { Container, Content, Header, Left, Body, Button, Item, Input, Form, Label, Picker, Icon, CheckBox, Textarea } from 'native-base'
import i18n from '../../locale/i18n'
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from '../actions/ProfileAction'
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
            countries: [],
            status: null,
            name: this.props.user.name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            desc: this.props.user.desc,
            isTrader: this.props.user.type ? true : false,
            selectedCountry: this.props.user.country_id,
            userImage: null,
            base64: null,
            isSubmitted: false
        };
    }

    componentWillMount() {
        axios.post(CONST.url + 'countries', { lang: this.props.lang }).then(response => {
            this.setState({ countries: response.data.data })
        });
    }

    componentDidMount() {
		this.getPermissionAsync();
	}

	renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', height , position: 'absolute', backgroundColor: '#fff', zIndex: 999, width: '100%', paddingTop: (height*45)/100 }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    activeInput(type){
        if (type === 'name') this.setState({ nameStatus: 1 });
        else if (type === 'phone') this.setState({phoneStatus: 1});
        else if (type === 'mail') this.setState({mailStatus: 1});
    }

    unActiveInput(type){
        if (type === 'name') this.setState({ nameStatus: 0});
        else if (type === 'phone') this.setState({phoneStatus: 0});
        else if (type === 'mail')  this.setState({mailStatus: 0});
    }

    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            source = this.state.phoneStatus ? require('../../assets/images/lactic_phone.png') : require('../../assets/images/gray_phone.png') ;
        }else if (type === 'mail'){
            source = this.state.mailStatus ? require('../../assets/images/lactic_email.png') : require('../../assets/images/gray_email.png');
        }else if (type === 'name'){
            source = this.state.nameStatus ? require('../../assets/images/lactic_user_name.png') : require('../../assets/images/gray_user_name.png')
        }

        return source;
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        if (this.state.name == '' || this.state.email == '' || this.state.phone == '' || this.state.selectedCountry == null){
            return (
                <Button disabled style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('update') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.onUpdateProfile()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('update') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	}

    _pickImage = async () => {
        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });

        if (!result.cancelled) {
            this.setState({ userImage: result.uri, base64: result.base64 });
        }
    };

    onUpdateProfile(){
        const data = {
            name: this.state.name,
            phone: this.state.phone,
            country_id: this.state.selectedCountry,
            image: this.state.base64,
            email: this.state.email,
            device_id: null,
            type: this.state.isTrader ? 1 : 0,
            desc: this.state.desc,
            lang: this.props.lang,
            token: this.props.user.token
        };

        this.setState({ isSubmitted: true });
        this.props.updateProfile(data);
    }

    componentWillReceiveProps(newProps){
        this.setState({ isSubmitted: false });
    }

    render() {
        return (
            <Container>
                <Header style={{ zIndex: 3, marginTop: Platform.OS === 'ios' ? 15 : 30, height: Platform.OS === 'ios' ? 50 : 30, backgroundColor: 'transparent', paddingHorizontal: 10, borderBottomWidth: 0 }} noShadow>
                    <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo'}}>{ i18n.t('editAcc') }</Text>
                    </Body>
                    <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Left>
                </Header>
                <Content style={{ zIndex: -1, marginTop: Platform.OS === 'ios' ? -100 : -60 }} onScroll={e => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                        <View style={{ height: 300 }}>
                            <View style={styles.slide}>
                                <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 2 }} />
                                <Image blurRadius={2} source={{ uri: this.props.user.avatar }} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                            </View>
                            <View style={{ top: -210, width: '100%', height: 0, zIndex: 4 }}>
                                <Image source={require('../../assets/images/slider.png')} style={{ width: '100%', transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </View>
                        </View>
                        <View style={{ zIndex: 5, width: 120, height: 120, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 172, left: 15 }}>
                            <TouchableOpacity onPress={this._pickImage}>
                                <View style={{ width: 90, height: 90, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '45deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                                <View style={[styles.block, { transform: [{ rotate: '45deg' }] }]}>
                                    {this.state.userImage != null ? <Image source={{ uri: this.state.userImage }} style={styles.image} resizeMode={'stretch'} /> : <Image source={{ uri: this.props.user.avatar }} style={styles.image} resizeMode={'stretch'} />}
                                </View>
                            </TouchableOpacity>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', textAlign: 'center', fontSize: 18, marginTop: 15}}>{ this.props.user.name }</Text>
                        </View>
                        <View style={{ padding: 20, width: '100%' }}>
                            <Form style={{width: '100%'}}>
                                <View style={{  marginBottom: 4,borderRadius: 35, borderWidth: 1, borderColor: this.state.nameStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row' }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('username') }</Label>
                                        <Input onChangeText={name => this.setState({ name })} value={this.state.name} auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}/>
                                    </Item>
                                    <Image source={this.renderInputImage('name')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ marginBottom: 4, borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('phoneNumber') }</Label>
                                        <Input onChangeText={phone => this.setState({ phone })} value={this.state.phone} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}/>
                                    </Item>

                                    <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ marginBottom: 4, borderRadius: 35, borderWidth: 1, borderColor: this.state.mailStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                    <Item floatingLabel style={{  borderBottomWidth: 0, top: -18,  marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13  }}>{ i18n.t('email') }</Label>
                                        <Input onChangeText={email => this.setState({ email })} value={this.state.email} keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={{  width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL?'right' : 'left', fontSize: 15, top: 17 }}/>
                                    </Item>

                                    <Image source={this.renderInputImage('mail')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View>
                                    <Item style={{ marginBottom: 4, borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#acabae', height: 50, marginTop: 20, borderRadius: 30, width: '100%', paddingHorizontal: '30%', padding: 5 }} regular >
                                        <Picker
                                            mode="dropdown"
                                            style={{ width: width - 80, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#c5c5c5" , fontWeight: 'normal' }}
                                            selectedValue={this.state.selectedCountry}
                                            onValueChange={(value) => this.setState({ selectedCountry: value })}
                                            textStyle={{ color: "#acabae" }}
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
                                {
                                    this.state.isTrader ? (
                                        <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.descStatus === 1 ? '#26b5c4' : '#c5c5c5', padding: 10, flexDirection: 'row', marginTop: 20  }}>
                                            <Textarea onChangeText={desc => this.setState({ desc })} value={this.state.desc} onChangeText={(desc) => this.setState({ desc })} placeholderTextColor={'#acabae'} rowSpan={3} style={{fontFamily: 'cairo', width:'100%' , textAlign:I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 12}} placeholder={i18n.t('storeDesc')} />
                                        </View>
                                    ) : (<View/>)
                                }
                                <TouchableOpacity onPress={() => this.setState({ isTrader: !this.state.isTrader })} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center'  }}>
                                    <CheckBox onPress={() => this.setState({ isTrader: !this.state.isTrader, desc: null })} checked={this.state.isTrader} style={{marginHorizontal: 20, borderRadius: 2}} color='#26b5c4'/>
                                    <Text style={{fontFamily: 'cairo', color: '#6d6c72'}}>{ i18n.t('registerAsTrader') }</Text>
                                </TouchableOpacity>
                            </Form>

                            <View style={{marginTop: 30, justifyContent: 'center', alignItems:  'center'}}>
                                { this.renderSubmit() }
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 85,
        height: 85,
        overflow: 'hidden'
    },
    image: {
        width: Platform.OS === 'ios' ? '120%' :  '105%',
        height: Platform.OS === 'ios' ? '120%' :  '105%',
        borderWidth: 4,
        transform: [{ rotate: '-45deg' }, { scale: 1.3 }]
    },
});

const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps, {updateProfile})(EditProfile);
