import React from "react"
import { TouchableOpacity, View } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import { color, useTheme } from "../../theme";
import { Button, ListItem, Avatar, Badge } from "@rneui/themed";
import { Image } from "react-native";
import Animated, { Layout, LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
import { getInitials } from "../../shared/utilsFuncations";


const CustomerItem = ({ item, onPressRight, onItemPress, onPressLeft, ...props }) => {
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
                    <Avatar size={50}
                        rounded
                        title={getInitials(`${item.firstName} ${item.lastName}`)}
                        containerStyle={{ backgroundColor: theme.palette.primary.main, marginRight: 20 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <ListItem.Title style={{ fontSize: 18, fontWeight: '300' }}>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
                            {item.phoneNumber && <ListItem.Subtitle style={{ color: '#033a73' }}>{item.phoneNumber}</ListItem.Subtitle>}
                        </View>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron size={25} />
                {/* <ListItem.Chevron iconStyle={{ transform: [{ rotate: '180deg' }] }} size={25} /> */}

            </ListItem.Swipeable>
        </Animated.View>
    )
}

export default CustomerItem;