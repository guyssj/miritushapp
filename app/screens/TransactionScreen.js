import { ActivityIndicator, Text, View } from "react-native"
import React from "react"
import { useQuery } from 'react-query'
import api from "../api"

const TransactionScreen = ({ route, navigation }) => {
    const customerId = route.params;
    const { isLoading, isError, data, error, isFetching } = useQuery(["getTransactionsId", customerId], () => api.customers.getTransactions(customerId), {
        onSuccess: (data) => { console.log(data) },
        onError: async (error) => {
            error.status === 401 ? dispatch(userSignInSet(false)) : null;
            await AsyncStorage.removeItem('accessToken')
        }
    })
    if (isLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>)

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            {data.map((transcation) =>
                <View>
                    <Text>{transcation.customerName}</Text>
                    {
                        transcation.items.map((item) => (<Text>{item.serviceTypeName}</Text>))
                    }
                </View>
            )
            }
        </View>

    )
}

export default TransactionScreen;