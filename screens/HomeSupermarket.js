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
  return (
    <View style={styles.main}>
      <NavBar
        showMenuSupermarket={true}
      />
      <View>
        <Button title="Ver Visualizações por Produto" onPress={handleNavigateToViewsByProductPage} />
      </View>
      <View>
        <Button title="Ver Visualizações Totais" onPress={handleNavigateToViewsBySupermarketPage} />
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
});
