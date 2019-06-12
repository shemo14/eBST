import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions , I18nManager, Platform} from "react-native";
import {Container, Content, List, ListItem, Header, Left, Right, Body , Button} from 'native-base'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class IncomingOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            offerOneModal: false,
            offerTwoModal: false,
            id :this.props.navigation.state.params.product_id,
            images:[],
            productDet:[],
            offers:[],
            offerDet:[],
            status:null
        };
    }

    offerOneModal = (offer_id) => {
        // console.log("offer_id" , offer_id);
        this.setState({ offerOneModal: !this.state.offerOneModal });
        axios({ method: 'POST', url: CONST.url + 'offer_details', headers: {Authorization: this.props.user.token }, data: {offer_id, lang: this.props.lang}}).then(response => {
            this.setState({offerDet:response.data.data , status:response.data.status })
        })
    }
    offerTwoModal = () => this.setState({ offerTwoModal: !this.state.offerTwoModal });




    offerActiond(status){
        this.setState({ offerOneModal: !this.state.offerOneModal });
        axios({ method: 'POST', url: CONST.url + 'offer_action', headers: {Authorization: this.props.user.token }, data: {offer_id: this.state.offerDet.id, lang: this.props.lang , status , product_id:this.state.id}}).then(response => {
            this.setState({offers:response.data.data , status:response.data.status })
        })
    }

    acceptOrderTwo (){
        // this.props.navigation.navigate('acceptOrder');
        this.setState({ offerTwoModal: !this.state.offerTwoModal })
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount(){
        axios({ method: 'POST', url: CONST.url + 'product_offers', headers: {Authorization: this.props.user.token }, data: {product_id: this.state.id , lang: this.props.lang}}).then(response => {
            this.setState({productDet:response.data.data , status:response.data.status , images:response.data.data.images , offers:response.data.data.offers})
        })
    }
    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height, alignSelf:'center' , backgroundColor:'#fff' }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }
    renderNoData(){
        if (this.state.offers.length === 0 && this.state.status != null){
            return(
                <View style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center',height: height , alignSelf:'center' , backgroundColor:'#bbb'  }}>
                    <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ width: 200, height: 200 }}/>
                    <Text style={{ fontFamily: 'cairo', fontSize: 16, textAlign: "center", marginTop: 10, color: '#6d6c72' }}>{ i18n.t('noSearchResult') }</Text>
                </View>
            );
        }
    }

    deleteOffer(id){
        this.setState({ status : null });
        axios({ method: 'POST', url: CONST.url + 'delete_offer', headers: {Authorization: this.props.user.token }, data: {offer_id: id , lang: this.props.lang}}).then(response => {
            this.componentWillMount()
        })
    }

    onFocus(payload){
        const id = payload.action.params.product_id;
        this.setState({ id, status: null });
        this.componentWillMount();
    }

    render() {
        return (
            <Container>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={{ zIndex: 3, marginTop: Platform.OS === 'ios' ? 15 : 45, height: Platform.OS === 'ios' ? 50 : 10, backgroundColor: 'transparent', paddingHorizontal: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={{flex: 0, alignSelf: 'flex-start', marginHorizontal: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} >
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Right>
                    <Body style={{width: '100%', flex: 1, alignItems: 'center', alignSelf: 'flex-start'}}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo'}}>{ i18n.t('incomingOffers') }</Text>
                    </Body>
                    <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Left>
                </Header>
                <Content style={{ zIndex: -99, marginTop: Platform.OS === 'ios' ? -100 : -60 }}>
                    { this.renderLoader() }
                    { this.renderNoData() }
                    <View>
                        <Swiper dotStyle={{ backgroundColor: '#fff', borderRadius: 50, left: 80, bottom: 30 }} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12, left: 80, bottom: 30 }} style={{ width: '100%', height: 300 }} showsButtons={false} autoplay={true}>
                        {
                            this.state.images.map((img, i) => (
                                <View style={styles.slide} key={i}>
                                    <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                    <Image source={{uri:img}} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'contain'} />
                                </View>
                            ))
                        }
                        </Swiper>
                        <View style={{ top: -210, width: '100%', height: 0}}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%' , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]  }} resizeMode={'contain'}/>
                        </View>
                    </View>
                    <View style={{padding:20 , marginTop:-70}}>
                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:14 , marginBottom:0 , alignSelf:'flex-start' }}>{this.state.productDet.name}</Text>
                        <Text style={{color:'#26b5c4' ,  fontFamily:'cairo', fontSize:14, marginBottom:5 , alignSelf:'flex-start' }}>{ i18n.t('productPrice') } : {this.state.productDet.price}  { i18n.t('RS') }</Text>
                        <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:14 ,lineHeight:20 , alignSelf:'flex-start' }}>{this.state.productDet.desc}</Text>
                    
                        <View style={{marginTop:10}}>
                            <List style={{ width: '100%' }}>
                            {
                                this.state.offers.map((offer, i) => (
                                    <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                        paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:17 }}>
                                        <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                            <TouchableOpacity onPress={this.offerOneModal}>
                                                <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#acabae', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                    <Image source={{uri:offer.avatar}} style={[styles.image, { borderRadius: 10 }]} resizeMode={'contain'} />
                                                </View>
                                            </TouchableOpacity>
                                        </Right>
                                        <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                            <TouchableOpacity onPress={() =>this.offerOneModal(offer.offer_id)}>
                                                <Text style={{color:'#6d6c72' , fontSize:13, fontFamily:'cairo' , marginBottom:2, alignSelf:'flex-start' }}>{offer.name}</Text>
                                                <View style={{flexDirection:'row'}}>
                                                    <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>{ i18n.t('offerType') }: </Text>
                                                    <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>{offer.type}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </Body>
                                        <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                            <TouchableOpacity  onPress={() => this.deleteOffer(offer.id)} style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', width: 30, height: 30 }}>
                                                <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                            </TouchableOpacity>
                                        </Left>
                                    </ListItem>
                                 ))
                                }
                            </List>
                        </View>

                        <Modal isVisible={this.state.offerOneModal} onBackdropPress={()=> this.setState({ offerOneModal : false })}>
                            <View style={{ flex: 1 , backgroundColor:'#fff' , padding:10 , position:'absolute' , width:'100%'}}>
                                <List>
                                    <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                        paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:17 }}>
                                        <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile.jpg')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                            </View>
                                        </Right>
                                        <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>اسم المبادل: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>{this.state.offerDet.name}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>{ i18n.t('offerType') }: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>{this.state.offerDet.type}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>{ i18n.t('offerPrice') }: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>{this.state.offerDet.price} رس</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>{ i18n.t('phoneNumber') }: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>{this.state.offerDet.phone}</Text>
                                            </View>
                                        </Body>
                                    </ListItem>
                                </List>
                                <View style={{flexDirection:'row' , marginTop: 20 , justifyContent:'center' }}>
                                    <View style={{marginHorizontal:7}}>
                                        <Button onPress={() => this.offerActiond(2)} style={{  borderColor:'#26b5c4' , borderWidth:1 ,borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                            <Text style={{color:'#fff' , fontSize:14, fontFamily: 'cairo',}}>{ i18n.t('accept') }</Text>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                        </Button>
                                    </View>
                                    <View style={{marginHorizontal:7}}>
                                        <Button onPress={() => this.offerActiond(1)} style={{ borderColor:'#acabae' , borderWidth:1 , borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#fff' }}>
                                            <Text style={{color:'#acabae' , fontSize:14, fontFamily: 'cairo',}}>{ i18n.t('refuse') }</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Modal isVisible={this.state.offerTwoModal} onBackdropPress={()=> this.setState({ offerTwoModal : false })}>
                        <View style={{ flex: 1 , backgroundColor:'#fff' , padding:10 , position:'absolute' , width:'100%'}}>
                                <List>
                                    <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                        paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:10 }}>
                                        <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#acabae', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile.jpg')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'contain'} />
                                            </View>
                                        </Right>
                                        <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>اسم المبادل: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>اوامر الشبكة</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>نوع العرض: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>شراء</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>عرض السعر: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>550 رس</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>رقم الجوال: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>0000000</Text>
                                            </View>
                                        </Body>
                                    </ListItem>
                                    <ListItem style={{ borderTopRightRadius: 5,borderTopLeftRadius: 5 , borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                        paddingRight: 0, paddingLeft: 0 , paddingTop: 0 , paddingBottom:0 , overflow:'hidden' , borderBottomWidth:0 }}>
                                        <View style={{width:'100%'}}>
                                            <Swiper dotStyle={{ backgroundColor: '#fff', borderRadius: 50 , bottom:-15}} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12 , bottom:-15}} style={{ width: '100%', height: 180 }} showsButtons={false} autoplay={true}>
                                                <View style={styles.slide}>
                                                    <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                                    <Image source={require('../../assets/images/product_pic.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                                                </View>
                                                <View style={styles.slide}>
                                                    <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                                    <Image source={require('../../assets/images/product_pic.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                                                </View>
                                                <View style={styles.slide}>
                                                    <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
                                                    <Image source={require('../../assets/images/product_pic.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                                                </View>
                                            </Swiper>
                                        </View>
                                    </ListItem>
                                    <ListItem style={{ flexDirection:'column' ,  borderBottomRightRadius: 5,borderBottomLeftRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                        paddingRight: 7, paddingLeft: 7 , paddingTop: 5 , paddingBottom:5 , marginBottom:10 , overflow:'hidden' , borderTopWidth:0 }}>
                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , width:'100%' , marginBottom:5}}>
                                            <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>كاميرا كانون</Text>
                                            <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>سعر المنتج 500 ريال</Text>
                                        </View>
                                        <View style={{ width:'100%'}}>
                                            <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12 ,lineHeight:18 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر ومعاها كارت 4 جيجا و جراب و البيع لعدم الحاجه اليها</Text>
                                        </View>
                                    </ListItem>
                                </List>
                                <View style={{flexDirection:'row' , marginTop:5, marginBottom:5, justifyContent:'center' }}>
                                    <View style={{marginHorizontal:7}}>
                                        <Button onPress={() => this.acceptOrderTwo()} style={{  borderColor:'#26b5c4' , borderWidth:1 ,borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                            <Text style={{color:'#fff' , fontSize:14, fontFamily: 'cairo',}}>قبول</Text>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                        </Button>
                                    </View>
                                    <View style={{marginHorizontal:7}}>
                                        <Button onPress={this.offerTwoModal} style={{ borderColor:'#acabae' , borderWidth:1 , borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#fff' }}>
                                            <Text style={{color:'#acabae' , fontSize:14, fontFamily: 'cairo',}}>رفض</Text>
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Modal>


                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        overflow: 'hidden',
        backgroundColor: '#fff'
    },
    image: {
        width: Platform.OS === 'ios' ? '120%' : '105%',
        height: Platform.OS === 'ios' ? '120%' : '105%',
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    }
});


const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps, {})(IncomingOffers);