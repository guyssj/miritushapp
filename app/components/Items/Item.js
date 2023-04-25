import React from "react"
import { TouchableOpacity, View } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import { color, useTheme } from "../../theme";
import { Button, ListItem, Avatar, Badge } from "@rneui/themed";
import { Image } from "react-native";
import Animated, { Layout, LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";


const Item = ({ item, onPressRight, onPressLeft, ...props }) => {
    const theme = useTheme();
    return (
        <Animated.View entering={LightSpeedInRight} exiting={LightSpeedOutLeft} layout={Layout.springify()}>
            <ListItem.Swipeable
                containerStyle={{ width: '100%', alignItems: 'flex-end', maxHeight: 100, borderBottomWidth: 1, borderBottomColor: '#e7ebf3' }}
                leftWidth={80}
                rightWidth={90}
                rightContent={(reset) => (
                    <Button
                        title="Delete"
                        onPress={() => { onPressRight(); reset(); }}
                        icon={{ name: 'delete', color: 'white' }}
                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                    ></Button>
                )}
                minSlideWidth={40}
            >
                <ListItem.Content style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-around' }}>
                    {/* <Avatar size={38}
                        rounded
                        containerStyle={{ backgroundColor: "#9700b9" }}
                        icon={{ name: item.type, type: "font-awesome" }} /> */}
                    <View style={{ alignItems: 'center', flexDirection: 'row-reverse', flexGrow: 1 }}>
                        <View style={{
                            marginLeft: '10%',
                            borderWidth: 1,
                            borderRadius: 8,
                            width: 72,
                            height: 72,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: color.palette.blue
                        }}>
                            <Image style={{ width: 64, height: 64 }} source={require('../../svgs/noimage.png')} />

                            {item?.quantity > 1 && <Badge
                                status="primary"
                                value={item?.quantity}
                                containerStyle={{ position: 'absolute', top: -4, left: 60 }}
                            />}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <ListItem.Title style={{ fontSize: 20, fontWeight: '700' }}>{item.name}</ListItem.Title>
                            {item.subtitle && <ListItem.Subtitle style={{ color: '#033a73' }}>{item.subtitle}</ListItem.Subtitle>}
                        </View>
                    </View>
                    <ListItem.Title style={{ fontSize: 20, color: '#033a73' }}>{item.price}₪</ListItem.Title>
                </ListItem.Content>
            </ListItem.Swipeable>
        </Animated.View>
    )
}

export default Item;