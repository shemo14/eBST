import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, List, ListItem, Icon } from 'native-base';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';


const receiveOffers = [
    { name: 'موبايل سامسونج', nums: 4 },
    { name: 'لابتوب ابل اير', nums: 6 },
    { name: 'اي رزع ف البتنجان', nums: 3 },
    { name: 'اي كلام بردو هنا عادي يعني', nums: 2 },
];

const sentOffers = [
    { name: 'موبايل سامسونج', nums: 4 },
    { name: 'لابتوب ابل اير', nums: 6 },
    { name: 'اي رزع ف البتنجان', nums: 3 },
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
        header: null,
        drawerLabel: () => null
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
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18, fontFamily: 'cairo' }}>العروض</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('models')}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button onPress={() => this.onSwipeLeft()} style={{ height: 40, backgroundColor: this.state.receiveShow ? '#E2B705' : 'transparent', borderRadius: 30, margin: 10, padding: 5, borderColor: this.state.receiveShow ? '#E2B705' : '#acabae', borderWidth: 1, width: 120, justifyContent: 'center' }} transparent={!this.state.receiveShow}>
                            <Text style={{ color: this.state.receiveShow ? '#fff' : '#acabae', textAlign: 'center', fontFamily: 'cairo' }}>العروض الواردة</Text>
                        </Button>
                        <Button onPress={() => this.onSwipeRight()} style={{ height: 40, borderRadius: 30, borderColor: this.state.receiveShow ? '#acabae' : '#E2B705', borderWidth: 1, margin: 10, padding: 5, backgroundColor: this.state.receiveShow ? 'transparent' : '#E2B705', width: 120, justifyContent: 'center' }} transparent={this.state.receiveShow}>
                            <Text style={{ color: this.state.receiveShow ? '#acabae' : '#fff', textAlign: 'center', fontFamily: 'cairo' }}>العروض المرسلة</Text>
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
                                            <Right style={{ flex: 0 }}>
                                                <View style={{ top: 30 }}>
                                                    <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '20deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} ></View>
                                                    <View style={[styles.block, { transform: [{ rotate: '20deg' }] }]}>
                                                        <Image
                                                            source={require('../../assets/images/photo.png')}
                                                            style={[styles.image, { borderRadius: 10 }]}
                                                            resizeMode={'stretch'}
                                                        />
                                                    </View>
                                                </View>
                                            </Right>
                                            <Body style={{ marginHorizontal: 20 }}>
                                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 15 }}>{offer.name}</Text>
                                            <Text style={{ color: '#26b5c4', fontFamily: 'cairo' }}>{offer.nums} عروض</Text>
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