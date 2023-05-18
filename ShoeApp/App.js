import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import SplashScreen from './compoment/SplashScreen';
import Login from './compoment/Login';
import Register from "./compoment/Register";
import Home from "./compoment/Home";
import Cart from "./compoment/Cart";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login}  options={{ headerShown: false, }} />
          <Stack.Screen name='Register' component={Register} options={{ title: 'Đăng Ký' }} />
            <Stack.Screen name='Home' component={Home} options={{ title: 'Trang Chủ'}} />
          <Stack.Screen name='Cart' component={Cart} options={{ title: 'Giỏ hàng'}} />
        </Stack.Navigator>
      </NavigationContainer>
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
