import { View, Text, VirtualizedList, Animated } from 'react-native'
import React from 'react'
import FutureBookItem from './FutureBookItem'

const FutureBooksList = ({ items, onItemPressCancel }) => {
    const scrollX = React.useRef(new Animated.Value(0)).current;

    return (
        <View>
            <Text style={{ fontSize: 18, fontWeight: '700' }}>Future books:</Text>
            <VirtualizedList
                keyExtractor={item => item.id.toString()}
                data={items}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate={'normal'}
                getItemCount={data => data.length | 0}
                getItem={(data, index) => data[index]}
                renderItem={({ item, index }) => <FutureBookItem onItemPressCancel={() => onItemPressCancel(item)} item={item} />}
                ListEmptyComponent={() => <View style={{ alignItems: 'center' }}><Text style={{ textAlign: 'center' }}>No future books</Text></View>}
            />
        </View>
    )
}

export default FutureBooksList