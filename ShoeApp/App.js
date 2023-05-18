import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';

import SplashScreen from './compoment/SplashScreen';
import Login from './compoment/Login';
import Register from "./compoment/Register";

export default function App() {
  const Tab = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='SplashScreen'>
        <Tab.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
        <Tab.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Tab.Screen name='Register' component={Register} options={{ headerShown: false }} />
      </Tab.Navigator>
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
