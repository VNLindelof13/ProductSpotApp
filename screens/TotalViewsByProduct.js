import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import { SelectList } from 'react-native-dropdown-select-list';
import NavBar from '../components/NavBar';
import moment from 'moment';
import { LineChart } from 'react-native-chart-kit';

const ViewsByProduct = () => {
    const currentUser = firebase.auth().currentUser;
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewCounts, setViewCounts] = useState([]);
    const [itemList, setItemList] = useState([]);
    const [itemNamesList, setItemNamesList] = useState([]);
    const [totalViews, setTotalViews] = useState([]);
    const [controlVariable, setControlVariable] = useState(false)

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
                    const itemsNames = itemSnapshot.docs.map((doc) => doc.data().name);
                    setItemList(items);
                    setItemNamesList(itemsNames);
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

                        const countsData = Object.entries(countsByMonth).map(
                            ([month, count]) => ({
                                month,
                                count,
                            })
                        );
                        setViewCounts(countsData);

                        const totalViewsData = Object.values(countsByMonth).reduce(
                            (acc, curr) => acc + curr,
                            0
                        );
                        setTotalViews(totalViewsData);
                    } else {
                        setViewCounts([]);
                        setTotalViews(0);
                    }
                } else {
                    setViewCounts([]);
                    setTotalViews(0);
                }
            } catch (error) {
                console.log('Error fetching view counts:', error);
            }
        };

        fetchViewCounts();
        console.log(viewCounts)
    }, [selectedItem]);


    const handleSelector = (itemName) => {
        setSelectedItem(itemList.find((item) => item.name === itemName));
    };

    return (
        <View style={styles.container}>
            <NavBar showMenuSupermarket={true} showBack={true} />
            <View style={styles.dropdownContainer}>
                <SelectList
                    data={itemNamesList}
                    setSelected={handleSelector}
                    boxStyles={styles.inputBox}
                    boxTextStyles={styles.inputBoxText}
                    dropdownStyles={styles.input}
                    dropdownItemStyles={styles.dropdownItem}
                />
            </View>
            <View style={styles.chartContainer}>
                {selectedItem ? (
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, marginBottom: 10, color: '#26972A' }}>
                            Views by Product: {selectedItem.name}
                        </Text>
                        {viewCounts.length > 0 ? (
                            <LineChart
                                data={{
                                    labels: viewCounts.map(({ month }) => month),
                                    datasets: [
                                        {
                                            data: viewCounts.map(({ count }) => count),
                                        },
                                    ],
                                }}
                                width={380}
                                height={200}
                                chartConfig={{
                                    backgroundColor: '#26972A',
                                    backgroundGradientFrom: '#26972A',
                                    backgroundGradientTo: '#26972A',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                bezier
                            />
                        ) : (
                            <Text style={styles.message}>A carregar gráfico</Text>
                        )}
                        <Text style={{ fontSize: 18, marginTop: 10 }}>
                            Total Views: {totalViews}
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.message}>
                        Escolha o produto para ver as visualizações por mês.
                    </Text>
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
        marginTop: 10,
        marginBottom: 16,
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