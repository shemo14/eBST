import React, { Component } from "react";
import { Image, ImageBackground, Dimensions, Platform } from "react-native";
import {  Button, Footer, Icon, FooterTab } from 'native-base'
import {connect} from "react-redux";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

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
                case 'bestProducts': activePath = require('../../assets/images/gray_best_seller.png');
                    break;
                case 'offers': activePath = require('../../assets/images/blue_offers.png');
                    break;
                case 'ads': activePath = require('../../assets/images/blue_ads.png');
                    break;
            }

            return(
                <Button transparent>
                    <Image source={require('../../assets/images/border_blue.png')} style={{ width: 40, height: 40 }} resizeMode={'contain'}/>
                    <Image style={{ width: 24, height: 24, position: 'absolute', left: isIphoneX ? 35 : 28}} resizeMode={'contain'} source={activePath}/>
                </Button>
            );
        }


        let path = '';
        switch (tabName) {
            case 'home': path = require('../../assets/images/gray_home.png');
                break;
            case 'bestProducts': path = require('../../assets/images/gray_best_seller.png');
                break;
            case 'offers': path = require('../../assets/images/gray_offers.png');
                break;
            case 'ads': path = require('../../assets/images/gray_ads.png');
                break;
        }
        return(
           
            <Button transparent onPress={() => this.props.navigation.navigate( this.props.user ?  tabName : 'login')} style={{marginRight:tabName=='offers'? 20 : 0 , marginLeft:tabName=='ads'? 20 : 0  }}>
                <Image style={{ width: 30, height: 30 }} resizeMode={'contain'} source={path}/>
            </Button>
        );
    }


    render() {

        return (
                <Footer style={{ backgroundColor: 'fff' }}>
                    <FooterTab style={{ backgroundColor: 'fff', borderTopWidth:2, borderTopColor:'#eee'  ,width: width , height: 65, flexDirection: 'row', justifyContent: 'space-between' , paddingBottom:10 }}>
                        
                        {  this.renderFooterTabs('home') }
                        
                       
                        {  this.renderFooterTabs('offers') }
                        
                        <Button onPress={ () => this.props.navigation.navigate(this.props.user ? 'addProduct' : 'login') } style={{ backgroundColor: '#4fb7c3', borderRadius: 6, transform: [{ rotate: '45deg'}], bottom: 42,
                         width: 45 , height: 45, alignItems: 'center', justifyContent: 'center', left:'44%' , position:'absolute',
                         }}>
                            <Icon type={'FontAwesome'} name={'plus'} style={{ fontSize: 20, color: '#fff', transform: [{ rotate: '-45deg'}], textAlign: 'center', width: 30 }} />
                        </Button>
                        
                        {  this.renderFooterTabs('ads') }
                        
                        {  this.renderFooterTabs('bestProducts') }

                    </FooterTab>
                </Footer>
        );
    }
}


const mapStateToProps = ({ profile }) => {
    return {
        user: profile.user,
    };
};

export default connect(mapStateToProps, {})(FooterSection);