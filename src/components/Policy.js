import React, { Component } from "react";
import {View, Text, Image, ImageBackground, Dimensions, I18nManager} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body } from 'native-base'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";
import {DoubleBounce} from "react-native-loader";

const height = Dimensions.get('window').height;
class Policy extends Component {
    constructor(props){
        super(props);
        this.state = {
            policy: '',
            status: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('terms'),
        drawerIcon: ( <Image source={require('../../assets/images/white_terms.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });


    componentWillMount() {
        axios({
            url: CONST.url + 'policy',
            method: 'POST',
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                policy: response.data.data.policy,
                status: response.data.status,
            })
        })
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

    render() {
        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{i18n.t('terms')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    { this.renderLoader() }
                    <View style={{ padding:15 , justifyContent:'center' , marginTop:30}}>
                        <Text style={{fontFamily:'cairo' , fontSize:14 , color:'#6d6c72' , lineHeight:25 , textAlign:'center'}}>{ this.state.policy }</Text>
                    </View>
                </Content>
                <Image source={require('../../assets/images/info.png')} style={{zIndex:-1 ,width: 170, height: 170 , bottom:0 , right:-10 , position:'absolute' }} resizeMode={'contain'} />

            </Container>
        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(Policy);