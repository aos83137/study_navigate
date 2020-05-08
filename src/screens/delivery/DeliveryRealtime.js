import React , {Component} from 'react';
import {Text ,View, StyleSheet, Image, Alert, Dimensions,Button,TouchableHighlight} from 'react-native';
import { Input,Avatar  } from 'react-native-elements';
import MapView, {Marker,PROVIDER_GOOGLE,Polyline ,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {CurrentLocationButton} from '../../components/buttons/CurrentLocationButton';
import {ShowDeliveryButton} from '../../components/buttons/ShowDeliveryButton';
import {UserAndDeliveryCenterButton} from '../../components/buttons/UserAndDeliveryCenterButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../styles/colors';

export default class DeliveryFindScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeRegion:{
                latitude : 35.8843,
                longitude: 128.6323,
            },
            delivery:{
                latitude:35.8951, 
                longitude: 128.6237
            },
            error: null,
        };        
    }
    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.

            Geolocation.getCurrentPosition(
                (position) => {
                    let initialRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
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

            fetch('https://api.mapbox.com/directions/v5/mapbox/walking/'
                +this.state.delivery.longitude+','+this.state.delivery.latitude+';'+this.state.storeRegion.longitude+','+this.state.storeRegion.latitude+'?geometries=geojson&access_token=pk.eyJ1IjoiamVvbnlvbmdzZW9rIiwiYSI6ImNrOXh4dGh0aTA1aXozbXBpdjNkeXM0OXYifQ.z_QRmRG_ZTKLTxHdUnLDiQ',{
                method:"get",
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
            }).then((res)=>res.json())
            .then((resJson)=>{
                let coords = resJson.routes[0].geometry.coordinates.map(item => {
                    return { latitude: item[1], longitude: item[0] };
                  });
                console.log(coords);
                this.setState({
                    coords
                })
            })
            .catch((e)=>{
                console.error(e);
            });
    }
    deleteToken=async()=>{
        await AsyncStorage.setItem('status','endDelivery');
        const value = await AsyncStorage.getItem('status');
        console.log(value);
        
    }
    centerMap(){
        const {
            latitude, 
            longitude} = this.state.storeRegion
        this._map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta:0.03,
            longitudeDelta:0.03
        })
    }
    goDelivery(){
        const {
            latitude, 
            longitude, } = this.state.delivery
        this._map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta:0.003,
            longitudeDelta:0.003
        })
    }
    zoomOut(){
        const userRegion ={
            latitude: this.state.initialRegion.latitude,
            longitude:this.state.initialRegion.longitude,
        }
        const storeRegion = this.state.storeRegion
        const zoomOutLat = (userRegion.latitude + storeRegion.latitude)/2;
        const zoomOutLon = (userRegion.longitude + storeRegion.longitude)/2;
        console.log('userRegion : ' +JSON.stringify(userRegion));
        console.log('storeRegion : ' +JSON.stringify(storeRegion));
        
        console.log('zoomOutLat :'+zoomOutLat);
        console.log('zoomOutLon : '+zoomOutLon);
        
        this._map.animateToRegion({
            latitude:zoomOutLat,
            longitude:zoomOutLon,
            latitudeDelta:0.02,
            longitudeDelta:0.02,
        })
    }
    
    render(){     
        
        console.log(''+this.state.coords);
        
        return(
            <View style={styles.container}>
                <View style={styles.rootMenu}>
                    <Text>실시간 위치 확인</Text>
                    <View style={styles.elem}>
                        <Avatar
                            rounded
                            title="DV"
                            size="large"
                        />
                        <View style={styles.deliveryInfoText}>
                            <Text>딜리버리 성함</Text>
                            <Text>대구11사1234 | 아반떼cn7</Text>
                            <Text>약 5분 후 도착합니다.</Text>
                        </View>
                    </View>
                    
                </View>
                <CurrentLocationButton
                    cb={()=>{this.centerMap()}}
                />
                <ShowDeliveryButton
                    cb={()=>{this.goDelivery()}}
                />
                <UserAndDeliveryCenterButton
                    cb={()=>{this.zoomOut()}}
                />
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map=> {this._map = map}}
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={false}
                    showsMyLocationButton = {true}
                    showsCompass = {true}
                    rotateEnabled={false}
                >   
                    <Marker
                        coordinate={this.state.storeRegion}
                        image={require('../../img/signs.png')}
                        title={'Keeper'}
                    >
                    </Marker>
                    <Marker
                        coordinate={this.state.delivery}
                        image={require('../../img/location.png')}
                        ref={ref=>this.state.marker=ref}
                        title={'Delivery'}
                    ></Marker>
                    {
                        this.state.coords?
                        <Polyline
                            coordinates={this.state.coords}
                            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                            strokeWidth={6}
                        />:null
                    }
                    
                </MapView>
                <TouchableHighlight 
                    onPress={()=>{
                        this.deleteToken()
                        this.props.navigation.navigate('Main');
                    }
                }>
                    <View style = {styles.elem}>
                        <Icon name='keyboard-arrow-left' size={24}/>
                    </View>
                </TouchableHighlight>
            </View>

        );
    } 
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
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
    },
    flat:{
        height:'30%',
    },
    rootMenu:{
        position:'absolute',
        zIndex:9,
        width:'100%',
        margin:10,
        padding:10,
        backgroundColor:colors.white,
        marginHorizontal: 10,
        shadowColor:'#000000',
        shadowOpacity: 1.0,
        shadowRadius:5,
        elevation: 7,
        alignItems:"center",
    },
    elem:{
        flexDirection:'row',
        width:"100%",
        alignItems:'center',
    },
    deliveryInfoText:{
        marginLeft:20,
    }
});