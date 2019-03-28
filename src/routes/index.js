import React from "react";
import { Dimensions, I18nManager } from "react-native";
import {
    createAppContainer,
    createDrawerNavigator,
    createStackNavigator
} from "react-navigation";

// Screens
import Home from '../components/Home';
import Ads from '../components/Ads';
import Offers from "../components/Offers";
import Fav from "../components/Fav";
import AddAds from "../components/AddAds";
import Language from "../components/Language";
import Login from "../components/Login";
import ForgetPassword from "../components/ForgetPassword";
import Verify from "../components/verify";
import Register from "../components/Register";


const DrawerNavigator = createDrawerNavigator({
    home: Home,

}, {
    drawerPosition: 'right' ,
});

const AppNavigator = createStackNavigator({
    addAds:{
        screen: AddAds,
        navigationOptions: {
            header: null
        }
    },
    register:{
        screen: Register,
        navigationOptions: {
            header: null
        }
    },language:{
        screen: Language,
        navigationOptions: {
            header: null
        }
    },
    login:{
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    forgetPassword:{
        screen: ForgetPassword,
        navigationOptions: {
            header: null
        }
    },
    verify:{
        screen: Verify,
        navigationOptions: {
            header: null
        }
    },
    DrawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    ads:{
        screen: Ads,
        navigationOptions: {
            header: null
        }
    },

    offers:{
        screen: Offers,
        navigationOptions: {
            header: null
        }
    },
    fav:{
        screen: Fav,
        navigationOptions: {
            header: null
        }
    },

});

export default createAppContainer(AppNavigator);

