import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'






const AddProduct = (props) => {
    const addingPoints = 10
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [userList, setUserList] = useState([])
    const [category, setCategory] = useState()
    const dbCategory = firebase.firestore().collection('category')
    const dbUsers = firebase.firestore().collection('users')


    useEffect(() => {
        const loadData = async () => {
            dbCategory
                .onSnapshot(
                    querySnapshot => {
                        const categoryListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, name } = doc.data()
                            categoryListAux.push({
                                key: id,
                                value: name
                            })
                        })
                        setCategoryList(categoryListAux)
                    }
                )
                dbUsers
                .onSnapshot(
                    querySnapshot => {
                        const userListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, nome, pontos, genero, dataNascimento } = doc.data()
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



    const navigation = useNavigation()
    const db = firebase.firestore().collection('products')
    const list = props.route.params.supermarketInfo.corridors
    const addProduct = () => {
        if (category == undefined) {
            Alert.alert("Localização Inválida", "Deverá selecionar uma localização para o produto.")
            return
        }
        if (name.length >= 3) {
            db.add({
                name: name,
                location: location,
                supermarketID: props.route.params.supermarketInfo.id,
                rating: 0,
                usersValidated: [firebase.auth().currentUser.email],
                category: category,
            })
            dbUsers.doc(userList[0].key).update({ pontos: userList[0].pontos + addingPoints })
            navigation.goBack()
        } else {
            Alert.alert("Muito Curto", "O nome do produto deve ter pelo menos 3 caracteres.")
        }

    }

    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
            <View style={styles.header}>
                <Text style={styles.name}>Adicionar produto {"\n" + props.route.params.supermarketInfo.name}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={styles.container}>
                <TextInput
                    style={styles.formInput}
                    onChangeText={setName}
                    placeholder="Nome do Produto"
                />
                <SelectList
                    data={list}
                    setSelected={setLocation}
                    placeholder="Indique em que corredor se encontra o produto"
                    boxStyles={styles.inputBox}
                    boxTextStyles={styles.inputBoxText}
                    dropdownStyles={styles.input}
                    dropdownItemStyles={styles.dropdownItem} />
                <SelectList
                    data={categoryList}
                    setSelected={setCategory}
                    placeholder="Indique qual a categoria do produto"
                    boxStyles={styles.inputBox}
                    boxTextStyles={styles.inputBoxText}
                    dropdownStyles={styles.input}
                    dropdownItemStyles={styles.dropdownItem} />
                <TouchableOpacity
                    style={styles.addProductButton}
                    onPress={addProduct}>
                    <Text style={styles.buttonText}> Adicionar Produto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddProduct

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