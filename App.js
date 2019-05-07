import React from 'react';
import { View, AsyncStorage } from 'react-native';
import Routes from './src/routes'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';
import { Font } from 'expo';
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

  render() {
    if (!this.state.fontLoaded) {
      return <View />;
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
