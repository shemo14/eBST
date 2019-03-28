import React from 'react';
import { View } from 'react-native';
import Routes from './src/routes'
import { Font } from 'expo';

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
      await Font.loadAsync({ cairo: require('./assets/fonts/Cairo-Regular.ttf') });
      await Font.loadAsync({ cairoBold: require('./assets/fonts/Cairo-Bold.ttf') });
      this.setState({ fontLoaded: true });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    if (!this.state.fontLoaded) {
      return <View />;
    }

    return (
      <Routes/>
    );
  }
}
