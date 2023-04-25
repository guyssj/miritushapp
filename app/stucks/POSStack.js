import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { CloseButton } from '../components';
import POSScreen from '../screens/POS/POSScreen';

const POSStack = createNativeStackNavigator();


const POSs = () => {
    return (
        <POSStack.Navigator screenOptions={{}}>
            <POSStack.Screen
                options={({ navigation, route }) => ({
                    title: route.params.title ? route.params.title : 'Details'
                })}
                name="Posmain"
                component={POSScreen} />
        </POSStack.Navigator>
    );
}

export default POSs;