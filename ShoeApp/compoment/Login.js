import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, TouchableHighlight } from 'react-native'
import React from 'react'
import { useState } from 'react'

const Login = ({ navigation }) => {
    const handleLogin = () => {
        // Xử lý logic đăng nhập tại đây
    };
    return (
        <View>
            <Text style={{ fontSize: 35, textAlign: 'center', marginTop: 100, fontWeight: 'bold' }}>Welcome</Text>
            <Text style={{ fontSize: 25, textAlign: 'center' }}>the news app</Text>
            <View style={{ flexDirection: 'row', marginTop: 64, borderWidth: 1, backgroundColor: '#f5deb3', alignSelf: 'center', borderRadius: 16 }}>
               
                <TextInput style={{ width: 280, height: 50 }}
                    placeholder='E-mail address' />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 16, borderWidth: 1, backgroundColor: '#f5deb3', alignSelf: 'center', borderRadius: 16 }}>
            
                <TextInput style={{ width: 280, height: 50 }}
                    placeholder='password'               
                    secureTextEntry={true} />
            </View>



            <View style={{ width: 310, height: 80, marginTop: 16, alignSelf: 'center' }}>
                <Button color={'#1877F2'} title='Sign In' onPress={handleLogin} />
                <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 16 }}>Forgot the password?</Text>
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

})