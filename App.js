import React from 'react';
import { View, Platform } from 'react-native';
import Routes from './src/routes'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import { Font, Notifications, Permissions } from 'expo';
import { Root } from 'native-base'
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
      this.setState({fontLoaded: true});
    } catch (e) {
      console.log(e);
    }

    //  await AsyncStorage.clear()
  }

  componentDidMount() {
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
