import React from "react"
import { ActivityIndicator, View, VirtualizedList } from "react-native";
import { useTheme } from "../../theme";
import Item from "./Item";


const ItemsList = ({ onPressRight, items, ...props }) => {
    return (
        <VirtualizedList
            keyExtractor={item => item.key.toString()}
            data={items}
            style={{ width: '100%' }}
            getItemCount={data => data.length | 0}
            getItem={(data, index) => data[index]}
            renderItem={({ item, index }) => <Item onPressRight={() => onPressRight(index)} item={item} />}
            ListEmptyComponent={() => <ActivityIndicator size='large' />}
        />
    )
}

export default ItemsList;