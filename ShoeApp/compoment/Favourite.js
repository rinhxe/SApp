import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import firebase from '../config/FirebaseConfig';
import { getDatabase, off, onValue, ref } from 'firebase/database';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

export default function Favourite({ props }) {
  const [favProducts, setFavProducts] = useState([]);
  const auth = getAuth(firebase)
  const data = getDatabase(firebase)

  useEffect(() => {
    upData();
  }, [])

  const upData = () => {
    const userId = auth.currentUser.uid;
    const favRef = ref(data, `Favourite/${userId}`)
    onValue(favRef, (snapshot) => {
      const favData = snapshot.val();
      if (favData) {
        const products = Object.keys(favData).map((key) => ({
          id: key,
          ...favData[key]
        }));
        setFavProducts(products);
      } else {
        setFavProducts([])
      }
    });
    return () => {
      off(favRef);
    }
  }

  const Count = () => {
    return favProducts.length
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title} >DANH SÁCH YÊU THÍCH </Text>
      <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
      <Text style={{ marginTop: 15, marginLeft: 15 }}>{Count()} MẶT HÀNG</Text>

      <ScrollView style={styles.frame}>
        {favProducts.map((product) => (

          <View key={product.id} style={styles.productContainer}>
            <View style={styles.productBox}>
              <Image source={{ uri: product.search_image }} style={styles.productImage} />

              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                <Text style={styles.productPrice}>Giá: {product.price} VNĐ</Text>
                <View style={{
                  flexDirection: 'row', padding: 3, borderWidth: 1,
                  borderColor: '#000000',width:115,backgroundColor:'white'
                }}>
                  <Text style={{fontSize:13}}>Thêm vào giỏ</Text>
                  <Image style={{ width: 20, height: 20, marginLeft: 5 }} source={require('../image/addcar.png')} />
                </View>
              </View>
              <Image source={require('../image/More.png')} />
            </View>



          </View>
        ))}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: 90,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productPrice:{
    fontWeight:'bold',
    marginTop:3,
    marginBottom:3
  },
  productBox: {
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#D7D8D9',
    flexDirection: 'row',
    marginTop: 14

  },
  frame: {
    marginRight: 14,

    marginLeft: 14,
  },
  productInfo: {
    marginLeft: 14,
    width: 220
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40,
    marginLeft: 15,
    marginBottom: 7

  },
})