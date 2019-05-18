import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity , I18nManager } from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, List, ListItem, Icon } from 'native-base';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import i18n from '../../locale/i18n'


const receiveOffers = [
    { num: 1, type: 'شراء' , date:'3/10/2019'},
    { num: 1, type: 'مزايدة' , date:'3/10/2019'},
    { num: 1, type: 'مبادلة' , date:'3/10/2019'},
    { num: 1, type: 'مبادلة + عرض سعر' , date:'3/10/2019'},
];

const sentOffers = [
    { num: 2, type: 'شراء' , date:'3/10/2019'},
    { num: 2, type: 'مزايدة' , date:'3/10/2019'},
    { num: 2, type: 'مبادلة' , date:'3/10/2019'},
    { num: 2, type: 'مبادلة + عرض سعر' , date:'3/10/2019'},
];


class AcceptedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: receiveOffers,
            receiveShow: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('acceptedOrders') ,
        drawerIcon: ( <Image source={require('../../assets/images/accepted_orders.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });


    onSwipeLeft(gestureState) {
        this.setState({ showData: receiveOffers, receiveShow: true });
    }

    onSwipeRight(gestureState) {
        this.setState({ showData: sentOffers, receiveShow: false });
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


    render() {

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <Container>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18, fontFamily: 'cairo' }}>{ i18n.t('acceptedOrders') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button onPress={() => this.onSwipeLeft()} style={{ height: 40, backgroundColor: this.state.receiveShow ? '#E2B705' : 'transparent', borderRadius: 30, margin: 10, padding: 5, borderColor: this.state.receiveShow ? '#E2B705' : '#acabae', borderWidth: 1, width: 120, justifyContent: 'center' }} transparent={!this.state.receiveShow}>
                            <Text style={{ color: this.state.receiveShow ? '#fff' : '#acabae', textAlign: 'center', fontFamily: 'cairo' }}>{ i18n.t('recievedOffers') }</Text>
                        </Button>
                        <Button onPress={() => this.onSwipeRight()} style={{ height: 40, borderRadius: 30, borderColor: this.state.receiveShow ? '#acabae' : '#E2B705', borderWidth: 1, margin: 10, padding: 5, backgroundColor: this.state.receiveShow ? 'transparent' : '#E2B705', width: 120, justifyContent: 'center' }} transparent={this.state.receiveShow}>
                            <Text style={{ color: this.state.receiveShow ? '#acabae' : '#fff', textAlign: 'center', fontFamily: 'cairo' }}>{ i18n.t('sentOffers') }</Text>
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
                                        <ListItem key={i} onPress={() => console.log('ops')} style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0, height: 80, marginBottom: 15 }}>
                                        
                                            <Body style={{ marginHorizontal: 20 }}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate("exchangeAndPriceOrderDetails")} >
                                                    <View style={{flexDirection:'row'}}>
                                                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 15 }}>{ i18n.t('orderNumber') } : </Text>
                                                        <Text style={{ color: '#26b5c4', fontFamily: 'cairo' }}>{offer.num}</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 15 }}>{ i18n.t('orderType') } : </Text>
                                                        <Text style={{ color: '#26b5c4', fontFamily: 'cairo' }}>{offer.type}</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row'}}>
                                                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 15 }}>{ i18n.t('orderDate') } : </Text>
                                                        <Text style={{ color: '#26b5c4', fontFamily: 'cairo' }}>{offer.date}</Text>
                                                    </View>
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



export default AcceptedOrders;