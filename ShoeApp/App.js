import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import SplashScreen from './compoment/SplashScreen';
import Login from './compoment/Login';
import Register from "./compoment/Register";
import Home from "./compoment/Home";
import Cart from "./compoment/Cart";
import ProductDetail from "./compoment/ProductDetail";
import SplapshScreen2 from './compoment/SplashScreen2';
import User from "./compoment/User";
import TabNavi from './TabNavi';
import ChatScreen from "./compoment/ChatScreen";
<<<<<<< HEAD
import ChangePassword from "./compoment/ChangePassword";
=======
import Oder from './compoment/Oder';
>>>>>>> f4152b6c25dfcef8e18d812c9f642dbb08f89b84

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
<<<<<<< HEAD
          <Stack.Screen name='SplashScreen2' component={SplapshScreen2} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login}  options={{ headerShown: false, }} />
          <Stack.Screen name='TabNavi' component={TabNavi}  options={{ headerShown: false, }} />
          <Stack.Screen name='Register' component={Register} options={{ title: 'Đăng Ký' }} />
            <Stack.Screen name='Home' component={Home} options={{ title: 'Trang Chủ'}} />
          <Stack.Screen name='Cart' component={Cart} options={{ title: 'Giỏ hàng'}} />
          <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ title: 'Chi Tiết Sản Phẩm'}} />
            <Stack.Screen name='User' component={User} options={{ title: 'Thông tin người dùng'}} />
          <Stack.Screen name='ChatScreen' component={ChatScreen} options={{ title: 'Nhóm chat cộng đồng'}} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ title: 'Đổi Mật Khẩu'}} />
        </Stack.Navigator>
      </NavigationContainer>
=======
        <Stack.Screen name='SplashScreen2' component={SplapshScreen2} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false, }} />
        <Stack.Screen name='TabNavi' component={TabNavi} options={{ headerShown: false, }} />
        <Stack.Screen name='Register' component={Register} options={{ title: 'Đăng Ký' }} />
        <Stack.Screen name='Home' component={Home} options={{ title: 'Trang Chủ' }} />
        <Stack.Screen name='Cart' component={Cart} options={{ title: 'Giỏ hàng' }} />
        <Stack.Screen name='ProductDetail' component={ProductDetail} options={{ title: 'Chi Tiết Sản Phẩm' }} />
        <Stack.Screen name='User' component={User} options={{ title: 'Thông tin người dùng' }} />
        <Stack.Screen name='ChatScreen' component={ChatScreen} options={{ title: 'Nhóm chat cộng đồng' }} />
        <Stack.Screen name='Oder' component={Oder} options={{ title: 'Đơn mua' }} />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> f4152b6c25dfcef8e18d812c9f642dbb08f89b84
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
