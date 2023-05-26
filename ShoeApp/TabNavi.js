import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "./compoment/Home";
import Favourite from "./compoment/Favourite";
import Cart from "./compoment/Cart";
import Search from "./compoment/Search";
import User from "./compoment/User";  
import NotLoginUser from "./compoment/NotLoginUser";
const Tab = createBottomTabNavigator();

const TabNavi = () => {
    return (
        <Tab.Navigator
            initialRouteName={"Home"}
            screenOptions={{ headerShown: false }}
            tabBarOptions={{
                keyboardHidesTabBar: true,
                activeTintColor: 'black',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
            }}>

            <Tab.Screen name={"Home"} component={Home}

                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='home' color={color} size={size} />
                }}
            />
             <Tab.Screen name={"Search"} component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='search' color={color} size={size} />

                }}
            />
            <Tab.Screen name={"Favourite"} component={Favourite}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='heart' color={color} size={size} />
                }} />

            <Tab.Screen name={"Cart"} component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name='cart' color={color} size={size} />
                }} />
           
            <Tab.Screen name={"NotLoginUser"} component={NotLoginUser}
                options={{
                    tabBarLabel: 'User',
                    tabBarIcon: ({ color, size }) => <Ionicons name='person' color={color} size={size} />

                }}
            />
        </Tab.Navigator>
    )
}
export default TabNavi;