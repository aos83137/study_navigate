import React,{useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image,ActivityIndicator,Alert,TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

const Delivery = (props)=>{
    const [load,setLoad] = useState(false);
    const [userCoords,setUserCoords] = useState(null);
    const [userId,setUserId] = useState(null);
    const [r_id, setR_id] = useState();
    const reservation = props.route.params?.reservation;

    const _storeData = async()=>{
        try{
            const token =await AsyncStorage.getItem('userToken');
            const r_id =await AsyncStorage.getItem('reservation_id');
            console.log('r_id',r_id);
            setR_id(r_id);
            setUserId(token);
            
        }catch(e){
            console.error(e);
        }
    }
    useEffect(()=>{

        Geolocation.getCurrentPosition((position)=>{
            let userCoords = {
                latitude:position.coords.latitude,
                longitude:position.coords.longitude,
            }
            console.log('DeliveryInfo화면 - 현재 유저coord : ', userCoords);
            
            setUserCoords(userCoords)
        },(e)=>{console.error(e);});
        _storeData()
        return ()=>{
            console.log("This will be logged on unmount");
        };
    },[props]);
    const findDelivery=()=>{
        setLoad(true);    
        let state;
        console.log('넣는다! :' + r_id);
        
        database()
        .ref('/users/'+userId)
        .update({
            name: userId,
            reservation_id:r_id,
            user_latitude:userCoords.latitude,
            user_longitude: userCoords.longitude,
            state:'listen',
        })
        .then(() => {
            console.log('Data set.')
        });
        database()
        .ref('/users/'+userId)
        .on('value', snapshot => {
            console.log('User data: ', snapshot.val().state);
            state = snapshot.val().state;
            if(state=='ok'){
                setLoad(false);
                props.navigation.navigate('DeliveryFindScreen',{
                    reservation,
                    userId,
                });
            }
        });
        

        
        // setTimeout(()=>{
            
        // },2000)
    }
    const homeNavi=()=>{
        props.navigation.navigate('Main',{ screen: 'InfoScreen' });
    }
    let showActivity;
    if (load){
        showActivity=
        <View style = {styles.elem}>
            <LottieView style={styles.lottie2} source={require('../../img/lottie/loading1.json')} autoPlay loop/>
            <Text style={styles.searchText}>딜리버리를 찾는 중 입니다....</Text>
        </View>
    }
    return(
        <View style={styles.container}>
            <View style ={styles.header}>
                <TouchableHighlight onPress={()=>{props.navigation.navigate('Main')}}>
                    <View>
                        <Icon name='keyboard-arrow-left' size={24}/>
                    </View>
                </TouchableHighlight>
            </View>
            <View style = {styles.lottieView}>
            <Text style={styles.headerTitle}>예약 접수가 완료 되었습니다.</Text>
            <LottieView style={styles.lottie} source={require('../../img/lottie/checkList3.json')} autoPlay loop/>
            </View>
            <View style={styles.content}>
                <Text style={styles.contentText2}>
                    딜리버리 서비스 이용하기
                </Text>
                <Text style={styles.contentText}>
                    고객님의 짐을 가게까지 배달해 주는 서비스입니다.
                </Text>
                <Text style={styles.contentText}>
                    경로는 현재 위치에서 키퍼까지 자동 설정되며
                </Text>
                <Text style={styles.contentText}>
                    10분 내로 도착 할 수 있는 딜리버리를 부릅니다.
                </Text>
                <Text style={styles.contentText3}>
                    (24시간 내 키퍼의 수락에 따라 예약이 취소 될 수가 있습니다.)</Text>
            </View>
            <View style={styles.footer}>
                {showActivity}
                <View style={{justifyContent:'center', flexDirection:'row', }}>
                    <Button title="당일에 사용할께요." type='Clear' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={homeNavi}/>
                    <Button title="네. 지금 사용할께요" type='Clear' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={findDelivery}/>
                </View>
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
        justifyContent:'center'
    },
    lottie:{
        // width:200,
        // height:"100%",
        
    },
    lottie2:{
        width:32
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
    contentText2:{
        fontSize:20,
    },
    searchText:{
        fontSize:16,
    },
    footer:{
        width:"100%",
        alignItems:'center',
    },
    contentText:{
        fontSize:16,
    },  
    contentText3:{
        fontSize:12,
        marginTop:10,
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
