import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import POSs from './POSStack';
import BottomSheetDetails from './ButtomSheet';

const CalendarStack = createNativeStackNavigator();

const CalendarStuck = () => {

    return (
        <CalendarStack.Navigator screenOptions={{

        }}>
            <CalendarStack.Group screenOptions={{ headerShown: false }}>
                <CalendarStack.Screen name="Overview" component={CalendarScreen} />
                <CalendarStack.Screen name="POSCalendar" component={POSs} />
            </CalendarStack.Group>
            <CalendarStack.Group screenOptions={{
            }}>
                <CalendarStack.Screen
                    options={({ navigation }) => ({
                        title: "Details",
                        headerShown: false,
                        presentation: 'containedTransparentModal',
                    })}
                    name="Details"
                    component={BottomSheetDetails} />
            </CalendarStack.Group>

        </CalendarStack.Navigator>
    );
}

export default CalendarStuck;