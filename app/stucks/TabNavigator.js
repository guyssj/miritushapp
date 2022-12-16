import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeStuck from './HomeStuck';
import Icons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();


const TabNav = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='home-filled' size={size} color={color} />
                }
            }} component={HomeStuck} />
        </Tab.Navigator>
    );
};

export default TabNav;