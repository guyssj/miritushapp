import { Text, TouchableOpacity } from "react-native";
import React from 'react'
import { useTheme } from "../../theme";
import { shadeColor } from "../../shared/utilsFuncations";

const CalendarEvents = (
    event,
    touchableOpacityProps,
) => {
    const theme = useTheme();
    return (
        <TouchableOpacity
            {...touchableOpacityProps}
            style={[
                ...(touchableOpacityProps.style),
                {
                    backgroundColor: event.color ? shadeColor(event.color, 50, true) : theme.palette.purpule[100],
                    borderColor: 'lightgrey',
                    borderRightColor: event.color ? event.color : theme.palette.purpule.main,
                    borderRightWidth: 6,
                    borderStyle: 'solid',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            ]}>
            <Text style={{ color: event.color ? shadeColor(event.color, -50) : theme.palette.purpule.main }}>{event.title}</Text>
        </TouchableOpacity>
    )
}

export default CalendarEvents;