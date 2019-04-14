import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions, Slider } from "react-native";
import { Container, Content, Button, Header, Right, Body, Left, Icon, Input, Picker, Item, CheckBox } from 'native-base';
import Modal from "react-native-modal";
import StarRating from 'react-native-star-rating';
import i18n from '../../locale/i18n'


const categories = [
    { name: 'mobiles' },
    { name: 'mobiles1' },
    { name: 'mobiles2' },
    { name: 'mobiles3' },
    { name: 'mobiles4' },
];

const width = Dimensions.get('window').width;
class CategoryProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentOffers: 0,
            receivedOffers: 1,
            showData: [],
            receiveShow: true,
            value: 50,
            selected1: undefined,
            starCount: 3,
            isGrid:true
        }
    }

    change(value) {
        this.setState(() => {
            return {
                value: parseFloat(value),
            };
        });
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _keyExtractor = (item, index) => item.id;


    renderItems = (item) => {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, margin: 5, overflow: 'hidden' }}>
                <View style={{ width: '100%' }}>
                    <Image source={require('../../assets/images/photo.png')} resizeMode={'stretch'} style={{ width: '100%', height: 100, flex: 1 }} />
                </View>
                <View style={{ width: '100%', padding: 5 }}>
                    <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 17 }}>جوالات</Text>
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
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%' }}>
                        <Text style={{ color: '#e2b705', fontFamily: 'cairo', flex: 2, alignSelf: 'flex-start' }}>500 {i18n.t('sr')}</Text>
                        <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const { value } = this.state;

        let grid=require('../../assets/images/multi_product.png');
        let row=require('../../assets/images/gray_one_product.png');

        if(this.state.isGrid)
            grid=require('../../assets/images/yellow_multi_product.png');
        else
            row=require('../../assets/images/one_product.png');

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
                            <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>{i18n.t('products')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Button transparent>
                                    <Image source={require('../../assets/images/white_search.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                                <Button transparent onPress={() => this.setState({ visibleModal: 1 })}>
                                    <Image source={require('../../assets/images/white_filter.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                                <Button transparent onPress={() => this.props.navigation.goBack()}>
                                    <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                                </Button>
                            </View>
                        </Left>
                    </ImageBackground>
                </Header>
                <View style={{ flexDirection: 'row', height: 50, marginTop: -50, marginBottom: 10, paddingHorizontal: 10 }}>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.setState({isGrid : true})}>
                        <Image source={grid} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 5 }} onPress={() => this.setState({isGrid : false})}>
                        <Image source={row} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <Content style={{ padding: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' , height: this.state.isGrid ? 'auto' : 0}}>
                        <FlatList
                            data={categories}
                            renderItem={({ item }) => this.renderItems(item)}
                            numColumns={2}
                            keyExtractor={this._keyExtractor}
                            extraData={this.state.refreshed}
                        />
                    </View>
                    <View style={{ marginTop: 10, alignItems: 'center' , height: this.state.isGrid ? 0 : 'auto'}}>
                        <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                                <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                                <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                                    <Image source={require('../../assets/images/photo.png')} style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginHorizontal: 20, flex: 3 }} onPress={() => this.props.navigation.navigate('product')}>
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
                                <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>500 {i18n.t('sr')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
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
                                <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>500 {i18n.t('sr')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
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
                                <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>500 {i18n.t('sr')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
                            <TouchableOpacity >
                                <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} ></View>
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
                                <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>500 {i18n.t('sr')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
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
                                <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>500 {i18n.t('sr')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                                <Image source={require('../../assets/images/gray_fav.png')} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </Content>

                <Modal isVisible={this.state.visibleModal === 1} onBackdropPress={() => this.setState({ visibleModal: null })}>
                    <View style={{ width: '115%', position: 'absolute', top: -20, backgroundColor: '#26b5c4', justifyContent: 'center', alignItems: 'center', height: 300, alignSelf: 'center' }}>
                        <View style={{ width: '100%', height: 40, top: -8, position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 15 }} noShadow>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/check_mark.png')} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <Text style={{ color: '#fff', fontSize: 17, textAlign: 'center', fontFamily: 'cairo' }}>بحث متقدم</Text>
                            <TouchableOpacity>
                                <Image source={require('../../assets/images/cancel.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <View>
                                <Item style={{ borderWidth: 1, paddingRight: 0, paddingLeft: 10, borderColor: '#fff', height: 50, marginTop: 5, borderRadius: 30, width: '80%', paddingHorizontal: '30%' }} regular >
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined, backgroundColor: 'transparent', fontFamily: "cairoBold", color: "#fff" }}
                                        placeholder="المدن"
                                        placeholderStyle={{ color: "#fff" }}
                                        placeholderIconColor="#fff"
                                        selectedValue={this.state.selected1}
                                        onValueChange={(value) => this.setState({ selected1: value })}
                                    >
                                        <Picker.Item label="مصر" value="key0" />
                                        <Picker.Item label="فرنسا" value="key1" />
                                        <Picker.Item label="امريكا" value="key2" />
                                    </Picker>
                                    <Image source={require('../../assets/images/white_dropdown.png')} style={{ width: 20, height: 20, right: 10 }} resizeMode={'contain'} />
                                </Item>
                            </View>
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <Slider
                                    step={10}
                                    maximumValue={50}
                                    onValueChange={this.change.bind(this)}
                                    value={value}
                                    thumbTintColor={'#fff'}
                                    style={{ width: (width * 85) / 100 }}
                                    maximumTrackTintColor={"#e2b705"}
                                    minimumTrackTintColor={'#fff'}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, width: (width * 85) / 100, alignItems: 'center' }}>
                                    <Text style={{ color: '#fff' }}>10</Text>
                                    <Text style={{ color: '#fff' }}>20</Text>
                                    <Text style={{ color: '#fff' }}>30</Text>
                                    <Text style={{ color: '#fff' }}>40</Text>
                                    <Text style={{ color: '#fff' }}>50</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', borderRadius: 30, borderColor: '#fff', borderWidth: 1, height: 50, marginTop: 20 }}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#fff'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={20}
                                starStyle={{ color: '#fff', marginHorizontal: 2 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center', width: '80%' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center', marginHorizontal: 30 }}>
                                <CheckBox checked={true} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#fff' />
                                <Text style={{ fontFamily: 'cairo', color: '#fff' }}>مزايدات</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, alignSelf: 'center', marginHorizontal: 30 }}>
                                <CheckBox checked={false} style={{ marginHorizontal: 20, borderRadius: 2 }} color='#fff' />
                                <Text style={{ fontFamily: 'cairo', color: '#fff' }}>مبادلات</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Container>
        );
    }
}


const styles = {
    block: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        width: 70,
        height: 70,
        overflow: 'hidden'
    },
    image: {
        width: 100,
        height: 100,
        borderWidth: 4,
        transform: [{ rotate: '-15deg' }, { scale: 1.1 }]
    },
};


export default CategoryProducts;