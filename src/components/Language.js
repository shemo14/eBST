import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Dimensions, I18nManager} from "react-native";
import { Container, Content } from 'native-base'
import styles from '../../assets/styles'
import { connect } from 'react-redux';
import { chooseLang } from '../actions';

const height = Dimensions.get('window').height;
class Language extends Component {
    constructor(props){
        super(props);
        this.onChooseLang = this.onChooseLang.bind(this)
    }

    onChooseLang(lang) {
        this.props.chooseLang(lang);
        this.props.navigation.navigate('login');
    };


    render() {
        return (
            <Container>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={require('../../assets/images/background.png')} resizeMode={'cover'} style={styles.imageBackgroundStyle}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logoStyle} resizeMode={'contain'} />

                        <View style={styles.langContainer}>
                            <TouchableOpacity onPress={() => this.onChooseLang('ar')} style={styles.langStyle}>
                                <Image source={require('../../assets/images/gray_curve.png')} style={{ width: 105, height:  105, top: 7, left: 7 }} resizeMode={'contain'}/>
                                <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: '#26b5c4', width: 70, height: 70, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                                    <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18, color: '#fff', fontFamily: 'cairo' }}>العربية</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.onChooseLang('en')} style={styles.langStyle}>
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

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps, { chooseLang })(Language);