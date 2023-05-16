import { StyleSheet, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

const ViewsBySupermarket = () => {
    const currentUser = firebase.auth().currentUser;
    const [userViewCounts, setUserViewCounts] = useState([]);
    const windowWidth = useWindowDimensions().width;
    const navigation = useNavigation()



    useEffect(() => {
        const fetchUserViewCounts = async () => {
            try {
                const userSnapshot = await firebase
                    .firestore()
                    .collection('users')
                    .where('id', '==', currentUser.email)
                    .limit(1)
                    .get();
                if (!userSnapshot.empty) {
                    const adminID = userSnapshot.docs[0].data().adminID;

                    const productSnapshot = await firebase
                        .firestore()
                        .collection('products')
                        .where('supermarketID', '==', adminID)
                        .get();
                    const countsByMonth = {
                        1: 0,
                        2: 0,
                        3: 0,
                        4: 0,
                        5: 0,
                        6: 0,
                        7: 0,
                        8: 0,
                        9: 0,
                        10: 0,
                        11: 0,
                        12: 0,
                    };


                    productSnapshot.forEach((doc) => {
                        const product = doc.data();
                        if (product.userView && Array.isArray(product.userView)) {
                            product.userView.forEach((view) => {
                                const timestamp = view.timestamp.toDate();
                                const monthNumber = moment(timestamp).month() + 1;
                                countsByMonth[monthNumber]++;
                            });
                        }
                    });
                    setUserViewCounts(Object.entries(countsByMonth));
                }
            } catch (error) {
                console.log('Error fetching userView counts:', error);
            }
        };

        fetchUserViewCounts();
    }, [currentUser.email]);

    return (
        <View style={styles.main}>
            <NavBar
                showMenuSupermarket={true}
                showBack={true}

            />
            <ScrollView horizontal>
                <View style={styles.chartContainer}>
                    <BarChart
                        data={{
                            labels: userViewCounts.map(([month]) => month),
                            datasets: [
                                {
                                    data: userViewCounts.map(([_, count]) => count),
                                },
                            ],
                        }}
                        width={windowWidth}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#26972A',
                            backgroundGradientFrom: '#26972A',
                            backgroundGradientTo: '#26972A',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForLabels: {
                                fontSize: 13,
                            },
                            propsForVerticalLabels: {
                                fontSize: 13,
                            },
                            barPercentage: 0.5,
                            chartValues: {
                                // Function to format the value displayed on the bar
                                format: (value, _) => value,
                                // Function to get the color of the value displayed on the bar
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            },
                        }}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default ViewsBySupermarket;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 10,
        marginTop: '30%',

    },
});
