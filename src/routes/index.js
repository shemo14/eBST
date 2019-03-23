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

