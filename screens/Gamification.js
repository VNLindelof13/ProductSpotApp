import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'






const Gamification = (props) => {
    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
                <View style={styles.gamificationList}>
                    <View style = {styles.box1}>
                        
                    </View>
                    <View style = {styles.box2}>

                    </View>
                    <View style = {styles.box3}>

                    </View>
                    <View style = {styles.box3}>

                    </View>
                    <View style = {styles.box1}>
                        
                        </View>
                        <View style = {styles.box2}>
    
                        </View>
                        <View style = {styles.box3}>
    
                        </View>
                        <View style = {styles.box3}>
    
                        </View>
                </View>
        </View>
    )
}

export default Gamification

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    gamificationList:{
        flex:1,
        alignSelf:'center',
        flexDirection:'row',
        width:'75%',
        height:'90%',
        borderColor:'red',
        borderWidth:10,
        blackgroundColor:'black',
        alignContent:'space-around',
        flexWrap: 'wrap',
        justifyContent:'space-around',
    },
    box1:{
        width:100,
        height:100,
        backgroundColor:'black',
    },
    box2:{
        width:100,
        height:100,
        backgroundColor:'red',
    },
    box3:{
        width:100,
        height:100,
        backgroundColor:'green',
    },
})