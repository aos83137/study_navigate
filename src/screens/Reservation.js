import React , {Component,useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, ScrollView, Alert, Dimensions, TouchableHighlight,TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

let {width, height} = Dimensions.get('window')

//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const Reservation = (props)=>{   
    const checkIn = props.route.params?.checkIn;
    const checkOut = props.route.params?.checkOut;
    const bagCnt = props.route.params?.bagCnt;
    const carrCnt = props.route.params?.carrCnt;
    const whereScreen = props.route.params?.whereScreen ? props.route.params?.whereScreen : true;
    const data = props.route.params?.data ? props.route.params?.data : '없디';
    const [value, onChangeText] = useState('xxxx-xxxx-xxxx-xxxx');

    const getFormatDate = date=>{
        let month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        let day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        let hour = date.getHours();                 //h
        let ampm = '오전';
        if(hour>=12){
            hour= hour -12;
            ampm = '오후';
        }
        let min = date.getMinutes();                //m
        if(min<10) min = '0' + min;
        return  '' + month + '.' + day + '. ' + ampm + ' ' + hour+':'+min;
    }
    const getDays = (d1,d2)=>{
        let days;
        days = d2.getDate()-d1.getDate();
        return days>1 ? days:1; 
    }
    
    const payEnd= async()=>{
        try{
            await AsyncStorage.setItem('status','endKeeper')
            console.log('스테이터스 저장 완료');
            
        }catch(e){
            console.error(e);
        }
        Alert.alert(
                    //Header
                    '결제 감사합니다.',
                    //title
                    '딜리버리를 이용하시려면 다음을 눌러주세요.',
                    //footer button
                    [
                        {
                            text:'이용 안함',
                            style: 'cancel',
                            onPress:()=>{
                                //딜리버리 스테이트를 바꿔야함
                                props.navigation.navigate('Info');
                            }
                        },
                        {
                            text:'다음',
                            onPress: ()=>{
                                props.navigation.navigate('DeliveryInfo');
                            }
                        }
                    ]
                );
    }
    // const deliveryEx=()=>{
    //     Alert.alert("키퍼 예약을 끝내신 후 배달을 원하시는 고객님께서는 '예약하기'를 눌러 완료하신 뒤 예약페이지에서 딜리버리를 예약할 수 있습니다!");
    // }
    const goDelivery = ()=>{

        props.navigation.navigate('DeliveryInfo');
    }
    const goDeliveryFindScreen = ()=>{
        props.navigation.navigate('DeliveryFindScreen');
    }
    let imageCard;
    let headerText;
    let checkInOut;
    let total;
    let footer;
    //예약하기로 넘어 왔을 경우
    if(whereScreen === 'reservation'){
        imageCard=
        <View style={styles.ImageWrap}>
            <Image style={styles.keeperImg} source={require('../img/store/img2.png')}></Image>
            <Text style={styles.keeperText}>영진 펀드샵(6층)</Text>
        </View>
        headerText = <Text style={styles.headerText}>예약하기</Text>
        total= 
        <View style={{ flex:1,alignItems:'center' }}>
            <Text style={styles.headerText}>비용</Text>
            <View style = {styles.tableView}>
                <View style={{ flex:1}}>
                    <Text></Text>
                    <Text>가방</Text>
                    <Text>캐리어</Text>
                    <Text>합계</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>개수</Text>
                    <Text>{bagCnt}</Text>    
                    <Text>{carrCnt}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>기간</Text>
                    <Text>{getDays(checkIn,checkOut)}</Text>
                    <Text>{getDays(checkIn,checkOut)}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>비용</Text>
                    <Text>¥{bagCnt*400}</Text>
                    <Text>¥{carrCnt*700}</Text>
                    <Text>¥{bagCnt*400+carrCnt*700}</Text>
                </View>
            </View>
        </View>;
        checkInOut=
            <View>
                <View style={styles.inWrapView}>
                    <View>
                        <Text style={styles.subFont}>체크인</Text>
                    </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate(checkIn)}</Text>
                </View>
            </View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>체크아웃</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate(checkOut)}</Text>
                </View>
            </View>
        </View>;
        footer=
        <View>
            {/* <TouchableOpacity onPress={deliveryEx}>
                <Text style={{ borderBottomColor:1 }}>
                    배달을 이용하고 싶은 분께서는....Click!
                </Text>
            </TouchableOpacity> */}
            
            <View style={styles.paysCard}>
                <View>
                    <Button
                        buttonStyle={{backgroundColor:colors.green01}} title="예약하기" 
                        onPress={payEnd}
                    />
                </View>
            </View>
        </View>;
    }else if(whereScreen === 'info'){
    //예약 확인에서 왔을 경우
        imageCard=
            <View style={styles.ImageWrap}>
                <Image style={styles.keeperImg} source={require('../img/store/img2.png')}></Image>
                <Text style={styles.keeperText}>영진 펀드샵(6층)</Text>
            </View>
        headerText = <Text style={styles.headerText}>예약확인</Text>
        checkInOut=
        <View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>체크인</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{getFormatDate(data.checkIn) }</Text>
                </View>
            </View>
            <View style={styles.inWrapView}>
                <View>
                    <Text style={styles.subFont}>체크아웃</Text>
                </View>
                <View>
                    <Text style={styles.subFont}>{ getFormatDate(data.checkOut) }</Text>
                </View>
            </View>
        </View>;
        total= 
        <View style={{ flex:1,alignItems:'center' }}>
            <Text style={styles.headerText}>결제 된 비용</Text>
            <View style = {styles.tableView}>
                <View style={{ flex:1}}>
                    <Text></Text>
                    <Text>가방</Text>
                    <Text>캐리어</Text>
                    <Text>합계</Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>개수</Text>
                    <Text>{data.bagCnt}</Text>    
                    <Text>{data.carrCnt}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>기간</Text>
                    <Text>{getDays(data.checkIn,data.checkOut)}</Text>
                    <Text>{getDays(data.checkIn,data.checkOut)}</Text>
                    <Text></Text>
                </View>
                <View style={{ flex:1}}>
                    <Text style={{ flex:1 }}>비용</Text>
                    <Text>¥{data.bagCnt*400}</Text>
                    <Text>¥{data.carrCnt*700}</Text>
                    <Text>¥{data.bagCnt*400+data.carrCnt*700}</Text>
                </View>
            </View>
        </View>;
        if(data.state==='예약' || data.state==='보관 중'){
            footer=
            <View>
                <TouchableOpacity onPress={deliveryEx}>
                    <Text style={{ borderBottomColor:1 }}>
                        배달을 이용하고 싶은 분께서는....Click!
                    </Text>
                </TouchableOpacity>
                
                <View style={styles.paysCard}>
                    <Text>딜리버리 요청</Text>    
                    <View>
                        <Text>- 가게까지 짐을 배달해 주는 서비스입니다.</Text>    
                        <Text>- 반경 5KM 내의 딜리버리를 찾습니다.</Text>
                        <Button
                            buttonStyle={{backgroundColor:colors.green01}} title="예약하기" 
                            onPress={goDelivery}
                        />
                    </View>
                </View>
            </View>;
        }else if(data.state==='배달 중'){
            footer=
            <View>                
                <View style={styles.paysCard}>
                        <Text>딜리버리의 위치를 확인 할 수 있습니다.</Text>    
                        <Text>2</Text>
                        <Button
                            buttonStyle={{backgroundColor:colors.green01}} title="딜리버리 확인" 
                            onPress={goDeliveryFindScreen}
                        />
                </View>
            </View>;
        }else if(data.state==='종료'){
            footer=
            <View>                
                <View style={styles.paysCard}>
                    <Text>딜리버리 이용 내역</Text>    
                    <View>
                        <Text>- 차 번호</Text>    
                        <Text>- 이동 거리</Text>
                    </View>
                </View>
            </View>;
        }
    }
        return(
            <View style={{ flex:1 }}> 
                <ScrollView stickyHeaderIndices={[0]}>
                    <View style ={styles.header}>
                        <TouchableHighlight onPress={()=>{props.navigation.goBack()}}>
                            <View style = {styles.elem}>
                                <Icon name='keyboard-arrow-left' size={24}/>
                                {headerText}
                            </View>

                        </TouchableHighlight>
                    </View>
                    <View style = {styles.container}> 
                            {imageCard}
                        <View style={styles.cardView}>
                            {checkInOut}
                        </View>
                        <View style={styles.cardView}>
                            {total}
                        </View >
                        <View style={styles.cardView}>
                            {footer}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:colors.gray
    },
    ImageWrap:{
        width:'100%',
        backgroundColor:colors.white,
        alignItems:'center',
        paddingBottom:8
    },
    keeperImg:{
        width: '90%',
        height:200,
        borderRadius:8,
    },
    keeperText:{
        position:'absolute',
        bottom:8,
        color:colors.white,
        fontSize:20,
        backgroundColor:'rgba(0,0,0,0.6)',
        width:'90%',
        padding:5,
        padding:8,
        borderBottomLeftRadius:8,
        borderBottomRightRadius:8,
    },
    header:{
        padding:'2%',
        backgroundColor:colors.white,
        
    },
    title:{
        width:'100%',
        paddingTop:10,
        paddingLeft:18,
        paddingRight:18,
        backgroundColor:colors.white
    },
    rowDirection:{
        flexDirection:'row'
    },
    starEmel:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    titleFont:{
        fontSize:24,
        marginTop:15,
        marginBottom:15,

    },
    cardView:{
        backgroundColor:colors.white,
        width:'100%',
        marginTop:10,
        paddingTop:10,
        paddingLeft:18,
        paddingRight:18,
    },
    inWrapView:{
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
        width:"100%",
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    floatView:{
        position:'absolute',
        width:'100%',
        bottom:15,
        alignItems:'center',
        justifyContent:'center',
    },
    elem:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerText:{
        width:'100%',
        fontSize:18,
        fontWeight:"500",
    },
    subFont:{
        marginTop:'3%',
        marginBottom:'3%',
        fontSize:18,
    },
    tableView:{ 
        flex:1, 
        width:'100%', 
        flexDirection:'row',
        justifyContent:'center',
        // backgroundColor:'gray',
        paddingBottom:10,
        justifyContent:'space-between',
    },
    paysCard:{
        backgroundColor:colors.gray,
        borderRadius:10,
        marginTop:8,
        marginBottom:30,
        padding:8,
    },
    inputText:{
        backgroundColor:colors.white,
        borderRadius:10,
        height:35,
        color:colors.black,
        marginTop:10,
        marginBottom:10,
    }
});

export default Reservation;