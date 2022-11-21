import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import Icon from 'react-native-vector-icons/FontAwesome';
import ArrowBack from '../components/arrowBack';

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigation = useNavigation()
  const handleForgotPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent")
        console.log('Recovery email sent to ' + email);
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }
  
  return (
    <View style={styles.main}>
      <ArrowBack/>
      <View style={styles.container}>
        <Text style={styles.header}>Recuperar Password</Text>
        <View style={styles.inputContainers}>
          <TextInput
            placeholder="E-mail de recuperação"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },


  container: {
    marginTop: -35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    marginBottom: 30,
  },

  inputContainers: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  button: {
    backgroundColor: '#26972A',
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  rewind: {
    marginTop: 5,
  },

})