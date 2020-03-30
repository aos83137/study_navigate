import 'react-native-gesture-handler';
import React, {Component} from 'react';
// import { PermissionsAndroid, Button, View, Text,TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Ionicons } from '@expo/vector-icons';

import PlacesAutoComplete from './PlacesAutoComplete';
import HomeScreen from './HomeScreen';

const RootStack = createStackNavigator();

export default class App extends Component{
  render() {
    return (
      <NavigationContainer
        onStateChange={state => console.log('New state is', state)}
      >
        <RootStack.Navigator  headerMode ="none"
          //Main의 header을 숨김
        > 
          <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
          <RootStack.Screen name="PlacesAutoComplete" component={PlacesAutoComplete} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

