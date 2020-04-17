import React , {useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, FlatList, Alert, Dimensions, TouchableOpacity} from 'react-native';

let {width, height} = Dimensions.get('window')

const DATA = [
    {
        id: '0',
        title: '영진 펀샵 5층 store',
        date:'2020-05-14 ~ 2020-05-15',
        state:'예약',
        carrCnt:1,
        bagCnt:1,
        checkIn:new Date(),
        checkOut:new Date(),
        img:'../img/img2.png'
    },
    {
        id: '1',
        title: '맘스터치 일본취업반 점',
        date:'2020-04-13 ~ 2020-05-14',
        state:'보관 중',
        carrCnt:1,
        bagCnt:1,
        checkIn:new Date(),
        checkOut:new Date(),
        img:'../img/img2.png'

    },
    {
        id: '2',
        title: '킹PC 일본취업점',
        date:'2020-04-10 ~ 2020-04-11',
        state:'종료',
        carrCnt:1,
        bagCnt:1,
        checkIn:new Date(),
        checkOut:new Date(),
        img:'../img/img2.png'

    },
    {
        id: '3',
        title: '투썸 회의실 store',
        date:'2020-04-5 ~ 2020-04-6',
        state:'종료',
        carrCnt:1,
        bagCnt:1,
        checkIn:new Date(),
        checkOut:new Date(),
        img:'../img/img2.png'

    },
    {
        id: '4',
        title: '캡스톤 대신해드립니다',
        date:'2020-03-14 ~ 2020-03-15',
        state:'종료',
        carrCnt:1,
        bagCnt:1,
        checkIn:new Date(),
        checkOut:new Date(),
        img:'../img/img2.png'

    },
];
const Action_Click=(data,props)=> {
    props.navigation.navigate('Reservation',{
        data,
        whereScreen:'info',
    })
}
function Item({item,props}){
    return (
        <View style={styles.item}>
            <TouchableOpacity 
                onPress={()=>{
                    props.navigation.navigate('Reservation',{
                        data:item,
                        whereScreen:'info',
                    })                    }
                }
            >
                <View>
                    <View style={styles.tableView}>
                        <View style={{ flex:3 }}>
                            <Text style = {styles.titleText}>{item.title}</Text>
                            <Text style={styles.titleDate}>{item.date}</Text>
                        </View>
                        <View style={{ flex:1 }}>
                            <Text style = {styles.titleText}>상태</Text>
                            <Text style={styles.stateText}>{item.state}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const InfoScreen = (props)=>{   
    return(
        <View style={styles.container}> 
            <FlatList
                data={DATA}
                renderItem={({item}) =>(<Item item={item} props={props}/>)}
                keyExtractor={item=>item.id}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    item:{
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginTop:10,
        marginHorizontal: 10,
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