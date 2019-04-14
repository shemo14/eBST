import React, { Component } from "react";
import { View, Text, Image, Dimensions, ImageBackground , TouchableOpacity} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body , List, ListItem } from 'native-base'
import i18n from '../../locale/i18n'

class Notifications extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>{i18n.t('notifications')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{}}>
                    <View style={{ padding:15}}>
                        <List style={{width:'100%'}}>
                            <ListItem  style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae',
                             width: '97%', marginLeft: 0, marginBottom: 15 , paddingTop:0, paddingBottom:0 , paddingRight:0 , borderLeftWidth:0 }}>
                                <TouchableOpacity onPress={() => alert('ops')} style={{ width:'100%' ,  borderLeftColor:'#e2b705' , borderLeftWidth:4 , height:'101.8%' , borderRadius: 5 , padding:10}}>
                                    <View style={{ width:'100%' }}>
                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%'}}>
                                            <Text style={{ color: '#6d6c72', fontFamily: 'cairoBold' , fontSize:13 }}>قبول الطلب</Text>
                                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize:13 }}>منذ 3 دقائق</Text>
                                        </View>
                                        <View style={{width:'100%'}}>
                                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo' , fontSize:12 }}>تم قبول الطلب وسيتم التواصل عبر وسائل الاتصال المتاحة</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                    <TouchableOpacity  onPress={() => alert('opsssssssss')} style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                </Left>
                            </ListItem>
                            <ListItem  style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae',
                             width: '97%', marginLeft: 0, marginBottom: 15 , paddingTop:0, paddingBottom:0 , paddingRight:0 , borderLeftWidth:0 }}>
                                <TouchableOpacity onPress={() => alert('ops')} style={{ width:'100%' ,  borderLeftColor:'#26b5c4' , borderLeftWidth:4 , height:'101.8%' , borderRadius: 5 , padding:10}}>
                                    <View style={{ width:'100%' }}>
                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%'}}>
                                            <Text style={{ color: '#6d6c72', fontFamily: 'cairoBold' , fontSize:13 }}>رفض الطلب</Text>
                                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize:13 }}>منذ 3 دقائق</Text>
                                        </View>
                                        <View style={{width:'100%'}}>
                                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo' , fontSize:12 }}>تم الغاء الطلب </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <Left style={{ position: 'absolute', right: -10, top: -10 }}>
                                    <TouchableOpacity  onPress={() => alert('opsssssssss')} style={{  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                </Left>
                            </ListItem>
                        </List>
                    </View>
                </Content>

            </Container>
        );
    }
}


export default Notifications;