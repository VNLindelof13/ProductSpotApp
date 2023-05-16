import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import { Picker } from '@react-native-picker/picker';
import NavBar from '../components/NavBar'
import moment from 'moment';
import { BarChart } from 'react-native-chart-kit';

const ViewsByProduct = () => {
    const currentUser = firebase.auth().currentUser;
    const [selectedItem, setSelectedItem] = useState('');
    const [viewCounts, setViewCounts] = useState([]);
    const [itemList, setItemList] = useState([]);

    useEffect(() => {
        const fetchItemList = async () => {
            try {
                let adminID;

                const userSnapshot = await firebase
                    .firestore()
                    .collection('users')
                    .where('id', '==', currentUser.email)
                    .limit(1)
                    .get();

                if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    adminID = userData.adminID;
                }

                if (adminID) {
                    const itemSnapshot = await firebase
                        .firestore()
                        .collection('products')
                        .where('supermarketID', '==', adminID)
                        .get();

                    const items = itemSnapshot.docs.map((doc) => doc.data());
                    setItemList(items);
                }
            } catch (error) {
                console.log('Error fetching item list:', error);
            }
        };

        fetchItemList();
    }, []);


    useEffect(() => {
        const fetchViewCounts = async () => {
            try {
                if (selectedItem && selectedItem.name) {
                    const viewSnapshot = await firebase
                        .firestore()
                        .collection('products')
                        .where('name', '==', selectedItem.name)
                        .get();

                    const selectedProduct = viewSnapshot.docs[0]?.data();

                    if (selectedProduct && selectedProduct.userView) {
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

                        selectedProduct.userView.forEach((view) => {
                            const timestamp = view.timestamp.toDate();
                            const monthNumber = moment(timestamp).month() + 1;
                            countsByMonth[monthNumber]++;
                        });

                        const countsData = Object.entries(countsByMonth).map(([month, count]) => ({
                            month,
                            count,
                        }));
                        setViewCounts(countsData);
                    } else {
                        setViewCounts([]);
                    }
                } else {
                    setViewCounts([]);
                }
            } catch (error) {
                console.log('Error fetching view counts:', error);
            }
        };

        fetchViewCounts();
    }, [selectedItem]);
    return (
        <View style={styles.container}>
            <NavBar
                showMenuSupermarket={true}
                showBack={true}
            />
            <View style={styles.dropdownContainer}>
                <Picker
                    style={styles.dropdown}
                    selectedValue={selectedItem ? selectedItem.id : ''}
                    onValueChange={(itemValue) => {
                        const item = itemList.find((item) => item.id === itemValue);
                        setSelectedItem(item || null);
                    }}
                >
                    <Picker.Item label="Seleção Vazia" value="" />
                    {itemList.map((item) => (
                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                    ))}
                </Picker>

            </View>
            <View style={styles.chartContainer}>
                {selectedItem ? (
                    <BarChart
                        data={{
                            labels: viewCounts.map(({ month }) => month),
                            datasets: [
                                {
                                    data: viewCounts.map(({ count }) => count),
                                },
                            ],
                        }}
                        width={300}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            barPercentage: 0.3,

                        }}
                    />
                ) : (
                    <Text style={styles.message}>Escolha o produto para ver as visualizações por mês.</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dropdown: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 16,
        color: '#888',
    },
});

export default ViewsByProduct;