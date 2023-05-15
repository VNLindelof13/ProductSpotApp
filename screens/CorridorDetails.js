import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'




const CorridorDetails = (props) => {
    const corridorInfo = props.route.params.item
    const navigation = useNavigation()
    const db = firebase.firestore().collection('products')
    const supermarketInfo = props.route.params.supermarketInfo.id
    const [productList, setProductList] = useState([])
    const [filteredProductList, setFilteredProductList] = useState([])


    useEffect(() => {
        const loadData = async () => {
            db
                .onSnapshot(
                    querySnapshot => {
                        const productListAux = []
                        querySnapshot.forEach((doc) => {
                            const { name, location, supermarketID, rating, usersValidated, category } = doc.data()
                            if ((supermarketInfo === supermarketID) && location == corridorInfo ) {
                                console.log("HERE")
                                productListAux.push({
                                    id: doc.id,
                                    name,
                                    location,
                                    supermarketID,
                                    rating,
                                    usersValidated,
                                    category,
                                })

                            }
                        })
                        productListAux.sort(function (a, b) {
                            if (a.rating > b.rating) return -1;
                            if (a.rating < b.rating) return 1;
                            if (a.rating = b.rating) return 0;
                        })
                        setProductList(productListAux)
                        setFilteredProductList(productListAux)
                    }
                )
        }
        loadData()
    }, [])



    return (
        <View style={styles.main}>
            <NavBar
                showMenu={true}
                showBack={true}></NavBar>
            <Text style={styles.name}>Corridor {corridorInfo}</Text>
            <FlatList
                        data={productList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('ProductDetails', { item })}
                            >
                                {/* <Text> {item.name}</Text> */}
                                <Text> Corredor {item.name}</Text>
                            </TouchableOpacity>
                        )} />
        </View>
    )
}

export default CorridorDetails

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
    },

    name: {
        marginTop: 10,
        fontSize: 30,
        fontWeight: '500',
        color: '#26972A',
        alignSelf: 'center',
    },

    searchIcon: {
        marginLeft: 10,
    },
    filterIcon: {
        marginLeft: '42%',
        alignSelf: 'flex-end',
    },

    searchBar: {
        marginLeft: 10,
    },

    searchBarContainer: {
        borderWidth: 1,
        borderColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center'
    },

    list: {
        flex: 3,
    },

    itemContainer: {
        padding: 10,
        borderColor: '#d0d0d0',
        borderWidth: 1,
        borderRadius: 10,
        width: '95%',
        alignSelf: 'center',
        marginVertical: 4,
        alignItems: 'center'
    },

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
})