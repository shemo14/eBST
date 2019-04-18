import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground, ScrollView } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'
import MasonryList from "react-native-masonry-list";
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';

const height = Dimensions.get('window').height;
class Ads extends Component {
    constructor(props){
        super(props);
        this.state={
            ads:[],
            status: null,
        }
    }


    static navigationOptions = () => ({
        header: null
    });

    componentWillMount(){
        axios.get(CONST.url+'ads').then(response=>{
            const ads = response.data.data;

            let images = [];
            for (var i = 0; i < ads.length; i++){
                images[i] = {
                    uri: ads[i].image,
                    dimensions: { width: 1080, height: 1000 },
                }
            }

            this.setState({ads:images , status:response.data.status})
        })

    }

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 400, }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    renderNoData(){
        if (this.state.ads.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noData') }</Text>
                </View>
            );
        }
    }



    renderHeader(data){
        if (data.index === 1){
            return(
                <View style={{ height: 35, width: '100%' }}>
                </View>
            )
        }
    }

    renderFooter(item){
        console.log(item)
        // if (data.index === 7){
        //     return(
        //         <View style={{ height: 35, width: '100%' }}>
        //         </View>
        //     )
        // }
    }

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
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 , fontFamily:'cairoBold'}}>{ i18n.t('ads') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name={'ios-arrow-back'} type='Ionicons' style={{ color: '#fff' }} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
                <View style={{ zIndex: -99, top: -30, position: 'relative', height: height - 100, paddingBottom: 20 }}>
                    { this.renderLoader() }
                    { this.renderNoData() }
                    <MasonryList
                        images={this.state.ads}
                        spacing={2}
                        imageContainerStyle={{ borderRadius: 5 }}
                        renderIndividualHeader={(data) => this.renderHeader(data)}
                        renderIndividualFooter={(item) => this.renderFooter(item)}
                    />
                </View>

                <View style={{ position: 'absolute', bottom: 5, flex: 1, width: '100%' }}>
                    <Button onPress={() => this.props.navigation.navigate('addAds')} style={{ backgroundColor: '#4fb7c3', borderRadius: 6, transform: [{ rotate: '45deg'}], bottom: 22, width: 43, height: 43, alignItems: 'center', justifyContent: 'center', right: 4, alignSelf: 'center'       }}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#fff', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                    </Button>
                </View>

            </Container>
        );
    }
}


export default Ads;