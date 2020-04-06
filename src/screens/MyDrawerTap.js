import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabStack from './MainTabStack';
import KeeperInfo from './KeeperInfo';
import PlacesAutoComplete from './PlacesAutoComplete';

function Feed() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed Screen</Text>
      </View>
    );
  }
  
  function Notifications() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text>Notifications Screen</Text> */}
        <PlacesAutoComplete/>
      </View>
    );
  }
  
  function Profile() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
  
  const Drawer = createDrawerNavigator();

  
  export default class MyDrawerTap extends Component {
      render(){
          return(
            <Drawer.Navigator initialRouteName="Feed">
              <Drawer.Screen
                name="Feed"
                component={MainTabStack}
                options={{ drawerLabel: 'Home' }}
              />
              <Drawer.Screen
                name="Notifications"
                component={Notifications}
                options={{ drawerLabel: 'Updates' }}
              />
              <Drawer.Screen
                name="Profile"
                component={KeeperInfo}
                options={{ drawerLabel: 'Profile' }}
              />
            </Drawer.Navigator>
          );
      }
  }