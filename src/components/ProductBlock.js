import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, AsyncStorage, I18nManager } from "react-native";
import StarRating from 'react-native-star-rating';
import i18n from '../../locale/i18n'
import axios from 'axios'
import CONST from '../consts'
import {connect} from 'react-redux';

class ProductBlock extends Component {
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

        if (this.props.fromFav){
            this.props.refreshView()
        }
    }

    componentWillReceiveProps(props) {
        this.setState({ redHeart: props.data.isLiked })
    }

    renderPrice(type, typeText){
        if(type == 1)
            return this.props.data.price + ' ' + i18n.t('sr')

        if(typeText)
            return I18nManager.isRTL ? typeText.substring(0, 6) : typeText.substring(0, 8);
    }


    render() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center', flex: 1, borderColor: '#c5c5c5', borderWidth: 1, borderRadius: 3, margin: 5, overflow: 'hidden' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: this.props.data.id, comeFrom: this.props.navigation.state.routeName, type: this.props.type })} style={{ width: '100%' }}>
                    <Image source={{uri:this.props.data.image}} resizeMode={'cover'} style={{ width: '100%', height: 100, flex: 1 }} />
                </TouchableOpacity>
                <View style={{ width: '100%', padding: 5 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('product', { id: this.props.data.id, comeFrom: this.props.navigation.state.routeName, type: this.props.type  })}>
                        <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 17, alignSelf: 'flex-start' }}>{ this.props.data.name ? this.props.data.name.substring(0, 15) + '...' : ''}</Text>
                    </TouchableOpacity>
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
                    <View style={{ flexDirection: 'row', flex: 1, width: '100%', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#e2b705', fontFamily: 'cairo', alignSelf: 'flex-start' }}>{ this.renderPrice(this.props.data.type, this.props.data.type_text) }</Text>
                        <TouchableOpacity onPress={() => this.setFav()} style={{ flex: 1, alignSelf: 'flex-start' }}>
                            <Image source={this.renderImage()} style={{ width: 20, height: 20, alignSelf: 'flex-end', flex: 0.5 }} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = ({ lang , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(ProductBlock);
