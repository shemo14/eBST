import React, {Component} from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Dimensions,
	AsyncStorage,
	I18nManager,
	Platform,
	ActivityIndicator
} from "react-native";
import {Container, Content, List, ListItem, Header, Left, Right, Body, Textarea, Form, Button, Toast} from 'native-base'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import i18n from '../../locale/i18n'
import { DoubleBounce } from "react-native-loader"
import axios from 'axios'
import CONST from '../consts'
import {connect} from "react-redux";
import { NavigationEvents } from 'react-navigation';
import ImageZoom from 'react-native-image-pan-zoom';



const height = Dimensions.get('window').height;
const width  = Dimensions.get('window').width;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starCount: 0,
            redHeart: false,
            isModalVisible: false,
            id: this.props.navigation.getParam('id', 'NO-ID'),
            comment: '',
            product: [],
            images: [],
            comments: [],
            status: null,
            commentLoader: false,
            commentID: 0,
            productReport: '',
            commentReport: '',
            type: null,
            isSubmitted: false,
            views: 0,
            comeFrom: this.props.navigation.state.params.comeFrom,
            categoryType: this.props.navigation.state.params.type,
			imgUri: '',
            modal: false
        };
    }

    onStarRatingPress(rating) {
        if (this.props.user ) {
            this.setState({starCount: rating});
            axios({
                url: CONST.url + 'rate',
                method: 'POST',
                headers: {Authorization: this.props.user.token},
                data: {product_id: this.state.id, rate: rating, lang: this.props.lang}
            }).then(response => {
                this.setState({starCount: response.data.data.rate})
            })
        }else
            this.props.navigation.navigate('login')
    }

    redHeart() {
        this.setState({redHeart: !this.state.redHeart})

        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'set_fav',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {product_id: this.state.id, device_id: deviceID, lang: this.props.lang}
            })
        })
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

    _toggleModal = (type, commentID) => {
        if (this.props.user ){
            if (this.state.isModalVisible == type)
                this.setState({isModalVisible: null});
            else
                this.setState({isModalVisible: type, commentID});
        } else
            this.props.navigation.navigate('login')
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        AsyncStorage.getItem('deviceID').then(deviceID => {
            axios({
                url: CONST.url + 'show_product',
                method: 'POST',
                headers: this.props.user != null ? {Authorization: this.props.user.token} : null,
                data: {id: this.state.id, device_id: deviceID, lang: this.props.lang}
            }).then(response => {
                this.setState({
                    product: response.data.data.details,
                    views: response.data.data.details.views,
                    images: response.data.data.images,
                    comments: response.data.data.comments,
                    status: response.data.status,
                    redHeart: response.data.data.details.isLiked,
                    starCount: response.data.data.details.rate,
                    type: response.data.data.details.type
                })
            })


            axios({
                url: CONST.url + 'view_product',
                method: 'POST',
                data: {product_id: this.state.id, device_id: deviceID }
            }).then(response => {
                this.setState({
                    views: response.data.data.views,
                })
            })
        })
    }

    renderLoader(){
        if (this.state.status === null){
            return(
                <View style={{ alignItems: 'center', height: height + 50, position: 'absolute', backgroundColor: '#fff', zIndex: 999, width: '100%', paddingTop: (height*45)/100 }}>
                    <DoubleBounce size={20} color="#26b5c4" />
                </View>
            );
        }
    }

    setComment(){
        if (this.state.comment != '' && this.state.comment != ' '){
            this.setState({ commentLoader: true })
            axios({
                url: CONST.url + 'comment',
                method: 'POST',
                headers: {Authorization: this.props.user.token},
                data: {product_id: this.state.id, lang: this.props.lang, comment: this.state.comment}
            }).then(response => {
                this.setState({ comments: response.data.data, commentLoader: false, comment: '' })
            })
        }
    }

    setProductReport(){
        if (this.state.productReport != '' && this.state.productReport != ' '){
            console.log('test report', this.state.productReport);
            axios({
                url: CONST.url + 'product_report',
                method: 'POST',
                headers: {Authorization: this.props.user.token},
                data: {product_id: this.state.id, lang: this.props.lang, report: this.state.productReport}
            }).then(response => {
                this.setState({ productReport: '', isModalVisible: null })
                Toast.show({
                    text: response.data.msg,
                    type: "success",
                    duration: 3000
                });
            })
        }
    }

    setCommentReport(){
        if (this.state.commentReport != '' && this.state.commentReport != ' '){
            console.log('test report', this.state.commentReport, this.state.commentID);
            axios({
                url: CONST.url + 'comment_report',
                method: 'POST',
                headers: {Authorization: this.props.user.token},
                data: {comment_id: this.state.commentID, lang: this.props.lang, report: this.state.commentReport}
            }).then(response => {
                this.setState({ commentReport: '', isModalVisible: null })
                Toast.show({
                    text: response.data.msg,
                    type: "success",
                    duration: 3000
                });
            })
        }
    }

    renderCommentSubmit(){
        if (this.state.commentLoader){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            );
        }

        return (
            <TouchableOpacity onPress={() => this.setComment()}>
                <Image source={require('../../assets/images/check_mark.png')}
                       style={{width: 15, height: 15, transform: [{rotate: '-45deg'}]}}
                       resizeMode={'contain'}/>
            </TouchableOpacity>
        );
    }

    setOrder(){
        this.setState({ isSubmitted: true });
        if (this.state.type == 1){
            axios({
                method: 'POST',
                url: CONST.url + 'set_offer',
                headers: {Authorization: this.props.user.token, },
                data: {
                    product_id: this.state.id,
                    lang: this.props.lang,
                    type: this.state.type,
                }}).then(response => {
                    this.props.navigation.navigate('confirmOrder', { title: i18n.t('confirmOrder'), msg: i18n.t('orderSent') })
            })
        }else {
            this.props.navigation.navigate('setOffer', { id: this.state.id, type: this.state.type })
        }
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        return (
            <Button onPress={() => this.setOrder()} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                <View style={{backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14}} />
                <Text style={{color: '#fff', fontSize: 15, fontFamily: 'cairo',}}>{i18n.t('order')}</Text>
                <View style={{backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14}} />
            </Button>
        );

    }

    onFocus(payload){
        console.log('will focus',payload);
        const id = payload.action.params.id;
        if (payload.action.params.comeFrom)
            this.setState({ id, status: null, comeFrom: payload.action.params.comeFrom });
        else
            this.setState({ id, status: null });

        this.componentWillMount()
    }

    goBack() {
        const { navigation } = this.props;
        navigation.goBack();
        console.log('ops navigation', navigation.state.params);
        navigation.state.params.id;
    }

    render() {
        const name = this.state.product.name;
        return (
            <Container>
                <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                <Header style={{zIndex: 999, marginTop: 40, height: 10, backgroundColor: 'transparent', borderBottomWidth: 0}} noShadow>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, alignItems: 'center' }}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../../assets/images/menu.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                        </Button>
                        {/* <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo' }}>{ this.state.product.name }</Text> */}
                        <Button transparent onPress={() => this.props.navigation.navigate(this.state.comeFrom, { id: this.state.id })}>
                            <Image source={require('../../assets/images/back.png')} style={{ width: 25, height: 25 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                        </Button>
                    </View>
                </Header>
                { this.renderLoader() }
                <Content style={{zIndex: -99, marginTop: isIphoneX ? -85 : -60}}>

					<View>
						<Swiper key={this.state.images.length} dotStyle={{ backgroundColor: '#fff', borderRadius: 50, left: 80, bottom: 30 }} activeDotStyle={{ borderRadius: 50, borderWidth: 2, borderColor: '#4db7c8', backgroundColor: '#fff', width: 12, height: 12, left: 80, bottom: 30 }} containerStyle={{ width: '100%', height: 300, flex: 1 }} showsButtons={false} autoplay={true}>
							{
								this.state.images.map((img, i) => (
									<TouchableOpacity onPress={() => this.setState({ modal: !this.state.modal, imgUri: img })} style={styles.slide} key={i}>
										<View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 999 }} />
										<Image source={{ uri: img }} style={{width: '100%', height: 300, position: 'absolute', zIndex: 1}} resizeMode={'cover'}/>
									</TouchableOpacity>
								))
							}
						</Swiper>
						<View style={{ top: -110, width: '100%', height: 0 }}>
							<Image source={require('../../assets/images/slider.png')} style={{ width: '100%', height: 115 , transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}]}} resizeMode={'stretch'}/>
						</View>
					</View>



                    <View style={{padding: 20, marginTop: -80}}>
                        <TouchableOpacity style={{flexDirection: 'row', marginBottom: 15}}>
                            <Image source={require('../../assets/images/gray_store.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                            <Text style={{ marginHorizontal: 5, color: '#6d6c72', borderBottomWidth: 1, borderBottomColor: '#6d6c72', fontFamily: 'cairo', fontSize: 15, top: -1 }}>{ this.state.product.provider_name }</Text>
                        </TouchableOpacity>

                        <Text style={{color: '#6d6c72', fontFamily: 'cairo', fontSize: 16, marginBottom: 5, marginTop: 10, alignSelf: 'flex-start', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}}>{ name }</Text>
                        <Text style={{color: '#acabae', fontFamily: 'cairo', fontSize: 15, lineHeight: 20, alignSelf: 'flex-start', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}}>{ this.state.product.desc }</Text>
                        <Text style={{color: '#26b5c4', fontFamily: 'cairo', fontSize: 15, marginBottom: 5, alignSelf: 'flex-start'}}>{i18n.t('productPrice')} { this.state.product.price } {i18n.t('sr')}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.state.starCount}
                                fullStarColor={'#26b5c4'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={17}
                                starStyle={{color: '#26b5c4', marginHorizontal: 2}}
                            />
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{
                                        color: '#6d6c72',
                                        fontSize: 12,
                                        marginHorizontal: 2,
                                        fontFamily: 'cairo'
                                    }}>{ this.state.views }</Text>
                                    <Image source={require('../../assets/images/gray_seen.png')}
                                           style={{width: 20, height: 20}} resizeMode={'contain'}/>
                                </View>
                                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => this._toggleModal(1, 0)}>
                                    <Image source={require('../../assets/images/gray_report.png')}
                                           style={{width: 20, height: 20}} resizeMode={'contain'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.redHeart()}>
                                    <Image source={this.renderImage()} style={{width: 20, height: 20}} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 7, marginBottom: 10}}>
                            <Text style={{
                                color: '#6d6c72',
                                fontSize: 12,
                                fontFamily: 'cairo'
                            }}>{i18n.t('comments')}</Text>
                            <Image source={require('../../assets/images/gray_comments.png')}
                                   style={{width: 20, height: 20, marginHorizontal: 5}} resizeMode={'contain'}/>
                        </View>
                        <View style={{}}>
                            <List style={{width: '100%'}}>
                                {
                                    this.state.comments.map((comment, i) => (
                                        <ListItem key={i} style={{ borderRadius: 5, borderWidth: 1, borderColor: '#acabae', width: '100%', marginLeft: 0, paddingRight: 7, paddingLeft: 7, paddingVertical: 0, marginBottom: 10 }}>
                                            <Right style={{flex: 0, right: 5, alignSelf: 'flex-start', top: -15}}>
                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('product')}>
                                                    <View style={{ width: 55.6, height: 56.2, borderWidth: 3, borderColor: '#c5c5c5', borderRadius: 10, transform: [{rotate: '15deg'}], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.6}}></View>
                                                    <View style={[styles.block, {transform: [{rotate: '15deg'}]}]}>
                                                        <Image source={{uri: comment.user_avatar}} style={[styles.image, {borderRadius: 10}]} resizeMode={'contain'}/>
                                                    </View>
                                                </TouchableOpacity>
                                            </Right>
                                            <Body style={{marginHorizontal: 10, alignSelf: 'flex-start', top: -10}}>
                                                <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo', marginBottom: 5, alignSelf: 'flex-start' }}>{ comment.user_name }</Text>
                                                <Text style={{ color: '#acabae', fontFamily: 'cairo', fontSize: 11, lineHeight: 14, alignSelf: 'flex-start' }}>{ comment.comment }</Text>
                                            </Body>
                                            <Left style={{flex: 0, alignSelf: 'flex-end', bottom: -10}}>
                                                <TouchableOpacity onPress={() => this._toggleModal(2, comment.id)}>
                                                    <Text style={{ color: '#6d6c72', fontSize: 12, fontFamily: 'cairo' }}>{i18n.t('report')}</Text>
                                                </TouchableOpacity>
                                            </Left>
                                        </ListItem>
                                    ))
                                }
                            </List>
                            {
                                this.props.user ? (
                                    <Form>
                                        <Textarea onChangeText={(comment) => this.setState({ comment })} rowSpan={3} style={{ borderRadius: 5, padding: 7, color: '#acabae', fontSize: 11, fontFamily: 'cairo', textAlign: I18nManager.isRTL ? 'right' : 'left' }} bordered placeholder={i18n.t('addComment')} placeholderTextColor={{color: "#acabae"}} value={this.state.comment}/>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#26b5c4', width: 30, height: 30, transform: [{rotate: '45deg'}], position: 'absolute', bottom: -13, right: 7 }}>
                                            { this.renderCommentSubmit() }
                                        </View>
                                    </Form>
                                ) : (<View/>)
                            }

                        </View>
                        <View style={{marginTop: 30, alignItems: 'center', justifyContent: 'center'}}>
                            {
                                this.props.user ? (
                                    <Button onPress={() => this.setOrder()} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                        <View style={{backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14}} />
                                        <Text style={{color: '#fff', fontSize: 15, fontFamily: 'cairo',}}>{i18n.t('order')}</Text>
                                        <View style={{backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14}} />
                                    </Button>
                                ) : (<View/>)
                            }
                        </View>

                        {/* Product Report */}
                        <Modal avoidKeyboard={true} isVisible={this.state.isModalVisible === 1 ? true : false} onBackdropPress={() => this._toggleModal(this.state.isModalVisible, 0)}>
                            <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%' }}>
                                <Form>
                                    <Textarea onChangeText={(productReport) => this.setState({ productReport })} style={{ borderRadius: 5, padding: 7, color: '#acabae', fontSize: 13, fontFamily: 'cairo', textAlign: I18nManager.isRTL ? 'right' : 'left'}} rowSpan={7} bordered placeholder={i18n.t('reportReason') + '...'} placeholderTextColor={{color: "#acabae"}}/>
                                    <View style={{marginTop: 20, marginBottom: 10}}>
                                        <Button onPress={() => this.setProductReport()} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                            <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }}/>
                                            <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>{i18n.t('sendButton')}</Text>
                                            <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }}/>
                                        </Button>
                                    </View>
                                </Form>
                                <TouchableOpacity onPress={() => this._toggleModal(this.state.isModalVisible, 0)} style={{top: 5, right: 5, position: 'absolute'}}>
                                    <Image source={require('../../assets/images/refused.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        {/* Comment Report */}
                        <Modal avoidKeyboard={true} isVisible={this.state.isModalVisible === 2 ? true : false} onBackdropPress={() => this._toggleModal(this.state.isModalVisible, 0)}>
                            <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%' }}>
                                <Form>
                                    <Textarea onChangeText={(commentReport) => this.setState({ commentReport })} style={{ borderRadius: 5, padding: 7, color: '#acabae', fontSize: 13, fontFamily: 'cairo', textAlign: I18nManager.isRTL ? 'right' : 'left'}} rowSpan={7} bordered placeholder={i18n.t('reportReason') + '...'} placeholderTextColor={{color: "#acabae"}}/>
                                    <View style={{marginTop: 20, marginBottom: 10}}>
                                        <Button onPress={() => this.setCommentReport()} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                            <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }}/>
                                            <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>{i18n.t('sendButton')}</Text>
                                            <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }}/>
                                        </Button>
                                    </View>
                                </Form>
                                <TouchableOpacity onPress={() => this._toggleModal(this.state.isModalVisible, 0)} style={{top: 5, right: 5, position: 'absolute'}}>
                                    <Image source={require('../../assets/images/refused.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                        {/* Slider Image */}
						<Modal isVisible={this.state.modal} onBackdropPress={()=> this.setState({ modal : false, imgUri: null })}>
							<View style={{ flex: 1 , padding:10 , position:'absolute' , width:'100%' ,overflow:'hidden'}}>
								<View style={{width:'100%' ,  overflow:'hidden'}}>
									<View style={styles.slide}>
										{
											this.state.imgUri ?
												(
													<ImageZoom cropWidth={Dimensions.get('window').width}
														cropHeight={Dimensions.get('window').height}
														imageWidth={Dimensions.get('window').width}
														enableSwipeDown={true}
														onSwipeDown={()=> this.setState({ modal : false, imgUri: null })}
														imageHeight={300}>
														<Image source={{ uri: this.state.imgUri }} style={{ width: '100%', height: 300 }} resizeMode={'contain'} />
													</ImageZoom>

												) :
												(<View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
													<ActivityIndicator size="large" color="#4fb7c3" />
												</View>)
										}
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
        alignItems: 'center',
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
        transform: [{rotate: '-15deg'}, {scale: 1.1}]
    },
});

const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(ProductDetails);
