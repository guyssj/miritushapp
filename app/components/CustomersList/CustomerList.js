import React from 'react';
import { VirtualizedList } from 'react-native';
import CustomerItem from './CustomerItem';
import Typography from '../Typography/Typography';

const CustomersList = ({ onPressRight, onItemPress, items, ...props }) => {
    return (
        <VirtualizedList
            keyExtractor={(item, index) => index.toString()}
            data={items}
            style={{ width: '100%' }}
            getItemCount={data => data.length || 0}
            getItem={(data, index) => data[index]}
            renderItem={({ item, index }) => <CustomerItem
                onItemPress={() => onItemPress(item)}
                onPressRight={() => onPressRight(index)}
                item={item} />}
            ListEmptyComponent={<Typography style={{ textAlign: 'csenter' }}>Customers is empty</Typography>}
        />
    );
};

export default CustomersList;
