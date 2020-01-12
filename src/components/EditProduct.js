import React, { Component } from "react";
import { View, Text, Image, ImageBackground, FlatList, ImageStore, TouchableOpacity, I18nManager , KeyboardAvoidingView, Dimensions, Platform, ImageEditor} from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body, Form, Item, Input, Label, Textarea, Picker, Toast } from 'native-base'
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
import * as Permissions from 'expo-permissions';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from 'react-redux';

const height = Dimensions.get('window').height;
const width  = Dimensions.get('window').width;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;


let base64   = [];
class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
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
            auctionPrice: null,
            auctionPriceStatus: 0,
            exchangeProduct: null,
            exchangeProductStatus: 0,
            extraPrice: null,
            extraPriceStatus: 0,
            categories: [],
            status: null,
            selectedCategory: null,
            selectedType: null,
            isSubmitted: false,
            isValid: true,
            id: this.props.navigation.state.params.id
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        axios.post(CONST.url + 'categories', { lang: this.props.lang }).then(response => {
            this.setState({ categories: response.data.data, status: response.data.status })
        })

        axios({
            url: CONST.url + 'show_product',
            method: 'POST',
            headers: {Authorization: this.props.user.token},
            data: {lang: this.props.lang, id: this.state.id}
        }).then(response => {
            this.setState({
                photos: response.data.data.images,
                name: response.data.data.details.name,
                desc: response.data.data.details.desc,
                selectedCategory: response.data.data.details.category_id,
                selectedType:  JSON.stringify(response.data.data.details.type),
                price: JSON.stringify(response.data.data.details.price),
                exchangeProduct: response.data.data.details.exchange_product,
                extraPrice: response.data.data.details.exchange_price,
                auctionPrice: response.data.data.details.max_price,
            })
        })
    }

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', height , position: 'absolute', backgroundColor: '#fff', zIndex: 999, width: '100%', paddingTop: (height*35)/100 }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    setType(value){
        if (value == 1)
            this.setState({ auctionPrice: null, exchangeProduct: null, extraPrice: null, selectedType: value });
        else if(value == 2)
            this.setState({ price: null, exchangeProduct: null, extraPrice: null, selectedType: value });
        else if(value == 3)
            this.setState({ auctionPrice: null, price: null, extraPrice: null, selectedType: value });
        else if(value == 4)
            this.setState({ auctionPrice: null, price: null, selectedType: value });
    }

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

      //  console.log('validate', this.state.photos.length, this.state.name, this.state.desc, this.state.selectedCategory)

        if (this.state.photos.length == 0 || this.state.name == null || this.state.desc == null || this.state.selectedCategory == null){
            return (
                <Button disabled onPress={() => this.editProduct()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('edit') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.editProduct()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('edit') }</Text>
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
        }else if (type === 'auctionPrice') {
            this.setState({ auctionPriceStatus: 1 })
        }else if (type === 'exchangeProduct') {
            this.setState({ exchangeProductStatus: 1 })
        } else if (type === 'extraPrice') {
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
        }else if (type === 'auctionPrice') {
            this.setState({ auctionPriceStatus: 0 })
        }else if (type === 'exchangeProduct') {
            this.setState({ exchangeProductStatus: 0 })
        } else if (type === 'extraPrice') {
            this.setState({ extraPriceStatus: 0 })
        }
    }



    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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
                        source={{uri: item.file === undefined ? item : item.file}}
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

    editProduct(){
        if (
            (this.state.selectedType == 1 && this.state.price == null) ||
            (this.state.selectedType == 2 && this.state.auctionPrice == null) ||
            (this.state.selectedType == 3 && this.state.exchangeProduct == null) ||
            (this.state.selectedType == 4 && this.state.exchangeProduct == null && this.state.extraPrice == null) ||
            this.state.selectedCategory == null
        ){
            Toast.show({
                text: i18n.t('compeleteData'),
                type: "danger",
                duration: 3000
            });
        }else {
            this.setState({ isSubmitted: true });

            axios({
                method: 'POST',
                url: CONST.url + 'edit_product',
                headers: {Authorization: this.props.user.token },
                data: {
                    product_id: this.state.id,
                    name: this.state.name,
                    desc: this.state.desc,
                    price: this.state.price,
                    lang: this.props.lang,
                    type: this.state.selectedType,
                    exchange_price: this.state.extraPrice,
                    max_price: this.state.auctionPrice,
                    exchange_product: this.state.exchangeProduct,
                    category_id: this.state.selectedCategory,
                    images: JSON.stringify(base64)
                }}).then(response => {
                if (response.data.status === 200){
                    this.props.navigation.navigate('product', { id: this.state.id });
                }
            })
        }
    }

    renderProductOptions(){
        if (this.state.selectedType == 1){
            return(
                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.priceStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('productPrice') }</Label>
                        <Input value={this.state.price} onChangeText={(price) => this.setState({ price })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('price')} onFocus={() => this.activeInput('price')} style={{ width: 200, color: '#26b5c4', fontSize: 15, top: 17 }}  />
                    </Item>
                </View>
            );
        } else if (this.state.selectedType == 2){
            return(
                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.auctionPriceStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('auctionPrice') }</Label>
                        <Input value={JSON.stringify(this.state.auctionPrice)} onChangeText={(auctionPrice) => this.setState({ auctionPrice })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('auctionPrice')} onFocus={() => this.activeInput('auctionPrice')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                    </Item>
                </View>

            );
        } else if (this.state.selectedType == 3){
            return(
                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.exchangeProductStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('exchangeProduct') }</Label>
                        <Input value={JSON.stringify(this.state.exchangeProduct)} onChangeText={(exchangeProduct) => this.setState({ exchangeProduct })} onBlur={() => this.unActiveInput('exchangeProduct')} onFocus={() => this.activeInput('exchangeProduct')} style={{ width: 200, color: '#26b5c4', fontSize: 15, top: 17 }}  />
                    </Item>
                </View>
            )
        } else if (this.state.selectedType == 4){
            return(
                <View>
                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.exchangeProductStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                            <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('exchangeProduct') }</Label>
                            <Input value={JSON.stringify(this.state.exchangeProduct)} onChangeText={(exchangeProduct) => this.setState({ exchangeProduct })} onBlur={() => this.unActiveInput('exchangeProduct')} onFocus={() => this.activeInput('exchangeProduct')} style={{ width: 200, color: '#26b5c4', fontSize: 15, top: 17 }}  />
                        </Item>
                    </View>

                    <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.extraPriceStatus === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                        <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                            <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('extraPrice') }</Label>
                            <Input value={this.state.extraPrice} onChangeText={(extraPrice) => this.setState({ extraPrice })} keyboardType={'number-pad'} onBlur={() => this.unActiveInput('extraPrice')} onFocus={() => this.activeInput('extraPrice')} style={{ width: 200, color: '#26b5c4', fontSize: 15, top: 17 }}  />
                        </Item>
                    </View>
                </View>
            )
        }
    }
    returnHeaderMarginTop(){
        if(isIphoneX)
            return -45;
        else if(Platform.OS == 'ios')
            return -18;
        else return 0;
    }

    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }

        console.log('product data ..', this.state.name, this.state.desc, this.state.selectedType, this.state.extraPrice, this.state.exchangeProduct, this.state.auctionPrice, this.state.price, this.state.selectedCategory)

        return (
            <Container style={{ backgroundColor: 'transparent' }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0, marginTop: this.returnHeaderMarginTop()}} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ i18n.t('editProduct') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 ,  transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>

                <Content style={{ padding: 10 }}>
                    { this.renderLoader() }

                    <KeyboardAvoidingView behavior={'padding'} style={{width:'100%', height: null, flex: 1,}}>
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
                                        <Input value={this.state.name} onChangeText={(name) => this.setState({ name })} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>
                                </View>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.descStatus === 1 ? '#26b5c4' : '#c5c5c5', padding: 10, flexDirection: 'row', marginTop: 20  }}>
                                    <Textarea value={this.state.desc} onChangeText={(desc) => this.setState({ desc })} placeholderTextColor={'#acabae'} rowSpan={3} style={{fontFamily: 'cairo', width:'100%' , color: '#26b5c4', fontSize: 12}} placeholder={i18n.t('productDesc')} />
                                </View>
                                <View>
                                    <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#c5c5c5', height: 50, marginTop: 20, borderRadius: 30, width: '100%', paddingHorizontal: '30%' }} regular >
                                        <Picker
                                            mode="dropdown"
                                            style={{ width: width - 100, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#c5c5c5" , fontWeight: 'normal' }}
                                            selectedValue={this.state.selectedCategory}
                                            textStyle={{ color: "#acabae" }}
                                            onValueChange={(value) => this.setState({ selectedCategory: value })}
                                        >
                                            {
                                                this.state.categories.map((category, i) => (
                                                    <Picker.Item key={i} label={category.name} value={category.id} />
                                                ))
                                            }
                                        </Picker>
                                        <Image source={require('../../assets/images/gray_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                <View>
                                    <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#c5c5c5', height: 50, marginTop: 20, borderRadius: 30, width: '100%', paddingHorizontal: '30%' }} regular >
                                        <Picker
                                            mode="dropdown"
                                            style={{ width: width - 100, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#c5c5c5" , fontWeight: 'normal' }}
                                            textStyle={{ color: "#acabae" }}
                                            selectedValue={this.state.selectedType}
                                            onValueChange={(value) => this.setType(value)}
                                        >
                                            <Picker.Item label={ i18n.t('buy') } value="1" />
                                            <Picker.Item label={ i18n.t('auction') } value="2" />
                                            <Picker.Item label={ i18n.t('exchange') } value="3" />
                                            <Picker.Item label={ i18n.t('exchangeWithDifferencePrice') } value="4" />
                                        </Picker>
                                        <Image source={require('../../assets/images/gray_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                { this.renderProductOptions() }
                                <View style={{ marginTop: 20 , alignItems: 'center', justifyContent: 'center' }}>
                                    { this.renderSubmit() }
                                </View>
                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }
}

const styles = ({
    container: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps, {})(EditProduct);
