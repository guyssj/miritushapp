import React, { useState } from 'react';
import { Alert, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useQueryClient } from 'react-query';
import api from '../../api';
import { Button, DatePicker, TextInput, Typography } from '../../components';
import { format } from 'date-fns';
import useStyles from '../../theme/useStyles';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';


const CloseDayAddScreen = ({ navigation, route }) => {

    const [selectedDate, setSelectedDate] = useState(null);
    const dateNow = new Date();
    const [dateInput, setDateInput] = useState('');
    const [notes, setNotes] = useState('');
    const { styles } = useStyles(createStyle);
    const queryClient = useQueryClient();
    const { mutate: saveCloseDay, isLoading: saveLoading } = api.calendarQuery.useSaveCloseDay();
    const { t } = useTranslation();
    const handleConfirm = (date) => {
        setSelectedDate(date);
        setDateInput(format(date, 'dd/MM/yyyy'));
    };

    const handleSaveCloseDay = () => {
        if (!selectedDate) {
            Alert.alert(t('closeDaysScreen.saveValidation'));
            return;
        }
        saveCloseDay({ date: selectedDate, notes: notes }, {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('close-days');
                navigation.goBack();
            },
        });
    };

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={120}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.closeDayScreenContainer}>
                    <View style={styles.headerStyle}>
                        <Typography variant="h2" style={styles.headerText}>{t('closeDaysScreen.addNewCloseDay')}</Typography>
                        <Typography variant="subtitle" style={styles.headerSubTitleText}>{t('closeDaysScreen.addNewCloseDaySubTitle')}</Typography>
                    </View>
                    <View style={styles.inputAndBtnContainer}>
                        <View style={styles.closeDayInputsContainer}>
                            <DatePicker
                                placeholder={t('closeDaysScreen.selectAdate')}
                                label={t('closeDaysScreen.blockOffDay')}
                                date={dateNow}
                                setDate={setSelectedDate}
                                onConfirm={handleConfirm}
                                selectedValue={dateInput}
                            />
                            <TextInput
                                style={styles.notesInput}
                                placeholder={t('closeDaysScreen.notes')}
                                leftIcon={<Typography style={styles.label} >{t('closeDaysScreen.notes')}</Typography>}
                                value={notes}
                                onChangeText={setNotes} />

                        </View>
                        <View style={styles.btnContainer}>
                            <Button loading={saveLoading} style={styles.btnSave} title="Save" onPress={() => handleSaveCloseDay()} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const createStyle = (colors, spacing) =>
    StyleSheet.create({
        closeDayScreenContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            width: '100%',
        },
        headerStyle: {
            shadowColor: colors.gray[400],
            shadowOffset: {
                width: 0,
                height: 5,
            },
            height: '20%',
            shadowOpacity: 0.2,
            shadowRadius: 6.51,
            elevation: 12,
            backgroundColor: colors.white,
            borderEndEndRadius: spacing[4],
            borderEndStartRadius: spacing[4],
            justifyContent: 'center',
        },
        headerText: {
            textShadowColor: colors.gray[400],
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 5,
            margin: spacing[2],
            textAlign: 'center',
            color: colors.primary.main,
        },
        headerSubTitleText: {
            margin: spacing[2],
            textAlign: 'center',
        },
        container: {
            backgroundColor: colors.backgroundPrimary,
            flex: 1,
        },
        closeDayInputsContainer: {
            width: '100%',
            height: '80%',
        },
        label: {
            marginBottom: spacing[2],
        },
        btnContainer: {
            flex: 1,
            width: '100%',
        },
        inputAndBtnContainer: {
            flex: 1,
            width: '100%',
            padding: spacing[3],
        },
        btnSave: {
            padding: spacing[4],
        },
        notesInput: {
            backgroundColor: colors.white,
            borderColor: colors.gray[400],
            borderWidth: 1,
        },
    });

export default CloseDayAddScreen;

