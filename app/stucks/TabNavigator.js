import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import HomeStuck from './HomeStuck';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CalendarStuck from './CalendarStuck';
import CustomerStuck from './CustomerStuck';
import CloseDaysStuck from './CloseDaysStuck';

const Tab = createBottomTabNavigator();


const TabNav = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='home-filled' size={size} color={color} />
                }
            }} component={HomeStuck} />
            <Tab.Screen name="Calendar" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='calendar-today' size={size} color={color} />
                }
            }} component={CalendarStuck} />
            <Tab.Screen name="Close days" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='event-busy' size={size} color={color} />
                },
                unmountOnBlur: true
            }} component={CloseDaysStuck} />
            <Tab.Screen name="Customers" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='people-alt' size={size} color={color} />
                },
                unmountOnBlur: true
            }} component={CustomerStuck} />
        </Tab.Navigator>
    );
};

export default TabNav;