import React from "react"
import { I18nManager, TouchableHighlight, View } from "react-native";
import { Button, ListItem, Avatar } from "@rneui/themed";
import Animated, { LinearTransition, LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
import { getInitials } from "../../shared/utilsFuncations";
import useColors from "../../theme/useColors";
import { typography } from "../../theme";
import Typography from "../Typography/Typography";


//TODO: Change to styles not in line
const CustomerItem = ({ item, onPressRight, onItemPress, onPressLeft, ...props }) => {
    const { colors } = useColors();
    return (
        <Animated.View entering={LightSpeedInRight} exiting={LightSpeedOutLeft} layout={LinearTransition}>
            <ListItem.Swipeable
                bottomDivider
                i18nIsDynamicList
                Component={TouchableHighlight}
                leftWidth={80}
                rightWidth={100}
                onPress={onItemPress}
                leftContent={(reset) => (
                    <View key={item.id.toString()} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            title="Delete"
                            onPress={() => { onPressRight(); reset(); }}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', minWidth: '40%', backgroundColor: 'red' }}
                        ></Button>
                    </View>
                )}
                rightContent={(reset) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            title="Delete"
                            onPress={() => { onPressRight(); reset(); }}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', minWidth: '40%', backgroundColor: 'red' }}
                        />
                    </View>
                )}
                minSlideWidth={40}
            >
                <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Avatar size={50}
                        rounded
                        title={getInitials(`${item.firstName} ${item.lastName}`)}
                        containerStyle={{ backgroundColor: colors.primary.main, marginRight: 20 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <ListItem.Title style={{ ...typography.body, fontSize: 18 }}>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                            {item.phoneNumber && <ListItem.Subtitle style={{ ...typography.subtitle, fontSize: 16, color: '#033a73' }}>{item.phoneNumber}</ListItem.Subtitle>}
                        </View>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron
                    i18nIsDynamicList
                    iconStyle={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
                    size={25}
                />
                <Typography variant="body">{I18nManager.isRTL.toString()}</Typography>
            </ListItem.Swipeable>
        </Animated.View>
    )
}

export default CustomerItem;