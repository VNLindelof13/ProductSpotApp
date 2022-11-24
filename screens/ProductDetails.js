import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'

const ProductDetails = (props) => {
    const productInfo = props.route.params.item

    return (
        <View style={styles.main}>
            <NavBar
            showBack = {true}
            showMenu = {true}/>
            <View style={styles.container}>
                <Text>{productInfo.name}</Text>
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})