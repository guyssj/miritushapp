import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';

const HomeStack = createNativeStackNavigator();


const HomeStuck = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Overview" component={HomeScreen} />
        </HomeStack.Navigator>
    );
}

export default HomeStuck;