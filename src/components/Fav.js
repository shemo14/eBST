import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager } from "react-native";
import { Container, Content, Button, Footer, Icon, Header } from 'native-base'
import Swiper from 'react-native-swiper';

const width = Dimensions.get('window').width;
class Fav extends Component {
    constructor(props){
        super(props);
    }


    render() {
        return (
            <Container>
                <Header style={{zIndex: 999, top: 40, height: 10, backgroundColor: 'transparent' }} noShadow>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center'}}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 }}>الاعلانات</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/notification.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{ zIndex: -99, top: -25 }}>
                    <View>
                        <View style={{ top: -110, width: '100%', height: 100 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%', height: 115 }} resizeMode={'contain'}/>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', top: -140, position: 'relative', height: 210, left: 10 }}>

                    </View>
                </Content>

            </Container>
        );
    }
}


export default Fav;