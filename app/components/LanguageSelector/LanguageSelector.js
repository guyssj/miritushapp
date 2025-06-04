import React from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Typography from '../Typography/Typography';
import Button from '../Button';

const LANGUAGE_KEY = 'user-language';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const setLanguage = async (lng) => {
        const isRTL = lng === 'he';
        await i18n.changeLanguage(lng);
        await AsyncStorage.setItem(LANGUAGE_KEY, lng);
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);
        RNRestart.Restart(); // Required for direction change

    };

    return (
        <View style={styles.container}>
            <Typography style={styles.title}>{t('choose_language')}</Typography>
            <Button title="English" onPress={() => setLanguage('en')} />
            <Button title="עברית" onPress={() => setLanguage('he')} />
        </View>
    );
};

export default LanguageSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    title: {
        fontSize: 20, marginBottom: 20,
    },
});

