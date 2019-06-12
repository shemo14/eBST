import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground , Platform} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body } from 'native-base'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class AboutApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            aboutUs: '',
            status: null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('aboutApp'),
        drawerIcon: ( <Image source={require('../../assets/images/white_about_app.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    componentWillMount() {
        axios({
            url: CONST.url + 'about_us',
            method: 'POST',
            data: {lang: this.props.lang}
        }).then(response => {
            this.setState({
                aboutUs: response.data.data.about_us,
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
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, borderBottomWidth: 0, marginTop: Platform.OS === 'ios' ? -18 : 0 }} noShadow>
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{ i18n.t('aboutApp') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{}}>
                    { this.renderLoader() }
                    <View style={{ padding:15 , justifyContent:'center' , marginTop:30}}>
                        <Text style={{fontFamily:'cairo' , fontSize:14 , color:'#6d6c72' , lineHeight:25 , textAlign:'center'}}>{ this.state.aboutUs }</Text>
                    </View>
                </Content>
                <Image source={require('../../assets/images/question_mark.png')} style={{ width: 170, height: 170 , bottom:0 , left:0 }} resizeMode={'contain'} />

            </Container>
        );
    }
}


const mapStateToProps = ({ lang }) => {
    return {
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(AboutApp);