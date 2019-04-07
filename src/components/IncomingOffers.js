import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import {Container, Content, List, ListItem, Header, Left, Right, Body , Button} from 'native-base'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class IncomingOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            offerOneModal: false,
            offerTwoModal: false
        };
    }

    offerOneModal = () => this.setState({ offerOneModal: !this.state.offerOneModal });
    offerTwoModal = () => this.setState({ offerTwoModal: !this.state.offerTwoModal });

    acceptOrderOne (){
        this.props.navigation.navigate('acceptOrder');
        this.setState({ offerOneModal: !this.state.offerOneModal })
    }

    acceptOrderTwo (){
        this.props.navigation.navigate('acceptOrder');
        this.setState({ offerTwoModal: !this.state.offerTwoModal })
    }

    static navigationOptions = () => ({
        header: null
    });

    render() {
        return (
            <Container>
                <Header style={{zIndex: 999, top: 40, height: 10, backgroundColor: 'transparent' }} noShadow>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center'}}>
                        <TouchableOpacity >
                            <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 , fontFamily:'cairo'}}>تفاصيل المنتج</Text>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{ zIndex: -99, top: -25 }}>
                    <View>
                        <Swiper dotStyle={{ backgroundColor: '#fff', borderRadius: 50, left: 80, bottom: 30 }} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12, left: 80, bottom: 30 }} style={{ width: '100%', height: 300 }} showsButtons={false} autoplay={true}>
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
                        <View style={{ top: -210, width: '100%', height: 0}}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%' }} resizeMode={'contain'}/>
                        </View>
                    </View>
                    <View style={{padding:20 , marginTop:-70}}>
                        <Text style={{color:'#6d6c72', fontFamily:'cairo', fontSize:14 , marginBottom:0 }}>كاميرا اتستاكس مبني 9</Text>
                        <Text style={{color:'#26b5c4' ,  fontFamily:'cairo', fontSize:14, marginBottom:5 }}>سعر المنتج 500 ريال</Text>
                        <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:14 ,lineHeight:20 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر ومعاها كارت 4 جيجا و جراب و البيع لعدم الحاجه اليها</Text>
                    
                        <View style={{marginTop:10}}>
                            <List style={{ width: '100%' }}>
                                <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                    paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:17 }}>
                                    <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                        <TouchableOpacity onPress={this.offerOneModal}>
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile_photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                            </View>
                                        </TouchableOpacity>
                                    </Right>
                                    <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                        <TouchableOpacity onPress={this.offerOneModal}>
                                            <Text style={{color:'#6d6c72' , fontSize:13, fontFamily:'cairo' , marginBottom:2}}>اوامر الشبكة</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>نوع العرض: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>شراء</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Body>
                                    <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                        <TouchableOpacity  onPress={() => alert('opsssssssss')} style={{  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                        </TouchableOpacity>
                                    </Left>
                                </ListItem>
                                <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                    paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:17 }}>
                                    <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                        <TouchableOpacity onPress={this.offerOneModal}>
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile_photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                            </View>
                                        </TouchableOpacity>
                                    </Right>
                                    <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                        <TouchableOpacity onPress={this.offerOneModal}>
                                            <Text style={{color:'#6d6c72' , fontSize:13, fontFamily:'cairo' , marginBottom:2}}>اوامر الشبكة</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>نوع العرض: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>مزايدة</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Body>
                                    <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                        <TouchableOpacity  onPress={() => alert('opsssssssss')} style={{  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                        </TouchableOpacity>
                                    </Left>
                                </ListItem>
                                <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                    paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:17 }}>
                                    <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                        <TouchableOpacity onPress={this.offerTwoModal}>
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile_photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                            </View>
                                        </TouchableOpacity>
                                    </Right>
                                    <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                        <TouchableOpacity onPress={this.offerTwoModal}>
                                            <Text style={{color:'#6d6c72' , fontSize:13, fontFamily:'cairo' , marginBottom:2}}>اوامر الشبكة</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>نوع العرض: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>مبادلة</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Body>
                                    <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                        <TouchableOpacity  onPress={() => alert('opsssssssss')} style={{  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                        </TouchableOpacity>
                                    </Left>
                                </ListItem>
                                <ListItem style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0 ,
                                    paddingRight: 7, paddingLeft: 7 , paddingVertical: 0 , marginBottom:17 }}>
                                    <Right style={{ flex: 0 , right:5 , alignSelf:'flex-start' , top:-15}}>
                                        <TouchableOpacity onPress={this.offerTwoModal}>
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile_photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                            </View>
                                        </TouchableOpacity>
                                    </Right>
                                    <Body style={{ marginHorizontal:10, alignSelf:'flex-start' , top:-10}}>
                                        <TouchableOpacity onPress={this.offerTwoModal}>
                                            <Text style={{color:'#6d6c72' , fontSize:13, fontFamily:'cairo' , marginBottom:2}}>اوامر الشبكة</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{color:'#acabae', fontFamily:'cairo', fontSize:12}}>نوع العرض: </Text>
                                                <Text style={{color:'#26b5c4', fontFamily:'cairo', fontSize:12}}>مبادلة + مبلغ مالي</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Body>
                                    <Left style={{ position: 'absolute', right: -13, top: -13 }}>
                                        <TouchableOpacity  onPress={() => alert('opsssssssss')} style={{  backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                                            <Image source={require('../../assets/images/gray_remove.png')} style={{ width: 25, height: 25}} resizeMode={'cover'}/>
                                        </TouchableOpacity>
                                    </Left>
                                </ListItem>
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
                                                <Image source={require('../../assets/images/profile_photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
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
                                </List>
                                <View style={{flexDirection:'row' , marginTop: 20 , justifyContent:'center' }}>
                                    <View style={{marginHorizontal:7}}>
                                        <Button onPress={() => this.acceptOrderOne()} style={{  borderColor:'#26b5c4' , borderWidth:1 ,borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4' }}>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}}></View>
                                            <Text style={{color:'#fff' , fontSize:14, fontFamily: 'cairo',}}>قبول</Text>
                                            <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}}></View>
                                        </Button>
                                    </View>
                                    <View style={{marginHorizontal:7}}>
                                        <Button onPress={this.offerOneModal} style={{ borderColor:'#acabae' , borderWidth:1 , borderRadius: 25, width: 130, height: 45,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#fff' }}>
                                            <Text style={{color:'#acabae' , fontSize:14, fontFamily: 'cairo',}}>رفض</Text>
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
                                            <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/profile_photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
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
        overflow: 'hidden'
    },
    image: {
        width: '105%',
        height: '105%',
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    }
});

export default IncomingOffers;