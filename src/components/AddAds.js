import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'

const height = Dimensions.get('window').height;
class AddAds extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        header: null
    });


    render() {
        return (
            <Container style={{ paddingBottom: 20, marginBottom: 10 }}>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{ color: '#fff', fontSize: 30, marginTop: 8, left: -10 }} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 }}>اضافة اعلان</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('models')}>
                                <Icon name={'ios-arrow-back'} type='Ionicons' style={{ color: '#fff' }} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content style={{ padding: 20 }}>
                    <View style={{ paddingTop: 20, paddingBottom: 20  }}>
                        <Button transparent style={{ borderRadius: 6,borderColor: '#c9c9c9',borderWidth: 1 , transform: [{ rotate: '45deg'}], width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#c9c9c9', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                        </Button>
                    </View>
                </Content>

            </Container>
        );
    }
}


export default AddAds;