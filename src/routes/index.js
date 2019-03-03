import React from "react";
import { createStackNavigator, createAppContainer, createDrawerNavigator } from "react-navigation";
import Home from '../components/Home'
import Ads from '../components/Ads'


const DrawerNavigator = createDrawerNavigator({
   home: Home,
   ads: Ads,
},{
    drawerPosition: 'right',
});

const AppNavigator = createStackNavigator({
    drawerNavigator: {
        screen: DrawerNavigator,
        navigationOptions: {
            header: null
        }
    },
    ads: Ads
});

export default createAppContainer(AppNavigator);