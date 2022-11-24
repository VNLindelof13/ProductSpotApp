import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const SupermarketDetails = (props) => {
const supermarketInfo = props.route.params.item
  return (
    <View>
      <Text>{supermarketInfo.name}</Text>
    </View>
  )
}

export default SupermarketDetails

const styles = StyleSheet.create({})