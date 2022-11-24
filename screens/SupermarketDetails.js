import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SupermarketDetails = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  )
}

export default SupermarketDetails

const styles = StyleSheet.create({})