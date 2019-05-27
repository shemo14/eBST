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
import Policy from "../components/Policy";
import ContactUs from "../components/ContactUs";
import Settings from "../components/Settings";
import AddProduct from "../components/AddProduct";
import AcceptedOrders from "../components/AcceptedOrders";
import BiddingOrderDetails from "../components/BiddingOrderDetails";
import BuyOrderDetails from "../components/BuyOrderDetails";
import ExchangeAndPriceOrderDetails from "../components/ExchangeAndPriceOrderDetails";
import ExchangeOrderDetails from "../components/ExchangeOrderDetails";
import IncomingOffers from "../components/IncomingOffers";
import InitScreen from "../components/InitScreen";
import Finished from "../components/Finished";
import EditProduct from "../components/EditProduct";
import SetOffer from "../components/SetOffer";
import ConfirmOrder from "../components/ConfirmOrder";
import AcceptOrder from "../components/AcceptOrder";
import ConfirmCode from "../components/ConfirmCode";
import BestProducts from "../components/BestProducts";

const width = Dimensions.get('window').width;
const CustomDrawerContentComponent = (props) => (<CustomDrawer { ...props }/>);
const DrawerNavigator = createDrawerNavigator({
    home: Home,
    ads: Ads,
    categories: Categories,
    offers: Offers,
    notifications: Notifications,
    myProducts: MyProducts,
    acceptedOrders: AcceptedOrders,
    categoryProducts: CategoryProducts,
    fav: Fav,
    aboutApp: AboutApp,
    policy: Policy,
    contactUs: ContactUs,
    confirmOrder: ConfirmOrder,
    settings: Settings,
    setOffer: SetOffer,
    incomingOffers: IncomingOffers,
    product: ProductDetails,
    addProduct: AddProduct,
    acceptOrder:AcceptOrder,
    bestProducts:BestProducts
}, {
    nitialRouteName: 'home',
    drawerPosition: I18nManager.isRTL ?'right' : 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    gesturesEnabled: false,
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width*85)/100
});

const AppNavigator = createStackNavigator({
    initScreen:{
        screen: InitScreen,
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
    confirmCode:{
        screen: ConfirmCode,
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
    setOffer:{
        screen: SetOffer,
        navigationOptions: {
            header: null
        }
    },
    addProduct: {
        screen: AddProduct,
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
    confirmOrder:{
        screen: ConfirmOrder,
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
    bestProducts:{
        screen: BestProducts,
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
    incomingOffers:{
        screen: IncomingOffers,
        navigationOptions: {
            header: null
        }
    },
    acceptOrder:{
        screen: AcceptOrder,
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
    editProduct:{
        screen: EditProduct,
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
    policy:{
        screen: Policy,
        navigationOptions: {
            header: null
        }
    },
    contactUs:{
        screen: ContactUs,
        navigationOptions: {
            header: null
        }
    },
    settings:{
        screen: Settings,
        navigationOptions: {
            header: null
        }
    },
    acceptedOrders: {
        screen: AcceptedOrders,
        navigationOptions: {
            header: null
        }
    },
    fav: {
        screen: Fav,
        navigationOptions: {
            header: null
        }
    },
    buyOrderDetails: {
        screen: BuyOrderDetails,
        navigationOptions: {
            header: null
        }
    },
    biddingOrderDetails: {
        screen: BiddingOrderDetails,
        navigationOptions: {
            header: null
        }
    },
    exchangeAndPriceOrderDetails: {
        screen: ExchangeAndPriceOrderDetails,
        navigationOptions: {
            header: null
        }
    },
    exchangeOrderDetails: {
        screen: ExchangeOrderDetails,
        navigationOptions: {
            header: null
        }
    },
    finished: {
        screen: Finished,
        navigationOptions: {
            header: null
        }
    },
});

export default createAppContainer(AppNavigator);
