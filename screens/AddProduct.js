import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'



const AddProduct = (props) => {
    const db = firebase.firestore().collection('products')
    useEffect(() => {
    })
    const addProduct = () => {
        db.add({
            name: 'test',
            location: 'A',
            supermarketID: '6MqbECcAg6F5JPHvfRjP',
            isValidated: false,
        })
    }
    return (
        <View style = {styles.main}>
            <NavBar
            showBack = {true}
            showMenu = {true}/>
            <View style = {styles.container}>
            <Text>AddProduct</Text>
            <TouchableOpacity
            onPress={() => addProduct()}>
                <Text>Add Product</Text>
                <Text></Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddProduct

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'white',
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
})