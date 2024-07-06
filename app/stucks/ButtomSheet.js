import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import DetailsScreen from '../screens/DetailsScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CloseButton from '../components/CloseButton';

const DetailsStack = createNativeStackNavigator();


const BottomSheetDetails = ({ route, navigation }) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['50%', '90%'], []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
        if (index === -1)
            navigation.goBack();
    }, []);
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                enablePanDownToClose={true}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <DetailsStack.Navigator>
                    <DetailsStack.Screen
                        options={({ navigation }) => ({
                            title: "",
                            headerShown: false,
                            headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
                        })}
                        name="main"
                        component={DetailsScreen} />
                    <DetailsStack.Screen
                        options={({ navigation }) => ({
                            headerBackTitle: 'Details',
                            title: "Transactions"
                        })}
                        name="Transactions"
                        component={TransactionScreen} />
                </DetailsStack.Navigator>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default BottomSheetDetails;
