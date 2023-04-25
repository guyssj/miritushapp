
import React, { useState } from "react"
import { ActivityIndicator, Button, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { userSignInSet } from "../../store/reducers/user";
import { CustomersList } from '../../components/CustomersList'
import api from '../../api';
import { color } from "../../theme";


const CustomersScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [customers, setCustomers] = useState([])
    const { isLoading, isError, data, error, isFetching } = useQuery("customers", () => api.customers.getAll(), {
        onError: async (error3) => {
            error3.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
        // onSuccess: async (data) => {
        //     const listData = data.map(cus => {
        //         return {
        //             id: cus.id,
        //             key: `${cus.id}_customer`,
        //             name: `${cus.firstName} ${cus.lastName}`,
        //             subtitle: cus.phoneNumber
        //         }
        //     })
        //     setCustomers(listData);
        // }
    })
    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
    }
    const handlePressItem = (item) => {
        navigation.navigate('CustomerDetails', {
            screen: 'DetailsCustomer',
            params: { customerId: item.id }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.palette.offWhiteBack, }} >
            <CustomersList onItemPress={handlePressItem} items={data} />
        </SafeAreaView>
    );
}

export default CustomersScreen;