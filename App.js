import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Button, View, Text,TextInput, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Ionicons } from '@expo/vector-icons';

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  // React Context API, Redux, MobX 또는 이벤트 이미 터와 같은 다른 방법으로 badgeCount를 전달해야합니다.
  return <IconWithBadge {...props} badgeCount={3} />;
}

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
const MainTabStack = createBottomTabNavigator();

function MainStackScreen(){
  return (
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


export default class App extends Component{
  render() {
    return (
      <NavigationContainer
        onStateChange={state => console.log('New state is', state)}
      >
        <RootStack.Navigator 
          headerMode ="none"
          //Main의 header을 숨김
        > 
          <RootStack.Screen name="Main" 
            component={MainStackScreen} 
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}

