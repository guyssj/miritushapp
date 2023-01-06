import React, { PureComponent } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from '../screens/DetailsScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { CloseButton } from '../components';

const DetailsStack = createNativeStackNavigator();


const DetailsS = () => {
    return (
        <DetailsStack.Navigator screenOptions={{}}>
            <DetailsStack.Screen
                options={({ navigation }) => ({
                    title: "Details",
                    headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
                })}
                name="main"
                component={DetailsScreen} />
            <DetailsStack.Screen
                options={({ navigation }) => ({
                    title: "Transactions"
                })}
                name="Transactions"
                component={TransactionScreen} />
        </DetailsStack.Navigator>
    );
}

export default DetailsS;