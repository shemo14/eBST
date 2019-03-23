import React, { Component } from "react";
import { View, Text, Image, Dimensions, ImageBackground, FlatList, ImageStore, TouchableOpacity } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'
import {ImageBrowser,CameraBrowser} from 'expo-multiple-imagepicker';


const height = Dimensions.get('window').height;
const data   = [
                    {key: '0', image: ''},
                ];
class AddAds extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [{ files: null }]
        }
    }

    static navigationOptions = () => ({
        header: null
    });

    _keyExtractor = (item, index) => item.id;

    deleteImage(){

    }

    renderItems(item){
        // ImageStore.getBase64ForTag(items.file, (base64Data) => {
        //     console.log(base64Data)
        // }, (reason) => console.error(reason));

        if (item.files === null){
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
                <TouchableOpacity onPress={() => this.deleteImage()} style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', position: 'absolute', zIndex: 999, height: 0, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon type={'EvilIcons'} name={'close'} style={{ fontSize: 0, color: '#fff', textAlign: 'center', width: 30, opacity: 1 }} />
                </TouchableOpacity>
                <Image
                    style={{ height: 100, width: '100%' }}
                    source={{uri: item.file}}
                />
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
        }).catch((e) => console.log(e))
    };

    render() {
        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }


        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{ color: '#fff', fontSize: 30, marginTop: 8, left: -10 }} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 }}>اضافة اعلان</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('models')}>
                                <Icon name={'ios-arrow-back'} type='Ionicons' style={{ color: '#fff' }} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>

                <Content style={{ padding: 20 }}>
                    <FlatList
                        data={this.state.photos}
                        renderItem={({item}) => this.renderItems(item)}
                        numColumns={3}
                        keyExtractor={this._keyExtractor}
                    />
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

export default AddAds;