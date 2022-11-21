import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/FontAwesome';


const ArrowBack = () => {
    const navigation = useNavigation()
    const handleRetroceder = () => {
        navigation.replace("Login")

    }
    return (
        <View style={styles.retroceder}>
            <TouchableOpacity
                onPress={handleRetroceder}>
                <Icon
                    name="angle-left"
                    size={35}
                    color="#26972A" />
            </TouchableOpacity>
        </View>
    )
}

export default ArrowBack

const styles = StyleSheet.create({
    retroceder: {
        marginTop: 35,
        marginLeft: 20,
    },
})