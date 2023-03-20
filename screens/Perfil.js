import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'


const Perfil = (props) => {
    const dbUsers = firebase.firestore().collection('users')
    const [userList, setUserList] = useState([])



    useEffect(() => {

        const loadUserData = async () => {
            dbUsers
                .onSnapshot(
                    querySnapshot => {
                        const userListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, nome, pontos, genero, dataNascimento } = doc.data()
                            if (id == firebase.auth().currentUser.email) {
                                userListAux.push({
                                    id,
                                    nome,
                                    pontos,
                                    genero,
                                    dataNascimento
                                })
                            }
                        })
                        setUserList(userListAux)
                    }
                )
        };


        loadUserData();

    }, [])



    const navigation = useNavigation()

    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
            {userList[0] &&<Text> {userList[0].nome}</Text>}
        </View>
    )
}

export default Perfil

const styles = StyleSheet.create({
    addProductButton: {
        backgroundColor: '#26972A',
        paddingVertical: 10,
        marginVertical: 30,
        borderRadius: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    header: {
        flex: 3,
        justifyContent: 'flex-end'
    },
    name: {
        fontSize: 30,
        fontWeight: '500',
        color: '#26972A',
        alignSelf: 'center',
        textAlign: 'center',
    },
    formInput: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 10,
        width: "70%",
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {

        flex: 5,
        alignItems: 'center',
    },
})