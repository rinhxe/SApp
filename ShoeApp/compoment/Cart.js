import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue, off, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from '../config/FirebaseConfig';

function Cart({ navigation }) {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const auth = getAuth(firebase);
        const userId = auth.currentUser.uid;

        const database = getDatabase(firebase);
        const cartRef = ref(database, `Cart/${userId}`);
        onValue(cartRef, (snapshot) => {
            const cartData = snapshot.val();
            if (cartData) {
                const products = Object.values(cartData);
                setCartProducts(products);
            } else {
                setCartProducts([]);
            }
        });
        return () => {
            off(cartRef);
        };
    }, []);

    const handleBuyNow = (product) => {
        console.log('Đang mua sản phẩm:', product);
    };
        const handleRemoveProduct = (productId) => {
            const auth = getAuth(firebase);
            const userId = auth.currentUser.uid;

            const database = getDatabase(firebase);
            const cartRef = ref(database, `Cart/${userId}/${productId}`);


            remove(cartRef)
                .then(() => {
                    console.log('Đã xóa sản phẩm thành công');
                })
                .catch((error) => {
                    console.error('Lỗi xóa sản phẩm:', error);
                });
        };


    return (
        <View style={styles.container}>
            {cartProducts.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                    <View style={styles.productBox}>
                        <Image source={{ uri: product.search_image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.buyNowButton}
                            onPress={() => handleBuyNow(product)}
                        >
                            <Text style={styles.buyNowButtonText}>Mua Ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => handleRemoveProduct(product.id)}
                        >
                            <Text style={styles.removeButtonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    productContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    productBox: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    productImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 18,
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buyNowButton: {
        backgroundColor: '#e81d1d',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 8,
        alignSelf: 'flex-end',
    },
    buyNowButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginTop: 8,
        alignSelf: 'flex-end',
    },
    removeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Cart;
