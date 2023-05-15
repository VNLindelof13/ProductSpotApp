import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { SelectList } from 'react-native-dropdown-select-list'




const SupermarketDetails = (props) => {
    const supermarketInfo = props.route.params.item
    const navigation = useNavigation()
    const db = firebase.firestore().collection('products')
    const [productList, setProductList] = useState([])
    const [filteredProductList, setFilteredProductList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const dbCategory = firebase.firestore().collection('category')

    const searchFilter = (text) => {
        if (text) {
            const newData = productList.filter(item => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase;
                const textData = text.toUpperCase();
                if (itemData.includes(textData)) {
                    return itemData
                }
            })
            setFilteredProductList(newData.sort());
        } else {
            setFilteredProductList(productList)
        }
    }

    const categoryFilter = (categoryList) => {
        if (categoryList) {
            if (categoryList == 0){
                setFilteredProductList(productList)
                return;
            }
            const newData = productList.filter(item => {
                if (item.category == categoryList) {
                    return item.category
                }
            })
            setFilteredProductList(newData.sort());
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
                            const { name, location, supermarketID, rating, usersValidated, category } = doc.data()
                            if (supermarketInfo.id === supermarketID) {
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
        };
        loadData();

    }, [])

    const onClickFilterItem = () => {
        navigation.navigate('SupermarketFilter', { supermarketInfo })
    }

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
                
                
        };
        loadData();
       
    }, [])

    return (
        <View style={styles.main}>
            <NavBar
                showMenu={true}
                showBack={true}></NavBar>
            <Text style={styles.name}>{supermarketInfo.name}</Text>
            <View style={styles.container}>
                <View style={styles.searchBarContainer}>
                    <Icon
                        style={styles.searchIcon}
                        name='magnifier'
                        color='#000'
                        size={14} />
                    <TextInput
                        placeholder="Pesquisar supermercado... "
                        style={styles.searchBar}
                        onChangeText={searchFilter} />
                    {/* <TouchableOpacity onPress={onClickFilterItem}>
                        <Icon2
                            style={styles.filterIcon}
                            name='filter'
                            color='#000'
                            size={20}
                        />
                    </TouchableOpacity> */}
                    <SelectList
                        data={categoryList}
                        setSelected={categoryFilter}
                        placeholder="Indique em que corredor se encontra o produto"
                        boxStyles={styles.inputBox}
                        boxTextStyles={styles.inputBoxText}
                        dropdownStyles={styles.input}
                        dropdownItemStyles={styles.dropdownItem} />
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={filteredProductList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('ProductDetails', { item })}
                            >
                                <Text> {item.name}</Text>
                                <Text> Corredor {item.location}</Text>
                            </TouchableOpacity>
                        )} />
                </View>
                <TouchableOpacity
                    style={styles.addProductButton}
                    onPress={() => navigation.navigate('AddProduct', { supermarketInfo })}>
                    <Text style={styles.buttonText}>Adicionar Produto</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SupermarketDetails

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