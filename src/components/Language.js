import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager} from "react-native";
import { Container, Content } from 'native-base'

const height = Dimensions.get('window').height;
class Language extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        I18nManager.forceRTL(true)
    }

    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={{ width: null, height: null, flex: 1, alignItems: 'center' }}>
                        <Image source={require('../../assets/images/logo.png')} style={{ width: 130, height: 130, top: 75 }} resizeMode={'contain'} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 200, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('login' , {lang:'ar'})} style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/images/gray_curve.png')} style={{ width: 105, height:  105, top: 7, left: 7 }} resizeMode={'contain'}/>
                                <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#26b5c4', width: 70, height: 70, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                    <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18, color: '#fff', fontFamily: 'cairo' }}>العربية</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('login' , {lang:'en'})} style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                                <Image source={require('../../assets/images/gray_curve.png')} style={{ width: 105, height:  105, top: 7, left: 7 }} resizeMode={'contain'}/>
                                <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: '#acabae', width: 70, height: 70, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                    <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18, color: '#acabae', fontFamily: 'cairo' }}>English</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Content>

            </Container>
        );
    }
}


export default Language;