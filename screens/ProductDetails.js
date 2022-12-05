import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';



const ProductDetails = (props) => {
    console.log(props)
    let [productInfo, setProductInfo] = useState(props.route.params.item)
    const navigation = useNavigation()
    const db = firebase.firestore().collection('products')
    const [hasValidated, setHasValidated] = useState(productInfo.usersValidated.includes(firebase.auth().currentUser.email))
    const [isNegative, setIsNegative] = useState(productInfo.rating < 0)
    const addValidation = (a) => {
        db.doc(productInfo.id).update({ usersValidated: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email) })
        db.doc(productInfo.id).update({ rating: productInfo.rating + a })
        setHasValidated(true)
        setIsNegative(!(productInfo.rating + a))
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
                {isNegative && <Text>Pela informação que temos, o produto pode não se encontrar neste local!</Text>}
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