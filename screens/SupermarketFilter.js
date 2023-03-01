import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import firebase from 'firebase'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/AntDesign';



const SupermarketFilter = (props) => {
    const item = props.route.params.supermarketInfo
    const db = firebase.firestore().collection('category')
    const [filterList, setFilterList] = useState([])
    const navigation = useNavigation()

    useEffect(() => {
        const loadData = async () => {
            db
                .onSnapshot(
                    querySnapshot => {
                        const filterListAux = []
                        querySnapshot.forEach((doc) => {
                            const { name } = doc.data()
                            filterListAux.push({
                                id: doc.id,
                                name,
                            })

                        })
                        setFilterList(filterListAux)
                    })

        };
        loadData();
    }, [])

    const handleClick = (filter) => {
        const aux = filter.id
        navigation.navigate('SupermarketDetails', { item, aux })
    }

    return (
        <View style={styles.main}>
            <NavBar
                showMenu={true}
                showBack={true}></NavBar>
            <View style={styles.list}>
                <FlatList
                    data={filterList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => handleClick(item)}
                        >
                            <Text> {item.name}</Text>
                        </TouchableOpacity>
                    )} />
            </View>

        </View>
    )
}

export default SupermarketFilter

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