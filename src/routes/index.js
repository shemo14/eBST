import React from "react";
import { Dimensions, I18nManager } from "react-native";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

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
import Stores from "../components/Stores";
import StoreProducts from "../components/StoreProducts";
import Intro from "../components/Intro";
import CommanQus from "../components/CommanQus";

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
	commanQus: CommanQus,
	contactUs: ContactUs,
	confirmOrder: ConfirmOrder,
	settings: Settings,
	setOffer: SetOffer,
	incomingOffers: IncomingOffers,
	product: ProductDetails,
	addProduct: AddProduct,
	editProduct: EditProduct,
	acceptOrder:AcceptOrder,
	bestProducts:BestProducts,
	storeProducts:StoreProducts,
	stores:Stores
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
		DrawerNavigator: {
			screen: DrawerNavigator,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},

		setOffer:{
			screen: SetOffer,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		addProduct: {
			screen: AddProduct,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		categories:{
			screen: Categories,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		confirmOrder:{
			screen: ConfirmOrder,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		notifications:{
			screen: Notifications,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		aboutApp:{
			screen: AboutApp,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		ads:{
			screen: Ads,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		stores:{
			screen: Stores,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		addAds:{
			screen: AddAds,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		bestProducts:{
			screen: BestProducts,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		offers:{
			screen: Offers,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		incomingOffers:{
			screen: IncomingOffers,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		acceptOrder:{
			screen: AcceptOrder,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		categoryProducts:{
			screen: CategoryProducts,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		myProducts :{
			screen: MyProducts,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		storeProducts :{
			screen: StoreProducts,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		editProduct:{
			screen: EditProduct,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		product:{
			screen: ProductDetails,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		editProfile:{
			screen: EditProfile,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		profile:{
			screen: Profile,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		policy:{
			screen: Policy,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		commanQus:{
			screen: CommanQus,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		contactUs:{
			screen: ContactUs,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		settings:{
			screen: Settings,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		acceptedOrders: {
			screen: AcceptedOrders,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		fav: {
			screen: Fav,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		buyOrderDetails: {
			screen: BuyOrderDetails,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		biddingOrderDetails: {
			screen: BiddingOrderDetails,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		exchangeAndPriceOrderDetails: {
			screen: ExchangeAndPriceOrderDetails,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		exchangeOrderDetails: {
			screen: ExchangeOrderDetails,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
		finished: {
			screen: Finished,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		},
	},
	{
		navigationOptions: {
			gesturesEnabled: false
		}
	});


const authNavigation = createStackNavigator({
	language:{
		screen: Language,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	login:{
		screen: Login,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	register:{
		screen: Register,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	forgetPassword:{
		screen: ForgetPassword,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	intro:{
		screen: Intro,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	verify:{
		screen: Verify,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	confirmCode:{
		screen: ConfirmCode,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
});

const navigator = createSwitchNavigator({
	initScreen:{
		screen: InitScreen,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
		}
	},
	authNavigation,
	AppNavigator
});

export default createAppContainer(navigator);

