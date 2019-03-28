import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground, ScrollView } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'
import MasonryList from "react-native-masonry-list";

const height = Dimensions.get('window').height;
class Ads extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        header: null
    });

    componentWillMount(){
        I18nManager.forceRTL(true)
    }

    renderHeader(data){
        if (data.index === 1){
            return(
                <View style={{ height: 35, width: '100%' }}>
                </View>
            )
        }
    }

    renderFooter(item){
        console.log(item)
        // if (data.index === 7){
        //     return(
        //         <View style={{ height: 35, width: '100%' }}>
        //         </View>
        //     )
        // }
    }

    render() {
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
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 }}>الاعلانات</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('models')}>
                                <Icon name={'ios-arrow-back'} type='Ionicons' style={{ color: '#fff' }} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <View style={{ zIndex: -99, top: -30, position: 'relative', height: height - 100, paddingBottom: 20 }}>
                    <MasonryList
                        images={[
                            { uri: "http://placeimg.com/640/480/any" },
                            { source: require("../../assets/images/photo.png"),
                                dimensions: { width: 1080, height: 1000 },
                            },
                            {
                                source: require("../../assets/images/photo.png"),
                                width: 1080,
                                height: 1200
                            },
                            { source: { uri: "http://placeimg.com/640/480/any" } },
                            {
                                uri: "http://placeimg.com/640/480/any",
                                dimensions: { width: 1080, height: 500 },
                            },
                            { URI: "http://placeimg.com/640/480/any", id: "blpccx4cn" },
                            { url: "http://placeimg.com/640/480/any" },
                            { URL: "http://placeimg.com/640/480/any" },
                        ]}

                        spacing={2}
                        imageContainerStyle={{ borderRadius: 5 }}
                        renderIndividualHeader={(data) => this.renderHeader(data)}
                        renderIndividualFooter={(item) => this.renderFooter(item)}
                    />
                </View>

                <View style={{ position: 'absolute', bottom: 5, flex: 1, width: '100%' }}>
                    <Button onPress={() => this.props.navigate.navigation('addAds')} style={{ backgroundColor: '#4fb7c3', borderRadius: 6, transform: [{ rotate: '45deg'}], bottom: 22, width: 43, height: 43, alignItems: 'center', justifyContent: 'center', right: 4, alignSelf: 'center'       }}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#fff', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                    </Button>
                </View>

            </Container>
        );
    }
}


export default Ads;