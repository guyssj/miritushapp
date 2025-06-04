import React from "react"
import { Text, View, VirtualizedList } from "react-native";
import Item from "./Item";
import Typography from "../Typography/Typography";


const ItemsList = ({ onPressRight, items, ...props }) => {
    return (
        <VirtualizedList
            keyExtractor={item => item.key.toString()}
            data={items}
            style={{ width: '100%' }}
            getItemCount={data => data?.length | 0}
            getItem={(data, index) => data[index]}
            renderItem={({ item, index }) => <Item onPressRight={() => onPressRight(index)} item={item} />}
            ListEmptyComponent={() => <View style={{ justifyContent: 'center', alignItems: 'center' }}><Typography>No items in the cart</Typography></View>}
        />
    )
}

export default ItemsList;