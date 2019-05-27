import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import StarRating from 'react-native-star-rating';
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import axios from "axios";
import CONST from "../consts";

class ProductRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redHeart: this.props.data.isLiked
        }
    }

    renderImage() {
        let source = '';
        if (this.state.redHeart || this.props.fromFav) {
            source = require('../../assets/images/red_heart.png')
        } else {
            source = require('../../assets/images/gray_fav.png')
        }
        return source;
    }

    setFav(){
        this.setState({redHeart: !this.state.redHeart})

        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'set_fav',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {product_id: this.props.data.id, device_id: deviceID, lang: this.props.lang}
            }).then(response => {
                if (this.props.fromFav){
                    this.props.refreshView()
                }
            })
        })
    }

    componentWillReceiveProps(props) {
        this.setState({ redHeart: props.data.isLiked })
    }


    render() {
        return (
            <View style={{ flexDirection: 'row', height: 75, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, width: '96%', marginBottom: 20 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: this.props.data.id })}>
                    <View style={{ width: 75.7, height: 75.7, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '15deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                    <View style={[styles.block, { transform: [{ rotate: '15deg' }] }]}>
                        <Image source={{uri:this.props.data.image}}  style={[styles.image, { borderRadius: 10 }]} resizeMode={'stretch'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginHorizontal: 20, flex: 3 }} onPress={() => this.props.navigation.navigate('product', { id: this.props.data.id })}>
                    <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 16, alignSelf: 'flex-start' }}>{this.props.data.name}</Text>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.props.data.rate}
                            fullStarColor={'#26b5c4'}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            starSize={15}
                            starStyle={{ color: '#26b5c4', marginHorizontal: 1 }}
                        />
                    </View>
                    <Text style={{ color: '#e2b705', fontFamily: 'cairo' }}>{this.props.data.price} {i18n.t('sr')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setFav()} style={{ textAlign: 'right', flex: 0.5, marginHorizontal: 10 }}>
                    <Image source={this.renderImage()} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
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


const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(ProductRow);