import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

function ProductDetail({ route }) {
    const { product } = route.params;

    const addToCart = () => {
        // Xử lý thêm sản phẩm vào giỏ hàng
        console.log('Sản phẩm đã được thêm vào giỏ hàng:', product);
    };

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.search_image }} style={styles.productImage} />
            <Text style={styles.productName}>{product.brands_filter_facet}</Text>
            <Text style={styles.productPrice}>{product.price}</Text>
            <Text style={styles.productAdditionalInfo}>{product.product_additional_info}</Text>

            <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                <Text style={styles.addToCartButtonText}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ProductDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    productImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    productPrice: {
        fontSize: 18,
        color: '#888',
        marginTop: 8,
    },
    productAdditionalInfo: {
        fontSize: 14,
        marginTop: 8,
    },
    addToCartButton: {
        backgroundColor: '#e81d1d',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 16,
    },
    addToCartButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
