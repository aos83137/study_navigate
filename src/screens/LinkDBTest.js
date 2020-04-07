import React, {useState, useEffect} from 'react';
import {  Button, View, Text,TextInput, Alert,StyleSheet ,TouchableOpacity} from 'react-native';

import {StackNavigator} from '@react-navigation/stack';


const LinkDBTest = (props)=>{   
    const [TextInputName, setTextInputName] = useState('');
    const [TextInputEmail, setTextInputEmail] = useState('');
    const [TextInputPhoneNumber, setTextInputPhoneNumber] = useState('');

    const InsertUser=()=>{
        console.log('TextInputName : '+TextInputName);
        console.log('TextInputEmail : ' +TextInputEmail);
        console.log('TextInputPhoneNumber : '+TextInputPhoneNumber);

    }

    return(
        <View style={styles.container}>
            <TextInput
                placeholder='Enter Name'
                onChangeText={TextInputValue=>setTextInputName(TextInputValue)}
                underlineColorAndroid = 'transparent'
                style={styles.textInputStyle2}
            />
            <TextInput
                placeholder='Enter Email'
                onChangeText={TextInputValue=>setTextInputEmail(TextInputValue)}
                underlineColorAndroid = 'transparent'
                style={styles.textInputStyle}
            />
            <TextInput
                placeholder='Enter PhoneNumber'
                onChangeText={TextInputValue=>setTextInputPhoneNumber(TextInputValue)}
                underlineColorAndroid = 'transparent'
                style={styles.textInputStyle}
            />
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={InsertUser}>
                <Text style={styles.TextStyle}>SAVE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
        marginTop:5,
        backgroundColor:'#fff',
    },
    textInputStyle:{
        textAlign:'center',
        marginBottom:7,
        width:'90%',
        height:40,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ff5722'
    },
    textInputStyle2:{
        textAlign:'center',
        marginTop:20,
        marginBottom:7,
        width:'90%',
        height:40,
        borderWidth:1,
        borderRadius:5,
        borderColor:'#ff5722'
    },
    TextStyle:{
        color:'#fff',
        textAlign:'center',
    },
    TouchableOpacityStyle:{
        paddingTop:10,
        paddingBottom:10,
        borderRadius:5,
        margin:7,
        width:'90%',
        backgroundColor : '#00BCD4'
    }
})
export default LinkDBTest;