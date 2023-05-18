import React, { useState } from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSignup = () => {
        // Xử lý đăng ký
    };
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 35, textAlign: 'center', marginTop: 20,marginBottom: 50, fontWeight: 'bold' }}>Register</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <View style={{ width: 310, height: 80, marginTop: 16, alignSelf: 'center' }}>
                <Button color={'#1877F2'} title='Sign Up' onPress={handleSignup} />
            </View>
        </View>
    );
}

export default Register;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height : 50,
        width: '20%',
        borderColor: 'blue',
        borderWidth: 2,
        marginBottom:50,
        backgroundColor: '#FFCCCC',
        borderRadius:50,
        textAlign:'center',
        flexDirection: 'row',
        alignSelf: 'center'
    },
});