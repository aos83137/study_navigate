import React , {Component} from 'react';
import {Text ,View, ScrollView, StyleSheet} from 'react-native';

export default class HomeScreen extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems:'center' }}>
                <Text>Home!!!</Text>
                <Text>Map create</Text>  
             </View>
        );
    }
}