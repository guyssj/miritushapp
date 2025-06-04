import React from "react"
import { StyleSheet } from "react-native";
import { Image, TouchableOpacity, View } from "react-native";
import useStyles from "../../theme/useStyles";
import { Typography } from "../../components";


//TODO : Change to style sheet
const ProductItem = ({ item, onPress, ...props }) => {
    const { styles } = useStyles(createStyles)
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={[styles.shadowBox, styles.productContainer]}>
                <Image style={styles.thumbnailStyle} source={require('../../svgs/noimage.png')} />
                <View style={styles.productTextContainer}>
                    <Typography variant="caption" style={styles.productTextStyle}>{item.name}</Typography>
                    <Typography variant="caption" style={styles.productTextStyle}>{item.price}₪</Typography>
                </View>
            </TouchableOpacity>
        </View >
    )
}

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        shadowBox: {
            backgroundColor: colors.white,
            borderColor: colors.gray[200],
            borderWidth: 1,
            borderRadius: spacing[4],
            shadowColor: colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.03,
            shadowRadius: spacing[4],
            elevation: 2, // for Android shadow
        },
        thumbnailStyle: {
            width: 64,
            height: 64,
            margin: spacing[2]
        },
        productTextStyle: {
            fontSize: 16,
            color: colors.primary.main,
            textAlign: 'center'
        },
        productTextContainer: {
            borderTopWidth: 1,
            padding: 10,
            borderColor: '#e7ebf3',
            width: '100%',
        },
        productContainer: {
            backgroundColor: colors.white,
            borderRadius: spacing[2],
            width: 128,
            height: 128,
            justifyContent: 'center',
            alignItems: 'center',
            margin: spacing[1]
        }
    });

export default ProductItem;