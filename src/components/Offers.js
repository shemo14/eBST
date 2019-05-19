import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity ,Dimensions , I18nManager} from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, List, ListItem, Icon } from 'native-base';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';

const height = Dimensions.get('window').height;

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true,
            type:1,
            status: null,
            
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount(){
        axios({ method: 'POST', url: CONST.url + 'offers', headers: {Authorization: this.props.user.token }, data: {type:this.state.type , lang: this.props.lang}}).then(response => {
            this.setState({showData:response.data.data , status:response.data.status})
        })
    }
    onSwipeLeft() {
        this.setState({ type:1,receiveShow: true , status:null });
        this.componentWillMount();
    }

    onSwipeRight() {
        this.setState({ type:0, receiveShow: false , status:null});
        this.componentWillMount();
    }

    onSwipe(gestureName, gestureState) {
        const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
        this.setState({ gestureName: gestureName });
        switch (gestureName) {
            case SWIPE_LEFT:
                this.setState({ backgroundColor: 'blue' });
                break;
            case SWIPE_RIGHT:
                this.setState({ backgroundColor: 'yellow' });
                break;
        }
    }
    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height - 170, alignSelf:'center' , backgroundColor:'#fff' }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }
    renderNoData(){
        if (this.state.showData.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noSearchResult') }</Text>
                </View>
            );
        }
    }
    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <Container>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={ I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png') } style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18, fontFamily: 'cairo' }}>{i18n.t('offers')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 ,transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    { this.renderLoader() }
                    { this.renderNoData() }
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button onPress={() => this.onSwipeLeft()} style={{ height: 40, backgroundColor: this.state.receiveShow ? '#E2B705' : 'transparent', borderRadius: 30, margin: 10, padding: 5, borderColor: this.state.receiveShow ? '#E2B705' : '#acabae', borderWidth: 1, width: 120, justifyContent: 'center' }} transparent={!this.state.receiveShow}>
                            <Text style={{ color: this.state.receiveShow ? '#fff' : '#acabae', textAlign: 'center', fontFamily: 'cairo' }}>{i18n.t('recievedOffers')}</Text>
                        </Button>
                        <Button onPress={() => this.onSwipeRight()} style={{ height: 40, borderRadius: 30, borderColor: this.state.receiveShow ? '#acabae' : '#E2B705', borderWidth: 1, margin: 10, padding: 5, backgroundColor: this.state.receiveShow ? 'transparent' : '#E2B705', width: 120, justifyContent: 'center' }} transparent={this.state.receiveShow}>
                            <Text style={{ color: this.state.receiveShow ? '#acabae' : '#fff', textAlign: 'center', fontFamily: 'cairo' }}>{i18n.t('sentOffers')}</Text>
                        </Button>
                    </View>

                    <View style={{ alignItems: 'center', paddingHorizontal: 15, width: '100%' }}>
                        <GestureRecognizer
                            onSwipe={(direction, state) => this.onSwipe(direction, state)}
                            onSwipeLeft={(state) => this.onSwipeLeft(state)}
                            onSwipeRight={(state) => this.onSwipeRight(state)}
                            config={config}
                            style={{
                                flex: 1,
                                width: '100%'
                            }}
                        >
                            <List style={{ width: '100%' }}>
                                {
                                    this.state.showData.map((offer, i) => (
                                        <ListItem key={i} onPress={() => this.props.navigation.navigate('incomingOffers' , {product_id:offer.product_id})} style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0, height: 80, marginBottom: 15 }}>
                                            <Right style={{ flex: 0 }}>
                                                <View style={{ top: 30 }}>
                                                    <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '20deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} ></View>
                                                    <View style={[styles.block, { transform: [{ rotate: '20deg' }] }]}>
                                                        <Image
                                                            source={{uri:offer.product_image}}
                                                            style={[styles.image, { borderRadius: 10 }]}
                                                            resizeMode={'stretch'}
                                                        />
                                                    </View>
                                                </View>
                                            </Right>
                                            <Body style={{ marginHorizontal: 20 }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('incomingOffers' , {product_id:offer.product_id})}>
                                                <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 15 , alignSelf:'flex-start'}}>{offer.product_name}</Text>
                                                {
                                                    this.state.type == 1 ? (<Text style={{ color: '#26b5c4', fontFamily: 'cairo'  , alignSelf:'flex-start'}}>{offer.offers_count} {i18n.t('offer')}</Text>) :
                                                     (<Text style={{ color: '#26b5c4', fontFamily: 'cairo' , alignSelf:'flex-start' }}>{offer.offer_type} </Text>)
                                                }
                                                
                                                </TouchableOpacity>
                                            </Body>
                                            <Left style={{ position: 'absolute', right: -10, top: -10 }}>
                                                <TouchableOpacity onPress={() => alert('testy')} style={{ borderWidth: 1, borderRadius: 5, width: 20, height: 20, transform: [{ rotate: '45deg' }], borderColor: '#acabae', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Icon name={'close'} type={'EvilIcons'} style={{ transform: [{ rotate: '-45deg' }], color: '#acabae' }} />
                                                </TouchableOpacity>
                                            </Left>
                                        </ListItem>
                                    ))
                                }

                            </List>
                        </GestureRecognizer>
                    </View>
                </Content>
            </Container>
        );
    }
}



const styles = {
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        width: 70,
        height: 70,
        overflow: 'hidden'
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 4,
        transform: [{ rotate: '-20deg' }, { scale: 1.1 }]
    },
};


const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps, {})(Offers);