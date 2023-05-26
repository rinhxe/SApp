import React from 'react'
import { View, StyleSheet, Text } from "react-native";

export default function Favourite() {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >DANH SÁCH YÊU THÍCH </Text>
      <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
      <View style={{ margin: 15, flexDirection: 'row' }}>
        <Text>1 </Text>
        <Text>MẶT HÀNG</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 7

  },
})