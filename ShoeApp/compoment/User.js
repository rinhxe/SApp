import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getDatabase, off, onValue, ref } from 'firebase/database';
import firebase from '../config/FirebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';

function User({ navigation }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const auth = getAuth(firebase);
        const userId = auth.currentUser.uid;

        const database = getDatabase(firebase);
        const userRef = ref(database, `registrations/${userId}`);
        onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setUserData(userData);
            } else {
                setUserData(null);
            }
        });

        return () => {
            off(userRef);
        };
    }, []);

    const handleLogout = () => {
        navigation.navigate('Login');

    };
    const openFacebookPage = () => {
        const url = 'https://www.facebook.com/profile.php?id=100067198388586';
        Linking.openURL(url);
    };

    if (!userData) {
        return null;
    }

    return (
        <View style={styles.container}>
           
            <View style={styles.header}>

            <View style={styles.hinh}/>

                <Image
                    source={{
                        uri:
                            'https://assets.materialup.com/uploads/5b045613-' +
                            '638c-41d9-9b7c-5f6c82926c6e/preview.png',
                    }}
                    style={styles.avatar}
                />
                <Text style={styles.userId}>{userData.userId}</Text>
                <Text style={styles.userName}>{userData.fullname}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => navigation.navigate('EditProfile')}
                >
                    <Icon name="edit" size={20} color="orange" />
                    <Text style={styles.sectionText}>Chỉnh sửa thông tin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.section}
                    onPress={openFacebookPage}
                >
                    <Icon name="question-circle" size={20} color="red" />
                    <Text style={styles.sectionText}>Hỗ trợ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.section}
                    onPress={() => console.log('đổi mk')}
                >
                    <Icon name="lock" size={20} color="blue" />
                    <Text style={styles.sectionText}>Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.section} onPress={handleLogout}>
                    <Icon name="sign-out" size={20} color="violet" />
                    <Text style={styles.sectionText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default User;

const styles = StyleSheet.create({
    hinh:{
        marginTop:10,
        width: '100%',
        height: 150,
        backgroundColor:"#EBF0F0",
        borderBottomEndRadius:100, 
        borderBottomStartRadius:100,
        borderWidth: 1,
        borderColor: 'black',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop:30,
    },
    header: {
<<<<<<< HEAD
        marginBottom:20,
=======

>>>>>>> 4c7f6a916015962eb269bb01a3c7659dc38c5180
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        marginTop: 130,
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    userId: {
        marginTop: 14,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    userName: {
        fontSize: 16,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#888',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 12,
    },
    sectionText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 8,
    },
});
