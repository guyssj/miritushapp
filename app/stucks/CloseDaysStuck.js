import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { CloseButton } from '../components';
import CloseDayAddScreen from '../screens/CloseDays/CloseDayAddScreen';
import CloseDaysScreen from '../screens/CloseDays/CloseDaysScreen';
import { useTranslation } from 'react-i18next';
import useColors from '../theme/useColors';

const AddCloseDayButton = ({ onPress, ...props }) => {
    const { colors } = useColors();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.4} accessibilityLabel="חזרה" {...props}>
            <Icons size={30} color={colors.primary.main} name="add-to-photos" />
        </TouchableOpacity>
    );
};

const CloseDaysStack = createNativeStackNavigator();
const CloseDaysStuck = () => {
    const { t } = useTranslation();
    return (
        <CloseDaysStack.Navigator screenOptions={{

        }}>
            <CloseDaysStack.Group screenOptions={{ headerShown: true, headerLargeTitle: true }}>
                <CloseDaysStack.Screen
                    name="mainCloseDay" options={({ navigation }) => ({
                        title: t('closeDaysScreen.title'),
                        headerLeft: () => AddCloseDayButton({ onPress: () => { navigation.navigate('AddCloseDay'); } }),
                    })}
                    component={CloseDaysScreen} />
                <CloseDaysStack.Screen
                    name="AddCloseDay" options={({ navigation }) => ({
                        title: '',
                        presentation: 'modal',
                        headerLargeTitle: false,
                        headerShadowVisible: false,
                        headerLeft: () => CloseButton({ onPress: () => navigation.goBack() }),
                    })}
                    component={CloseDayAddScreen} />
            </CloseDaysStack.Group>
        </CloseDaysStack.Navigator>
    );
};

export default CloseDaysStuck;
