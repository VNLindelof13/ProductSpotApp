import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/core'



const NavBar = (props) => {
  const navigation = useNavigation()

  const handleClick = () => {
    navigation.navigate("Menu")
  }
  const handleClickSupermarket = () => {
    navigation.navigate("MenuSupermarket")
  }
  const handleBackClick = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.main}>
      <View style={styles.imageView}>
        <Image style={styles.imageContainer} source={require('./logo.png')} />
      </View>
      {props.showMenu && 
      <TouchableOpacity
      onPress={handleClick}>
        <Icon
          style={styles.menuIcon}
          name='menu'
          size={20}
          color={'#26972A'} />
      </TouchableOpacity>}
      {props.showMenuSupermarket && 
      <TouchableOpacity
      onPress={handleClickSupermarket}>
        <Icon
          style={styles.menuIcon}
          name='menu'
          size={20}
          color={'#26972A'} />
      </TouchableOpacity>}
      {props.showBack && 
      <TouchableOpacity
      onPress={handleBackClick}>
        <Icon2
          style={styles.left}
          name='left'
          size={20}
          color={'#26972A'} />
      </TouchableOpacity>}
    </View>
  )
}

export default NavBar

const styles = StyleSheet.create({
  main: {
    height: '10%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  menuIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginTop:'2%',
  },
  left: {
    position: 'absolute',
    alignSelf: 'flex-start',
    marginLeft: '3%',
    marginTop:'2%',
  },
  imageView: {
    marginTop: '-4%',
  },

  imageContainer: {
    alignSelf: 'center',
    position: 'absolute',
    width: 27,
    height: 40,
  },
})