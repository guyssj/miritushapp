import { UnavailableHourProps } from '@howljs/calendar-kit';
import React from 'react';
import { View, Text } from 'react-native';
import Typography from '../Typography/Typography';

const CustomUnavailableHour = (props) => {

    return (
        <View style={{ display: 'sticky', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>{props.title}</Typography>
        </View>
    );
};

export default CustomUnavailableHour;