import React from "react"
import { View } from "react-native";
import { useTheme } from "../../theme";
import { Button, ListItem, Icon } from "@rneui/themed";
import Animated, { Layout, LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
import { format } from 'date-fns'


const CloseDayItem = ({ item, onPressRight, onItemPress, onPressLeft, ...props }) => {
    const theme = useTheme();
    return (
        <Animated.View entering={LightSpeedInRight} exiting={LightSpeedOutLeft} layout={Layout.springify()}>
            <ListItem.Swipeable
                containerStyle={{ width: '100%', alignItems: 'flex-end', maxHeight: 100, borderBottomWidth: 1, borderBottomColor: '#e7ebf3' }}
                leftWidth={80}
                rightWidth={100}
                onPress={onItemPress}
                rightContent={(reset) => (
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Button
                            title="Delete"
                            onPress={() => { onPressRight(); reset(); }}
                            icon={{ name: 'delete', color: 'white' }}
                            buttonStyle={{ minHeight: '100%', minWidth: '40%', backgroundColor: 'red' }}
                        ></Button>
                    </View>
                )}
                minSlideWidth={40}
            >
                <ListItem.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Icon
                        reverse
                        name='ios-american-football'
                        type='ionicon'
                        color={theme.palette.primary.main}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <ListItem.Title style={{ fontSize: 18, fontWeight: '300' }}>{format(new Date(item.date), "dd MMMM yyyy")}</ListItem.Title>
                            {item.notes && <ListItem.Subtitle style={{ color: '#033a73' }}>{item.notes}</ListItem.Subtitle>}
                        </View>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron size={25} />
                {/* <ListItem.Chevron iconStyle={{ transform: [{ rotate: '180deg' }] }} size={25} /> */}

            </ListItem.Swipeable>
        </Animated.View>
    )
}

export default CloseDayItem;