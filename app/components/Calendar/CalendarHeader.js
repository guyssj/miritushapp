import { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { isSameDate, isToday } from "../../shared/utilsFuncations";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import useStyles from "../../theme/useStyles";
dayjs.extend(isBetween);
const calendarHeader = (props) => {
    const { dateRange, activeDate, cellHeight, allDayEvents, onPressEvent } = props;

    const { colors, styles } = useStyles(createStyles);
    const _onPressEvent = (event) => {
        onPressEvent && onPressEvent(event);
    };


    return (
        <View style={styles.headerContainer}>
            <View style={{ zIndex: 10, width: 50 }} />
            {dateRange.map((date) => {
                const shouldHighlight = activeDate ? isSameDate(date, activeDate) : isToday(date)
                return (
                    <View key={date.toString()} style={{ flex: 1, paddingTop: 2 }}  >
                        <TouchableOpacity>
                            <View style={{ justifyContent: 'space-between', height: cellHeight - 15 }}>
                                <Text style={styles.textStyle}>
                                    {date.format('ddd')}
                                </Text>
                                <View style={shouldHighlight ? [styles.activeDateContainer] : styles.dayContainer}>
                                    <Text style={shouldHighlight ? [styles.textStyle, styles.activeDateTextStyle] : styles.textStyle}>
                                        {date.format('D')}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{ borderColor: '#987554', height: 10, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                            {allDayEvents.map((event, index) => {
                                if (!dayjs(date).isBetween(event.start, event.end, 'day', '[]')) {
                                    return null;
                                }
                                return (
                                    <TouchableOpacity
                                        style={[{ backgroundColor: colors.secondary, marginTop: 5, height: 20, width: '100%' }]}
                                        key={index}
                                        onPress={() => _onPressEvent(event)}>
                                        <Text
                                            style={{ fontSize: 13, color: colors.textPrimary, textAlign: 'center' }}>
                                            {event.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const createStyles = (colors) =>
    StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            backgroundColor: colors.primary.main,
            borderBottomEndRadius: 20,
            borderBottomStartRadius: 20,
            shadowColor: colors.primary.main,
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            width: 'auto',
        },
        textStyle: {
            textAlign: 'center',
            color: colors.white,
            fontWeight: 'bold'
        },
        activeDateTextStyle: {
            color: colors.primary.main
        },
        activeDateContainer: {
            backgroundColor: colors.textPrimary,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            width: 30,
            height: 30,
            marginBottom: 0
        },
        dayContainer: {
            marginBottom: 10
        }
    });

export default calendarHeader;
