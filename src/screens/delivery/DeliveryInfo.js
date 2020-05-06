import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image,ActivityIndicator,Alert} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker,PROVIDER_GOOGLE,Circle,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import colors from '../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';

const Delivery = (props)=>{
    const [load,setLoad] = useState(false);

    const findDelivery=()=>{
        setLoad(true);    
        console.log('test');
        setTimeout(()=>{
            setLoad(false);
            props.navigation.navigate('DeliveryFindScreen')
        },1)
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
        <View style={{ flex:1, justifyContent:'center',}}>
            <Text>예약 접수 완료되었습니다.</Text>
            <Text>24시간 내 키퍼의 수락에 따라 예약이 취소 될 수가 있습니다.</Text>
            <Text>
                딜리버리 서비스 이용하기
            </Text>
            <Text>
                고객님의 짐을 가게까지 배달해 주는 서비스입니다.
            </Text>
            <Text>
                10분 내로 도착 할 수 있는 딜리버리를 부릅니다.
            </Text>
            <Text>
                "딜리버리 고객에게 설명하는 페이지임"
            </Text>
            {showActivity}
            <Button title="딜리버리 찾기" styles={styles.button} onPress={findDelivery}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:colors.gray
    },
    header:{
        padding:'2%',
        backgroundColor:colors.white,
        
    },
    elem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
});
export default Delivery;
