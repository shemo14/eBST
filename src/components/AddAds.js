import React, { Component } from "react";
import { View, Text, Image, ImageBackground, FlatList, ImageStore, TouchableOpacity , I18nManager} from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';
import { Permissions } from "expo";
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";

let base64   = [];
class AddAds extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [{ file: null }],
            imageId: null,
            refreshed: false,
            base64: [],
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        header: null
    });
    
    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
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

        if (item.file === null){
            return(
                <View style={{ width: undefined, height: 100, flex: 1, justifyContent: 'center', alignItems: 'center', margin: 2 }}>
                    <Button onPress={() => this.setState({imageBrowserOpen: true})} transparent style={{ borderRadius: 5, borderColor: '#c6c5c5', borderWidth: 1, width: 70, height: 70, transform: [{ rotate: '-45deg'}], alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#c6c5c5', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                    </Button>
                </View>
            );
        }

        return(
            <View style={{ margin: 2, flex: 1 }}>
                <TouchableOpacity onPress={() => this.deleteImage(item)} style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: 999, height: imageId === item.md5 ? 100 : 0, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 3 }}>
                    <Icon type={'EvilIcons'} name={'close'} style={{ fontSize: imageId === item.md5 ? 35 : 0, color: '#fff', textAlign: 'center', width: 30, opacity: 1 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 100 }} onPress={() => this.selectImage(item.md5)}>
                    <Image
                        style={{ height: 100, width: '100%', borderRadius: 3 }}
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
            console.log(imgs);
            for (var i =0; i < imgs.length; i++){
                ImageStore.getBase64ForTag(imgs[i+1].file, (base64Data) => {
                    base64.push(base64Data);
                }, (reason) => console.error(reason));
            }
        }).catch((e) => console.log(e))
    };

    addAds(){
        console.log(base64.length, this.state.photos.length)
        this.setState({ isSubmitted: true })
        console.log(base64.length, base64)
        axios({ method: 'POST', url: CONST.url + 'add_ads', headers: {Authorization: this.props.user.token }, data: {lang: this.props.lang, images: JSON.stringify(base64)}}).then(response => {
            if (response.data.status === 200){
                this.props.navigation.navigate('finished');
            }
        })
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        return (
            <Button onPress={()=> this.addAds()} style={{ borderRadius: 25, width: 130, height: 40,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#15b5c5' , position:'absolute' , bottom:-25}}>
                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-12}} />
                <Text style={{color:'#fff' , fontSize:17}}>{ i18n.t('add') }</Text>
                <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-12}} />
            </Button>
        );
    }

    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }


        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10, backgroundColor: 'transparent' }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 , fontFamily:'cairoBold' }}>{ i18n.t('addAds') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]  }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>

                <Content style={{ padding: 20 , marginBottom:20}}>
                    <FlatList
                        data={this.state.photos}
                        renderItem={({item}) => this.renderItems(item, this.state.imageId)}
                        numColumns={3}
                        keyExtractor={this._keyExtractor}
                        extraData={this.state.refreshed}
                    />
                </Content>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    { this.renderSubmit() }
                </View>
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

export default connect(mapStateToProps, {})(AddAds);