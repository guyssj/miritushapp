import React from "react"
import { ActivityIndicator, View, VirtualizedList } from "react-native";
import { useTheme } from "../../theme";
import ProductItem from './ProductItem';

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
            ListEmptyComponent={() => <ActivityIndicator size='large' />}
        />
    )
}

export default ProductsList;