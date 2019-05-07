import React, { Component } from "react";
import { Image, ImageBackground, Dimensions, View, TouchableOpacity, Text, WebView } from "react-native";
import {  Button, Footer, Icon, Container, Content, Label } from 'native-base'
import { MapView } from 'expo';


const width  = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Map extends Component {
    constructor(props){
        super(props);
        this.state ={
            markers: [{
                title: 'hello',
                coordinates: {
                    latitude: 37.78825,
                    longitude: -122.4324
                },
            },
                {
                    title: 'hello2',
                    coordinates: {
                        latitude: 3.159771,
                        longitude: 101.655449
                    },
                }]
        }
    }

    render() {
        return (
            <Container>
                <Content>
                    <MapView
                        style={{ flex: 1, width, height }}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {this.state.markers.map((marker , i) => (
                            <MapView.Marker key={i}
                                            coordinate={marker.coordinates}
                                            title={marker.title}
                                            image={require('../../assets/images/location.png')}
                            >
                                <Label onPress={() => alert('ops')} source={{uri: 'https://www.ikea.com/gb/en/images/rooms/ikea-traditional-looks-meet-modern-versatility__1364308465624-s5.jpg'}} />
                            </MapView.Marker>
                        ))}
                    </MapView>
                </Content>
            </Container>
        );
    }
}


export default Map;