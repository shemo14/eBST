    import React, { Component } from "react";
    import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager } from "react-native";
    import { Container, Content, List, ListItem, Header, Left, Right, Body, Textarea, Form, Button } from 'native-base'
    import Swiper from 'react-native-swiper';
    import StarRating from 'react-native-star-rating';
    import Modal from "react-native-modal";
    import i18n from '../../locale/i18n'

    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;

    class ProductDetails extends Component {
        constructor(props) {
            super(props);
            this.state = {
                starCount: 3,
                redHeart: false,
                isModalVisible: false
            };
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
            return (
                <Container>
                    <Header style={{ zIndex: 999, marginTop: 40, height: 10, backgroundColor: 'transparent' }} noShadow>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                            <TouchableOpacity >
                                <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25, top: 3 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo' }}>{i18n.t('productDet')}</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </Header>
                    <Content style={{ zIndex: -99, marginTop: -50 }}>
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
                            <View style={{ top: -210, width: '100%', height: 0 }}>
                                <Image source={require('../../assets/images/slider.png')} style={{ width: '100%' }} resizeMode={'contain'} />
                            </View>
                        </View>
                        <View style={{ padding: 20, top: -80 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Image source={require('../../assets/images/gray_store.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                <Text style={{
                                    marginHorizontal: 5, color: '#6d6c72', borderBottomWidth: 1, borderBottomColor: '#6d6c72'
                                    , fontFamily: 'cairo', fontSize: 15, top: -1
                                }}>أوامر الشبكة</Text>
                            </TouchableOpacity>

                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 16, marginBottom: 5 }}>كاميرا اتستاكس مبني 9</Text>
                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 15, lineHeight: 20 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر ومعاها كارت 4 جيجا و جراب و البيع لعدم الحاجه اليها</Text>
                            <Text style={{ color: '#26b5c4', fontFamily: 'cairo', fontSize: 15, marginBottom: 5 }}>سعر المنتج 500 {i18n.t('sr')}</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starCount}
                                    fullStarColor={'#26b5c4'}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    starSize={17}
                                    starStyle={{ color: '#26b5c4', marginHorizontal: 2 }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#6d6c72', fontSize: 12, marginHorizontal: 2, fontFamily: 'cairo' }}>45</Text>
                                        <Image source={require('../../assets/images/gray_seen.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    </View>
                                    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={this._toggleModal}>
                                        <Image source={require('../../assets/images/gray_report.png')} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.redHeart()}>
                                        <Image source={this.renderImage()} style={{ width: 20, height: 20 }} resizeMode={'contain'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 7, marginBottom: 10 }} >
                                <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo' }}>{i18n.t('comments')}</Text>
                                <Image source={require('../../assets/images/gray_comments.png')} style={{ width: 20, height: 20, marginHorizontal: 5 }} resizeMode={'contain'} />
                            </View>
                            <View style={{}}>
                                <List style={{ width: '100%' }}>
                                    <ListItem style={{
                                        borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0,
                                        paddingRight: 7, paddingLeft: 7, paddingVertical: 0, marginBottom: 10
                                    }}>
                                        <Right style={{ flex: 0, right: 5, alignSelf: 'flex-start', top: -15 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                                                <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                    <Image source={require('../../assets/images/profile.jpg')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                                </View>
                                            </TouchableOpacity>
                                        </Right>
                                        <Body style={{ marginHorizontal: 10, alignSelf: 'flex-start', top: -10 }}>
                                            <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo', marginBottom: 5 }}>اوامر الشبكة</Text>
                                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 11, lineHeight: 14 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر </Text>
                                        </Body>
                                        <Left style={{ flex: 0, alignSelf: 'flex-end', bottom: -10 }}>
                                            <TouchableOpacity onPress={this._toggleModal}>
                                                <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo' }}>{i18n.t('report')}</Text>
                                            </TouchableOpacity>
                                        </Left>
                                    </ListItem>
                                    <ListItem style={{
                                        borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0,
                                        paddingRight: 7, paddingLeft: 7, paddingVertical: 0, marginBottom: 10
                                    }}>
                                        <Right style={{ flex: 0, right: 5, alignSelf: 'flex-start', top: -15 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                                                <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                    <Image source={require('../../assets/images/profile.jpg')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                                </View>
                                            </TouchableOpacity>
                                        </Right>
                                        <Body style={{ marginHorizontal: 10, alignSelf: 'flex-start', top: -10 }}>
                                            <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo', marginBottom: 5 }}>اوامر الشبكة</Text>
                                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 11, lineHeight: 14 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر </Text>
                                        </Body>
                                        <Left style={{ flex: 0, alignSelf: 'flex-end', bottom: -10 }}>
                                            <TouchableOpacity onPress={this._toggleModal}>
                                                <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo' }}>{i18n.t('report')}</Text>
                                            </TouchableOpacity>
                                        </Left>
                                    </ListItem>
                                    <ListItem style={{
                                        borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0,
                                        paddingRight: 7, paddingLeft: 7, paddingVertical: 0, marginBottom: 10
                                    }}>
                                        <Right style={{ flex: 0, right: 5, alignSelf: 'flex-start', top: -15 }}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                                                <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6 }} ></View>
                                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                                    <Image source={require('../../assets/images/profile.jpg')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                                </View>
                                            </TouchableOpacity>
                                        </Right>
                                        <Body style={{ marginHorizontal: 10, alignSelf: 'flex-start', top: -10 }}>
                                            <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo', marginBottom: 5 }}>اوامر الشبكة</Text>
                                            <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 11, lineHeight: 14 }}>14 ميجا بكسل تصوير فيديو وصور معاها كابل للشحن و الكمبيوتر </Text>
                                        </Body>
                                        <Left style={{ flex: 0, alignSelf: 'flex-end', bottom: -10 }}>
                                            <TouchableOpacity onPress={this._toggleModal}>
                                                <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo' }}>{i18n.t('report')}</Text>
                                            </TouchableOpacity>
                                        </Left>
                                    </ListItem>
                                </List>
                                <Form>
                                    <Textarea rowSpan={3} style={{ borderRadius: 5, padding: 7, color: '#acabae', fontSize: 11, fontFamily: 'cairo', textAlign: 'right' }} bordered placeholder={i18n.t('addComment')} placeholderTextColor={{ color: "#acabae" }} />
                                    <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#26b5c4', width: 30, height: 30, transform: [{ rotate: '45deg' }], position: 'absolute', bottom: -13, right: 7 }}>
                                        <TouchableOpacity>
                                            <Image source={require('../../assets/images/check_mark.png')} style={{ width: 15, height: 15, transform: [{ rotate: '-45deg' }] }} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                    </View>
                                </Form>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Button onPress={() => this.props.navigation.navigate('confirmOrder')} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                    <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }}></View>
                                    <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>{i18n.t('order')}</Text>
                                    <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }}></View>
                                </Button>
                            </View>
                            <Modal isVisible={this.state.isModalVisible}>
                                <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%' }}>
                                    <Form>
                                        <Textarea style={{ borderRadius: 5, padding: 7, color: '#acabae', fontSize: 13, fontFamily: 'cairo', textAlign: 'right' }} rowSpan={7} bordered placeholder={i18n.t('reportReason')} placeholderTextColor={{ color: "#acabae" }} />
                                        <View style={{ marginTop: 20, marginBottom: 10 }}>
                                            <Button onPress={this._toggleModal} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                                <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }} />
                                                <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>{i18n.t('sendButton')}</Text>
                                                <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }} />
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

    export default ProductDetails;