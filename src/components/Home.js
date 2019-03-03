import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager } from "react-native";
import { Container, Content, Button, Footer, Icon } from 'native-base'
import Swiper from 'react-native-swiper';

const width = Dimensions.get('window').width;
class Home extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
       header: null
    });

    componentWillMount(){
        I18nManager.forceRTL(true)
    }

    render() {
        return (
            <Container>
                <Content>
                    <View>
                        <View style={{position: 'absolute', zIndex: 999, top: 30, width: '100%', height: 70, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 }}>الرئيسية</Text>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/notification.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        <Swiper dotStyle={{ backgroundColor: '#fff', width: 10, height: 10, borderRadius: 50, left: 80, bottom: 30 }} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12, left: 80, bottom: 30 }} style={{ width: '100%', height: 300 }} showsButtons={false} autoplay={true}>
                            <View style={styles.slide}>
                                <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                <Image source={require('../../assets/images/photo.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                            </View>
                            <View style={styles.slide}>
                                <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                <Image source={require('../../assets/images/photo.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                            </View>
                            <View style={styles.slide}>
                                <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                <Image source={require('../../assets/images/photo.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                            </View>
                        </Swiper>
                        <View style={{ top: -110, width: '100%', height: 100 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%', height: 115 }} resizeMode={'contain'}/>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', top: -140, position: 'relative', height: 210, left: 10 }}>
                        <TouchableOpacity onPress={() => alert('ops')} style={{ right: 50 }}>
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18 }}>مبادلة</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ left: 50, top: -50 }}>
                            <Image source={require('../../assets/images/shape_yellow.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#e1b82b', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18  }}>مبادلة</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ right: 50, top: -100 }}  >
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View transparent style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18  }}>مبادلة</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
                <Footer style={{ backgroundColor: 'transparent' }}>
                    <ImageBackground style={{ width: width + 15, height: 65, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingTop: 5 }} resizeMode={'stretch'} source={require('../../assets/images/footer.png')} >
                        <Button transparent>
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'}/>
                            <Image style={{ width: 24, height: 24, position: 'absolute', left: 8 }} resizeMode={'contain'} source={require('../../assets/images/blue_home.png')}/>
                        </Button>

                        <Button transparent>
                            <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={require('../../assets/images/gray_offers.png')}/>
                        </Button>

                        <Button style={{ backgroundColor: '#4fb7c3', borderRadius: 6, transform: [{ rotate: '45deg'}], bottom: 22, width: 43, height: 43, alignItems: 'center', justifyContent: 'center', right: 4       }}>
                            <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#fff', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                        </Button>

                        <Button transparent>
                            <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={require('../../assets/images/gray_ads.png')}/>
                        </Button>

                        <Button transparent>
                            <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={require('../../assets/images/gray_fav.png')}/>
                        </Button>
                    </ImageBackground>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Home;