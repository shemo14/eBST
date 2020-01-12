import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground, Platform, FlatList, KeyboardAvoidingView, TouchableOpacity, ImageStore, ImageEditor } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body, Item, Label, Input, Form, Textarea } from 'native-base'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {CameraBrowser, ImageBrowser} from "expo-multiple-imagepicker";
import * as Permissions from 'expo-permissions';
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";
import {NavigationEvents} from "react-navigation";

const width  = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;


let base64   = [];
class SetOffer extends Component {
    constructor(props){
        super(props);
        this.state={
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            imageId: null,
            refreshed: false,
            name: '',
            nameStatus: 0,
            price: '',
            priceStatus: 0,
            extraPrice: '',
            extraPriceStatus: 0,
            auctionPrice: '',
            auctionPriceStatus: 0,
            desc: '',
            descStatus: 0,
            isValid: true,
            type: this.props.navigation.state.params.type,
            id: this.props.navigation.state.params.id,
            isSubmitted: false,
            maxAuction: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    componentWillMount(){
        axios.post(CONST.url + 'max_auction', { product_id: this.state.id }).then(response => {
            this.setState({ maxAuction: response.data.data.max_auction })
        })
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        let notValid = false;

        if (this.state.type == 2 && this.state.auctionPrice === '')
            notValid = true;
        else if (this.state.type == 3 && this.state.photos.length === 0 && this.state.name === '' && this.state.desc === '')
            notValid = true;
        else if (this.state.type == 4 && this.state.photos.length === 0 && this.state.name === '' && this.state.desc === '' && this.state.extraPrice === '')
            notValid = true;

        if (notValid){
            return (
                <Button disabled style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.setOffer()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }
    }

    isNull = (val) => {
        console.log(val)
        if (val === '' || val === ' ' || val.length === 0){
            return null;
        }

        return val;
    };

    setOffer(){
        this.setState({ isSubmitted: true })
        axios({
            method: 'POST',
            url: CONST.url + 'set_offer',
            headers: {Authorization: this.props.user.token },
            data: {
                name: this.isNull(this.state.name),
                desc: this.isNull(this.state.desc),
                price: this.state.type == 2 ? this.isNull(this.state.auctionPrice) : this.isNull(this.state.price),
                lang: this.props.lang,
                type: this.state.type,
                product_id: this.state.id,
                images: JSON.stringify(base64)
            }}).then(response => {
            if (response.data.status === 200){
                this.props.navigation.navigate('confirmOrder', { title: i18n.t('setOffer'), msg: i18n.t('confirmSetOffer') });
            }
        })
    }

    activeInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 1 })
        }else if (type === 'price') {
            this.setState({ priceStatus: 1 })
        }else if (type === 'desc') {
            this.setState({ descStatus: 1 })
        }else if (type === 'extraPrice') {
            this.setState({ extraPriceStatus: 1 })
        }
    }

    unActiveInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 0 })
        }else if (type === 'price') {
            this.setState({ priceStatus: 0 })
        }else if (type === 'desc') {
            this.setState({ descStatus: 0 })
        }else if (type === 'extraPrice') {
            this.setState({ extraPriceStatus: 0 })
        }
    }

    _keyExtractor = (item, index) => item.id;

    selectImage(md5){
        this.setState({ imageId: md5, refreshed: !this.state.refreshed })
    }

    deleteImage(item){
        let index = this.state.photos.indexOf(item);
        console.log('this is item ....', index)

        let photos = this.state.photos;
        photos.splice(index, 1);
        console.log('this is photos ....', photos)
        this.setState({ photos, refreshed: !this.state.refreshed, imageId: null })
    }

    renderItems = (item, imageId) => {
        return(
            <View style={{ margin: 2}}>
                <TouchableOpacity onPress={() => this.deleteImage(item)} style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: 999, height: imageId === item.md5 ? 60 : 0, width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                    <Icon type={'EvilIcons'} name={'close'} style={{ fontSize: imageId === item.md5 ? 30 : 0, color: '#fff', textAlign: 'center', width: 30, opacity: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 60 , width:60}} onPress={() => this.selectImage(item.md5)}>
                    <Image
                        style={{ height: 60, width: '100%', borderRadius: 3 }}
                        source={{uri: item.file}}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            let images = this.state.photos;
            this.setState({
                imageBrowserOpen: false,
                photos: images.concat(photos)
            });

            const imgs = this.state.photos;

            for (var i = 0; i < imgs.length; i++) {
                const imageURL = imgs[i].file;
                Image.getSize(imageURL, (width, height) => {
                var imageSize = {
                    size: {
                        width,
                        height
                      },
                      offset: {
                        x: 0,
                        y: 0,
                      },
                };

                ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
                    console.log(imageURI);
                    ImageStore.getBase64ForTag(imageURI, (base64Data) => {
                    base64.push(base64Data);
                    ImageStore.removeImageForTag(imageURI);
                    }, (reason) => console.log(reason) )
                }, (reason) => console.log(reason) )
                }, (reason) => console.log(reason))
            }

        }).catch((e) => console.log(e))
    };

    renderForm(){
        if (this.state.type == 2){
            return(
                <View style={{width: '100%',  alignItems: 'center', padding: 21 }}>
                    <Form style={{ width: '100%' }}>
                        <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.priceStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                            <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('auctionPrice') }</Label>
                                <Input value={this.state.auctionPrice} onChangeText={(auctionPrice) => this.setState({ auctionPrice })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('auctionPrice')} onFocus={() => this.activeInput('auctionPrice')} style={{ width: 200, textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                            </Item>
                        </View>
                    </Form>
                </View>
            )
        }

        return (
            <View>
                <View style={{ width: undefined, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center', margin: 2  }}>
                    <Button onPress={() => this.state.photos.length === 5 ?  alert("ops") : this.setState({imageBrowserOpen: true})} transparent style={{ borderRadius: 5, borderColor: '#c6c5c5', borderWidth: 1, width: 70, height: 70, transform: [{ rotate: '-45deg'}], alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#c6c5c5', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                    </Button>
                </View>
                <FlatList
                    data={this.state.photos}
                    renderItem={({item}) => this.renderItems(item, this.state.imageId)}
                    numColumns={5}
                    keyExtractor={this._keyExtractor}
                    extraData={this.state.refreshed}
                    style={{marginTop:10}}
                />
                <View style={{width: '100%',  alignItems: 'center', padding: 21 }}>
                    <Form style={{ width: '100%' }}>
                        <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.nameStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row'  }}>
                            <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('productName') }</Label>
                                <Input value={this.state.name} onChangeText={(name) => this.setState({ name })} autoCapitalize={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL ? 'right' : 'left', fontSize: 15, top: 17 }}  />
                            </Item>
                        </View>
                        {
                            this.state.type == 4 ?
                                (
                                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.nameStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20    }}>
                                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                            <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('extraPrice') }</Label>
                                            <Input value={this.state.price} onChangeText={(price) => this.setState({ price })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('extraPrice')} onFocus={() => this.activeInput('extraPrice')}  style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL ? 'right' : 'left', fontSize: 15, top: 17 }}  />
                                        </Item>
                                    </View>
                                ) : <View />
                        }
                        <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.descStatus === 1 ? '#26b5c4' : '#c5c5c5', padding: 10, flexDirection: 'row', marginTop: 20  }}>
                            <Textarea value={this.state.desc} onChangeText={(desc) => this.setState({ desc })} placeholderTextColor={'#acabae'} rowSpan={3} style={{fontFamily: 'cairo', width:'100%' , textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 12}} placeholder={i18n.t('productDesc')} />
                        </View>
                    </Form>
                </View>
            </View>
        );
    }

    onFocus(payload){
        const id   = payload.action.params.id;
        const type = payload.action.params.type;
        this.setState({ id, type, photos: [], refreshed: false, name: '', nameStatus: 0, price: '', priceStatus: 0, extraPrice: '', extraPriceStatus: 0, auctionPrice: '', auctionPriceStatus: 0, desc: '', descStatus: 0, isValid: true, isSubmitted: false });
        base64   = []
        this.componentWillMount();
    }
    returnHeaderMarginTop(){
        if(isIphoneX)
            return -45;
        else if(Platform.OS == 'ios')
            return -18;
        else return 0;
    }

    render() {
        console.log(this.state.price);


        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }


        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0, marginTop: this.returnHeaderMarginTop()}} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ i18n.t('setOffer') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('product', { id: this.state.id })}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
                        {
                            this.state.type ?
                            (
                                <View style={{ width: '95%', alignItems: 'center', margin: 10, alignSelf: 'center', borderWidth: 1, borderColor: '#6d6c72', padding: 5, borderRadius: 5 }}>
                                    <Text style={{ fontFamily :'cairo' , color:'#6d6c72', textAlign: 'center' }}>{ i18n.t('maxAuction') + ' ' + this.state.maxAuction + ' ' + i18n.t('RS') }</Text>
                                </View>
                            ) : <View />
                        }
                        { this.renderForm() }
                        <View style={{ marginTop: 20 , alignItems: 'center', justifyContent: 'center' }}>
                            { this.renderSubmit() }
                        </View>
                    </KeyboardAvoidingView>
                </Content>

            </Container>
        );
    }
}


const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(SetOffer);
