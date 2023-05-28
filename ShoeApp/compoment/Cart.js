import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { getDatabase, ref, onValue, off, remove, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/FirebaseConfig';

function Cart({ route, navigation }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(0));
    const auth = getAuth(firebase);
    const database = getDatabase(firebase);
    // const { cart } = route.params;

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = () => {
        const userId = auth.currentUser.uid;


        const cartRef = ref(database, `Cart/${userId}`);

        onValue(cartRef, (snapshot) => {

            const cartData = snapshot.val();

            if (cartData) {
                const products = Object.keys(cartData).map((key) => ({
                    id: key,
                    ...cartData[key],
                }));

                setCartProducts(products);
            } else {
                setCartProducts([]);
            }
        });
        return () => {
            off(cartRef);
        };
    }

    const handleBuyNow = () => {
        const userId = auth.currentUser.uid;

        const orderRef = ref(database, `Order/${userId}`);
        push(orderRef, cartProducts)
            .then((newRef) => {
                const orderItemId = newRef.key;
                console.log('người dùng với id:', userId);
                console.log('Đã thêm sản phẩm vào giỏ hàng:', cartProducts);
                console.log('ID của sản phẩm trong giỏ hàng:', orderItemId);
                navigation.navigate('Oder', { userId: userId });
            })
            .catch((error) => {
                console.error('Lỗi thêm sản phẩm vào đơn hàng:', error);
            });
        console.log('Đang mua sản phẩm:', cartProducts);
    }

    const handleRemoveProduct = (productId) => {
        const userId = auth.currentUser.uid;

        const cartRef = ref(database, `Cart/${userId}/${productId}`);

        remove(cartRef)
            .then(() => {
                console.log('Đã xóa sản phẩm thành công');
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

    const Sum = () => {
        let sum = 0;
        cartProducts.map((product) => {
            sum += product.price;

        })
        return sum;
    }
    const Count = () => {
        return cartProducts.length;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} >CỬA HÀNG</Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Số lượng: {Count()} MẶT HÀNG</Text>
            </View>
            <ScrollView style={{ padding: 16 }}>
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
                                    <TouchableOpacity style={styles.button} onPress={() => handleRemoveProduct(product.id)}>
                                        <Ionicons name="trash-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>Tổng:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginRight: 15 }}>{Sum()} VNĐ</Text>
            </View>

            <TouchableOpacity style={{ backgroundColor: 'black', margin: 7, padding: 15 }} onPress={() => handleBuyNow()}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                        THANH TOÁN
                    </Text>
                    <Image source={require('../image/next.png')} />
                </View>
            </TouchableOpacity>

        </View>

    );
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

