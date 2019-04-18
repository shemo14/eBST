import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground , TouchableOpacity} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body , List, ListItem , Icon } from 'native-base'
import i18n from '../../locale/i18n'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class AboutApp extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('aboutApp'),
        drawerIcon: ( <Image source={require('../../assets/images/white_about_app.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

    componentWillMount(){
        I18nManager.forceRTL(true)
    }


    render() {
        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
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
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{}}>
                    <View style={{ padding:15 , justifyContent:'center' , marginTop:30}}>
                        <Text style={{fontFamily:'cairo' , fontSize:14 , color:'#6d6c72' , lineHeight:25 , textAlign:'center'}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:14 , color:'#6d6c72' , lineHeight:25 , textAlign:'center'}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.</Text>
                    </View>
                </Content>
                <Image source={require('../../assets/images/question_mark.png')} style={{ width: 170, height: 170 , bottom:0 , left:0 }} resizeMode={'contain'} />

            </Container>
        );
    }
}


export default AboutApp;