import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function Home({ navigation }) {
    const products = [
        { id: 1, name: 'Product 1', price: '$10', image: 'https://example.com/product1.png' },
        { id: 2, name: 'Product 2', price: '$20', image: 'https://example.com/product2.png' },
        { id: 3, name: 'Product 3', price: '$30', image: 'https://example.com/product3.png' },
        { id: 4, name: 'Product 4', price: '$40', image: 'https://example.com/product4.png' },
        { id: 5, name: 'Product 5', price: '$50', image: 'https://example.com/product5.png' },
        { id: 6, name: 'Product 6', price: '$60', image: 'https://example.com/product6.png' },
        { id: 2, name: 'Product 2', price: '$20', image: 'https://example.com/product2.png' },
        { id: 3, name: 'Product 3', price: '$30', image: 'https://example.com/product3.png' },
        { id: 4, name: 'Product 4', price: '$40', image: 'https://example.com/product4.png' },
        { id: 5, name: 'Product 5', price: '$50', image: 'https://example.com/product5.png' },
    ];
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.cartIconContainer} onPress={() => navigation.navigate('Cart')}>
                    <FontAwesome name="shopping-cart" size={29} color="black" />
                    <View style={styles.cartCount}>
                        <Text style={styles.cartCountText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.separator}></View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {products.map((product) => (
                    <TouchableOpacity key={product.id} style={styles.productItem}>
                        <View style={styles.productFrame}>
                            <Image source={{ uri: product.image }} style={styles.productImage} />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    cartIconContainer: {
        marginBottom:10,
        position: 'relative',
        marginRight: 16,
    },
    cartCount: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    separator: {
        height: 1,
        backgroundColor: '#e81d1d',
        marginHorizontal: 16,
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        padding: 16,
    },
    productItem: {
        width: '48%',
        marginBottom: 16,
        alignItems: 'center',
    },
    productFrame: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    productPrice: {
        fontSize: 14,
        color: '#888',
    },
});
