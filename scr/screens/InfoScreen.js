import React , {Component} from 'react';
import {Text ,View, ScrollView, StyleSheet} from 'react-native';

export default class InfoScreen extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems:'center' }}>
                <Text>Info!!!</Text>
             </View>
        );
    }
}