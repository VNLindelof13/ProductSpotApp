import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import NavBar from '../components/NavBar'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = () => {
  const [mapFocused, setMapFocused] = useState(true)
  const navigation = useNavigation()
  const [marketList, setMarketList] = useState([])
  const [marketListFiltered, setMarketListFiltered] = useState(marketList)
  const db = firebase.firestore().collection('market')
  const [selectedLocation, setSelectedLocation] = useState(null);



  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    console.log(selectedLocation)
  };


  const handleClick = () => {
    setMapFocused(!mapFocused)
  }


  useEffect(() => {

    const loadData = async () => {
      db
        .onSnapshot(
          querySnapshot => {
            const marketList = []
            querySnapshot.forEach((doc) => {
              const { name, location, corridors, latitude, longitude } = doc.data()
              marketList.push({
                id: doc.id,
                name,
                location,
                corridors, 
                latitude, 
                longitude,
              })
            })
            setMarketList(marketList)
            setMarketListFiltered(marketList)
          }
        )
    };
    loadData();
  }, [])

  const searchFilter = (text) => {
    if (text) {
      const newData = marketList.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase;
        const textData = text.toUpperCase();
        if (itemData.includes(textData)) {
          return itemData
        }
      })
      setMarketListFiltered(newData);
    } else {
      setMarketListFiltered(marketList)
    }
  }


  const handleClick2 = (item) => {
    const test = []
    navigation.navigate('SupermarketDetails', { item, test })
  }


  return (
    <View style={styles.main}>
      <NavBar
        showMenu={true} />
      <View style={styles.selector}>
        <TouchableOpacity
          onPress={handleClick}
          style={styles.buttonHeader}>
          <Text style={[styles.selectorText, mapFocused && styles.mapOff]}>
            Mapa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleClick}
          style={styles.buttonHeader}>
          <Text style={[styles.selectorText, !mapFocused && styles.mapOff]}>
            Lista
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <Icon
            style={styles.searchIcon}
            name='magnifier'
            color='#000'
            size={14} />
          <TextInput
            placeholder="Pesquisar supermercado..."
            style={styles.searchBar}
            onChangeText={searchFilter} />
        </View>
        {mapFocused ?
          (<View style={styles.mapBox}>
            {<MapView
              style={styles.mapStyles}
              onPress={handleMapPress}
              initialRegion={{
                latitude: 38.7223,
                longitude: -9.1393,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {marketListFiltered.map((marker) => (
              <Marker
                key={marker.id}
                onPress={()=>handleClick2(marker)}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
              />
            ))}
              
              {/* <Marker
                coordinate={{ latitude: 38.7223, longitude: -9.1397 }}
                title={'Pingo Doce Saldanha'}
                description={'Carregue no marcador para aceder'}
                onPress={clickMarker}
              /> */}
            </MapView>}
          </View>)
          :
          (<View style={styles.marketList}>
            <FlatList
              data={marketListFiltered}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  onPress={() => handleClick2(item)}>
                  <Text> {item.name}</Text>
                  <Text> {item.location}</Text>
                </TouchableOpacity>
              )} />

          </View>)}
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  marketList: {
    flex: 1,
    marginTop: 5,
  },
  mapBox: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  mapStyles: {
    ...StyleSheet.absoluteFillObject,
  },

  itemContainer: {
    padding: 10,
    borderColor: '#d0d0d0',
    borderWidth: 1,
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    marginVertical: 4,
  },

  placeholderText: {
    alignSelf: 'center',
    height: '95%',
  },
  searchIcon: {
    padding: 6,
    paddingLeft: 10,
    position: 'absolute',
  },
  searchBar: {
    marginLeft: 30,
  },
  searchBarContainer: {
    height: '7%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F0f0f0',
  },


  selector: {
    flexDirection: 'row',
    alignContent: 'center',
  },

  buttonHeader: {
    width: '50%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0f0f0',
    paddingVertical: 10,


  },

  selectorText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16,
  },

  main: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  mapOff: {
    color: '#26972A',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },

  button: {
    backgroundColor: '#26972A',
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
  },
})
