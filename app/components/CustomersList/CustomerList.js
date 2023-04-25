import React from 'react'
import { ActivityIndicator, Text, View, VirtualizedList } from "react-native";
import CustomerItem from './CustomerItem';

const CustomersList = ({ onPressRight, onItemPress, items, ...props }) => {
    return (
        <VirtualizedList
            keyExtractor={item => item.id}
            data={items}
            style={{ width: '100%' }}
            getItemCount={data => data.length | 0}
            getItem={(data, index) => data[index]}
            renderItem={({ item, index }) => <CustomerItem onItemPress={() => onItemPress(item)} onPressRight={() => onPressRight(index)} item={item} />}
            ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>Customers is empty</Text>}
        />
    )
}

export default CustomersList;