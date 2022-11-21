import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import NavBar from '../components/NavBar'



const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()
  const [isLogin,setIsLogin] = useState(true)

  const handleSignUp = () => {
    navigation.navigate("Register")
  }

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword")
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword("teste@gmail.com", "123456")
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with ' + user.email);
        navigation.replace("Home")
      })
      .catch(error => alert(error.message))
    setIsLogin(false)
    /* auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with ' + user.email);
        navigation.replace("Home")
      })
      .catch(error => alert(error.message)) */
  }
  return (
  <View style = {styles.body}>
    <NavBar isLogin/>
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <Text style={styles.header}>Iniciar Sessão</Text>
      <View style={styles.inputContainers}>
        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}> Iniciar Sessão </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerContainer}>
        <Text>Não tens conta? <Text style={styles.registerTextClick} onPress={handleSignUp}>Regista-te </Text>
        </Text>
      </View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.buttonOutlineText}>Esqueci-me da password</Text>
      </TouchableOpacity>


    </KeyboardAvoidingView>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor:'#fff',

  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    fontSize: 32,
    marginBottom: 30,
  },

  inputContainers: {
    width: '80%',
  },

  input: {
    backgroundColor:'#f4f4f4',
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

  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },

  registerTextClick: {
    color: '#26972A',
    fontWeight: '700',
    fontSize: 16,
  },

  registerContainer: {
    marginTop: 10,

  },

  registerText: {
    fontSize: 16,
  },
})