import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native'
import React, { useState, } from 'react'
import { auth, firebase } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import NavBar from '../components/NavBar'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'

const Register = () => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [genero, setGenero] = useState('')
    const [dataNascimento, setDataNascimento] = useState(new Date())
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(false)
    const [fDate, setFDate] = useState('')
    const listGender = [
        { key: '1', value: 'Masculino' },
        { key: '2', value: 'Feminino' },
        { key: '3', value: 'Outro' },
        { key: '4', value: 'Prefiro não mencionar' },
    ]


    const navigation = useNavigation()
    const db = firebase.firestore()


    const onChange = (event, selectedDate) => {
        setSelected(true)
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setDataNascimento(currentDate)
        setFDate( selectedDate.getDate() + '/' + (parseInt(selectedDate.getMonth()) + 1) + '/' + dataNascimento.getFullYear())
    }

    const showMode = () => {
        setShow(true);
    }


    const handleSignUp = () => {
        db.collection('users').add({
            id: email,
            nome: nome,
            pontos: 0,
            dataNascimento: dataNascimento,
            genero: genero,
        })
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                navigation.goBack()
            })
            .catch(error => alert(error.message))
    }

    return (
        <View style={styles.main}>
            <NavBar 
            showMenu={false}
            showBack={true} />

            <View style={styles.container}>
                
                <Text style={styles.header}>Criar Conta</Text>
                <View style={styles.inputContainers}>
                    <TextInput
                        placeholder="Nome"
                        value={nome}
                        onChangeText={text => setNome(text)}
                        style={styles.input}
                    ></TextInput>
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
                    <TextInput
                        placeholder="Confirmar Password"
                        value={password2}
                        onChangeText={text => setPassword2(text)}
                        style={styles.input}
                        secureTextEntry
                    ></TextInput>
                    <TouchableOpacity
                        onPress={showMode}
                        style={[styles.input]}>
                        {selected ? <Text style={[styles.dateTextSet]}> {fDate}  </Text> : <Text style={[styles.dateText]}> Data de Nascimento </Text> }
                    </TouchableOpacity>
                    {show && <DateTimePicker
                        style={styles.datePicker}
                        value={dataNascimento}
                        mode={'date'}
                        onChange={onChange}
                        color={'#26972A'}
                        maximumDate={new Date()} />}
                    <SelectList 
                    data={listGender}
                    setSelected={setGenero}
                    placeholder="Indique o seu género"
                    boxStyles={styles.inputBox}
                    boxTextStyles= {styles.inputBoxText}
                    dropdownStyles={styles.input}
                    dropdownItemStyles={styles.dropdownItem}/>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.button}>
                        <Text style={styles.buttonText}> Criar Conta </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },

    datePicker: {
        marginTop: 5,
    },


    container: {
        marginTop: -15,
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
    inputBox: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: 'white',        
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
    dateText: {
        color: '#a0a0a0',
        fontSize: 13,
        marginLeft:-3,
    },
    dateTextSet: {
        color: '#black',
        fontSize: 13,
        marginLeft:-3,
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