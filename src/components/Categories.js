import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Animated, Dimensions } from "react-native";
import {Container, Content, Button, Header, Right, Body, Left, Icon, Input } from 'native-base';

const categories = [
    { name: 'mobiles' },
    { name: 'mobiles1' },
    { name: 'mobiles2' },
    { name: 'mobiles3' },
    { name: 'mobiles4' },
];

const width = Dimensions.get('window').width;
class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),
            availabel: 0,
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _keyExtractor = (item, index) => item.id;

    setAnimate(){
        if (this.state.availabel === 0){
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: (width*77)/100,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 1 });
        }else {
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 0,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 0 });
        }
    }

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('categoryProducts')} activeOpacity={1} style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, marginBottom: 10 }}>
                <View style={{ margin: 2, flex: 1 }}>
                    <Image source={require('../../assets/images/img.png')} style={{ width: 130, height: 130, position: 'absolute', zIndex: 999 }}/>
                    <Image source={require('../../assets/images/photo.png')} resizeMode={'cover'} style={{ width: 130, height: 130 }}/>
                </View>
                <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 17 }}>جوالات</Text>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <Container>
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>الاقسام</Text>
                        </Body>
                        <Animated.View style={{ width: this.state.fadeAnim, height: 40, borderRadius: 30, flexDirection: 'row' ,backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: this.state.availabel ? 1 : 0, marginTop: 32, position: 'absolute', borderColor: '#e2b705', marginLeft: 10 }}>
                            <TouchableOpacity onPress={() => this.setAnimate()} style={{ alignItems: 'center', justifyContent: 'center', left: 5, top: 5, width: 30, height: 30 }}>
                                <Icon name={'close'} type={'EvilIcons'} style={{ color: '#acabae', fontSize: this.state.availabel ? 25 : 0 }} />
                            </TouchableOpacity>
                            <Input placeholder={'بحث ...'} placeholderTextColor={'#acabae'} style={{ width: '90%', height: this.state.availabel ? 35 : 0, paddingHorizontal: 5, backgroundColor: 'transparent', marginHorizontal: 3, color: '#6d6c72', fontFamily: 'cairo', }} />
                        </Animated.View>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button transparent onPress={() => this.setAnimate()}>
                                    <Image source={require('../../assets/images/white_search.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                                <Button transparent onPress={() => this.props.navigation.navigate('models')}>
                                    <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                            </View>
                        </Left>
                    </ImageBackground>
                </Header>
                <Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <FlatList
                            data={categories}
                            renderItem={({item}) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state.refreshed}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}


export default Categories;