import React, { useRef, useState } from 'react';
import { Keyboard, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useQueryClient } from 'react-query';
import api from '../../api';
import { Button, TextInput, Typography } from '../../components';
import useStyles from '../../theme/useStyles';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const CustomerAddScreen = ({ navigation }) => {
    const [firstName, onFirstNameChange] = useState('');
    const [lastName, onLastNameChange] = useState('');
    const [phoneNumber, onPhoneNumberChange] = useState('');
    const { colors, styles } = useStyles(createStyles);
    const queryClient = useQueryClient();
    const { t } = useTranslation();

    const { mutate: saveCustomer, isLoading: customerSaveLoading } = api.customerQuery.useCreateCustomer();

    const inputRefs = {
        firstName: useRef(null),
        lastName: useRef(null),
        phoneNumber: useRef(null),
    };

    const focusNextField = (key) => {
        inputRefs[key].current.focus();
    };

    const handleSaveCustomer = () => {
        saveCustomer({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber }, {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('customers');
                navigation.goBack();
            },
        });
    };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={80} style={styles.keyBoardAvoidContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.customerScreenContainer}>
                    <View style={styles.headerStyle}>
                        <Typography variant="h1" style={styles.headerText}>{t('customersScreen.addCustomerTitle')}</Typography>
                        <Typography variant="subtitle" style={styles.headerSubTitleText}>{t('customersScreen.addCustomerSubTitle')}</Typography>
                    </View>
                    <View style={styles.inputAndBtnContainer}>
                        <ScrollView style={styles.customerInputsContainer}>
                            <TextInput
                                returnKeyType="next"
                                leftIcon={<Typography variant="body" style={styles.label}>{t('customersScreen.newCustomerModal.labelFirstName')}</Typography>}
                                onSubmitEditing={() => focusNextField('lastName')}
                                ref={inputRefs.firstName}
                                placeholder={t('customersScreen.newCustomerModal.labelFirstName')}
                                style={styles.inputStyle}
                                value={firstName}
                                placeholderTextColor={colors.gray[400]}
                                onChangeText={onFirstNameChange} />
                            <TextInput
                                returnKeyType="next"
                                leftIcon={<Typography style={styles.label}>{t('customersScreen.newCustomerModal.labelLastName')}</Typography>}
                                onSubmitEditing={() => focusNextField('phoneNumber')}
                                ref={inputRefs.lastName}
                                style={styles.inputStyle}
                                placeholder={t('customersScreen.newCustomerModal.labelLastName')}
                                placeholderTextColor={colors.gray[400]}
                                value={lastName}
                                onChangeText={onLastNameChange} />
                            <TextInput
                                leftIcon={<Typography style={styles.label}>{t('customersScreen.newCustomerModal.labelPhoneNumber')}</Typography>}
                                returnKeyType="done"
                                placeholderTextColor={colors.gray[400]}
                                onSubmitEditing={() => handleSaveCustomer()}
                                ref={inputRefs.phoneNumber}
                                style={styles.inputStyle}
                                placeholder={t('customersScreen.newCustomerModal.labelPhoneNumber')}
                                value={phoneNumber}
                                onChangeText={onPhoneNumberChange} />
                        </ScrollView>
                        <View style={styles.btnContainer}>
                            <Button style={styles.btnSave} loading={customerSaveLoading} title="Save" onPress={() => handleSaveCustomer()} />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        customerScreenContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        keyBoardAvoidContainer: {
            backgroundColor: colors.backgroundPrimary,
            flex: 1,
        },
        inputStyle: {
            backgroundColor: colors.white,
            borderColor: colors.gray[400],
            borderWidth: 1,
        },
        headerStyle: {
            shadowColor: colors.gray[400],
            shadowOffset: {
                width: 0,
                height: 5,
            },
            height: '30%',
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
        label: {
            marginBottom: spacing[2],
        },
        customerInputsContainer: {
            marginTop: spacing[2],
            width: '100%',
            height: '40%',
        },
        inputAndBtnContainer: {
            flex: 1,
            width: '100%',
            padding: spacing[3],
        },
        btnContainer: {
            flex: 1,
        },
        btnSave: {
            padding: spacing[4],
        },
    });

export default CustomerAddScreen;
