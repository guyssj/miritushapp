import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { isSameDate, isToday } from "../../shared/utilsFuncations";
import { color, useTheme } from "../../theme"

const theme = useTheme();
const calendarHeader = (props) => {
    const { dateRange, activeDate, cellHeight } = props

    return (
        <View style={styles.headerContainer}>
            <View style={{ zIndex: 10, width: 50 }} />
            {dateRange.map((date) => {
                const shouldHighlight = activeDate ? isSameDate(date, activeDate) : isToday(date)
                return (
                    <TouchableOpacity key={date.toString()} style={{ flex: 1, paddingTop: 2 }}>
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
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row-reverse',
        backgroundColor: theme.palette.primary.main,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        shadowColor: theme.palette.primary.main,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    textStyle: {
        textAlign: 'center',
        color: color.whiteText,
        fontWeight: 'bold'
    },
    activeDateTextStyle: {
        color: theme.palette.primary.main
    },
    activeDateContainer: {
        backgroundColor: theme.palette.primary.contrastText,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: 30,
        height: 30,
        marginBottom: 8
    },
    dayContainer: {
        marginBottom: 15
    }
});

export default calendarHeader;