import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Animated, ScrollView, Switch } from 'react-native';
import { getDatabase, ref, onValue, off, remove, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/FirebaseConfig';

function Cart({ route, navigation }) {
    const [cartProducts, setCartProducts] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [selectedProducts, setSelectedProducts] = useState([]);
    const auth = getAuth(firebase);
    const database = getDatabase(firebase);

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
                    selected: false,
                }));

                setCartProducts(products);
            } else {
                setCartProducts([]);
            }
        });

        return () => {
            off(cartRef);
        };
    };

    const handleToggleSwitch = (product) => {
        const updatedProducts = cartProducts.map((item) => {
            if (item.id === product.id) {
                return {
                    ...item,
                    selected: !item.selected,
                };
            }
            return item;
        });

        setCartProducts(updatedProducts);
    };

    const handleBuyNow = () => {
        const userId = auth.currentUser.uid;
        const orderRef = ref(database, `Order/${userId}`);
<<<<<<< HEAD
        const selectedProducts = cartProducts.filter((product) => product.selected);

        push(orderRef, selectedProducts)
=======
        push(orderRef, cartProducts)
>>>>>>> a951e71a28324ad05259e3afaabd3dc2f6cd53ae
            .then((newRef) => {
                const orderItemId = newRef.key;
                console.log('Người dùng với id:', userId);
                console.log('Đã thêm sản phẩm vào giỏ hàng:', selectedProducts);
                console.log('ID của sản phẩm trong giỏ hàng:', orderItemId);
                navigation.navigate('Oder', { userId: userId });
            })
            .catch((error) => {
                console.error('Lỗi thêm sản phẩm vào đơn hàng:', error);
            });
<<<<<<< HEAD
    };
=======
        console.log('Đang mua sản phẩm:', cartProducts);
    }
>>>>>>> a951e71a28324ad05259e3afaabd3dc2f6cd53ae

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

    const sumSelectedProductsPrice = () => {
        let sum = 0;
        selectedProducts.forEach((product) => {
            sum += product.price;
        });
        return sum;
    };

    const countSelectedProducts = () => {
        return cartProducts.length;
    };

    useEffect(() => {
        // update sphẩm
        const updatedSelectedProducts = cartProducts.filter((product) => product.selected);
        setSelectedProducts(updatedSelectedProducts);
    }, [cartProducts]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GIỎ HÀNG</Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sản Phẩm Trong Giỏ Hàng: {countSelectedProducts()}</Text>
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
<<<<<<< HEAD
                                    {/*<TouchableOpacity style={styles.button1} onPress={() => handleBuyNow(product)}>*/}
                                    {/*    <Ionicons name="cart-outline" size={24} color="#ff6" />*/}
                                    {/*    <Text style={styles.buttonText1}>Mua</Text>*/}
                                    {/*</TouchableOpacity>*/}
=======
>>>>>>> a951e71a28324ad05259e3afaabd3dc2f6cd53ae
                                    <TouchableOpacity style={styles.button} onPress={() => handleRemoveProduct(product.id)}>
                                        <Ionicons name="trash-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Switch
                                style={styles.button1}
                                value={product.selected}
                                onValueChange={() => handleToggleSwitch(product)}
                            />
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15 }}>Tổng:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red', marginRight: 15 }}>
                    {sumSelectedProductsPrice()} VNĐ
                </Text>
            </View>

<<<<<<< HEAD
            <TouchableOpacity style={{ backgroundColor: 'black', margin: 7, padding: 15 }} onPress={handleBuyNowAll}>
=======
            <TouchableOpacity style={{ backgroundColor: 'black', margin: 7, padding: 15 }} onPress={() => handleBuyNow()}>
>>>>>>> a951e71a28324ad05259e3afaabd3dc2f6cd53ae
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
