import React from 'react'
import { ActivityIndicator, Text, View, VirtualizedList } from "react-native";
import CloseDayItem from './CloseDayItem';

const CloseDayList = ({ onPressRight, onItemPress, items, ...props }) => {
    return (
        <VirtualizedList
            keyExtractor={item => item.id}
            data={items}
            style={{ width: '100%' }}
            getItemCount={data => data.length | 0}
            getItem={(data, index) => data[index]}
            renderItem={({ item, index }) => <CloseDayItem onPressRight={() => onPressRight(item)} item={item} />}
            ListEmptyComponent={() => <Text style={{ textAlign: 'center' }}>Customers is empty</Text>}
        />
    )
}

export default CloseDayList;