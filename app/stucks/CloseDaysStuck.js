import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { CloseButton } from '../components';
import CloseDayAddScreen from '../screens/CloseDays/CloseDayAddScreen';
import CloseDaysScreen from '../screens/CloseDays/CloseDaysScreen';
import { useTheme } from '../theme';

const AddCloseDayButton = ({ onPress, ...props }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4} accessibilityLabel="חזרה" {...props}>
            <Icons size={30} color={theme.palette.primary.main} name="add-to-photos" />
        </TouchableOpacity>
    )
}

const CloseDaysStack = createNativeStackNavigator();


const CloseDaysStuck = () => {

    return (
        <CloseDaysStack.Navigator screenOptions={{

        }}>
            <CloseDaysStack.Group screenOptions={{ headerShown: true }}>
                <CloseDaysStack.Screen
                    name="mainCloseDay" options={({ navigation }) => ({ headerLeft: () => <AddCloseDayButton onPress={() => { navigation.navigate('AddCloseDay') }} /> })} component={CloseDaysScreen} />
                <CloseDaysStack.Screen
                    name="AddCloseDay" options={({ navigation }) => ({ presentation: 'formSheet', headerLeft: () => <CloseButton onPress={() => navigation.goBack()} /> })} component={CloseDayAddScreen} />
            </CloseDaysStack.Group>
        </CloseDaysStack.Navigator>
    );
}

export default CloseDaysStuck;