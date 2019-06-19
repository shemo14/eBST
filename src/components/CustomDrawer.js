import React, { Component } from 'react';
import {Image, View, Text, TouchableOpacity, ImageBackground, AsyncStorage ,I18nManager } from 'react-native';
import {Container, Content} from 'native-base';
import { DrawerItems } from 'react-navigation';
import {connect} from "react-redux";
import i18n from '../../locale/i18n'
import { logout, tempAuth } from '../actions'

class CustomDrawer extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
            lang: 'en',
            site_social: []
        }
    }

    logout(){
        this.props.logout({ token: this.props.user.token })
        this.props.tempAuth();
        AsyncStorage.clear();

        this.props.navigation.navigate('language');
    }

    filterItems(item){
        return item.routeName !== 'acceptedOrders' && item.routeName !== 'myProducts' && item.routeName !== 'settings';
    }

    render(){
        let { user } = this.props;
        if (user === null)
            user = {
                avatar: 'http://shams.arabsdesign.com/eBST-backend/images/users/default.png',
                name: i18n.t('guest')
            }

        return(
            <Container style={{ overflow: 'visible' }}>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <ImageBackground source={I18nManager.isRTL ? require('../../assets/images/bg_side_bar.png') : require('../../assets/images/bg_side_bar2.png')} resizeMode={'stretch'} style={{ width: null, height: null, flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.user ? 'profile' : 'login')} style={{ height:150, alignItems: 'center', justifyContent: 'center', marginTop: 40, marginLeft: 10 }}>
                            <Image source={require('../../assets/images/img_two.png')} style={{ width: 140, height: 140, position: 'absolute', zIndex: 999 }} resizeMode={'contain'} />
                            <Image source={{ uri: user.avatar }} style={{ width: 140, height: 140 }} resizeMode={'cover'} />
                        </TouchableOpacity>
                        <Text style={{ color: '#acabae', fontFamily: 'cairo', textAlign: 'center', fontSize: 18, top: -5, marginLeft: 10 }}>{ user.name }</Text>
                        <View style={{ marginTop: 50 }}>
                            <DrawerItems
                                {...this.props} labelStyle={{color: '#fff', marginTop: 10, fontSize: 16, marginHorizontal: 5, fontFamily: 'cairo', fontWeight: 'normal'}} onItemPress={
                                    (route, focused) => {
                                        if (route.route.key === 'logout') {
                                            this.logout()
                                        }else {
                                            this.props.navigation.navigate(route.route.key);
                                        }
                                    }
                                }
                                items={this.props.user !== null ? this.props.items : this.props.items.filter((item) =>  this.filterItems(item) ) }
                            />
                        </View>
                        <View style={{ flex: 1, marginBottom: 15 }}>
                            {
                                this.props.user ? (
                                    <TouchableOpacity onPress={() => this.logout()}>
                                        <Image source={require('../../assets/images/white_logout.png')} style={{ height: 40, width: 40, alignSelf: 'flex-end', marginHorizontal: 20 }} resizeMode={'contain'}  />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
                                        <Image source={require('../../assets/images/login.png')} style={{ height: 40, width: 40, alignSelf: 'flex-end', marginHorizontal: 20 }} resizeMode={'contain'}  />
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </ImageBackground>
                </Content>
            </Container>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 125,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccdeca',
        marginTop: 60,
    },
    drawerImage: {
        height: 200,
        width: 550,
        position: 'relative',
        left: -10,
    },
    profileImage: {
        height: 80,
        width: 80,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#639d57'
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    usernameText:{
        color: '#9f9f9f',
        fontWeight: 'bold',
        fontSize: 20,
        height: 25,
        textAlign: 'center'
    },
    authContainer:{
        flexDirection:'row',
        marginTop: 10,
        alignItems: 'center'
    },
    logout:{
        color: '#fff',
    },
    logoutImage: {
        width: 20,
        height: 20,
        marginRight: 5
    },
    logoutContainer:{
        flex: 1,
        flexDirection:'row',
        flexWrap: 'wrap',
        alignSelf: 'flex-end'
    },
};

const mapStateToProps = ({ auth, profile }) => {
    return {
        auth: auth.user,
        user: profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth })(CustomDrawer);
