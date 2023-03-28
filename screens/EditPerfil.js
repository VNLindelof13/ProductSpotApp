import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from '@react-native-community/datetimepicker';



const EditPerfil = (props) => {
    const dbUsers = firebase.firestore().collection('users')
    const [userDoc, setUserDoc] = useState()
    const [userList, setUserList] = useState([])
    const navigation = useNavigation()
    const [id, setID] = useState()
    const [nome, setNome] = useState()
    const [pontos, setPontos] = useState()
    const [genero, setGenero] = useState()
    const [dataNascimento, setDataNascimento] = useState()
    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState(false)
    const [fDate, setFDate] = useState('')



    const listGender = [
        { key: '1', value: 'Masculino' },
        { key: '2', value: 'Feminino' },
        { key: '3', value: 'Outro' },
        { key: '4', value: 'Prefiro não mencionar' },
    ]
    const onChange = (event, selectedDate) => {
        setShow(false)
        setSelected(true)
        setDataNascimento(selectedDate)
        setShow(Platform.OS === 'ios');
        setFDate(selectedDate.getDate() + '/' + (parseInt(selectedDate.getMonth()) + 1) + '/' + dataNascimento.getFullYear())
    }

    const showMode = () => {
        setShow(true);
    }

    const onSave = () => {
        dbUsers.doc(id).update({ nome: nome, genero: genero, dataNascimento: dataNascimento })
        navigation.goBack()
    }


    useEffect(() => {
        const loadUserData = async () => {
            dbUsers
                .onSnapshot(
                    querySnapshot => {
                        const userListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, nome, pontos, genero, dataNascimento, role } = doc.data()
                            if (id == firebase.auth().currentUser.email) {
                                setID(doc.id)
                                setNome(nome)
                                setPontos(pontos.toString())
                                setGenero(genero)
                                setDataNascimento(new Date(dataNascimento.seconds * 1000))
                                setUserDoc(doc)
                                /* userListAux.push({
                                    id,
                                    nome,
                                    pontos,
                                    genero,
                                    dataNascimento
                                }) */
                            }
                        })
                        setUserList(userListAux)
                    }
                )
        };
        loadUserData();
    }, [])

    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
            <View style={styles.container}>
                {/* <Text>Pontos:</Text>
                {pontos && 
                <TextInput
                style={styles.input}
                onChangeText={setPontos}
                value={pontos}
                placeholder={"Inserir pontos"}
              />} */}
                <Text>Nome do Utilizador:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    placeholder={"Inserir nome de Utilizador"}
                />
                <Text>Género:</Text>
                <SelectList
                    data={listGender}
                    setSelected={setGenero}
                    placeholder="Indique o seu género"
                    boxStyles={styles.inputBox}
                    boxTextStyles={styles.inputBoxText}
                    dropdownStyles={styles.inputGender}
                    dropdownItemStyles={styles.dropdownItem} />
                <Text>{"\n"}Data de Nascimento:</Text>
                <TouchableOpacity
                    onPress={showMode}
                    style={[styles.dateButton]}>
                    {selected ? <Text style={[styles.dateTextSet]}> {fDate}  </Text> : <Text style={[styles.dateText]}> Selecionar Data </Text>}
                </TouchableOpacity>
                {show && <DateTimePicker
                    style={styles.datePicker}
                    value={dataNascimento}
                    mode={'date'}
                    onChange={onChange}
                    color={'#26972A'}
                    maximumDate={new Date()} />}
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={onSave}>
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default EditPerfil

const styles = StyleSheet.create({
    dateButton:{
        borderWidth:1,
        width:150,
        height:25,
        alignItems:'center',
        justifyContent:'center'
    },

    dateTextSet:{
        textAlign:'center',
        color:'white',
    },

    saveButton: {
        marginTop:10,
        backgroundColor: 'green',
        height: 30,
        width: 120,
        textAlign: 'center',
        justifyContent: 'center'
    },
    saveButtonText: {
        textAlign: 'center',
        alignSelf: 'center',
        color:'white',
    },

    input: {
        width: 180,
        height: 30,
        textAlign: 'center',
        borderBottomColor:'black',
        borderWidth:1,
        marginBottom:10,
        marginTop:2,
    },
    header: {
        flex: 3,
        justifyContent: 'flex-end'
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainers: {
        width: '80%'
    },

    inputGender: {
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
        borderColor: 'black'
    },
})