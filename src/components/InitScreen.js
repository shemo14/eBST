import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import {connect} from "react-redux";
import {profile, userLogin} from "../actions";


class InitScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentWillMount() {
        AsyncStorage.getItem('intro').then(intro => {
            if (this.props.lang == null)
            this.props.navigation.navigate('language')
            else if (intro == null){
                this.props.navigation.navigate('intro')    
            }    
            else if (this.props.auth == null || this.props.user == null)
                this.props.navigation.navigate('login')
            else
                this.props.navigation.navigate('DrawerNavigator')
        })
    }

    render() {
        return false;
    }
}

const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, {})(InitScreen);