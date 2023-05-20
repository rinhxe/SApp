import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React, { useEffect } from 'react'

const SplapshScreen2 = (props) => {
  

    return (
        < View style={styles.container} >
            <Image source={require('../image/logo.png')} />
            <Text style={{ color: '#038C7F', fontSize: 20, fontWeight: 'bold', marginTop: 26 }}>Vượt Mọi Thử Thách</Text>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Sneaker Của Bạn !</Text>
            <Text style={{ color: 'white', width: 300, textAlign: 'center', marginTop: 16 }}>Hãy mang những ước mơ của bạn lên đôi chân
                để dẫn lối giấc mơ đó thành hiện thực </Text>

            <TouchableHighlight  activeOpacity={0.6} style={styles.buton} onPress={()=>  props.navigation.navigate('Login')}>
                <Text style={styles.textButon}>
                    KHÁM PHÁ NGAY
                </Text>
            </TouchableHighlight>
        </View >
    )
}

export default SplapshScreen2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
     buton: {
        marginTop:22,
        justifyContent: 'center',
        alignSelf: "center",
        width: '60%',
        height: 52,
        borderRadius: 45,
        backgroundColor: "#038C7F",

        margin: 10,
    },
    textButon: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        color: 'white',
        fontSize: 22,
        padding: 8
    }
})