import React, { useState } from 'react';
import { Alert, ImageBackground, Keyboard, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, TextInput, Typography } from '../components';
import { useDispatch } from 'react-redux';
import api from '../api';
import { userSignInSet } from '../store/reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import useStyles from '../theme/useStyles';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

const LoginScreen = () => {
    const [userName, onUserNameChange] = useState('');
    const [password, onPasswordChange] = useState('');
    const { styles, colors } = useStyles(createStyles);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { mutate: SignIn, isLoading: isLoadingSignIn } = api.usersQuery.useLogin();
    const onSubmitSignIn = () => {
        if (userName === '' || password === '') {
            Alert.alert(t('loginScreen.invalidUserNamePassword'));
            return;
        }
        SignIn({ userName: userName, password: password }, {
            onSuccess: (data) => {
                AsyncStorage.setItem('accessToken', data.access_token);
                dispatch(userSignInSet(true));
            },
            onError: (data) => {
                Alert.alert(t('loginScreen.invalidUserNamePassword'));
            },
        });
    };
    return (
        <ImageBackground style={styles.image} resizeMode="cover" source={require('../svgs/LoginBackground.png')}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <Image style={styles.imageSize} source={require('../svgs/LogoApp.png')} />
                <KeyboardAvoidingView
                    keyboardVerticalOffset={50}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidContainer}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <View style={styles.container}>
                            <View style={styles.headerContainer}>
                                <Typography variant="h1" style={styles.headerText}>{t('loginScreen.title')}</Typography>
                                <Typography variant="subtitle" style={styles.subHeaderText}>{t('loginScreen.subtitle')}</Typography>
                            </View>
                            <View style={styles.conentContainer} >
                                <TextInput
                                    placeholder={t('loginScreen.labelUsername')}
                                    placeholderTextColor={colors.gray[600]}
                                    value={userName}
                                    onChangeText={onUserNameChange}
                                />

                                <TextInput
                                    placeholder={t('loginScreen.labelPassword')}
                                    secureTextEntry
                                    placeholderTextColor={colors.gray[600]}
                                    value={password}
                                    onChangeText={onPasswordChange}
                                />

                                <Button
                                    loading={isLoadingSignIn}
                                    style={styles.signInButton}
                                    title={t('loginScreen.signInBtn')}
                                    onPress={() => onSubmitSignIn()} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const createStyles = (colors, spacing) =>
    StyleSheet.create({
        safeAreaContainer: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: spacing[4],
        },
        keyboardAvoidContainer: {
            flex: 1,
            width: '100%',
        },
        imageSize: {
            width: 350,
            height: 60,
        },
        container: {
            justifyContent: 'space-evenly',
            flex: 1,
            width: '100%',
            alignItems: 'center',
            padding: spacing[5],
        },
        image: {
            flex: 1,
            justifyContent: 'center',
        },
        headerContainer: {
            marginTop: spacing[5],
            alignItems: 'center',
        },
        conentContainer: {
            justifyContent: 'space-evenly',
            marginTop: spacing[5],
            width: '100%',
            alignItems: 'center',
        },
        headerText: {
            marginBottom: spacing[3],
            color: colors.primary.main,
        },
        subHeaderText: {
            flexWrap: 'wrap',
            marginBottom: spacing[5],
        },
        signInButton: {
            width: '100%',
            height: 55,
        },
    });

export default LoginScreen;
