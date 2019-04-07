import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground , TouchableOpacity} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body , List, ListItem , Icon ,  Form, Item, Input , Textarea} from 'native-base'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class ContactUs extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        header: null
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
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>اتصل بنا</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('home')}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{paddingTop:15 , paddingBottom:15}}>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center'}}>
                        <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center'}}>
                            <Image source={require('../../assets/images/location.png')} style={{ width: 20, height: 20  , marginRight:10 }} resizeMode={'contain'} />
                            <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>الرياض - شارع النخصي</Text>
                        </View>
                        <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center'}}>
                            <Image source={require('../../assets/images/phone.png')} style={{ width: 20, height: 20  , marginRight:10 }} resizeMode={'contain'} />
                            <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>00000000</Text>
                        </View>
                        <View style={{marginBottom:10 ,flexDirection:'row' , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , padding:15 , height:45 , alignItems:'center'}}>
                            <Image source={require('../../assets/images/lactic_email.png')} style={{ width: 20, height: 20  , marginRight:10 }} resizeMode={'contain'} />
                            <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' }}>awamer@gmail.com</Text>
                        </View>
                        <View style={{marginTop:10 ,marginBottom:20 ,flexDirection:'row' , padding:15 , height:45 , alignItems:'center', justifyContent:'center'}}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/facebook.png')} style={{ width: 50, height: 50 , marginRight:10 }} resizeMode={'contain'} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={require('../../assets/images/twitter.png')} style={{ width: 50, height: 50 , marginRight:10 }} resizeMode={'contain'} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={require('../../assets/images/google_plus.png')} style={{ width: 50, height: 50 , marginRight:10 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:10 }}>
                            <View style={{justifyContent:'space-between', flexDirection:'row' , flex:1}}>
                                <Item regular style={{ borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35 , height:45 , padding:5 , width:'48%'}}>
                                    <Input placeholder="الاسم" 
                                    style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , textAlign:'right' }} 
                                    autoCapitalize={none}
                                    />
                                </Item>
                                <Item regular style={{ borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:35, height:45 , padding:5 , width:'48%'}}>
                                    <Input placeholder="الايميل"
                                     style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , textAlign:'right'}} 
                                     keyboardType={email-address}
                                
                                     />
                                </Item>
                            </View>
                            <View style={{ flex:1 , marginTop:10}}>
                                <Textarea rowSpan={5} style={{paddingTop:10, paddingBottom:10 , paddingLeft:18 , paddingRight:18 , borderWidth:1 , borderColor:'#c5c5c5' , borderRadius:30 , fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , textAlign:'right'}} placeholder="الرسالة" />
                            </View>
                            <View style={{ marginTop: 10 , marginBottom:10 }}>
                                <Button onPress={this._toggleModal} style={{ borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>ارسال</Text>
                                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}


export default ContactUs;