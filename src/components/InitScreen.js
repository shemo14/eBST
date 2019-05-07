import React, { Component } from "react";
import { AsyncStorage } from 'react-native';


class InitScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        await AsyncStorage.multiGet(['lang', 'token']).then((data) => {
            // console.log('this is data ...', data[0][1], data[1][1])
            if (data[0][1] == null )
                this.props.navigation.navigate('language')
            else if (data[1][1] == null )
                this.props.navigation.navigate('login')
            else
                this.props.navigation.navigate('DrawerNavigator')

        })
    }

    render() {

        return false;
    }
}

export default InitScreen;