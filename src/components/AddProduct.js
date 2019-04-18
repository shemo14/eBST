import React, { Component } from "react";
import { View, Text, Image, Dimensions, ImageBackground, FlatList, ImageStore, TouchableOpacity , KeyboardAvoidingView} from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body, Form, Item, Input, Label , Textarea , CheckBox , Picker } from 'native-base'
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
import { Permissions } from "expo";
import i18n from '../../locale/i18n'

const height = Dimensions.get('window').height;
class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [],
            imageId: null,
            refreshed: false,
            productName: 0,
            productPrice: 0,
            productDisc: 0
        }
    }


    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    activeInput(type){
        if (type === 'name'){
            this.setState({ productName: 1 })
        }else if (type === 'price') {
            this.setState({productPrice: 1})
        } else
            this.setState({productDisc: 1})
    }

    unActiveInput(type){
        if (type === 'name'){
            this.setState({ productName: 0 })
        }else if (type === 'price') {
            this.setState({productPrice: 0})
        } else
            this.setState({productDisc: 0})
    }



    static navigationOptions = () => ({
        header: null
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
        // ImageStore.getBase64ForTag(item.file, (base64Data) => {
        //     console.log(base64Data)
        // }, (reason) => console.error(reason));


        console.log('this is md5 here.....', item.md5, this.state.imageId);

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

            console.log(this.state.photos)
        }).catch((e) => console.log(e))
    };

    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={5} callback={this.imageBrowserCallback}/>);
        }


        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10, backgroundColor: 'transparent' }}>
                 <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ i18n.t('addProduct') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>

                <Content style={{ padding: 20 , marginBottom:20}}>
                    <KeyboardAvoidingView behavior={'position'} style={{width:'100%', height: null, flex: 1,}}>
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
                        <View style={{width: '100%',  alignItems: 'center', padding: 20 }}>
                            <Form style={{ width: '100%' }}>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.productName === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('productName') }</Label>
                                        <Input autoCapitalize={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}  />
                                    </Item>
                                </View>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.productPrice === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('productPrice') }</Label>
                                        <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('price')} onFocus={() => this.activeInput('price')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>
                                </View>

                                <View>
                                    <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#c5c5c5', height: 50, marginTop: 20, borderRadius: 30, width: '100%', paddingHorizontal: '30%' }} regular >
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            style={{ width: undefined, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#c5c5c5" , fontWeight: 'normal' }}
                                            placeholderStyle={{ color: "#c5c5c5" }}
                                            placeholderIconColor="#fff"
                                            selectedValue={this.state.selected1}
                                            onValueChange={(value) => this.setState({ selected1: value })}
                                        >
                                            <Picker.Item label={ i18n.t('category') } value="key0" />
                                            <Picker.Item label="فرنسا" value="key1" />
                                            <Picker.Item label="امريكا" value="key2" />
                                        </Picker>
                                        <Image source={require('../../assets/images/gray_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                    </Item>
                                </View>
                                <View>
                                    <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#c5c5c5', height: 50, marginTop: 20, borderRadius: 30, width: '100%', paddingHorizontal: '30%' }} regular >
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            style={{ width: undefined, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#c5c5c5" , fontWeight: 'normal' }}
                                            placeholderStyle={{ color: "#c5c5c5" }}
                                            placeholderIconColor="#fff"
                                            selectedValue={this.state.selected1}
                                            onValueChange={(value) => this.setState({ selected1: value })}
                                        >
                                            <Picker.Item label={ i18n.t('productType') } value="key0" />
                                            <Picker.Item label="فرنسا" value="key1" />
                                            <Picker.Item label="امريكا" value="key2" />
                                        </Picker>
                                        <Image source={require('../../assets/images/gray_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                    </Item>
                                </View>

                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.productDisc === 1 ? '#26b5c4' : '#c5c5c5', padding: 10, flexDirection: 'row', marginTop: 20  }}>
                                    <Textarea placeholderTextColor={'#acabae'} rowSpan={3} style={{fontFamily: 'cairo', width:'100%' , textAlign: 'right', color: '#26b5c4', fontSize: 12}} placeholder="وصف المنتج" />
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, alignSelf: 'center' }}>
                                    <CheckBox checked={false} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#26b5c4' />
                                    <Text style={{ fontFamily: 'cairo', color: '#6d6c72' }}>{ i18n.t('addExtraPrice') }</Text>
                                </View>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.productPrice === 1 ? '#26b5c4' : '#c5c5c5', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('extraPrice') }</Label>
                                        <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('price')} onFocus={() => this.activeInput('price')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                        <Button onPress={() => this.props.navigation.navigate('confirm')} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                            <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('sendButton') }</Text>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                        </Button>
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

export default AddProduct;