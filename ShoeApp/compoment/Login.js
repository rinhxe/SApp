import { StyleSheet, Text, View, Image,
    ImageBackground, TextInput, Button,
    TouchableHighlight,TouchableOpacity,Linking   } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Alert } from 'react-native';


const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        // Xử lý logic đăng nhập
        if (!email || !password) {
            Alert.alert('Vui lòng nhập email và mật khẩu');
            return;
        }
        const correctEmail = "admin@gmail.com";
        const correctPassword = "admin";
        if (email === correctEmail && password === correctPassword) {
            navigation.navigate('Home');
        } else {
            Alert.alert('Sai thông tin đăng nhập');
            setEmail('');
            setPassword('');
        }
    }; // end hàm đăng nhập
    const handleForgotPassword = () => {
        Linking.openURL('tel:113');
    }; // end quên mật khẩu
    return (
        <View>
            <Text style={{ fontSize: 35, textAlign: 'center', marginTop: 100, fontWeight: 'bold' }}>Welcome</Text>
            <Text style={{ fontSize: 25, textAlign: 'center' }}>My Friend</Text>
            <View style={{ flexDirection: 'row', marginTop: 64, borderWidth: 1, backgroundColor: '#f5deb3', alignSelf: 'center', borderRadius: 16 }}>
               
                <TextInput style={{ width: 280, height: 50,textAlign: 'center' }}
                    placeholder='E-mail address'
                           value={email}
                           onChangeText={setEmail}
                />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 16, borderWidth: 1, backgroundColor: '#f5deb3', alignSelf: 'center', borderRadius: 16 }}>
            
                <TextInput style={{ width: 280, height: 50 ,textAlign: 'center'}}
                    placeholder='password'               
                    secureTextEntry={true}
                           value={password}
                           onChangeText={setPassword}/>
            </View>



            <View style={{ width: 310, height: 80, marginTop: 16, alignSelf: 'center' }}>
                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.forgotPasswordButton}
                    onPress={handleForgotPassword}
                >
                    <Text style={styles.forgotPasswordText}>Forgot the password?</Text>
                </TouchableOpacity>
                  </View>

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 80 }}>
                <Text style={{ fontSize: 18 }}>

                    Don't have an account?
                    <TouchableHighlight activeOpacity={0.6}
                        underlayColor={'#1877F2'}                   >
                        <Text style={{ color: '#1877F2', fontSize: 18 }} onPress={()=>navigation.navigate('Register')} > Sign up</Text>
                    </TouchableHighlight>


                </Text>
            </View>

        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1877F2',
        borderRadius: 16,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPasswordButton: {
        marginTop: 16,
        alignSelf: 'center',
    },
    forgotPasswordText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#1877F2',
    },

})