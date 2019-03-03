import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { Container, Content, Button, Footer, Icon } from 'native-base'

class Home extends Component {
    constructor(props){
        super(props);
    }

    static navigationOptions = () => ({
        header: null
    });

    render() {
        return (
            <Container>
                <Content>
                    <Text>ops</Text>
                </Content>
            </Container>
        );
    }
}

export default Home;