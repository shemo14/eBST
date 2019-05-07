import React, { Component } from "react";
import { View, Text, Image, ImageBackground, TouchableOpacity, FlatList, Dimensions, Slider  } from "react-native";
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
class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        drawerLabel: i18n.t('fav') ,
        drawerIcon: ( <Image source={require('../../assets/images/white_heart.png')} style={{ height: 40, width: 40 }} resizeMode={'contain'} /> )
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
                            <Text style={{ color: '#fff', textAlign: 'center', marginLeft: 20, fontSize: 18, fontFamily: 'cairo' }}>{i18n.t('fav')}</Text>
                        </Body>
                        <Left style={{ flex: 0, alignSelf: 'flex-start', top: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
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


export default Fav;