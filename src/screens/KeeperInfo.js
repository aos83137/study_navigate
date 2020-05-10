import React , {Component,useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, ScrollView, Alert, Dimensions, ActivityIndicator,TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { log } from 'react-native-reanimated';

let {width, height} = Dimensions.get('window')

const URI = 'https://my-project-9710670624.df.r.appspot.com'

//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const KeeperInfo = (props)=>{   
    const checkIn = props.route.params?.checkIn
    const checkOut = props.route.params?.checkOut
    const bagCnt = props.route.params?.bagCnt
    const carrCnt = props.route.params?.carrCnt
    const keeper_id = props.route.params?.keeper
    const [keeper,setKeeper] = useState({});
    const [isLoding, setIsLoding] = useState(true);

    useEffect(()=>{
        fetch(URI+'/kstoreinfos',{
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{   
            setKeeper(responseJson[keeper_id-1])
            setIsLoding(false);
        }).catch((error)=>{
            console.error(error);
        });
    },[])
    if(isLoding){
        return(
            <View style={{ flex:1, paddingTop:20}}>
                <ActivityIndicator/>
            </View>
        )
    }
    const goReservation=()=>{
        props.navigation.navigate('DateSetting',{
            carrCnt,
            bagCnt,
            checkIn,
            checkOut,
            keeper,
            keeper_id,
            whereScreen:'info'
        });
    }
    const imgUrl = ''+keeper.keeper_store_imgurl;
       console.log(imgUrl.length);
    const test='../img/store/img5.png';    
    // const input = require(string);
        return(
            <View style={{ flex:1 }}> 
                <ScrollView stickyHeaderIndices={[0]} >
                    <View style ={styles.header}>
                        <TouchableHighlight onPress={()=>{props.navigation.goBack()}}>
                            <Icon name='keyboard-arrow-left' size={24}/>
                        </TouchableHighlight>
                    </View>
                    <View style = {styles.container}> 
                        <View style={styles.ImageWrap}>
                            {
                                imgUrl ? 
                                <Image style={styles.keeper} source={require('../img/store/img5.png')}></Image>
                                :null
                            }
                        </View>
                        <View style={styles.title}>
                            <View style={styles.starEmel}>
                                <Text>Keeper name</Text>
                                <View style={styles.starRating}>
                                    <Text>★★★★★ 5.0</Text>
                                </View>
                            </View>
                            <Text style={styles.titleFont}>{keeper.keeper_store_name}</Text>
                        </View>
                        <View style={styles.cardView}>
                            <Text>보관 가능한 시간</Text>
                            <View style={styles.inWrapView}>
                                <View>
                                    <Text>오늘</Text>
                                </View>
                                <View>
                                    <Text>{keeper.keeper_store_openinghours}</Text>
                                </View>
                            </View>
                            <View style={styles.inWrapView}>
                                <View>
                                    <Text>수하물 개수 제한</Text>
                                </View>
                                <View>
                                    <Text>
                                        가방 사이즈 x {keeper.keeper_store_bag_cnt}
                                    </Text>
                                    <Text>
                                        슈트케이스의 사이즈 x {keeper.keeper_store_bag_cnt}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.cardView}>
                            <Text>가게 정보</Text>
                            <View style={styles.inWrapView}>
                                <Text>전화기</Text>
                                <Text>{keeper.keeper_store_tel}</Text>
                            </View>
                            <View style={styles.inWrapView}>
                                <Text>위치</Text>
                                <Text>{keeper.keeper_store_address}</Text>
                            </View>
                            {/* <View style={styles.inWrapView}>
                                <Text>홈페이지,링크</Text>
                                <Text>http://www.naver.com</Text>
                            </View> */}
                        </View >
                        <View style={styles.cardView}>
                            <Text>평가</Text>
                            <View>
                                <View style={styles.rowDirection}>
                                    <Text>사진</Text>
                                    <Text>유저 네임</Text>
                                </View>
                                <View style={styles.starEmel}>
                                    <View style={styles.starRating}>
                                        <Text>★★★★★ 5.0</Text>
                                    </View>
                                    <Text>2020.4.28.</Text>                        
                                </View>
                                <View style={styles.inWrapView}> 
                                    <Text>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum commodi praesentium atque. Non porro deleniti consequatur quia assumenda fugit, voluptatibus, numquam quidem est delectus magni officia accusamus corporis, dolorum adipisci.
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.rowDirection}>
                                    <Text>사진</Text>
                                    <Text>유저 네임</Text>
                                </View>
                                <View style={styles.starEmel}>
                                    <View style={styles.starRating}>
                                        <Text>★★★★★ 5.0</Text>
                                    </View>
                                    <Text>2020.4.28.</Text>                        
                                </View>
                                <View style={styles.inWrapView}> 
                                    <Text>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum commodi praesentium atque. Non porro deleniti consequatur quia assumenda fugit, voluptatibus, numquam quidem est delectus magni officia accusamus corporis, dolorum adipisci.
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <View style={styles.rowDirection}>
                                    <Text>사진</Text>
                                    <Text>유저 네임</Text>
                                </View>
                                <View style={styles.starEmel}>
                                    <View style={styles.starRating}>
                                        <Text>★★★★★ 5.0</Text>
                                    </View>
                                    <Text>2020.4.28.</Text>                        
                                </View>
                                <View style={styles.inWrapView}> 
                                    <Text>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum commodi praesentium atque. Non porro deleniti consequatur quia assumenda fugit, voluptatibus, numquam quidem est delectus magni officia accusamus corporis, dolorum adipisci.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.floatView}>
                    <Button title={'예약하기'} buttonStyle={{backgroundColor:colors.green01}} onPress={goReservation}></Button>
                </View>
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
        borderRadius:2,
    },
    keeper:{
        width: '100%',
        height:200,
        borderRadius:5,
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
}
);

export default KeeperInfo;