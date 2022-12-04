import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import auth from 'firebase'


const ProductDetails = (props) => {
    const productInfo = props.route.params.item
    const db = firebase.firestore().collection('products')
    const [hasValidated, setHasValidated] = useState(props.route.params.item.usersValidated.includes(firebase.auth().currentUser.email))

    const addValidation = (a) => {
        db.doc(productInfo.id).update({ usersValidated: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email) })
        db.doc(productInfo.id).update({ rating: productInfo.rating + a })
        setHasValidated(true)
    }

    const verifyAlert = () => {
        Alert.alert(
            "Vericação de Localização",
            "Confirma que o produto " + productInfo.name + " está no corredor " + productInfo.location + " ?",
            [
                {
                    text: "Está incorreto!",
                    onPress: () => addValidation(-1),
                    style: "cancel"
                },
                { text: "Confirmo!", onPress: () => addValidation(1) }
            ]
        );
    }


    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
            <View style={styles.container}>
                {!hasValidated && <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={verifyAlert}>
                    <Text>Validar Localização!</Text>
                </TouchableOpacity>}
                <Text>{productInfo.name}</Text>
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
    },
})