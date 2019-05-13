import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    Dimensions,
    I18nManager,
    ImageBackground,
    ScrollView,
    FlatList,
    KeyboardAvoidingView, TouchableOpacity, ImageStore
} from "react-native";
import {
    Container,
    Content,
    Button,
    Icon,
    Header,
    Left,
    Right,
    Body,
    Item,
    Label,
    Input,
    Form,
    Textarea, Picker
} from 'native-base'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {CameraBrowser, ImageBrowser} from "expo-multiple-imagepicker";
import {Permissions} from "expo";
import {DoubleBounce} from "react-native-loader";

const width  = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
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
            name: null,
            nameStatus: 0,
            price: null,
            priceStatus: 0,
            desc: null,
            descStatus: 0,
            isValid: true,
            type: this.props.navigation.state.params.type,
            id: this.props.navigation.state.params.id,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        if (base64.length == 0 || this.state.name == null || this.state.desc == null || this.state.selectedCategory == null){
            return (
                <Button disabled onPress={() => this.addProduct()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.addProduct()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }
    }

    activeInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 1 })
        }else if (type === 'price') {
            this.setState({ priceStatus: 1 })
        }else if (type === 'desc') {
            this.setState({ descStatus: 1 })
        }
    }

    unActiveInput(type){
        if (type === 'name'){
            this.setState({ nameStatus: 0 })
        }else if (type === 'price') {
            this.setState({ priceStatus: 0 })
        }else if (type === 'desc') {
            this.setState({ descStatus: 0 })
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

            for (var i =1; i < imgs.length; i++) {
                ImageStore.getBase64ForTag(imgs[i].file, (base64Data) => {
                    base64.push(base64Data);
                }, (reason) => console.error(reason));
            }

        }).catch((e) => console.log(e))
    };

    renderForm(){
        if (this.state.type == 2){
            return(
                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.priceStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('productPrice') }</Label>
                        <Input onChangeText={(price) => this.setState({ price })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('price')} onFocus={() => this.activeInput('price')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                    </Item>
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
                                <Input onChangeText={(name) => this.setState({ name })} autoCapitalize={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}  />
                            </Item>
                        </View>
                        <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.descStatus === 1 ? '#26b5c4' : '#c5c5c5', padding: 10, flexDirection: 'row', marginTop: 20  }}>
                            <Textarea onChangeText={(desc) => this.setState({ desc })} placeholderTextColor={'#acabae'} rowSpan={3} style={{fontFamily: 'cairo', width:'100%' , textAlign: 'right', color: '#26b5c4', fontSize: 12}} placeholder={i18n.t('productDesc')} />
                        </View>
                    </Form>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }


        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ i18n.t('addAds') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
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