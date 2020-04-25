import React , {Component} from 'react';
import {Text ,View, StyleSheet, Image, Alert, Dimensions,Button,TouchableHighlight} from 'react-native';

import MapView, {Marker,PROVIDER_GOOGLE,AnimatedRegion  } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';


const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Ubertest extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeRegion:{
                latitude : 35.8843,
                longitude: 128.6323,
            },
            delivery:{
                latitude:35.8944, 
                longitude: 128.6115
            },
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            latitude: LATITUDE,
            longitude: LONGITUDE,
            coordinate: new AnimatedRegion({
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: 0,
              longitudeDelta: 0
            }),            
            error: null,
        };      
        // this.pubnub = new PubNubReact({
        //     publishKey: "X",
        //     subscribeKey: "X"
        // });
        // this.pubnub.init(this);  
        const driver = this.props.driver?
        this.props.driver:
        {
            uid : "noDriversPassed",
            location:{ latitude: 0,longitude:0}
        }
        
    }
    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.

            Geolocation.getCurrentPosition(
                (position) => {
                    let initialRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015,
                    }
                    this.setState({
                        initialRegion,
                        error: null,
                    })
                },
                (error) => {
                    // See error code charts below.
                    this.setState({error:error.message});
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                //정확도, 타임아웃, 최대 연령
            );
            this.watchLocation();            
    }
    componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
        // this.pubnub.publish({
        //     message: {
        //         latitude: this.state.latitude,
        //         longitude: this.state.longitude
        //     },
        //         channel: "location"
        //     });
        }
    }

    watchLocation = () => {
        const { coordinate } = this.state;
        console.log('실행디나');

        this.watchID = Geolocation.watchPosition(
          position => {
            const { latitude, longitude } = position.coords;
            console.log('위도'+latitude+'   '+ '경도' + longitude);
            const newCoordinate = {
              latitude,
              longitude
            };
    
            if (Platform.OS === "android") {
              if (this.marker) {
                this.marker._component.animateMarkerToCoordinate(
                  newCoordinate,
                  1 // 500 is the duration to animate the marker
                );
              }
            } else {
              coordinate.timing(newCoordinate).start();
            }
    
            this.setState({
              latitude,
              longitude
            });
          },
          error => console.log(error),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0,
            distanceFilter: 100
          }
        );
      };

      getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });

    onRegionChange(region) {
        this.setState({region:region});
      }
    render(){             
        return(
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map=> {this._map = map}}
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={true}
                    showsMyLocationButton = {true}
                    showsCompass = {true}
                    showsCompass={true}
                    rotateEnabled={false}
                    // onRegionChange={this.onRegionChange}
                >   
                    <Marker.Animated
                        ref={marker=>{
                            this.marker = marker;
                        }}
                        coordinate={this.state.coordinate}
                        image={require('../img/UIHere.png')}
                    />
                </MapView>
                <View style = {styles.flat}>

                </View>

            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        flexDirection:'column',
        alignItems:"center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        //(position: 'absolute', left: 0, right: 0, top: 0, bottom: 0)
    },
    header: {
        width:'100%',
        alignItems: 'center',
        backgroundColor: '#9aa9ff',
    },
    title : {
        alignItems: 'center',
        width:'90%',
    },
    titleSearchButton:{
        width:'100%',
    },
    content : {
        flex : 4,
        alignItems:'center',
    },
    footer: {
        width:'100%',
    },
    marker:{
        width:5,
        height:5,
    },
    carousel:{
        position:'absolute',
        bottom: 0,
        marginBottom: 48
    },
    cardContainer:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height:200,
        width:300,
        padding:24,
        borderRadius:24
    },
    cardImage:{
        height:120,
        width:300,
        bottom:0,
        position:'absolute',
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
    },
    cardTitle:{
        color:'white',
        fontSize:22,
        alignSelf:'center'

    },
    nextButton : {
    }
});