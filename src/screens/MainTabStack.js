import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Button, View, Text,TextInput, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SettingsScreen from './SettingsScreen';
import InfoScreen from './InfoScreen';
import HomeScreen from './HomeScreen';

import HomeIconWithBadge from '../components/HomeIconWithBadge';

export default class MainTabStack extends Component{
    render(){
        const MainTabStack = createBottomTabNavigator();

        return(            
            <MainTabStack.Navigator
                initialRouteName="Home"
                screenOptions={({route}) => ({
                tabBarIcon : ({ focused, color , size}) => {
                    if (route.name === 'Home'){
                    return(
                        <Icon name = {focused ? 'home' : 'home'}  size={size} color={color}/>
                    );
                    } else if (route.name==='Info'){
                    return(
                        <HomeIconWithBadge name = {focused ? 'info' : 'info-outline'}  size={size} color={color}/>
                    );
                    } else if(route.name==='Setting'){
                    return(
                        <Icon name ={focused ? 'settings-applications' : 'settings'}  size={size} color={color}/>
                    );
                    }
                },
                })}
                tabBarOptions={{ 
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                }}
            >
                <MainTabStack.Screen name="Home" component={HomeScreen}/>
                <MainTabStack.Screen name="Info" component={InfoScreen}/>
                <MainTabStack.Screen name="Setting" component={SettingsScreen}/>
          </MainTabStack.Navigator>
        );
    }
}