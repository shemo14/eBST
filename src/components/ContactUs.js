import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    I18nManager,
    ImageBackground,
    TouchableOpacity,
    Linking,
    KeyboardAvoidingView
} from "react-native";
import {
    Container,
    Content,
    Button,
    Header,
    Left,
    Right,
    Body,
    List,
    ListItem,
    Icon,
    Form,
    Item,
    Input,
    Textarea,
    Toast
} from 'native-base'
import i18n from '../../locale/i18n'
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";

const height = Dimensions.get('window').height;
class ContactUs extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: [],
            socials: [],
            name: '',
            email: '',
            msg: '',
            isSubmitted: false,
            status: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('contactUs'),
        drawerIcon: ( <Image source={require('../../assets/images/white_contact_us.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    componentWillMount() {
        axios({
            url: CONST.url + 'app_info',
            method: 'POST',
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                info: response.data.data.info,
                socials: response.data.data.socials,
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

    setContactUs(){
        this.setState({ isSubmitted: true });
        axios({
            url: CONST.url + 'contact_us',
            method: 'POST',
            data: {
                lang: this.props.lang,
                name: this.state.name,
                email: this.state.email,
                msg: this.state.msg,
            }
        }).then(response => {
            this.setState({ isSubmitted: false, name: '', email: '', msg: '' });
            Toast.show({
                text: response.data.msg,
                type:  response.data.status == 200 ? "success" : "danger",
                duration: 3000
            });
        })
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        if (this.state.name == null || this.state.msg == '' || this.state.email == ''){
            return (
                <Button disabled style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.setContactUs()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }
    }

    render() {
        return (
            <Container >
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ i18n.t('contactUs') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 ,  transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{marginTop:15}}>
                    { this.renderLoader() }
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                        <View style={{ paddingHorizontal:15 , justifyContent:'center'}}>
                            <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center'}}>
                                <Image source={require('../../assets/images/location.png')} style={{ width: 20, height: 20  , marginRight:10 }} resizeMode={'contain'} />
                                <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>{ this.state.info.address }</Text>
                            </View>
                            <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center'}}>
                                <Image source={require('../../assets/images/phone.png')} style={{ width: 20, height: 20  , marginRight:10 }} resizeMode={'contain'} />
                                <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>{ this.state.info.phone }</Text>
                            </View>
                            <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center'}}>
                                <Image source={require('../../assets/images/lactic_email.png')} style={{ width: 20, height: 20  , marginRight:10 }} resizeMode={'contain'} />
                                <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>{ this.state.info.email }</Text>
                            </View>
                            <View style={{marginTop:10 ,marginBottom:20 ,flexDirection:'row' , padding:15 , height:45 , alignItems:'center', justifyContent:'center'}}>
                                {
                                    this.state.socials.map((social, i) => (
                                        <TouchableOpacity key={i} onPress={() => Linking.openURL(social.url)}>
                                            <Image source={{ uri: social.logo }} style={{ width: 50, height: 50 , marginRight:10 }} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                            <View style={{marginBottom:10 }}>
                                <View style={{justifyContent:'space-between', flexDirection:'row' , flex:1}}>
                                    <Item regular style={{ borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , height:45 , padding:5 , width:'48%'}}>
                                        <Input value={this.state.name} onChangeText={(name) => this.setState({ name })} placeholder={ i18n.t('name') }
                                        style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , textAlign: I18nManager.isRTL ?'right' : 'left' }} autoCapitalize={'none'} />
                                    </Item>
                                    <Item regular style={{ borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35, height:45 , padding:5 , width:'48%'}}>
                                        <Input value={this.state.email} onChangeText={(email) => this.setState({ email })} placeholder={ i18n.t('email') } style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , textAlign: I18nManager.isRTL ?'right' : 'left'}} keyboardType={'email-address'} />
                                    </Item>
                                </View>
                                <View style={{ flex:1 , marginTop:10}}>
                                    <Textarea rowSpan={5} value={this.state.msg} onChangeText={(msg) => this.setState({ msg })} style={{paddingTop:10, paddingBottom:10 , paddingLeft:18 , paddingRight:18 , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:30 , fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , textAlign: I18nManager.isRTL ?'right' : 'left'}} placeholder={ i18n.t('message') } />
                                </View>
                                <View style={{ marginTop: 10 , marginBottom:10, justifyContent: 'center', alignItems: 'center' }}>
                                    { this.renderSubmit() }
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(ContactUs);