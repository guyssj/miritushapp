import { View } from "react-native";
import React from 'react';
import { hexToRgba, shadeColor } from "../../shared/utilsFuncations";
import { StyleSheet } from "react-native";
import useStyles from "../../theme/useStyles";
import Typography from "../Typography/Typography";

const CalendarEvents = (
    event
) => {
    const { colors, styles } = useStyles(createStyle)
    return (
        <View style={[styles.eventContainer, {
            backgroundColor: event.color ? hexToRgba(shadeColor(event.color, 10, 0), 0.4) : hexToRgba(shadeColor(colors.primary.main, 10, 0), 0.3),
            borderStartColor: event.color ? event.color : colors.primary.main,
        }]} >
            <Typography variant="caption" style={[styles.eventTextStyle, {
                color: event.color ? shadeColor(event.color, 0) : colors.primary.main
            }]}>{event.title}</Typography>
        </View>
    )
}

const createStyle = (colors, spacing) =>
    StyleSheet.create({
        eventContainer: {
            borderStartWidth: spacing[2] - 2,
            borderStyle: 'solid',
            width: '100%',
            height: '100%',
            padding: spacing[1],
        },
        eventTextStyle: {
            fontWeight: '800'
        }
    });

export default CalendarEvents;

// import { Text, TouchableOpacity } from "react-native";
// import React from 'react'
// import { useTheme } from "../../theme";
// import { shadeColor } from "../../shared/utilsFuncations";

// const CalendarEvents = (
//     event,
//     touchableOpacityProps,
// ) => {
//     const theme = useTheme();
//     return (
//         <TouchableOpacity
//             {...touchableOpacityProps}
//             style={[
//                 ...(touchableOpacityProps.style),
//                 {
//                     backgroundColor: event.color ? theme.palette.primary[50] : theme.palette.purpule[100],
//                     borderRightColor: event.color ? event.color : theme.palette.purpule.main,
//                     borderRightWidth: 6,
//                     borderStyle: 'solid',
//                     borderRadius: 6,
//                     alignItems: 'flex-start',
//                     justifyContent: 'flex-start',
//                 }
//             ]}>
//             <Text style={{ fontSize: 12, fontWeight: '700', textAlign: 'right', color: event.color ? shadeColor(event.color, 0) : theme.palette.purpule.main }}>{event.title}</Text>
//         </TouchableOpacity>
//     )
// }

// export default CalendarEvents;
