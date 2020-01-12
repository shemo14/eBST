import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , AsyncStorage} from "react-native";
import { Container, Content} from 'native-base'
import Swiper from 'react-native-swiper';
import i18n from '../../locale/i18n'
import CONST from '../consts'
import axios from 'axios'

import {connect} from "react-redux";
// import { Bars } from 'react-native-loader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Intro extends Component {
    constructor(props){
        super(props);

        this.state={
            introImgs:[],
            status: null,
        }
    }

    componentWillMount(){
        axios({
            url: CONST.url + 'intro',
            method: 'POST',
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({introImgs:response.data.data , status:response.data.status})
        })

    }

    navigateToLogin(){
        AsyncStorage.setItem( 'intro', 'true' );
        this.props.navigation.navigate('login');
    }
    render() {
        return (

            <Container style={{backgroundColor:'#fff'}}>
                <Content style={{}}>
                    <View>
                        <Swiper autoplay={false} key={this.state.introImgs.length} dotStyle={[{backgroundColor: '#26b5c4', left:0 , bottom:160 , width:12 , height:12, borderRadius:50 }]}
                                activeDotStyle={[{backgroundColor: '#e2b705' , left:0 , borderRadius:50 , width:12 , height:12, bottom:160}]}
                                style={[{height }]} showsButtons={false} >
                            {
                                this.state.introImgs.map((intro, i) => (

                                <View style={{flex:1 , justifyContent:'center' , alignItems:'center'}} key={i}>
                                    <View style={[{backgroundColor:'#fff' , justifyContent:'center' , alignItems:'center'}]}>
                                        <Image source={require('../../assets/images/blue_bg.png')} style={[{height:290 , width, position:'absolute' , top:0}]} resizeMode={'contain'} />
                                        <Image source={{ uri: intro.image }}  style={[{height:250 , width:250 , top:25}]} resizeMode={'contain'} />
                                    </View>

                                    <View style={[{ overflow:'hidden', paddingHorizontal:30  }]}>
                                        <Text style={{fontFamily:'cairoBold' , color:'#26b5c4', alignSelf:'center' , marginTop:70 , fontSize:25}}>{intro.title}</Text>
                                        <Text style={{fontFamily:'cairo' , color:'#000', alignSelf:'center' , textAlign:'center', marginTop:20}}>{intro.desc}</Text>
                                    </View>
                                    <View style={[{marginTop:150}]} >
                                        <TouchableOpacity  style={{backgroundColor:'#26b5c4' , borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}  onPress={() => this.navigateToLogin()}>
                                            <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairoBold'}}>{ i18n.t('skip') }</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                ))
                            }

                        </Swiper>
                    </View>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang
    };
};

export default connect(mapStateToProps, {})(Intro);
