import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, ListView } from "react-native";
import { Container, Content, List, ListItem, Header, Left, Right, Body, Textarea, Form, Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
    'Emre Can',
    'Joe Allen',
    'Phil Coutinho',
];

class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            starCount: 3,
            redHeart: false,
            isModalVisible: false,
            basic: true,
            listViewData: datas,
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }
    redHeart() {
        this.setState({ redHeart: !this.state.redHeart })
    }
    renderImage() {
        let source = '';
        if (this.state.redHeart) {
            source = require('../../assets/images/red_heart.png')
        } else {
            source = require('../../assets/images/gray_fav.png')
        }
        return source;
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });
    static navigationOptions = () => ({
        header: null
    });

    componentWillMount() {
        I18nManager.forceRTL(true)
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Header style={{ zIndex: 2, top: 40, height: 10, backgroundColor: 'transparent' }} noShadow>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                        <TouchableOpacity >
                            <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo' }}>منتجاتي</Text>
                        <TouchableOpacity>
                            <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </Header>
                <Content style={{ zIndex: -99, top: -25 }}>
                    <View style={{ height: 300 }}>
                        <View style={styles.slide}>
                            <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 1 }} />
                            <Image source={require('../../assets/images/product_pic.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                        </View>
                        <View style={{ top: -210, width: '100%', height: 0, zIndex: 3 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%' }} resizeMode={'contain'} />
                        </View>
                    </View>
                    <View style={{ padding: 20, marginTop: -80, zIndex: 4 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 10 }}>
                            <Image source={require('../../assets/images/gray_store.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            <Text style={{
                                marginHorizontal: 5, color: '#6d6c72', borderBottomWidth: 1, borderBottomColor: '#6d6c72'
                                , fontFamily: 'cairo', fontSize: 15, top: -1
                            }}>أوامر الشبكة</Text>
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#26b5c4'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={17}
                                starStyle={{ color: '#26b5c4', marginHorizontal: 2 }}
                            />
                        </View>

                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 15, lineHeight: 20 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر ومعاها كارت 4 جيجا و جراب و البيع لعدم الحاجه اليها</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                            <View style={{ width: '100%' }}>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <Image source={require('../../assets/images/gray_location.png')} style={{ width: 20, height: 20, marginTop: 3 }} resizeMode={'contain'} />
                                    <Text style={{ color: '#6d6c72', fontSize: 15, marginHorizontal: 4, fontFamily: 'cairo' }}>القاهره, التجمع الخامس </Text>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                                    <TouchableOpacity style={{ flexDirection: 'row', alignSelf: 'flex-start', flex: 5 }} onPress={this._toggleModal}>
                                        <Image source={require('../../assets/images/bold_gray_phone.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                        <Text style={{ color: '#6d6c72', fontSize: 15, marginHorizontal: 4, fontFamily: 'cairo' }}>01094985095</Text>
                                    </TouchableOpacity>
                                    <View style={{ alignSelf: 'flex-end', flexDirection: 'row', flex: 1 }}>
                                        <Image source={require('../../assets/images/gray_seen.png')} style={{ width: 20, height: 20, marginTop: 3, marginHorizontal: 4 }} resizeMode={'contain'} />
                                        <Text style={{ color: '#6d6c72', fontSize: 15, marginHorizontal: 2, fontFamily: 'cairo' }}>45</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <List
                                leftOpenValue={75}
                                rightOpenValue={-75}
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                renderRow={data =>
                                    <ListItem style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, marginBottom: 20 }}>
                                            <TouchableOpacity >
                                            <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#f00', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} ></View>
                                            <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                <Image source={require('../../assets/images/photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginHorizontal: 20, flex: 3 }}>
                                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 16 }}>ايفون اكس</Text>
                                            <View style={{ alignSelf: 'flex-start' }}>
                                                <StarRating
                                                    disabled={true}
                                                    maxStars={5}
                                                    rating={this.state.starCount}
                                                    fullStarColor={'#26b5c4'}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    starSize={15}
                                                    starStyle={{ color: '#26b5c4', marginHorizontal: 1 }}
                                                />
                                            </View>
                                            <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>500 ريال</Text>
                                        </TouchableOpacity>
                                    </ListItem>}
                                renderLeftHiddenRow={data =>
                                    <Button full onPress={() => alert(data)}>
                                        <Icon active name="information-circle" />
                                    </Button>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                        <Icon active name="trash" />
                                    </Button>}
                            />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Button onPress={() => this.props.navigation.navigate('confirmOrder')} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }}></View>
                                <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>اطلب</Text>
                                <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }}></View>
                            </Button>
                        </View>
                        <Modal isVisible={this.state.isModalVisible}>
                            <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%' }}>
                                <Form>
                                    <Textarea style={{ borderRadius: 5, padding: 7, color: '#acabae', fontSize: 13, fontFamily: 'cairo', textAlign: 'right' }} rowSpan={7} bordered placeholder="سبب الابلاغ" placeholderTextColor={{ color: "#acabae" }} />
                                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                                        <Button onPress={this._toggleModal} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                            <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }}></View>
                                            <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>ارسال</Text>
                                            <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }}></View>
                                        </Button>
                                    </View>
                                </Form>
                                <TouchableOpacity onPress={this._toggleModal} style={{ top: 5, right: 5, position: 'absolute' }}>
                                    <Image source={require('../../assets/images/refused.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </TouchableOpacity>
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
        alignItems: 'center',
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
    },
});

export default MyProducts;