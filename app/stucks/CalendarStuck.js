import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import POSs from './POSStack';
import BottomSheetDetails from './ButtomSheet';
import { useTranslation } from 'react-i18next';

const CalendarStack = createNativeStackNavigator();

const CalendarStuck = () => {
    const { t } = useTranslation();
    return (
        <CalendarStack.Navigator screenOptions={{

        }}>
            <CalendarStack.Group screenOptions={{ headerShown: true }}>
                <CalendarStack.Screen options={{ title: t('calendarScreen.title') }} name="Overview" component={CalendarScreen} />
                <CalendarStack.Screen name="POSCalendar" component={POSs} />
            </CalendarStack.Group>
            <CalendarStack.Group screenOptions={{
            }}>
                <CalendarStack.Screen
                    options={({ navigation }) => ({
                        title: t('detailsScreen.title'),
                        headerShown: false,
                        animation: 'fade',
                        presentation: 'containedTransparentModal',
                    })}
                    name="Details"
                    component={BottomSheetDetails} />
            </CalendarStack.Group>

        </CalendarStack.Navigator>
    );
}

export default CalendarStuck;