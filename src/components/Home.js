import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager, ActivityIndicator} from "react-native";
import { Container, Content, Button, Footer, Icon, Header } from 'native-base'
import Swiper from 'react-native-swiper';
import FooterSection from './Footer';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";
import {connect} from "react-redux";
import Modal from "react-native-modal";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            adsImgs:[],
            status: null,
            modal: false,
            imgUri: null
        }
    }

    static navigationOptions = () => ({
        header: null,
        drawerLabel: i18n.t('home') ,
        drawerIcon: ( <Image source={require('../../assets/images/white_home.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    componentWillMount(){
        axios.get(CONST.url+'home_ads').then(response=>{
            this.setState({adsImgs:response.data.data , status:response.data.status})
        })

    }

    componentWillReceiveProps(nextProps) {
        console.log('this is home CWRP ..||', nextProps);
    }

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', height , position: 'absolute', backgroundColor: '#fff', zIndex: 999, width: '100%', paddingTop: (height*45)/100 }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    onFocus(){
        this.setState({ status: null })
        this.componentWillMount()
    }

    render() {
        console.log('img uri ..', this.state.imgUri);
        return (
            <Container>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={{zIndex: 9999999, marginTop: 40, height: 10, backgroundColor: 'transparent', borderBottomWidth: 0}} noShadow>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center'}}>
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.navigate(this.props.user ? 'notifications' : 'login')}>
                            <Image source={require('../../assets/images/notification.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                { this.renderLoader() }
                <Content style={{ zIndex: -99, marginTop: -60 }}>
                    <View>
                        <Swiper key={this.state.adsImgs.length} dotStyle={{ backgroundColor: '#fff', borderRadius: 50, left: 80, bottom: 30 }} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12, left: 80, bottom: 30 }} containerStyle={{ width: '100%', height: 300, flex: 1 }} showsButtons={false} autoplay={true}>
                            {
                                this.state.adsImgs.map((img, i) => (
                                    <TouchableOpacity onPress={() => this.setState({ modal: !this.state.modal, imgUri: img.image })} style={styles.slide} key={i}>
                                        <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                        <Image source={{ uri: img.image }} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                ))
                            }
                        </Swiper>
                        <View style={{ top: -110, width: '100%', height: 100 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%', height: 115 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'}/>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', top: -140, position: 'relative', height: 210, left: 10 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('stores')} style={{ right: 50 }}>
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18, fontFamily: 'cairo', color: '#acabae' }}>{ i18n.t('stores') }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryProducts', { type: 2, name: i18n.t('family') })} style={{ left: 50, top: -50 }}>
                            <Image source={require('../../assets/images/shape_yellow.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#e1b82b', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18 , fontFamily: 'cairo', color: '#acabae' }}>{ i18n.t('family') }</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryProducts', { type: 3, name: i18n.t('exchanges') })} style={{ right: 50, top: -100 }}  >
                            <Image source={require('../../assets/images/border_blue.png')} style={{ width: 150, height: 150 }} resizeMode={'contain'}/>
                            <View transparent style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18 , fontFamily: 'cairo', color: '#acabae' }}>{ i18n.t('exchanges') }</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
                <Modal isVisible={this.state.modal} onBackdropPress={()=> this.setState({ modal : false, imgUri: null })}>
                    <View style={{ flex: 1 , padding:10 , position:'absolute' , width:'100%' ,overflow:'hidden'}}>
                        <View style={{width:'100%' ,  overflow:'hidden'}}>
                            <View style={styles.slide}>
                                <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                {
                                    this.state.imgUri ?
                                        ( <Image source={{ uri: this.state.imgUri }} style={{ width: '100%', height: 300 }} resizeMode={'cover'} /> ) :
                                        (<View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                            <ActivityIndicator size="large" color="#4fb7c3" />
                                        </View>)
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
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


const mapStateToProps = ({ profile }) => {
    return {
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(Home);