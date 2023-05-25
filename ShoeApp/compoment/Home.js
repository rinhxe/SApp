import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function Home({ navigation }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://hungnttg.github.io/shopgiay.json')
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleProductPress = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    return (
        <View style={styles.container}>
            {/*<View style={styles.header}>*/}
            {/*    <TouchableOpacity style={styles.userIconContainer} onPress={() => navigation.navigate('User')}>*/}
            {/*        <FontAwesome name="user" size={29} color="black" />*/}
            {/*    </TouchableOpacity>*/}
            {/*    <TouchableOpacity style={styles.cartIconContainer} onPress={() => navigation.navigate('Cart')}>*/}
            {/*        <FontAwesome name="shopping-cart" size={29} color="black" />*/}
            {/*        <View style={styles.cartCount}>*/}
            {/*            <Text style={styles.cartCountText}>3</Text>*/}
            {/*        </View>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <View style={styles.separator}></View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {products.map((product) => (
                    <TouchableOpacity key={product.styleid} style={styles.productItem} onPress={() => handleProductPress(product)}>
                        <View style={styles.productFrame}>
                            <Image source={{ uri: product.search_image }} style={styles.productImage} />
                            <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                            <Text style={styles.productAdditionalInfo}>{product.product_additional_info}</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    userIconContainer: {},
    cartIconContainer: {
        marginBottom: 10,
        position: 'relative',
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
        marginTop:30,
    },
    productItem: {
        width: '48%',
        height: 300,
        marginBottom: 16,
        alignItems: 'center',
    },
    productFrame: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 8,
        padding: 16,
        width: '100%',
        height: '100%',
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
    productAdditionalInfo: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
});
