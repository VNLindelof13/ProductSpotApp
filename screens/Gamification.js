import { Alert, StyleSheet, Text, FlatList, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import firebase from 'firebase'
import NavBar from '../components/NavBar'
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'






const Gamification = (props) => {
    const dbRewards = firebase.firestore().collection('rewards')
    const dbUsers = firebase.firestore().collection('users')
    const navigation = useNavigation()
    const [rewardList, setRewardList] = useState([])
    const [userList, setUserList] = useState([])
    const [aux, setAux] = useState(0)
    const [auxKey, setAuxKey] = useState('')


    useEffect(() => {
        const loadData = async () => {
            dbRewards
                .onSnapshot(
                    querySnapshot => {
                        const rewardListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, name, points } = doc.data()
                            rewardListAux.push({
                                id,
                                name,
                                points,
                            })


                        })
                        rewardListAux.sort(function (a, b) {
                            if (a.points > b.points) return 1;
                            if (a.points < b.points) return -1;
                            if (a.points = b.points) return 0;
                        })
                        setRewardList(rewardListAux)

                    }
                )
        };
        const loadUserData = async () => {
            dbUsers
                .onSnapshot(
                    querySnapshot => {
                        const userListAux = []
                        querySnapshot.forEach((doc) => {
                            const { id, pontos } = doc.data()
                            if (id == firebase.auth().currentUser.email) {
                                setAux(pontos)
                                setAuxKey(doc.id)
                            }
                        })
                        setUserList(userListAux)
                    }
                )
        };
        loadData()
        loadUserData()

    }, [])

    const verifyAlert = (args) => {
        if (aux - args.points >= 0) {
            Alert.alert(
                "Reclamar a recompensa",
                "Esta recompensa custa " + args.points + " pontos. Quer reclamar a recompensa " + args.name + "",
                [
                    {
                        text: "Cancelar",
                        onPress: () => ({}),
                        style: "cancel"
                    },
                    { text: "Confirmo!", onPress: () => dbUsers.doc(auxKey).update({ pontos: aux - args.points }) }
                ]
            );
        }
    }
    return (
        <View style={styles.main}>
            <NavBar
                showBack={true}
                showMenu={true} />
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Bonificação</Text>
                <Text style={styles.pointsText}>{aux} pontos</Text>
            </View>
            <FlatList
                data={rewardList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => verifyAlert(item)}
                    >
                        {(aux - item.points >= 0) ?
                            <View style={styles.box1}>
                                <Text style={styles.rewardText}>Recompensa {item.name}</Text>
                                <Text style={styles.rewardText}>Pontos {item.points}</Text>
                            </View> :
                            <View style={styles.box2}><Text style={styles.rewardText}>Recompensa {item.name}</Text>
                                <Text style={styles.rewardText}>Pontos {item.points}</Text>

                            </View>}
                    </TouchableOpacity>




                )} />
        </View>
    )
}

export default Gamification

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        alignSelf: 'center',
        paddingVertical: 10,
        justifyContent: 'center'
    },
    header: {
        fontSize: 25,
    },
    pointsText: {
        textAlign: 'center',
        fontSize: 25,
    },
    rewardText: {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 15,
    },
    rewardNotText: {
        textAlign: 'center',
        letterSpacing: 1,
        fontSize: 15,
        color: 'red',
    },

    box1: {
        width: 200,
        height: 100,
        backgroundColor: `#00fa9a`,
        alignSelf: 'center',
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 15,

    },
    box2: {
        width: 200,
        height: 100,
        backgroundColor: `red`,
        alignSelf: 'center',
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 15,

    },
    box3: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
    },
})