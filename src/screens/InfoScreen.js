import React , {useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, FlatList, Alert, ActivityIndicator,Dimensions, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-community/async-storage';


let {width, height} = Dimensions.get('window')
const URI = 'https://my-project-9710670624.df.r.appspot.com'

const Action_Click=(data,props)=> {
    props.navigation.navigate('Reservation',{
        data,
        whereScreen:'info',
    })
}
function Item({keepers,item,props}){
    let status;
    let name = keepers[item.keeper_store_id-1].keeper_store_name;
    let time = item.check_in
    let checkIn = item.check_in.split(' ')[0]
    let checkOut = item.check_out.split(' ')[0]
    
    if(item.reservation_status=='keeper_reservation'){
        status = '예약 완료';
    }else if(item.reservation_status=='in_delivery'){
        status = '배달 중';
    }else if(item.reservation_status=='keeper_keeping'){
        status = '보관 중';
    }else{
        status = '종료';
    }
    return (
        <View style={styles.item}>
            <TouchableOpacity 
                onPress={()=>{
                    
                    props.navigation.navigate('Reservation',{
                        data:keepers[item.keeper_store_id-1],
                        reservation:item,
                        state:item.reservation_status,
                        whereScreen:'info',
                    })                    }
                }
            >
                <View>
                    <View style={styles.tableView}>
                        <View style={{ flex:3 }}>
                            <Text style = {styles.titleText}>{name}</Text>
                            <Text style={styles.titleDate}>{checkIn+'~'+checkOut}</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <Text style = {styles.titleText}>상태</Text>
                            <Text style={styles.stateText}>
                                {status}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const InfoScreen = (props)=>{   
    const [reservations,setReservations] = useState();
    const [keepers, setKeepers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const stateTest = props.route.params?.stateTest;

    const stateToken=async()=>{
        let tt  =await AsyncStorage.getItem('@status');
        console.log('토큰 테스트',tt);
    }

    useEffect(()=>{
        stateToken()
        fetch(URI+'/reservations',{
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{         
            setReservations(responseJson.reverse());
        }).catch((error)=>{
            console.error(error);
        });

        fetch(URI+'/kstoreinfos',{
            method:"get",
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
        })
        .then((response)=>response.json())
        .then((responseJson)=>{         
            // console.log(responseJson);
            setKeepers(responseJson)
            setIsLoading(false);
        }).catch((error)=>{
            console.error(error);
        });
        
        return ()=>{
            console.log('삭제됨 info');
        }
    },[props])
    if(isLoading){
        return(
            <View style={{ flex:1, paddingTop:20}}>
                <ActivityIndicator/>
            </View>
        )
    }
    return(
        <View style={styles.container}> 
            <FlatList
                data={reservations}
                renderItem={({item}) =>(<Item keepers={keepers} item={item} props={props}/>)}
                keyExtractor={item=>item.id}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'white'
    },
    item:{
        backgroundColor: colors.white,
        padding: 20,
        marginTop:10,
        marginHorizontal: 10,
        shadowColor:'#000000',
        shadowOpacity: 1.0,
        shadowRadius:5,
        elevation: 7,
    },
    tableView:{ 
        flex:1, 
        width:'100%', 
        flexDirection:'row',
        justifyContent:'center',
        // backgroundColor:'gray',
        justifyContent:'space-between',
    },
    titleText:{
        fontSize:20,
    },
    titleDate:{
        fontSize:16,
        color:'gray'
    },
    stateText:{
        fontSize:16,
    },
});

export default InfoScreen;