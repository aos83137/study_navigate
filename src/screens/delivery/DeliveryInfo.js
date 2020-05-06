import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image,ActivityIndicator,Alert,TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker,PROVIDER_GOOGLE,Circle,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import colors from '../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';

const Delivery = (props)=>{
    const [load,setLoad] = useState(false);

    const findDelivery=()=>{
        setLoad(true);    
        console.log('test');
        setTimeout(()=>{
            setLoad(false);
            props.navigation.navigate('DeliveryFindScreen');
        },1)
    }
    const homeNavi=()=>{
        props.navigation.navigate('Main');
    }
    let showActivity;
    if (load){
        showActivity=
        <View style = {styles.elem}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>딜리버리를 찾는 중 입니다....</Text>
        </View>
    }
    return(
        <View style={styles.container}>
            <View style ={styles.header}>
                <TouchableHighlight onPress={()=>{props.navigation.navigate('Main')}}>
                    <View style = {styles.elem}>
                        <Icon name='keyboard-arrow-left' size={24}/>
                    </View>

                </TouchableHighlight>
            </View>
            <View style = {styles.lottieView}>
            <Text style={styles.headerTitle}>예약 접수가 완료 되었습니다.</Text>
            <LottieView style={styles.lottie} source={require('../../img/lottie/checkList3.json')} autoPlay loop={false}/>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText}>
                    딜리버리 서비스 이용하기
                </Text>
                <Text style={styles.contentText}>
                    고객님의 짐을 가게까지 배달해 주는 서비스입니다.
                </Text>
                <Text style={styles.contentText}>
                    10분 내로 도착 할 수 있는 딜리버리를 부릅니다.
                </Text>
                <Text>(24시간 내 키퍼의 수락에 따라 예약이 취소 될 수가 있습니다.)</Text>
            </View>
            <View style={styles.footer}>
                {showActivity}
                    <Button title="지금은 괜찮아요." type='Clear' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={homeNavi}/>
                    <Button title="네. 사용할래요" type='Clear' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={findDelivery}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.gray
    },
    header:{
        padding:'2%', 
    },
    elem:{
        flexDirection:'row',
        width:"100%",
        // // alignItems:'center',
        // justifyContent:'center'
    },
    lottie:{
        // width:200,
        // height:"100%",
        
    }
    ,
    lottieView:{
        height:'40%',
        width:"100%",
        alignItems:'center',
        marginTop:"5%",
    },
    content:{
        alignItems:'center',
        padding:20,
        marginLeft:15,
        marginRight:15,
        marginBottom:15,
        marginHorizontal: 10,
        shadowColor:'#000000',
        shadowOpacity: 1.0,
        shadowRadius:5,
        elevation: 7,
        backgroundColor:colors.white
    },
    footer:{
        flexDirection:'row',
        width:"100%",
        alignItems:'center',
        justifyContent:'center'
    },
    contentText:{
        fontSize:16,
    },  
    headerTitle:{
        // width:'100%',
        fontSize:23,
        fontWeight:"500"
    },
    button:{
        marginLeft:13,
        marginRight:13,
        // backgroundColor:'rgba(255,255,255,0.2)'
    },
    buttonTitle:{
        color:colors.black
    }
});
export default Delivery;
