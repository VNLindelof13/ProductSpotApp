import { FlatList, Button, StyleSheet, Text, TextInput, ScrollView, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';

const HomeSupermarket = () => {
  const navigation = useNavigation()

  const handleNavigateToViewsByProductPage = () => {
    navigation.navigate('ViewsByProduct');
  };
  const handleNavigateToViewsBySupermarketPage = () => {
    navigation.navigate('ViewsBySupermarket');
  };
  const handleNavigateToTotalViewsByProductPage = () => {
    navigation.navigate('TotalViewsByProduct');
  };
  return (
    <View style={styles.main}>
      <NavBar
        showMenuSupermarket={true}
      />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly', marginVertical: 150 }}>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToViewsByProductPage}>
          <Text style={styles.buttonText}>Ver Visualizações por Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToViewsBySupermarketPage}>
          <Text style={styles.buttonText}>Ver Visualizações Totais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNavigateToTotalViewsByProductPage}>
          <Text style={styles.buttonText}>Ver Evolução Visualizações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeSupermarket;

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
  button: {
    backgroundColor: '#26972A',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
