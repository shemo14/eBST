import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground, StyleSheet } from "react-native";
import { Container, Content, Button, Header, Left, Right, Body ,  List, ListItem } from 'native-base'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class BiddingOrderDetails extends Component {
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
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>تفاصيل الطلب</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('incomingOffers')}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{}}>
                    <View style={{ width:'100%' ,  flexDirection:'column' , alignItems:'center' , justifyContent:'center' , flex:1 , padding:15}}>
                        <List style={{flex:1 , width:'100%'}}>
                            <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:10 }}>
                                <Body style={{  alignSelf:'flex-start'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>رقم الطلب: </Text>
                                        <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>1</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>نوع الطلب: </Text>
                                        <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>مزايدة</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>تاريخ الطلب: </Text>
                                        <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>3/10/2019</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>عرض السعر: </Text>
                                        <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>550 رس</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>اسم صاحب المنتج: </Text>
                                        <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>اوامر الشبكة</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>رقم الجوال: </Text>
                                        <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>0000000</Text>
                                    </View>
                                </Body>
                            </ListItem>
                            <ListItem style={{  width: '100%', marginLeft: 0 ,paddingRight: 7, paddingLeft: 7  , paddingTop: 0 , paddingBottom:0 , overflow:'hidden' ,  marginBottom:10 , borderBottomWidth:0 }}>
                                <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>تفاصيل المنتج</Text>
                            </ListItem >
                            <ListItem style={{ borderTopRightRadius: 5,borderTopLeftRadius: 5 , borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                paddingRight: 0, paddingLeft: 0 , paddingTop: 0 , paddingBottom:0 , overflow:'hidden' , borderBottomWidth:0 }}>
                                <View style={{width:'100%'}}>
                                    <Image source={require('../../assets/images/product_pic.png')} style={{ width: '100%', height: 200}} resizeMode={'cover'} />
                                </View>
                            </ListItem>
                            <ListItem style={{ flexDirection:'column' ,  borderBottomRightRadius: 5,borderBottomLeftRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                paddingRight: 7, paddingLeft: 7 , paddingTop: 5 , paddingBottom:5 , marginBottom:10 , overflow:'hidden' , borderTopWidth:0 }}>
                                <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%' , marginBottom:5}}>
                                    <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:13}}>كاميرا كانون</Text>
                                    <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:13}}>سعر افتتاح المزاد 500 ريال</Text>
                                </View>
                                <View style={{ width:'100%'}}>
                                    <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:13 ,lineHeight:18 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر ومعاها كارت 4 جيجا و جراب و البيع لعدم الحاجه اليها</Text>
                                </View>
                            </ListItem>
                        </List>
                    </View>
                </Content>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
    
})
export default BiddingOrderDetails;