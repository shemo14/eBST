import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Container, Content, Header, Left, Body, Button, Item, Input, Form, Label } from 'native-base'
import Modal from "react-native-modal";
import i18n from '../../locale/i18n'

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameStatus:0,
            phoneStatus: 0,
            mailStatus: 0,
        };
    }

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    activeInput(type){
        if (type === 'name') this.setState({ nameStatus: 1 });
        else if (type === 'phone') this.setState({phoneStatus: 1});
        else if (type === 'mail') this.setState({mailStatus: 1});
    }

    unActiveInput(type){
        if (type === 'name') this.setState({ nameStatus: 0});
        else if (type === 'phone') this.setState({phoneStatus: 0});
        else if (type === 'mail')  this.setState({mailStatus: 0});
    }

    renderInputImage(type){
        let source ='';
        if (type === 'phone'){
            source = this.state.phoneStatus ? require('../../assets/images/lactic_phone.png') : require('../../assets/images/bold_gray_phone.png') ;
        }else if (type === 'mail'){
            source = this.state.mailStatus ? require('../../assets/images/lactic_email.png') : require('../../assets/images/gray_email.png');
        }else if (type === 'name'){
            source = this.state.nameStatus ? require('../../assets/images/lactic_user_name.png') : require('../../assets/images/gray_user_name.png')
        }

        return source;
    }


    render() {
        return (
            <Container>
                <Header style={{ zIndex: 3, marginTop: 40, height: 10, backgroundColor: 'transparent', paddingHorizontal: 10 }} noShadow>
                    <Body style={{width: '100%', alignItems: 'center', alignSelf: 'flex-start'}}>
                    <Text style={{textAlign: 'center', color: '#fff', fontSize: 20, fontFamily: 'cairo'}}>{ i18n.t('editAcc') }</Text>
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
                        <Form style={{width: '100%'}}>
                            <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.nameStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row' }}>
                                <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                    <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('username') }</Label>
                                    <Input auto-capitalization={false} onBlur={() => this.unActiveInput('name')} onFocus={() => this.activeInput('name')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}/>
                                </Item>
                                <Image source={this.renderInputImage('name')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                            </View>

                            <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.phoneStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                <Item floatingLabel style={{ borderBottomWidth: 0, top: -18, marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                    <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13 }}>{ i18n.t('phoneNumber') }</Label>
                                    <Input keyboardType={'number-pad'} onBlur={() => this.unActiveInput('phone')} onFocus={() => this.activeInput('phone')} style={{ width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}/>
                                </Item>

                                <Image source={this.renderInputImage('phone')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                            </View>

                            <View style={{ borderRadius: 35, borderWidth: 1, borderColor: this.state.mailStatus === 1 ? '#26b5c4' : '#acabae', height: 50, padding: 5, flexDirection: 'row', marginTop: 20 }}>
                                <Item floatingLabel style={{  borderBottomWidth: 0, top: -18,  marginTop: 0, position: 'absolute', width: '88%', paddingHorizontal: 10 }} bordered>
                                    <Label style={{ top: 9, backgroundColor: '#fff', alignSelf: 'flex-start', fontFamily: 'cairo', color: '#acabae', fontSize: 13  }}>{ i18n.t('email') }</Label>
                                    <Input keyboardType={'email-address'} onBlur={() => this.unActiveInput('mail')} onFocus={() => this.activeInput('mail')} style={{  width: 200, color: '#26b5c4', textAlign: 'right', fontSize: 15, top: 17 }}/>
                                </Item>

                                <Image source={this.renderInputImage('mail')} style={{ width: 25, height: 25, right: 15, top: 9, position: 'absolute', flex: 1 }} resizeMode={'contain'}/>
                            </View>
                        </Form>

                        <View style={{marginTop: 30}}>
                            <Button onPress={() => this.props.navigation.navigate('confirm')} style={{ borderRadius: 25, width: 130, height: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: '#26b5c4' }}>
                                <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: -14, left: -14 }} />
                                <Text style={{color: '#fff', fontSize: 15, fontFamily: 'cairo',}}>{ i18n.t('save') }</Text>
                                <View style={{ backgroundColor: '#fff', height: 1, width: 30, top: 14, right: -14 }} />
                            </Button>
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

export default EditProfile;