import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'




const Menu = () => {
    const navigation = useNavigation()

    const handlePersonalArea  = () => {
        navigation.replace("Home")

    }
    const handleMarketList  = () => {

    }
    const handleGammification  = () => {

    }
    const handleLogout  = () => {
        auth
        .signOut()
        .then(() => {
          navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
    return (
        <View>
            <NavBar 
            showMenu={true}
            showBack={true} />
            <View style={styles.main}>
                <Text style={styles.header}>Menu</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={()=>{}}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Área Pessoal</Text>
                    </TouchableOpacity>
                </View><View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handlePersonalArea}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Supermercados </Text>
                    </TouchableOpacity>
                </View><View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={()=>{}}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Bonificação </Text>
                    </TouchableOpacity>
                </View><View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleLogout}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    main:{
        height:'100%',
        paddingTop:'30%',
        alignItems:'center',
        backgroundColor:'white'
    },
    buttonContainer: {
        width: "60%",
        marginTop: 20,
      },
    button: {
        backgroundColor: '#26972A',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
      },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
      header: {
        fontSize: 32,
      },
})