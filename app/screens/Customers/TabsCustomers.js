import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Icons from 'react-native-vector-icons/MaterialIcons';
import CustomerDetailsScreen from './CustomerDetailsScreen';
import CustomerTimelineScreen from './CustomerTimelineScreen';

const TabCustomer = createBottomTabNavigator();


const TabsCustomers = ({ route, navigation }) => {
    return (
        <TabCustomer.Navigator screenOptions={{ headerShown: false }}>
            <TabCustomer.Screen name="DetailsCustomer" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='home-filled' size={size} color={color} />
                },
                title: "Details"
            }} component={CustomerDetailsScreen} />
            <TabCustomer.Screen name="Timeline" options={{
                tabBarIcon: ({ focused, color, size }) => {
                    return <Icons name='timeline' size={size} color={color} />
                },
                title: "Timeline"
            }} component={CustomerTimelineScreen} initialParams={route.params} />
        </TabCustomer.Navigator>
    );
};

export default TabsCustomers;