import React, {useState, useEffect} from 'react';
import {  Button, View, Text,TextInput, Alert,StyleSheet ,TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Input } from 'react-native-elements';


const LinkDBTest = (props)=>{   
//navi
    const ViewUsersList=()=>{
        props.navigation.navigate('List')
    }
    const Stack = createStackNavigator();
//navi

    const InputScreen = () => {
        const [TextInputName, setTextInputName] = useState('Useless Placeholder');
        const [TextInputEmail, setTextInputEmail] = useState('Useless Placeholder');
        const [TextInputPhoneNumber, setTextInputPhoneNumber] = useState('Useless Placeholder');

        const InsertUser=()=>{
            console.log('TextInputName : '+TextInputName);
            console.log('TextInputEmail : ' +TextInputEmail);
            console.log('TextInputPhoneNumber : '+TextInputPhoneNumber);
    
            //fetch(url,콜백함수)
            fetch('http://192.168.0.2/tr_reactnative/insert.php',{
                method: 'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    name: TextInputName,
                    email: TextInputEmail,
                    phone_number: TextInputPhoneNumber,
                })
            }).then((response)=> response.json())
            .then((responseJson)=>{
                Alert.alert(responseJson);
            }).catch((error)=>{
                console.error(error);
            });
        }
        return(
            <View style={styles.container}>
            <TextInput
                placeholder='Enter Name'
                onChangeText={TextInputValue=>setTextInputName(TextInputValue)}
                // underlineColorAndroid = 'transparent'
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
            <TouchableOpacity activeOpacity={.4} style={styles.TouchableOpacityStyle} onPress={ViewUsersList}>
                <Text style={styles.TextStyle}>List</Text>
            </TouchableOpacity>
        </View>
        );
    }

    const ViewDatauser =()=>{
        const [isLoding, setIsLoding] = useState(true);
        const [dataSource, setDataSource] = useState({})

        const navigationOptions ={
            title:'Data Users'
        }
        useEffect(()=>{
            fetch('http://192.168.0.2/tr_reactnative/view_users.php')
            .then((response)=>response.json())
            .then((responseJson)=>{
                setIsLoding(false);
                setDataSource(responseJson);
            }).catch((error)=>{
                console.error(error);
        })
        },{})
        console.log('여기는 바깥! : '+ JSON.stringify(dataSource));
        
        
        if(isLoding){
            return(
                <View style={{ flex:1, paddingTop:20}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return(
            <View style={styles.containerDataUsers}>
                <FlatList
                    data = {dataSource}
                    renderItem ={(rowData)=>(
                        <View style={styles.rowViewContainer}>
                            <Text style={styles.text}>
                                {rowData.index+1+' - '+rowData.item.name}
                                {console.log('안에값임 : '+JSON.stringify(rowData)) }
                            </Text>
                        </View>
                    )}
                />
            </View>
    );}

    return(
        <Stack.Navigator>
            <Stack.Screen name="InputS" component={InputScreen} />
            <Stack.Screen name="List" component={ViewDatauser}/>
        </Stack.Navigator>
    )
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
    },
    containerDataUsers:{
        paddingTop: 30,

    },
    rowViewContainer:{
        flex: 1, 
        borderBottomWidth : 1,
        borderColor: '#3212f6',
        paddingTop:20,
        paddingBottom:8,
    },
    text:{
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color:"gray",
    }
})
export default LinkDBTest;