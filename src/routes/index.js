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
import Categories from "../components/Categories";
import CustomDrawer from "../components/CustomDrawer";
import Notifications from "../components/Notifications";
import AboutApp from "../components/AboutApp";
import CategoryProducts from "../components/CategoryProducts";
import Rotate from "../components/Rotate";
import ProductDetails from "../components/ProductDetails";
import MyProducts from "../components/MyProducts";
import Profile from "../components/Profile";
import EditProfile from "../components/EditProfile";


const width = Dimensions.get('window').width;
const CustomDrawerContentComponent = (props) => (<CustomDrawer { ...props }/>);
const DrawerNavigator = createDrawerNavigator({
    home: Home,
    categories: Categories,
    offers: Offers,
    notifications: Notifications,
    myProducts: MyProducts,
    aboutApp: AboutApp,

}, {
    nitialRouteName: 'home',
    drawerPosition: 'right',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    gesturesEnabled: false,
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width*85)/100
});

const AppNavigator = createStackNavigator({
    profile:{
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    editProfile:{
        screen: EditProfile,
        navigationOptions: {
            header: null
        }
    },
    language:{
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
    register:{
        screen: Register,
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
    categories:{
        screen: Categories,
        navigationOptions: {
            header: null
        }
    },
    notifications:{
        screen: Notifications,
        navigationOptions: {
            header: null
        }
    },
    aboutApp:{
        screen: AboutApp,
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
    addAds:{
        screen: AddAds,
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
    categoryProducts:{
        screen: CategoryProducts,
        navigationOptions: {
            header: null
        }
    },
    myProducts :{
        screen: MyProducts,
        navigationOptions: {
            header: null
        }
    },
    product:{
        screen: ProductDetails,
        navigationOptions: {
            header: null
        }
    },
});

export default createAppContainer(AppNavigator);

