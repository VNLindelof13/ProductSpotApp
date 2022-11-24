import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'

const SupermarketDetails = (props) => {
    const supermarketInfo = props.route.params.item
    return (
        <View style={styles.main}>
            <NavBar
                showMenu={true}
                showBack={true}></NavBar>
            <View style={styles.container}>
                <Text style={styles.name}>{supermarketInfo.name}</Text>
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