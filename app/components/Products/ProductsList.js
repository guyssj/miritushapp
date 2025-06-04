import React from "react"
import { ActivityIndicator, Text, View, VirtualizedList } from "react-native";
import ProductItem from './ProductItem';
import Typography from "../Typography/Typography";

const ProductsList = ({ onPress, items, ...props }) => {
    return (
        <VirtualizedList
            keyExtractor={item => item.id.toString()}
            data={items}
            style={{ width: '100%', padding: 10 }}
            horizontal
            getItemCount={data => data.length | 0}
            getItem={(data, index) => data[index]}
            renderItem={({ item, index }) => <ProductItem onPress={() => onPress(item, index)} item={item} />}
            ListEmptyComponent={() => <View><Typography>No items in the cart</Typography></View>}
        />
    )
}

export default ProductsList;