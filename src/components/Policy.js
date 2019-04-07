import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground , TouchableOpacity} from "react-native";
import { Container, Content, Button, Header, Left, Right, Body , List, ListItem , Icon } from 'native-base'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Policy extends Component {
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
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20 , fontFamily:'cairo' }}>احكام وشروط</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('home')}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{paddingTop:15}}>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/lactic_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>1</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/yellow_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>2</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/lactic_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>3</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/yellow_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>4</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/lactic_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>5</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/yellow_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>6</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/lactic_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>7</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                    <View style={{ paddingHorizontal:15 , justifyContent:'center' , flexDirection:'row' , marginBottom:10}}>
                        <Image source={require('../../assets/images/yellow_half_circle.png')} style={{ width: 20, height: 20 , top:4}} resizeMode={'contain'} />
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#fff' , top:3 , left:10 , position:'absolute' }}>8</Text>
                        <Text style={{fontFamily:'cairo' , fontSize:13 , color:'#6d6c72' , lineHeight:25 , marginLeft:10}}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص .</Text>
                    </View>
                </Content>
                <Image source={require('../../assets/images/info.png')} style={{zIndex:-1 ,width: 170, height: 170 , bottom:0 , right:-10 , position:'absolute' }} resizeMode={'contain'} />

            </Container>
        );
    }
}


export default Policy;