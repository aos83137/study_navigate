import React , {Component} from 'react';
import {Text ,View, Button,StyleSheet, Image, Alert, Dimensions,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class DateSetting extends Component{
    render(){
        return(
            <View style = {styles.container}> 
                <View style={styles.backIcon}>
                    <Icon name='keyboard-arrow-left' size={24}/>
                </View>
                <View style={styles.dateView}>
                    <View>
                        <Text>체크인</Text>
                        <Text>03.31. 오후 1:30</Text>
                    </View>
                    <View>
                        <Icon name='keyboard-arrow-right' size={30}/>
                    </View>
                    <View>
                        <Text>체크아웃</Text>
                        <Text>03.31. 오후 1:30</Text>
                    </View>
                </View>
                <View style={styles.luggageView}>
                    <View><Text>가방 사이즈</Text></View>
                    <View><Text>슈트케이스의 사이즈</Text></View>
                </View>
                <View style={styles.footer}>
                    <Button title="검색" onPress={()=>{this.props.navigation.goBack()}}/>
                </View>
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container:{
        padding:'3%',
        flex:1,
        alignItems:'center',
    },
    backIcon:{
        width:'100%',
        marginBottom:'3%',
    },
    dateView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    luggageView:{
        width:'100%',
        borderTopWidth:3,
        borderColor:"rgba(33,33,33,0.3)",
        borderBottomWidth:3,
    },
    footer:{
        width:'80%',
        marginTop:'10%',
    },
})