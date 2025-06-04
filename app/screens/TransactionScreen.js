import { ActivityIndicator, Text, TouchableOpacity, View, VirtualizedList } from "react-native"
import React from "react"
import api from "../api"

const TransactionScreen = ({ route, navigation }) => {
    const customerId = route.params;
    const { isLoading: transactionsLoading, data: transactionsData } = api.customerQuery.useGetCustomerTransactions(customerId);

    if (transactionsLoading) return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>)
    const Item = ({ item }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity style={{ width: '98%', height: 70, borderBottomWidth: 1, borderRadius: 15, alignItems: 'center', borderColor: '#000', flexDirection: 'row-reverse', justifyContent: 'space-evenly', backgroundColor: 'white' }}>
                    <Text>{item.createdDate}</Text>
                    <Text>{item.customerName}</Text>
                    <Text>{item.status}</Text>
                    <Text>{1000}</Text>
                    <Text>{'<'}</Text>

                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            {/* {data.map((transcation) =>
                <View>
                    <Text>{transcation.customerName}</Text>
                    {transcation.items.map((item) => (<Text>{item.serviceTypeName}</Text>))}
                </View>
            )
            } */}

            <VirtualizedList
                keyExtractor={item => item.id.toString()}
                data={transactionsData}
                getItemCount={data => data.length | 0}
                getItem={(data, index) => data[index]}
                renderItem={({ item }) => <Item item={item}></Item>}
                ListEmptyComponent={() => <ActivityIndicator color='coral' size='large' />}
            />
        </View>

    )
}

export default TransactionScreen;