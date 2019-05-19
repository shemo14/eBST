import React, { Component } from "react";
import { View, Text, Image, Dimensions, I18nManager, ImageBackground, StyleSheet } from "react-native";
import { Container, Content, Button, Icon, Header, Left, Right, Body } from 'native-base'
import MasonryList from "react-native-masonry-list";
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import { DoubleBounce } from 'react-native-loader';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';

const height = Dimensions.get('window').height;
class Ads extends Component {
    constructor(props){
        super(props);
        this.state={
            ads:[],
            adsImgs:[],
            status: null,
            offerTwoModal: false
        }
    }
    offerTwoModal = () => this.setState({ offerTwoModal: !this.state.offerTwoModal });

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount(){
        axios.get(CONST.url+'ads').then(response=>{
            const ads = response.data.data;

            let images = [];
            for (var i = 0; i < ads.length; i++){
                images[i] = {
                    uri: ads[i].image,
                    id: ads[i].id,
                    dimensions: { width: 1080, height: 1000 },
                }
            }

            this.setState({ads:images , status:response.data.status})
        })

    }


    renderAddsImgs(item , i){
        this.setState({adsImgs:[]})
        console.log('item: ' + item.id + 'i ' + i);
        this.offerTwoModal()
        axios.post(CONST.url+'ad_images' , {id:item.id}).then(res => {
            this.setState({adsImgs:res.data.data})
        });
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
                    <ImageBackground source={I18nManager.isRTL? require('../../assets/images/header.png') :require('../../assets/images/header2.png') } style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 , fontFamily:'cairoBold'}}>{ i18n.t('ads') }</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25,transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]  }} resizeMode={'contain'} />
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
                        onPressImage = {(item , i) => this.renderAddsImgs(item , i)}
                    />
                </View>

                <View style={{ position: 'absolute', bottom: 5, flex: 1, width: '100%' }}>
                    <Button onPress={() => this.props.navigation.navigate('addAds')} style={{ backgroundColor: '#4fb7c3', borderRadius: 6, transform: [{ rotate: '45deg'}], bottom: 22, width: 43, height: 43, alignItems: 'center', justifyContent: 'center', right: 4, alignSelf: 'center'       }}>
                        <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#fff', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                    </Button>
                </View>
                <Modal isVisible={this.state.offerTwoModal} onBackdropPress={()=> this.setState({ offerTwoModal : false })}>
                    <View style={{ flex: 1 , padding:10 , position:'absolute' , width:'100%' ,overflow:'hidden'}}>
                        <View style={{width:'100%' ,  overflow:'hidden'}}>
                            <Swiper dotStyle={{ backgroundColor: '#fff', borderRadius: 50 , bottom:-15}} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12 , bottom:-15}} style={{ width: '100%', height: 180, overflow: 'hidden' }} showsButtons={false} autoplay={true}>
                                {
                                    this.state.adsImgs.map(

                                        (img , i) => {

                                            return(
                                                <View key={i} style={styles.slide}>
                                                    <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                                    <Image source={{uri:img}} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                                                </View>
                                            )
                                        }
                                    )
                                }
                            </Swiper>
                        </View>
                    </View>
                </Modal>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default Ads;
