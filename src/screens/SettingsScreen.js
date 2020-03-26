import React,{component, Component} from 'react';
import {View,Text, ScrollView, StyleSheet} from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SettingsScreen extends Component{
    render(){
        return(
            <ScrollView style={styles.container} invertStickyHeaders={true} >
                <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium illo, optio sunt eius atque possimus nobis magni quo deleorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium illo, optio sunt eius atque possimus nobis magni quo delectus quos inventore adipisci laboriosam pariatur animi tempora porro hic quaerat odit?</Text>
                <View style={styles.wrapContent}>                    
                    <View style={styles.content}>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text><Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                        <Text>Lo214124?</Text>
                        <Text>Lo12412442</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: wp('5%'),
        backgroundColor: 'white',
    },
    wrapContent: {
        // width: wp('90%'),
        // height: wp('90%'),
        // paddingBottom: wp('5%'),
        
    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#46c3ad",
    }
})