import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground , TouchableOpacity, Share , Switch} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body } from 'native-base';
import Modal from "react-native-modal";
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import { chooseLang } from '../actions';
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Settings extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            selectedLang: this.props.lang,
            SwitchOnValueHolder : false
        };
    }

    stopNotification = (value) =>{
        this.setState({ SwitchOnValueHolder: value })

        console.log('swiper val ...', value, this.state.SwitchOnValueHolder);
        axios({
            method: 'POST',
            url: CONST.url + 'stop_notifications',
            headers: {Authorization: this.props.user.token} })
    }

    componentWillMount() {
        axios({
            method: 'POST',
            url: CONST.url + 'user_data',
            headers: {Authorization: this.props.user.token} }).then(response => {
            this.setState({ SwitchOnValueHolder: response.data.data.isNotify ? false : true })
        })
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    onChooseLang() {
        this.setState({ isModalVisible: !this.state.isModalVisible });
        if (this.props.lang != this.state.selectedLang){
            this.props.chooseLang(this.state.selectedLang);
        }
    };
    
    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'eBST is the best',
            })

            if (result.action === Share.sharedAction) {
            if (result.activityType) {
            // shared with activity type of result.activityType
            } else {
            // shared
            }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    static navigationOptions = () => ({
        drawerLabel: i18n.t('settings'),
        drawerIcon: ( <Image source={require('../../assets/images/white_setting.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    onFocus(){
        this.componentWillMount()
    }

    render() {
        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{i18n.t('settings')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25,  transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{paddingTop:15 , paddingBottom:15}}>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center'}}>
                        <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center' , justifyContent:'space-between' , width:'90%' , alignSelf:'center'}}>
                            <TouchableOpacity style={{width:'100%' ,flexDirection:'row',justifyContent:'space-between'}} onPress={this._toggleModal}>
                                <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>{ i18n.t('language') }</Text>
                                <Image source={require('../../assets/images/gray_back.png')} style={{ width: 20, height: 20 , alignSelf:'flex-end',  transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]  }} resizeMode={'contain'} />
                            </TouchableOpacity >
                        </View>
                        <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center' , justifyContent:'space-between' , width:'90%' , alignSelf:'center'}}>
                            <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>{ i18n.t('stopNotification') }</Text>
                            <Switch
                                onValueChange={(value) => this.stopNotification(value)}
                                style={{right:-10 }}
                                value={this.state.SwitchOnValueHolder}
                                onTintColor={'#ddd'}
                                thumbTintColor={'#26b5c4'}
                                tintColor={'#c5c5c5'}
                             />
                        </View>
                        <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center' , justifyContent:'space-between' , width:'90%' , alignSelf:'center'}}>
                            <TouchableOpacity style={{width:'100%' ,flexDirection:'row' ,justifyContent:'space-between'}} onPress={this.onShare}>
                                <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>{ i18n.t('shareApp') }</Text>
                                <Image source={require('../../assets/images/gray_share.png')} style={{ width: 20, height: 20 , alignSelf:'flex-end' }} resizeMode={'contain'} />
                            </TouchableOpacity >
                        </View>
                    </View>
                    <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                            <View style={{ flex: 1 , backgroundColor:'#fff' , padding:30 , position:'absolute' , width:'100%'}}>
                                <View style={{marginBottom:10 , borderWidth:1 ,borderColor: this.state.selectedLang === 'ar'  ? '#26b5c4' : '#c5c5c5' , borderRadius:35 , justifyContent:'center' , flex:1 , height:45 , alignItems:'center'  , width:'95%' , alignSelf:'center'}}>
                                    <TouchableOpacity style={{width:'100%'}} onPress={() => this.setState({ selectedLang: 'ar' })}>
                                        <Text style={{fontFamily:'cairo' , fontSize:13 ,color: this.state.selectedLang === 'ar'  ? '#26b5c4' : '#6d6c72' , textAlign:'center'}}>العربية</Text>
                                    </TouchableOpacity >
                                </View>
                                <View style={{marginBottom:10 , borderWidth:1 ,borderColor: this.state.selectedLang === 'en' ? '#26b5c4' : '#c5c5c5' , borderRadius:35 , justifyContent:'center' , flex:1 , height:45 , alignItems:'center'  , width:'95%' , alignSelf:'center'}}>
                                    <TouchableOpacity style={{width:'100%'}} onPress={() => this.setState({ selectedLang: 'en' })}>
                                        <Text style={{fontFamily:'cairo' , fontSize:13 ,color: this.state.selectedLang === 'en' ? '#26b5c4' : '#6d6c72' , textAlign:'center'}}>English</Text>
                                    </TouchableOpacity >
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Button onPress={() => this.onChooseLang()} style={{ borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                        <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                        <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('confirm') }</Text>
                                        <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                    </Button>
                                </View>
                            </View>
                        </Modal>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { chooseLang })(Settings);