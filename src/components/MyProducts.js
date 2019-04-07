import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, ListView, ImageBackground, Animated, Dimensions } from "react-native";
import { Container, Content, Header, Left, Right, Body, Button, Icon, Input } from 'native-base'
import StarRating from 'react-native-star-rating';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

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

const width = Dimensions.get('window').width;
class MyProducts extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            starCount: 3,
            fadeAnim: new Animated.Value(0),
            availabel: 0,
            redHeart: false,
            isModalVisible: false,
            listViewData: datas,
            scrollY: 0
        };
    }

    static navigationOptions = () => ({
        drawerLabel: 'منتجاتي',
        drawerIcon: ( <Image source={require('../../assets/images/white_my_product.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
    });

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

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    renderHeader = () => {
        if (this.state.scrollY >= 220){
            console.log(this.state.scrollY);
            return(
                <Header style={{ height: 170, backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0, zIndex: 3 }} noShadow>
                    <ImageBackground source={require('../../assets/images/header.png')} style={{ width: '100%', flexDirection: 'row' }} resizeMode={'stretch'}>
                        <Right style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name='menu' style={{ color: '#fff', fontSize: 30, marginTop: 8, left: -10 }} />
                            </Button>
                        </Right>
                        <Body style={{ width: '100%', alignItems: 'center', alignSelf: 'flex-start', top: 40 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', marginRight: 20, fontSize: 18 }}>الاعلانات</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <Button transparent onPress={() => this.props.navigation.navigate('models')}>
                                <Icon name={'ios-arrow-back'} type='Ionicons' style={{ color: '#fff' }} />
                            </Button>
                        </Left>
                    </ImageBackground>
                </Header>
            );
        }


        return(
            <Header style={{ zIndex: 3, marginTop: 40, height: 10, backgroundColor: 'transparent', paddingHorizontal: 10 }} noShadow>
                <Right style={{flex: 0, alignSelf: 'flex-start', marginHorizontal: 10}}>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/white_edit.png')} style={{width: 25, height: 25, top: 3}} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </Right>
                <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'center', color: '#fff', marginLeft: 20, fontSize: 20, fontFamily: 'cairo'}}>منتجاتي</Text>
                </Body>
                <Animated.View style={{ width: this.state.fadeAnim, height: 40, borderRadius: 30, flexDirection: 'row' ,backgroundColor: 'rgba(255, 255, 255, 1)', borderWidth: this.state.availabel ? 1 : 0, marginTop: -10, position: 'absolute', borderColor: '#e2b705', right: 75 }}>
                    <TouchableOpacity onPress={() => this.setAnimate()} style={{ alignItems: 'center', justifyContent: 'center', left: 5, top: 5, width: 30, height: 30 }}>
                        <Icon name={'close'} type={'EvilIcons'} style={{ color: '#acabae', fontSize: this.state.availabel ? 25 : 0 }} />
                    </TouchableOpacity>
                    <Input placeholder={'بحث ...'} placeholderTextColor={'#acabae'} style={{ width: '90%', height: this.state.availabel ? 35 : 0, paddingHorizontal: 5, backgroundColor: 'transparent', marginHorizontal: 3, color: '#6d6c72', fontFamily: 'cairo', }} />
                </Animated.View>
                <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                    <TouchableOpacity style={{ marginHorizontal: 5, marginRight: 10 }} onPress={() => this.setAnimate()}>
                        <Image source={require('../../assets/images/white_search.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25}}
                               resizeMode={'contain'}/>
                    </TouchableOpacity>
                </Left>
            </Header>
        )
    };

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                { this.renderHeader() }
                <Content style={{ zIndex: -1, marginTop: -50 }} onScroll={e => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}>
                    <View style={{ height: 300 }}>
                        <View style={styles.slide}>
                            <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 2 }} />
                            <Image source={require('../../assets/images/product_pic.png')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                        </View>
                        <View style={{ top: -210, width: '100%', height: 0, zIndex: 4 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%' }} resizeMode={'contain'} />
                        </View>
                    </View>
                    <View style={{ padding: 20, marginTop: -80, zIndex: 5 }}>
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
                        <View style={{ marginTop: 5 }}>
                            <SwipeListView
                                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                                renderRow={(data, secId, rowId, rowMap) => (
                                    <SwipeRow
                                        disableLeftSwipe={ true }
                                        leftOpenValue={60}>
                                        <View style={styles.rowBack}>
                                            <TouchableOpacity style={{ padding: 5 }}>
                                                <Image source={require('../../assets/images/gray_edit.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ padding: 5 }} onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                                <Image source={require('../../assets/images/red_remove.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableHighlight
                                            style={styles.rowFront}
                                            underlayColor={'#AAA'}>
                                            <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 10, marginTop: 9 }}>
                                                <TouchableOpacity >
                                                    <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
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
                                                <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                                    <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableHighlight>
                                    </SwipeRow>
                                )}
                            />
                        </View>
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
        width: 70,
        height: 70,
        overflow: 'hidden'
    },
    image: {
        width: '105%',
        height: '105%',
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    },
    rowFront: {
        alignItems: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 0,
        justifyContent: 'center',
        height: 85,
        backgroundColor: '#fff'
    },
    rowBack: {
        alignItems: 'flex-end',
        flex: 1,
        paddingLeft: 15,
        height: 75,
        marginHorizontal: 15,
        marginTop: 8
    },
});

export default MyProducts;