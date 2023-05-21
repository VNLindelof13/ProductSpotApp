import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { firebase } from '../firebase';
import { SelectList } from 'react-native-dropdown-select-list';
import NavBar from '../components/NavBar';
import moment from 'moment';
import { BarChart } from 'react-native-chart-kit';

const StockOutGraph = () => {
  const currentUser = firebase.auth().currentUser;
  const [selectedItem, setSelectedItem] = useState(null);
  const [stockOutDates, setStockOutDates] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [itemNamesList, setItemNamesList] = useState([]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        let adminID;

        const userSnapshot = await firebase.firestore()
          .collection('users')
          .where('id', '==', currentUser.email)
          .limit(1)
          .get();

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          adminID = userData.adminID;
        }

        if (adminID) {
          const itemSnapshot = await firebase.firestore()
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
    const fetchStockOutDates = async () => {
      try {
        if (selectedItem && selectedItem.name) {
          const stockSnapshot = await firebase.firestore()
            .collection('products')
            .where('name', '==', selectedItem.name)
            .get();

          const selectedProduct = stockSnapshot.docs[0]?.data();

          if (selectedProduct && selectedProduct.stockOutDates) {
            setStockOutDates(selectedProduct.stockOutDates);
          } else {
            setStockOutDates([]);
          }
        } else {
          setStockOutDates([]);
        }
      } catch (error) {
        console.log('Error fetching stock out dates:', error);
      }
    };

    fetchStockOutDates();
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
              Stock Out Dates for: {selectedItem.name}
            </Text>
            {stockOutDates.length > 0 ? (
              <BarChart
                data={{
                  labels: stockOutDates.map((date) => moment(date).format('MMM')),
                  datasets: [
                    {
                      data: stockOutDates.map(() => 1), // One occurrence per date
                    },
                  ],
                }}
                width={360}
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
                  barPercentage: 0.3,
                }}
              />
            ) : (
              <Text style={styles.message}>No stock out dates available.</Text>
            )}
          </View>
        ) : (
          <Text style={styles.message}>Choose a product to view stock out dates.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default StockOutGraph;
