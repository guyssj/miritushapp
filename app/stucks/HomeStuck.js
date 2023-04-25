import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { CloseButton } from '../components';
import POSs from './POSStack';

const HomeStack = createNativeStackNavigator();


const HomeStuck = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Group screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="Overview" component={HomeScreen} />
                <HomeStack.Screen name="POS" component={POSs} />
            </HomeStack.Group>
            <HomeStack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
            </HomeStack.Group>

        </HomeStack.Navigator>
    );
}

export default HomeStuck;