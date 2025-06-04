import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomersScreen from '../screens/Customers/CustomersScreen';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import { CloseButton } from '../components';
import CustomerAddScreen from '../screens/Customers/CustomerAdd';
import TabsCustomers from '../screens/Customers/TabsCustomers';
import { useTranslation } from 'react-i18next';


const CustomerStack = createNativeStackNavigator();

const AddCustomerButton = ({ onPress, ...props }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4} accessibilityLabel="חזרה" {...props}>
            <Icons size={30} color={theme.palette.primary.main} name="person-add" />
        </TouchableOpacity>
    );
};


const CustomerStuck = () => {
    const { t } = useTranslation();
    return (
        <CustomerStack.Navigator>
            <CustomerStack.Group screenOptions={{ headerShown: true, headerLargeTitle: true }} >
                <CustomerStack.Screen
                    name="ListCustomers"
                    options={({ navigation }) => ({
                        title: t('customersScreen.title'),
                        headerLeft: () => AddCustomerButton({ onPress: () => { navigation.navigate('AddCustomer'); } }),
                    })}
                    component={CustomersScreen} />
                <CustomerStack.Screen
                    name="AddCustomer"
                    options={({ navigation }) => ({
                        title: '',
                        presentation: 'modal',
                        headerLargeTitle: false,
                        headerShadowVisible: false,
                        headerLeft: () => CloseButton({ onPress: () => navigation.goBack() }),
                    })}
                    component={CustomerAddScreen} />
                <CustomerStack.Screen
                    options={({ navigation }) => ({
                        title: t('customersScreen.customerDetailsTitle'),
                        animation: 'slide_from_left',
                        animationTypeForReplace: 'push',
                        presentation: 'fullScreenModal',
                        headerLeft: () => CloseButton({ onPress: () => navigation.goBack() }),
                    })}
                    name="CustomerDetails"
                    component={TabsCustomers} />
            </CustomerStack.Group>
        </CustomerStack.Navigator>
    );
};

export default CustomerStuck;
