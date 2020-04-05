import React , {Component,useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, Alert, Dimensions, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";

//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const KeeperInfo = (props)=>{   
        return(
            <View style = {styles.container}> 
                <Text>this is KeeperInfo</Text>
            </View>
        );
    }

    
const styles = StyleSheet.create({
    container:{
        padding:'3%',
        flex:1,
        alignItems:'center',
    },
    
});

export default KeeperInfo;