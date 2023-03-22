import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import Grid from '../components/Grid';


const Perfil = (props) => {
    const dbUsers = firebase.firestore().collection('users')
    const [userList, setUserList] = useState([])
    const navigation = useNavigation()


    const getGenero = (genero) => {
        switch (genero) {
            case 1:
                return (
                    <View>
                        <Text>Masculino</Text>
                    </View>
                );
            case 2:
                return (
                    <View>
                        <Text>Feminino</Text>
                    </View>
                );
            case 3:
                return (
                    <View>
                        <Text>Outro</Text>
                    </View>
                );
            case 4:
                return (
                    <View>
                        <Text>Prefiro não mencionar</Text>
                    </View>
                );
            default:
                return (
                    <View>
                        <Text>Não definido</Text>
                    </View>
                );
        }

    }

    const getDataNascimento = (dataNascimento) => {
        const date = new Date(dataNascimento.seconds * 1000)
        const dateFormated = new Date(date); // create a new Date object from the date string
        const day = dateFormated.getDate(); // get the day of the month (1-31)
        const month = dateFormated.getMonth() + 1; // get the month (0-11) and add 1 to it
        const year = dateFormated.getFullYear(); // get the year (4-digit number)
        // create a new date string with the month and day swapped
        const newDateStr = `${day}/${month}/${year}`;
        return (newDateStr)
    }

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

    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
            <View style={styles.container}>
                <Text>Pontos:</Text>
                {userList[0] && <Text>{userList[0].pontos}{"\n"}</Text>}
                <Text>Nome do Utilizador:</Text>
                {userList[0] && <Text>{userList[0].nome}{"\n"}</Text>}
                <Text>Género:</Text>
                {userList[0] && getGenero(userList[0].genero)}
                <Text>{"\n"}Data de Nascimento:</Text>
                {userList[0] && <Text>{getDataNascimento((userList[0]).dataNascimento)}{"\n"}</Text>}
            </View>
        </View>
    )
}

export default Perfil

const styles = StyleSheet.create({
    header: {
        flex: 3,
        justifyContent: 'flex-end'
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})