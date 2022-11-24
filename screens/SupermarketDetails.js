import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';


const SupermarketDetails = (props) => {
    const supermarketInfo = props.route.params.item
    const navigation = useNavigation()
    const db = firebase.firestore().collection('products')
    const [productList, setProductList] = useState([])
    const [filteredProductList, setFilteredProductList] = useState([])

    const searchFilter = (text) => {
        if (text) {
            const newData = productList.filter(item => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase;
                const textData = text.toUpperCase();
                if (itemData.includes(textData)) {
                    return itemData
                }
            })
            setFilteredProductList(newData);
        } else {
            setFilteredProductList(productList)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            db
                .onSnapshot(
                    querySnapshot => {
                        const productListAux = []
                        querySnapshot.forEach((doc) => {
                            const { name, location, supermarketID, isValidated } = doc.data()
                            if (supermarketInfo.id === supermarketID) {
                                productListAux.push({
                                    id: doc.id,
                                    name,
                                    location,
                                    supermarketID,
                                    isValidated,
                                })
                            }
                        })
                        setProductList(productListAux)
                        setFilteredProductList(productListAux)
                    }
                )
        };
        loadData();
    }, [])

    return (
        <View style={styles.main}>
            <NavBar
                showMenu={true}
                showBack={true}></NavBar>
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <Icon
                        style={styles.searchIcon}
                        name='magnifier'
                        color='#000'
                        size={14} />
                    <TextInput
                        placeholder="Pesquisar supermercado..."
                        style={styles.searchBar}
                        onChangeText={searchFilter} />
                </View>
                <Text style={styles.name}>{supermarketInfo.name}</Text>
                <FlatList
                    data={filteredProductList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('ProductDetails', { item })}
                       >
                            <Text> {item.name}</Text>
                            <Text> {item.location}</Text>
                        </TouchableOpacity>
                    )} />
            </View>
        </View>
    )
}

export default SupermarketDetails

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },


    name: {
        alignSelf: 'center',
    },
})