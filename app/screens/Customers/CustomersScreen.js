
import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native';
import { CustomersList } from '../../components/CustomersList';
import api from '../../api';
import useStyles from '../../theme/useStyles';


const CustomersScreen = ({ navigation }) => {
    const { isLoading: customersLoading, data: customers } = api.customerQuery.useGetAllCustomers();
    const { styles } = useStyles(createStyles);
    if (customersLoading) { return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>) }

    const handlePressItem = (item) => {
        navigation.navigate('CustomerDetails', {
            screen: 'DetailsCustomer',
            params: { customerId: item.id },
        });
    };

    return (
        <SafeAreaView style={styles.customersContainer} >
            <CustomersList onItemPress={handlePressItem} items={customers} />
        </SafeAreaView>
    );
};

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        customersContainer: {
            flex: 1,
            backgroundColor: colors.backgroundPrimary
        },
    });

export default CustomersScreen;
