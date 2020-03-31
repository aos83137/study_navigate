import React, { Component } from 'react';
import colors from '../../styles/colors'
import { 
    StyleSheet,
    Text, 
    View,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PlacesAutoComplete } from '../../screens/PlacesAutoComplete';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const FS = 14;

export const SearchMenu = function(props){
    const goPlace = props.goPlace ? props.goPlace :()=> console.log('여기는 콜백 위치 검색 이벤트지');
    const goDate = props.goDate ? props.goDate : ()=> console.log('여기는 콜백 날짜 이벤트지');
    
        const whereLocation = '대구 북구 복현로';
        const date = '03/19 10:00 - 03/19 19:00';
        return(
            <View style = {styles.container}>
                <TouchableHighlight style={styles.titleSearchButton} onPress={()=> goPlace()} >
                    <View style={styles.elem}>
                        <Icon
                            name = "search"
                            color={colors.green01}
                            size={24}
                            style={styles.icon}
                        />
                        <Text style={styles.titleText}>{whereLocation}</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.titleSearchButton} onPress={()=> goDate()}>
                    <View style={styles.elem}>
                        <View style={styles.calendarView}>
                            <Icon
                                name="calendar"
                                size={24}
                                color={colors.green01}
                                style={styles.icon}
                            />
                            <Text style={styles.titleText}>
                                {date}
                            </Text>
                        </View>
                        <View style={styles.luggageView}>
                            <Icon
                                name="shopping-bag"
                                size={24}
                                color={colors.green01}
                                style={styles.icon}
                            />
                            <Text style={styles.titleText}> x0</Text>
                            <Icon
                                name="suitcase"
                                size={24}
                                color={colors.green01}
                                style={styles.icon}
                            />
                            <Text style={styles.titleText}> x1</Text>
                        </View>
                    </View>
                </TouchableHighlight>             
            </View>
        );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(255,255,255,1)',
        marginTop:'5%',
        width:"100%",
        borderRadius:5,
        borderColor:colors.round01,
        borderWidth:1.7,
    },
    titleSearchButton:{
        width:"100%",
        alignItems: 'stretch',
    },
    elem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'stretch',
        padding:"3%",
    },
    icon:{
        marginLeft:5,
    },
    titleText:{
        color: colors.green01,
        fontSize:FS,
        paddingLeft:5,
        marginTop:3,
    },
    luggageView:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end'
    },
    calendarView:{
        flexDirection:'row',
        flex:4,
    },
})