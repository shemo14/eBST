import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager } from "react-native";
import { Container, Content, Button, Footer, Icon, Header } from 'native-base'
import Swiper from 'react-native-swiper';
import FooterSection from './Footer';
import i18n from '../../locale/i18n'


const width = Dimensions.get('window').width;
class Home extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        header: null,
        drawerLabel: i18n.t('home') ,
        drawerIcon: ( <Image source={require('../../assets/images/white_home.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    componentWillMount(){
        I18nManager.forceRTL(true)
    }

    render() {
        return (
            <Container>
                <Header style={{zIndex: 9999999, marginTop: 40, height: 10, backgroundColor: 'transparent'}} noShadow>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/notification.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{ zIndex: -99, marginTop: -50 }}>
                    <View>
                        <Swiper dotStyle={{ backgroundColor: '#fff', borderRadius: 50, left: 80, bottom: 30 }} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12, left: 80, bottom: 30 }} style={{ width: '100%', height: 300 }} showsButtons={false} autoplay={true}>
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('categories')} style={{ right: 50 }}>
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18, fontFamily: 'cairo', color: '#acabae' }}>{ i18n.t('stores') }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('categories')} style={{ left: 50, top: -50 }}>
                            <Image source={require('../../assets/images/shape_yellow.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#e1b82b', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18 , fontFamily: 'cairo', color: '#acabae' }}>{ i18n.t('family') }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('categories')} style={{ right: 50, top: -100 }}  >
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View transparent style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18 , fontFamily: 'cairo', color: '#acabae' }}>{ i18n.t('exchanges') }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
                <FooterSection pageRoute={'home'} navigation={this.props.navigation}/>
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