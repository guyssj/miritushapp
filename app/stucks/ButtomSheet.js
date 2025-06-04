import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import DetailsScreen from '../screens/DetailsScreen';
import TransactionScreen from '../screens/TransactionScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CloseButton from '../components/CloseButton';
import { useTranslation } from 'react-i18next';

const DetailsStack = createNativeStackNavigator();


const BottomSheetDetails = ({ route, navigation }) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['65%', '90%'], []);
    const { t } = useTranslation();

    const handleSheetChanges = useCallback((index) => {
        if (index === -1)
            navigation.goBack();
    }, []);
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                style={styles.bottomsheetShadow}
                enablePanDownToClose={true}
                snapPoints={snapPoints}
                backdropComponent={(props) => (
                    <BottomSheetBackdrop
                        {...props}
                        disappearsOnIndex={-1}
                        appearsOnIndex={0}
                        pressBehavior="close"
                    />
                )}
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
                            headerBackTitle: t('detailsScreen.title'),
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
        flex: 1,
        backgroundColor: 'transparent'
    },
    bottomsheetShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default BottomSheetDetails;
