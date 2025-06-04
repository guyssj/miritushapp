import React from "react"
import { I18nManager, View } from "react-native";
import { Button, ListItem, Icon } from "@rneui/themed";
import Animated, { Layout, LinearTransition, LightSpeedInRight, LightSpeedOutLeft } from "react-native-reanimated";
import { format } from 'date-fns'
import useColors from "../../theme/useColors";
import { typography } from "../../theme";
import { dateFnsLocales } from "../../i18n/dateLocale";
import { useTranslation } from "react-i18next";


//TODO:Change to styles not in line
const CloseDayItem = ({ item, onPressRight, onItemPress, onPressLeft, ...props }) => {
    const { colors } = useColors()
    const { i18n, t } = useTranslation();
    const currentLang = i18n.language || 'en';
    return (
        <Animated.View entering={LightSpeedInRight} exiting={LightSpeedOutLeft} layout={LinearTransition.springify()}>
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
                        color={colors.primary.main}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <ListItem.Title style={{ ...typography.body, fontSize: 18 }}>{format(new Date(item.date), "dd MMMM yyyy", { locale: dateFnsLocales[currentLang] })}</ListItem.Title>
                            {item.notes && <ListItem.Subtitle style={{ ...typography.subtitle, fontSize: 16, color: '#033a73' }}>{item.notes}</ListItem.Subtitle>}
                        </View>
                    </View>
                </ListItem.Content>
                <ListItem.Chevron iconStyle={{ transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : undefined }} size={25} />
            </ListItem.Swipeable>
        </Animated.View>
    )
}

export default CloseDayItem;