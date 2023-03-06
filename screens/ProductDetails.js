import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import { useNavigation } from '@react-navigation/native';

const ProductDetails = (props) => {
    const validationPoints = 10
    let [productInfo, setProductInfo] = useState(props.route.params.item)
    const navigation = useNavigation()
    const db = firebase.firestore().collection('products')
    const [hasValidated, setHasValidated] = useState(productInfo.usersValidated.includes(firebase.auth().currentUser.email))
    const [isNegative, setIsNegative] = useState(productInfo.rating < 0)
    const [userList, setUserList] = useState([])
    const dbUsers = firebase.firestore().collection('users')
    const addValidation = (a) => {
        db.doc(productInfo.id).update({ usersValidated: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.email) })
        db.doc(productInfo.id).update({ rating: productInfo.rating + a })
        setHasValidated(true)
        setIsNegative(!(productInfo.rating + a))
        dbUsers.doc(userList[0].key).update({ pontos: userList[0].pontos + validationPoints })
    }
    

    useEffect(() => {
        const loadData = async () => {            
                dbUsers
                .onSnapshot(
                    querySnapshot => {
                        const userListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, nome, pontos} = doc.data()
                            if(id == firebase.auth().currentUser.email){
                            userListAux.push({
                                key: doc.id,
                                value: nome,
                                pontos,
                            })
                           
                        }
                        })
                        setUserList(userListAux)
                    }
                )
        };
        loadData();       
    }, [])

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
                <View style={styles.nameContainer}>
                    <Text style={styles.productName}>{productInfo.name}</Text>
                    <Text style={styles.productRating}>Rating da localização: {productInfo.rating}</Text>
                </View>
                {isNegative && <Text style={styles.productNegative}>Pela informação que temos, o produto pode não se encontrar neste local!</Text>}
                {!isNegative && <Text style={styles.productLocation}>Corredor: {productInfo.location}</Text>}
                <View style={styles.buttonContainer}>
                    {!hasValidated && <TouchableOpacity
                        style={styles.button}
                        onPress={verifyAlert}>
                        <Text style={styles.buttonText}>Validar Localização!</Text>
                    </TouchableOpacity>}
                </View>

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
    },
    buttonContainer: {
        width: "60%",
        marginTop: 10,
    },
    button: {
        backgroundColor: '#26972A',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },

    productName: {
        fontSize: 30,
        alignSelf: 'center',
    },
    productLocation: {
        fontSize: 20,
    },
    productNegative: {
        fontSize: 20,
        width: '80%',
        color: '#b30000',
    },
    productRating: {
        fontSize: 12,
        marginTop: -5,
        marginBottom: 15,
    },
    nameContainer: {
        width: '100%',
        alignItems: 'center',
        textAlign:'center',
    },
})