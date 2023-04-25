import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import POSs from './POSStack';
import BottomSheetDetails from './ButtomSheet';
import CustomersScreen from '../screens/Customers/CustomersScreen';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../theme';
import { CloseButton } from '../components';
import CustomerAddScreen from '../screens/Customers/CustomerAdd';
import CustomerDetailsScreen from '../screens/Customers/CustomerDetailsScreen';
import TabsCustomers from '../screens/Customers/TabsCustomers';


const CustomerStack = createNativeStackNavigator();

const AddCustomerButton = ({ onPress, ...props }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4} accessibilityLabel="חזרה" {...props}>
            <Icons size={30} color={theme.palette.primary.main} name="person-add" />
        </TouchableOpacity>
    )
}


const CustomerStuck = () => {

    return (
        <CustomerStack.Navigator screenOptions={{

        }}>
            <CustomerStack.Group screenOptions={{ headerShown: true }}>
                <CustomerStack.Screen
                    name="ListCustomers" options={({ navigation }) => ({ headerLeft: () => <AddCustomerButton onPress={() => { navigation.navigate('AddCustomer') }} /> })} component={CustomersScreen} />
                <CustomerStack.Screen
                    name="AddCustomer" options={({ navigation }) => ({ presentation: 'formSheet', headerLeft: () => <CloseButton onPress={() => navigation.goBack()} /> })} component={CustomerAddScreen} />
                <CustomerStack.Screen options={({ navigation }) => ({ animation: 'slide_from_left', animationTypeForReplace: 'push', presentation: 'fullScreenModal', headerLeft: () => <CloseButton onPress={() => navigation.goBack()} /> })}
                    name="CustomerDetails" component={TabsCustomers} />
            </CustomerStack.Group>
        </CustomerStack.Navigator>
    );
}

export default CustomerStuck;