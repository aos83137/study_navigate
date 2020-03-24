import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Button, View, Text,TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function InfoScreen(){
  return(
    <View style={{flex:1, justifyContent: 'center', alignItems:'center' }}>
      <Text>Info!!!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const RootStack = createStackNavigator();
const MainTopStack = createBottomTabNavigator();

function MainStackScreen(){
  return (
    <MainTopStack.Navigator>
      <MainTopStack.Screen name="Home" component={HomeScreen}/>
      <MainTopStack.Screen name="Info" component={InfoScreen}/>
      <MainTopStack.Screen name="Setting" component={SettingsScreen}/>
    </MainTopStack.Navigator>
  );
}


export default class App extends Component{
  render() {
    return (
      <NavigationContainer
        onStateChange={state => console.log('New state is', state)}
      >
        <RootStack.Navigator 
          headerMode="none"
          //Main의 header을 숨김
        > 
          <RootStack.Screen name="Main" 
            component={MainStackScreen} 
            // headerMode="none"
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

