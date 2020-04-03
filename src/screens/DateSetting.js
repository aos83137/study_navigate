import React , {Component,useState } from 'react';
import {Text ,View,StyleSheet, Image, Alert, Dimensions, TouchableHighlight} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import  colors from '../styles/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Calendar from "../components/calendar";
import DateTimePickerModal from "react-native-modal-datetime-picker";


const DateSetting = ()=>{   
    const [bagCnt, setbagCnt] = useState(0);
    const [carrCnt, setCarrCnt] = useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = date => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
        return date;
    };
    //데이터 보내야함
    //count up &down
    // cntUp(check){
    //     if (check ==='bag') {
    //         this.setState({
    //             bagCnt: this.state.bagCnt + 1,
    //         });
    //         console.log(this.state.bagCnt);
    //     }else if (check==='carr') {
    //         this.setState({
    //             carrCnt: this.state.carrCnt + 1,
    //         });
    //         console.log(this.state.carrCnt);
    //     }
    // }
    // cntDown(check){
    //     if (check ==='bag') {
    //         if (this.state.bagCnt>0) {
    //             this.setState({
    //                 bagCnt: this.state.bagCnt-1,
    //             });    
    //         }
    //     }else if (check==='carr') {
    //         if (this.state.carrCnt>0) {
    //             this.setState({
    //                 carrCnt: this.state.carrCnt-1,
    //             });    
    //         }
    //     }
    // }
        return(
            <View style = {styles.container}> 
                <View style={styles.backIcon}>
                    <Icon name='keyboard-arrow-left' size={24}/>
                </View>
                <View style={styles.dateView}>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <TouchableHighlight onPress={()=>{showDatePicker()}}>
                        <View>
                            <Text style={styles.checkText1}>체크인</Text>
                            <Text style={styles.checkText2}>03.31. 오후 1:30</Text>
                        </View>
                    </TouchableHighlight>
                    <View>
                        <Icon name='keyboard-arrow-right' size={30}/>
                    </View>
                    <TouchableHighlight onPress={()=>{showDatePicker()}}>
                        <View>
                            <Text style={styles.checkText1}>체크아웃</Text>
                            <Text style={styles.checkText2}>03.31. 오후 1:30</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.luggageView}>
                    <View style={styles.luggageWrap}>
                        <View style={styles.elem}>
                            <Icon2
                                name = "calendar"
                                color={colors.green01}
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.luggageText1}>가방 사이즈</Text>
                        </View>
                        <View style={styles.buttonElem}>
                            <Button icon={
                                <Icon2
                                    name='minus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle}
                            onPress={()=>{ bagCnt? setbagCnt(bagCnt-1) : false}}/>
                            <Text> {bagCnt? bagCnt: 0} </Text>
                            <Button icon={
                                <Icon2
                                    name='plus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle}
                            onPress={()=>{setbagCnt(bagCnt+1)}}
                            />
                        </View>
                    </View>
                    <View style={styles.luggageWrap}>
                        <View style={styles.elem}>
                            <Icon2
                                name = "shopping-bag"
                                color={colors.green01}
                                size={24}
                                style={styles.icon}
                            />
                            <Text style={styles.luggageText1}>슈트케이스의 사이즈</Text>
                        </View>
                        <View style={styles.buttonElem}>
                            <Button icon={
                                <Icon2
                                    name='minus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle} 
                            onPress={()=>{carrCnt?setCarrCnt(carrCnt-1):false}}
                            />
                            <Text> {carrCnt? carrCnt: 0} </Text>
                            <Button icon={
                                <Icon2
                                    name='plus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle}
                            onPress={()=>{setCarrCnt(carrCnt+1)}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Button buttonStyle={{backgroundColor:colors.green01}} title="검색" onPress={()=>{this.props.navigation.goBack()}}/>
                </View>
            </View>
        );
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
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:'3%',
    },
    checkText1:{
        fontSize:18,
    },
    checkText2:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.green01
    },
    luggageView:{
        width:'100%',
        paddingBottom:'4%',
        borderTopWidth:3,
        borderColor:"rgba(33,33,33,0.3)",
        borderBottomWidth:3,
    },
    luggageText1:{
        margin:'2%',
        fontSize:16,
        color: colors.black,
    },
    luggageWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:'2%',
        paddingBottom:'2%',
    },
    buttonStyle:{
        backgroundColor:colors.green01,
        height:30,
        width:30,
    },
    elem:{
        flexDirection:'row',
        alignItems:'center',
    },
    buttonElem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'25%',
    },
    footer:{
        width:'80%',
        marginTop:'10%',
        
    },
});

export default DateSetting;