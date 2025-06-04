import React from "react"
import { StyleSheet, View } from "react-native";
import { Button, ListItem, Badge } from "@rneui/themed";
import { Image } from "react-native";
import Animated, { LinearTransition, LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
import { typography } from "../../theme";
import useStyles from "../../theme/useStyles";
import { useTranslation } from "react-i18next";


//TODO: Change to styles compontnes
const Item = ({ item, onPressRight, onPressLeft, ...props }) => {
    const { colors, styles } = useStyles(createStyles);
    const { t } = useTranslation();
    return (
        <Animated.View entering={LightSpeedInRight} exiting={LightSpeedOutLeft} layout={LinearTransition}>
            <ListItem.Swipeable
                containerStyle={styles.itemContainer}
                leftWidth={80}
                rightWidth={90}
                rightContent={(reset) => (
                    <Button
                        title={t('delete')}
                        onPress={() => { onPressRight(); reset(); }}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: colors.error[600] }}
                    ></Button>
                )}
                minSlideWidth={40}
            >
                <ListItem.Content style={styles.itemContentContainer}>

                    <View style={styles.imageContainer}>
                        <Image style={styles.imageStyle} source={require('../../svgs/noimage.png')} />
                        {item?.quantity > 1 && <Badge
                            status="primary"
                            value={item?.quantity}
                            containerStyle={styles.badgeStyle}
                        />}
                    </View>
                    <View style={styles.textContainer}>
                        <ListItem.Title style={{ ...typography.h4 }}>{item.name}</ListItem.Title>
                        {item.subtitle && <ListItem.Subtitle style={[{ ...typography.caption, fontSize: 16 }, styles.textStyle]}>{item.subtitle}</ListItem.Subtitle>}
                    </View>
                    <ListItem.Title style={[{ ...typography.subtitle }, styles.textStyle]}>{item.price}₪</ListItem.Title>
                </ListItem.Content>
            </ListItem.Swipeable>
        </Animated.View >
    )
}

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        itemContainer: {
            width: '100%',
            shadowColor: colors.gray[400],
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 6.51,
            elevation: 12,
        },
        itemContentContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        imageStyle: {
            width: 64,
            height: 64
        },
        textContainer: {
            alignItems: 'center',
            margin: 'auto'
        },
        textStyle: {
            color: colors.primary.main
        },
        imageContainer: {
            borderWidth: 1,
            borderRadius: spacing[2],
            width: 72,
            height: 72,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: colors.primary.main
        },
        badgeStyle: {
            position: 'absolute',
            top: -4,
            left: 60
        },
        posContainer: {
            flex: 1,
            justifyContent: 'center'
        }
    });

export default Item;