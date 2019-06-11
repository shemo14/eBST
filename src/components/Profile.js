import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, I18nManager, Platform } from "react-native";
import {Container, Content, Header, Left, Right, Body, Button, Item, Input, Form, Label, Toast} from 'native-base'
import Modal from "react-native-modal";
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {DoubleBounce} from "react-native-loader";
import axios from "axios";
import CONST from "../consts";

const width = Dimensions.get('window').width;
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            oldPasswordStatus: 0,
            newPasswordStatus: 0,
            verifyPasswordStatus: 0,
            oldPass: '',
            newPass: '',
            verifyNewPass: '',
            isSubmitted: false
        };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <DoubleBounce size={20} color="#26b5c4" />
            )
        }

        if (this.state.oldPass == '' || this.state.newPass == '' || this.state.verifyNewPass == ''){
            return (
                <Button disabled style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#999', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('update') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }else {
            return (
                <Button onPress={() => this.onChangePassword()} style={{ borderRadius: 25, width: 130, height: 50,  alignItems: 'center', justifyContent: 'center', alignSelf: 'center' , backgroundColor:'#26b5c4', marginBottom: 20 }}>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:-14 , left:-14}} />
                    <Text style={{color:'#fff' , fontSize:15, fontFamily: 'cairo',}}>{ i18n.t('update') }</Text>
                    <View style={{backgroundColor:'#fff' , height:1 , width:30 , top:14 , right:-14}} />
                </Button>
            );
        }
    }

    activeInput(type){
        if (type === 'oldPassword'){
            this.setState({ oldPasswordStatus: 1 })
        }else if (type === 'newPassword') {
            this.setState({newPasswordStatus: 1})
        } else
            this.setState({verifyPasswordStatus: 1})
    }

    unActiveInput(type){
        if (type === 'oldPassword'){
            this.setState({ oldPasswordStatus: 0 })
        }else if (type === 'newPassword') {
            this.setState({ newPasswordStatus: 0 })
        } else
            this.setState({verifyPasswordStatus: 0})
    }

    renderInputImage(type){
        let source ='';
        if (type === 'oldPassword'){
            if (this.state.oldPasswordStatus){
                source = require('../../assets/images/lactic_lock.png')
            } else{
                source = require('../../assets/images/gray_lock.png')
            }
        }else if (type === 'newPassword'){
            if (this.state.newPasswordStatus ){
                source = require('../../assets/images/lactic_lock.png')
            } else{
                source = require('../../assets/images/gray_lock.png')
            }
        }
        else {
            if (this.state.verifyPasswordStatus ){
                source = require('../../assets/images/lactic_lock.png')
            } else{
                source = require('../../assets/images/gray_lock.png')
            }
        }

        return source;
    }

    onChangePassword(){
        if (this.state.newPass === this.state.verifyNewPass){
            this.setState({ isSubmitted: true });
            axios({
                method: 'POST',
                url: CONST.url + 'update_password',
                headers: {Authorization: this.props.user.token},
                data: {
                    old_password: this.state.oldPass,
                    new_password: this.state.newPass,
                    lang: this.props.lang,
                }
            }).then(response => {
                this.setState({ isSubmitted: false, isModalVisible: !this.state.isModalVisible, oldPass: '', newPass: '', verifyNewPass: '' });
                Toast.show({
                    text: response.data.msg,
                    type:  response.data.status == 200 ? "success" : "danger",
                    duration: 3000
                });
            })
        } else{
            Toast.show({
                text: i18n.t('verifyPassword'),
                type: "danger",
                duration: 3000
            });
        }
    }

    render() {
        return (
            <Container>
                <Header style={{ zIndex: 3, marginTop: 40, height: 10, backgroundColor: 'transparent', paddingHorizontal: 10, borderBottomWidth: 0 }} noShadow>
                    <Right style={{flex: 0, alignSelf: 'flex-start', marginHorizontal: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')}>
                            <Image source={require('../../assets/images/white_edit.png')} style={{width: 25, height: 25, top: 3}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Right>
                    <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo'}}>{ i18n.t('profile') }</Text>
                    </Body>
                    <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                        <TouchableOpacity style={{ width: 30, height: 30 }} onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25, transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Left>
                </Header>
                <Content style={{ zIndex: -1, marginTop: -60 }} onScroll={e => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}>
                    <View style={{ height: 300 }}>
                        <View style={styles.slide}>
                            <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 2 }} />
                            <Image blurRadius={2} source={{ uri: this.props.user.avatar }} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                        </View>
                        <View style={{ top: -210, width: '100%', height: 0, zIndex: 4 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%', transform: I18nManager.isRTL ? [{rotateY : '0deg'}] : [{rotateY : '-180deg'}] }} resizeMode={'contain'} />
                        </View>
                    </View>
                    <View style={{ zIndex: 5, width: 120, height: 120, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 172, left: 15 }}>
                        <View>
                            <View style={{ width: 90, height: 90, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '45deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                            <View style={[styles.block, { transform: [{ rotate: '45deg' }] }]}>
                                <Image source={{ uri: this.props.user.avatar }} style={styles.image} resizeMode={'stretch'} />
                            </View>
                        </View>
                        <Text style={{ color: '#6d6c72', fontFamily: 'cairo', textAlign: 'center', fontSize: 18, marginTop: 15}}>{ this.props.user.name }</Text>
                    </View>
                    <View style={{ padding: 20, width: '100%', marginTop: 30 }}>
                        <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#c5c5c5', height: 50, justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', backgroundColor: '#fff', position: 'absolute', top: -13, left: 10, paddingHorizontal: 5}}>{ i18n.t('phoneNumber') }</Text>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 16, textAlign: 'left', marginHorizontal: 15, width: '90%' }}>{ this.props.user.phone }</Text>
                        </View>

                        <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#c5c5c5', height: 50, justifyContent: 'center' }}>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', backgroundColor: '#fff', position: 'absolute', top: -13, left: 10, paddingHorizontal: 5}}>{ i18n.t('email') }</Text>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 16, textAlign: 'left', marginHorizontal: 15, width: '90%' }}>{ this.props.user.email }</Text>
                        </View>

                        <TouchableOpacity onPress={this._toggleModal} >
                            <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 17, fontFamily: 'cairo', color: '#26b5c4' }}>{ i18n.t('changePassword') }</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal}>
                        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%', borderRadius: 5, height: 350, justifyContent: 'center' }}>
                            <Form>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('oldPass') }</Label>
                                        <Input onChangeText={(oldPass) => this.setState({ oldPass })} value={this.state.oldPass} secureTextEntry onBlur={() => this.unActiveInput('oldPassword')} onFocus={() => this.activeInput('oldPassword')} style={{ width: 200, color: '#26b5c4', textAlign: I18nManager.isRTL ? 'right' : 'left', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('oldPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>


                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('newPass') }</Label>
                                        <Input onChangeText={(newPass) => this.setState({ newPass })} value={this.state.newPass} secureTextEntry onBlur={() => this.unActiveInput('newPassword')} onFocus={() => this.activeInput('newPassword')} style={{ width: 200, textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('newPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.verifyPasswordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('verifyNewPass') }</Label>
                                        <Input onChangeText={(verifyNewPass) => this.setState({ verifyNewPass })} value={this.state.verifyNewPass} secureTextEntry onBlur={() => this.unActiveInput('verifyPassword')} onFocus={() => this.activeInput('verifyPassword')} style={{ width: 200, textAlign: I18nManager.isRTL ? 'right' : 'left', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('verifyPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    { this.renderSubmit() }
                                </View>
                            </Form>
                            <TouchableOpacity onPress={this._toggleModal} style={{ top: 5, right: 5, position: 'absolute' }}>
                                <Image source={require('../../assets/images/refused.png')} style={{ width: 25, height: 25 }} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>
                    </Modal>
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
        width: 85,
        height: 85,
        overflow: 'hidden'
    },
    image: {
        width: Platform.OS === 'ios' ? '120%' :  '105%',
        height: Platform.OS === 'ios' ? '120%' :  '105%',
        borderWidth: 4,
        transform: [{ rotate: '-45deg' }, { scale: 1.3 }]
    },
});

const mapStateToProps = ({ profile, lang }) => {
    return {
        user: profile.user,
        lang: lang.lang
    };
};

export default connect(mapStateToProps)(Profile);