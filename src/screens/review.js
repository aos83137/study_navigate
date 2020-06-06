import React , {useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, FlatList, Alert, ActivityIndicator,Dimensions, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from 'lottie-react-native';



let {width, height} = Dimensions.get('window')
const URI = 'https://my-project-9710670624.df.r.appspot.com'


const Review = (props)=>{   

    return(
        <View style={styles.container}> 
                <View style={styles.background}>
                <LottieView style={styles.lottie} source={require('../img/lottie/waves.json')} autoPlay loop/>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    background:{
        position:'absolute',
        width:'100%',
        bottom:0
    },
    lottie:{
        width:'100%',
    },
    container:{
        flex:1,
        // backgroundColor:'white'
    },
    item:{
        backgroundColor: colors.white,
        padding: 20,
        marginTop:10,
        marginHorizontal: 10,
        shadowColor:'#000000',
        shadowOpacity: 1.0,
        shadowRadius:5,
        elevation: 7,
    },
    tableView:{ 
        flex:1, 
        width:'100%', 
        flexDirection:'row',
        justifyContent:'center',
        // backgroundColor:'gray',
        justifyContent:'space-between',
    },
    titleText:{
        fontSize:20,
    },
    titleDate:{
        fontSize:16,
        color:'gray'
    },
    stateText:{
        fontSize:16,
    },
});

export default Review;