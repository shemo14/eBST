import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class Rotate extends Component {
  render() {
    return (
      <View style={styles.container}>


        {/* <View style={{ backgroundColor: '#000', borderColor: '#f00',transform: [{ rotate: '15deg'}], width: 200, height: 200, overflow: 'hidden' }}>
                                                    <Image source={require('../../assets/images/photo.png')} style={{ width: 200, height: 200, transform: [{ rotate: '-15deg'}, { scale: 1.2 }],  }} resizeMode={'cover'}/>
                                                <View style={{ borderRadius: 10, borderColor: '#f00', borderWidth: 5, width: 205, height: 205, position: 'absolute', zIndex: 99999 }}>

                                                </View>
                                                </View> */}


            <View style={{ alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: 5, borderColor: '#4fb7c3', width: 100, height: 100, transform: [{ rotate: '45deg'}], position: 'absolute', top: 24.7, left: 24.7 }}>
                <Text style={{ transform: [{ rotate: '-45deg'}], textAlign: 'center', fontSize: 18 }}>متاجر</Text>
            </View>

            <View>
                <View style={{ width: 207, height: 207, borderWidth: 5, borderColor: '#fff', borderRadius: 10, transform: [{ rotate: '20deg' }], position: 'absolute', zIndex: 99999, top: -2, right: -4 }} ></View>                                    
                <View style={[styles.block, { transform: [{ rotate: '20deg' }] }]}>
                    <Image
                    source={require('../../assets/images/photo.png')}
                    style={[styles.image, { borderRadius: 10 }]}
                    resizeMode={'stretch'}
                    />
                </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
      },
      block: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 60,
        width: 200,
        height: 200,
        backgroundColor: '#000',
        // borderRadius: 20,
        overflow: 'hidden'
      },
      image: {
        width: 240,
        height: 240,
        borderWidth: 4,
        borderColor: 'green',
        transform: [{ rotate: '-20deg' }, { scale: 1.1 }]
      },
});
