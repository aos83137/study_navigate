import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker,PROVIDER_GOOGLE,Circle,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import colors from '../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const HomeScreen=()=>{
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

const SettingsScreen=()=> {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}
const Tab = createMaterialTopTabNavigator();

const Delivery = (props)=>{
    return(
        <View style={{ flex:1 }}>
            <Text>
                딜리버리 구하는 화면
            </Text>
            {/* <View style ={styles.header}>
                <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
                    <View style = {styles.elem}>
                        <Icon name='keyboard-arrow-left' size={24}/>
                        <Text style={styles.headerText}>딜리버리 찾기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style = {styles.container}>
                <mapView></mapView>
            </View>
            <View>

            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:colors.gray
    },
    header:{
        padding:'2%',
        backgroundColor:colors.white,
        
    },
});
export default Delivery;