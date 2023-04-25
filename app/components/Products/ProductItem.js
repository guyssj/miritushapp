import { Badge } from "@rneui/base";
import React from "react"
import { StyleSheet } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme";


const ProductItem = ({ item, onPress, ...props }) => {
    const theme = useTheme();
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.shadowBox, {
                backgroundColor: 'white',
                borderRadius: 10,
                width: 128,
                height: 128,
                justifyContent: 'center',
                alignItems: 'center'
            }]}>
                <View style={{ padding: 10 }}>
                    <Image style={{ width: 64, height: 64 }} source={require('../../svgs/noimage.png')} >
                    </Image>
                </View>
                <View style={{ borderTopWidth: 1, padding: 10, borderColor: '#e7ebf3', width: '100%', }}>
                    <Text style={{ color: '#033a73' }}>{item.name}</Text>
                    <Text style={{ color: '#033a73' }}>{item.price}₪</Text>
                </View>
            </TouchableOpacity >
        </View >
    )
}

const styles = StyleSheet.create({
    shadowBox: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
})

export default ProductItem;