import React from 'react';
import { View, Platform, AsyncStorage, Text } from 'react-native';
import Routes from './src/routes'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import { Notifications, Permissions } from 'expo';
import { Root } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import './ReactotronConfig';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.loadFontAsync();

		this.state = {
			fontLoaded: false
		};
	}


	async loadFontAsync() {
		try {
			await Font.loadAsync({cairo: require('./assets/fonts/Cairo-Regular.ttf')});
			await Font.loadAsync({cairoBold: require('./assets/fonts/Cairo-Bold.ttf')});
			await Font.loadAsync({
				Roboto: require('native-base/Fonts/Roboto.ttf'),
				Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
				...Ionicons.font,
			});
			this.setState({fontLoaded: true});
		} catch (e) {
			console.log(e);
		}

		//  await AsyncStorage.clear()
	}

	componentDidMount() {
		if (Text.defaultProps == null) Text.defaultProps = {};
			Text.defaultProps.allowFontScaling = false;

		if (Platform.OS === 'android') {
			Notifications.createChannelAndroidAsync('orders', {
				name: 'Orders',
				priority: 'max',
				vibrate: [0, 250, 250, 250],
			})
		}

		Notifications.addListener(this.handleNotification);
	}

	handleNotification = (notification) => {
		console.log(notification);

		if (notification && notification.origin !== 'received') {
			this.props.navigation.navigate('notifications');
		}
	}

	render() {
		if (!this.state.fontLoaded) {
			return <View/>;
		}

		return (
			<Provider store={store}>
				<PersistGate persistor={persistedStore}>
					<Root>
						<Routes/>
					</Root>
				</PersistGate>
			</Provider>
		);
	}
}
