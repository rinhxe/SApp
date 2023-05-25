import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { getDatabase, ref, onValue, off, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/FirebaseConfig';

function Cart({ navigation }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(0));

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
                const updatedCartProducts = cartProducts.filter((product) => product.id !== productId);
                setCartProducts(updatedCartProducts);
            })
            .catch((error) => {
                console.error('Lỗi xóa sản phẩm:', error);
            });
    };

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    return (
        <ScrollView style={styles.container}>
            {cartProducts.map((product) => (
                <View key={product.id} style={styles.productContainer}>
                    <View style={styles.productBox}>
                        <Image source={{ uri: product.search_image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                            <Text style={styles.productPrice}>{product.price} VNĐ</Text>
                            <Animated.Text
                                style={[styles.editText, { opacity: fadeAnim }]}
                                onLayout={startAnimation}
                            >
                                Nhấn vào để chỉnh sửa
                            </Animated.Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button1} onPress={() => handleBuyNow(product)}>
                                    <Ionicons name="cart-outline" size={24} color="#ff6" />
                                    <Text style={styles.buttonText1}>Mua</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => handleRemoveProduct(product.id)}>
                                    <Ionicons name="trash-outline" size={24} color="#fff" />
                                    <Text style={styles.buttonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </View>
            ))}
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 30,
    },
    productContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    productBox: {
        borderWidth: 3,
        borderColor: '#000000',
        backgroundColor: '#b2a5a5',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    productImage: {
        width: 100,
        height: 100,
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
        marginTop: 30,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    editText: {
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#f00',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#e81d1d',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    button1: {
        backgroundColor: '#0a3120',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    buttonText1: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});

export default Cart;

