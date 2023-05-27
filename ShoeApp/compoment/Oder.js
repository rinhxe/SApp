import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, off, remove, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from '../config/FirebaseConfig';

const Oder = ({ route }) => {
    const [oderProducts, setOderProducts] = useState([]);
    const auth = getAuth(firebase);
    const database = getDatabase(firebase);
    const { userId } = route.params;
    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = () => {
   


        const oderRef = ref(database, `Order/${userId}`);

        onValue(oderRef, (snapshot) => {

            const oderData = snapshot.val();

            if (oderData) {
                const products = Object.keys(oderData).map((key) => ({
                    idOrder: key,
                    ...oderData[key],
                }));

                setOderProducts(products);
                console.log(products);
            } else {
                setOderProducts([]);
            }
        });
        return () => {
            off(cartRef);
        };
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title} >ĐƠN MUA</Text>
            <View style={{ width: '100%', backgroundColor: 'black', height: 1 }} />
            <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Số lượng: 1 MẶT HÀNG</Text>
            </View>
            <ScrollView style={{ padding: 16 }}>
                {oderProducts.map((product) => (
                    <View key={product.idOrder} style={styles.productContainer}>
                        <View style={styles.productBox}>
                            <Image source={{ uri: product.search_image }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{product.brands_filter_facet}</Text>
                                <Text style={styles.productPrice}>{product.price} VNĐ</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.button1} onPress={() => handleBuyNow(product)}>
                                        <Ionicons name="cart-outline" size={24} color="#ff6" />
                                        <Text style={styles.buttonText1}>Đánh giá</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => handleRemoveProduct(product.idOrder)}>
                                        <Ionicons name="trash-outline" size={24} color="#fff" />
                                        <Text style={styles.buttonText}>Xóa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                ))}
            </ScrollView>
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
})

export default Oder;
