import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { Container, Content, Header, Left, Right, Body, Button, Item, Input, Form, Label } from 'native-base'
import Modal from "react-native-modal";

const width = Dimensions.get('window').width;
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            oldPasswordStatus: 0,
            newPasswordStatus: 0,
            verifyPasswordStatus: 0
        };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

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
                source = require('../../assets/images/lactic_phone.png')
            } else{
                source = require('../../assets/images/bold_gray_phone.png')
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

    render() {
        return (
            <Container>
                <Header style={{ zIndex: 3, marginTop: 40, height: 10, backgroundColor: 'transparent', paddingHorizontal: 10 }} noShadow>
                    <Right style={{flex: 0, alignSelf: 'flex-start', marginHorizontal: 10}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')}>
                            <Image source={require('../../assets/images/white_edit.png')} style={{width: 25, height: 25, top: 3}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Right>
                    <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo'}}>حسابي</Text>
                    </Body>
                    <Left style={{flex: 0, alignSelf: 'flex-start', flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back.png')} style={{width: 25, height: 25}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </Left>
                </Header>
                <Content style={{ zIndex: -1, marginTop: -50 }} onScroll={e => this.setState({ scrollY: e.nativeEvent.contentOffset.y })}>
                    <View style={{ height: 300 }}>
                        <View style={styles.slide}>
                            <View style={{ backgroundColor: '#000', opacity: 0.2, width: '100%', height: 300, position: 'absolute', zIndex: 2 }} />
                            <Image blurRadius={2} source={require('../../assets/images/profile.jpg')} style={{ width: '100%', height: 300, position: 'absolute', zIndex: 1 }} resizeMode={'cover'} />
                        </View>
                        <View style={{ top: -210, width: '100%', height: 0, zIndex: 4 }}>
                            <Image source={require('../../assets/images/slider.png')} style={{ width: '100%' }} resizeMode={'contain'} />
                        </View>
                    </View>
                    <View style={{ zIndex: 5, width: 120, height: 120, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 172, left: 15 }}>
                        <View>
                            <View style={{ width: 90, height: 90, borderWidth: 3, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '45deg' }], position: 'absolute', zIndex: 99999, top: -2.9, right: -2.9 }} />
                            <View style={[styles.block, { transform: [{ rotate: '45deg' }] }]}>
                                <Image source={require('../../assets/images/profile.jpg')} style={styles.image} resizeMode={'stretch'} />
                            </View>
                        </View>
                        <Text style={{ color: '#6d6c72', fontFamily: 'cairo', textAlign: 'center', fontSize: 18, marginTop: 15}}>محمد شمس</Text>
                    </View>
                    <View style={{ padding: 20, width: '100%', marginTop: 30 }}>
                        <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#c5c5c5', height: 50, justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', backgroundColor: '#fff', position: 'absolute', top: -13, left: 10, paddingHorizontal: 5}}>رقم الهاتف</Text>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 16, textAlign: 'left', marginHorizontal: 15, width: '90%' }}>01094985095</Text>
                        </View>

                        <View style={{ borderRadius: 30, borderWidth: 1, borderColor: '#c5c5c5', height: 50, justifyContent: 'center' }}>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', backgroundColor: '#fff', position: 'absolute', top: -13, left: 10, paddingHorizontal: 5}}>البريد الالكتروني</Text>
                            <Text style={{ color: '#6d6c72', fontFamily: 'cairo', fontSize: 16, textAlign: 'left', marginHorizontal: 15, width: '90%' }}>mo7amed.shams3477@gmail.com</Text>
                        </View>

                        <TouchableOpacity onPress={this._toggleModal} >
                            <Text style={{ textAlign: 'center', marginTop: 30, fontSize: 17, fontFamily: 'cairo', color: '#26b5c4' }}>تغير كلمة المرور</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal isVisible={this.state.isModalVisible} onBackdropPress={this._toggleModal}>
                        <View style={{ flex: 1, backgroundColor: '#fff', padding: 10, position: 'absolute', width: '100%', borderRadius: 5, height: 350, justifyContent: 'center' }}>
                            <Form>
                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row'  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>كلمة المرور القديمة</Label>
                                        <Input secureTextEntry onBlur={() => this.unActiveInput('oldPassword')} onFocus={() => this.activeInput('oldPassword')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('oldPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>


                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.passwordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>كلمة المرور الجديدة</Label>
                                        <Input secureTextEntry onBlur={() => this.unActiveInput('newPassword')} onFocus={() => this.activeInput('newPassword')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('newPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.verifyPasswordStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20  }}>
                                    <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0 ,position:'absolute', width:'88%', paddingHorizontal: 10 }} bordered>
                                        <Label style={{ top:15, backgroundColor: '#fff', alignSelf: 'flex-start', paddingTop: 0, fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>تأكيد كلمة المرور الجديدة</Label>
                                        <Input secureTextEntry onBlur={() => this.unActiveInput('verifyPassword')} onFocus={() => this.activeInput('verifyPassword')} style={{ width: 200, textAlign: 'right', color: '#26b5c4', fontSize: 15, top: 17 }}  />
                                    </Item>

                                    <Image source={this.renderInputImage('verifyPassword')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                                </View>

                                <View style={{ marginTop: 20, marginBottom: 10 }}>
                                    <Button onPress={this._toggleModal} style={{ borderRadius: 25, width: 130, height: 45, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                        <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }} />
                                        <Text style={{ color: '#fff', fontSize: 15, fontFamily: 'cairo', }}>ارسال</Text>
                                        <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }} />
                                    </Button>
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
        width: '105%',
        height: '105%',
        borderWidth: 4,
        transform: [{ rotate: '-45deg' }, { scale: 1.3 }]
    },
});

export default Profile;