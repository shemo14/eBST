import React, { Component } from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import {Container, Content, Button, Header, Right, Body, Left, List, ListItem } from 'native-base'


class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1
        }
    }


    render() {
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
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 }}>الاقسام</Text>
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
                        <Button style={{ height: 40, backgroundColor: '#E2B705', borderRadius: 30, margin: 10, padding: 5, borderColor: '#E2B705', borderWidth: 1, width: 120, justifyContent:'center' }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'cairo' }}>العروض الواردة</Text>
                        </Button>
                        <Button style={{ height: 40, borderRadius: 30, borderColor: '#acabae', borderWidth: 1, margin: 10, padding: 5, backgroundColor: 'transparent', width: 120, justifyContent:'center' }} transparent>
                            <Text style={{ color: '#acabae', textAlign: 'center', fontFamily: 'cairo' }}>العروض المرسلة</Text>
                        </Button>
                    </View>

                    <View style={{ alignItems: 'center', padding: 15, width: '100%' }}>
                        <List style={{  width: '100%' }}>
                            <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0, height: 80 }}>
                                <Right style={{ flex: 1 }}>
                                    <Image source={require('../../assets/images/photo.png')} style={{ width: 80, height: 80, transform: [{ rotate: '15deg'}], borderRadius: 5, left: -25 }} resizeMode={'cover'} />
                                </Right>
                                <Body>
                                    <Text>ops</Text>
                                </Body>
                                <Left>
                                    <Text>ops</Text>
                                </Left>
                            </ListItem>
                        </List>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Categories;