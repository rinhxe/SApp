import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image } from 'react-native';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);


  const searchProducts = async () => {

    try {
      const response = await fetch('https://hungnttg.github.io/shopgiay.json');
      const data = await response.json();
      if (data && data.products) {
        const filteredProducts = data.products.filter((product) => product.product_additional_info === searchText);
        setProducts(filteredProducts);
      } else {
        console.error('Invalid data format or missing "products" property');
      }
    } catch (error) {
      console.error(error);
    }

  };

  const renderItem = ({ item }) => (
    <View style={styles.productFrame}>
      <Image source={{ uri: item.search_image }} style={styles.productImage} />
      <Text style={styles.productAdditionalInfo}>{item.product_additional_info}</Text>
      
    </View>
  );

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      <Button title="Search" onPress={searchProducts} style={styles.button} />
      {products.length < 1 && <Text>ko có sp nào</Text>}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.styleid.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginTop: 30
  },
  productFrame: {
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'gray',
  },
  productAdditionalInfo: {
    fontSize: 12,
    color: 'gray',
  },

});

export default Search;
