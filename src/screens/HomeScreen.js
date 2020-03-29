import React , {Component} from 'react';
import {Text ,View, ScrollView, StyleSheet} from 'react-native';

import MapView, {Marker,PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


export default class HomeScreen extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent: 'center', alignItems:'center' }}>
                {/* <Text>Home!!!</Text>
                <Text>Map create</Text>   */}
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                ></MapView>
             </View>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        //(position: 'absolute', left: 0, right: 0, top: 0, bottom: 0)
        zIndex:1,
    }
})