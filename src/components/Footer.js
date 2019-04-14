import React, { Component } from "react";
import { Image, ImageBackground, Dimensions } from "react-native";
import {  Button, Footer, Icon,  } from 'native-base'

const width = Dimensions.get('window').width;
class FooterSection extends Component {
    constructor(props){
        super(props);
    }


    renderFooterTabs(tabName){
        // is Active
        if (this.props.pageRoute === tabName){
            let activePath = '';

            switch (tabName) {
                case 'home': activePath = require('../../assets/images/blue_home.png');
                    break;
                case 'fav': activePath = require('../../assets/images/blue_fav.png');
                    break;
                case 'offers': activePath = require('../../assets/images/blue_offers.png');
                    break;
                case 'ads': activePath = require('../../assets/images/blue_ads.png');
                    break;
            }

            return(
                <Button transparent>
                    <Image source={require('../../assets/images/border_blue.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'}/>
                    <Image style={{ width: 24, height: 24, position: 'absolute', left: 8 }} resizeMode={'contain'} source={activePath}/>
                </Button>
            );
        }


        let path = '';
        switch (tabName) {
            case 'home': path = require('../../assets/images/gray_home.png');
                break;
            case 'fav': path = require('../../assets/images/gray_fav.png');
                break;
            case 'offers': path = require('../../assets/images/gray_offers.png');
                break;
            case 'ads': path = require('../../assets/images/gray_ads.png');
                break;
        }

        return(
            <Button transparent onPress={() => this.props.navigation.navigate(tabName)}>
                <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={path}/>
            </Button>
        );
    }


    render() {

        return (
                <Footer style={{ backgroundColor: 'transparent' }}>
                    <ImageBackground style={{ width: width + 15, height: 65, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingTop: 5 }} resizeMode={'stretch'} source={require('../../assets/images/footer.png')} >
                        {  this.renderFooterTabs('home') }

                        {  this.renderFooterTabs('offers') }

                        <Button onPress={ () => this.props.navigation.navigate('addProduct') } style={{ backgroundColor: '#4fb7c3', borderRadius: 6, transform: [{ rotate: '45deg'}], bottom: 22, width: 45 , height: 45, alignItems: 'center', justifyContent: 'center', right: 4 }}>
                            <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#fff', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                        </Button>

                        {  this.renderFooterTabs('ads') }

                        {  this.renderFooterTabs('fav') }
                    </ImageBackground>
                </Footer>
        );
    }
}


export default FooterSection;