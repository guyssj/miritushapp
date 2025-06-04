import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from './locales/en.json';
import he from './locales/he.json';

const LANGUAGE_KEY = 'user-language';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        const savedData = await AsyncStorage.getItem(LANGUAGE_KEY);
        const lng = savedData || 'en';
        callback(lng);
    },
    init: () => { },
    cacheUserLanguage: async (lng) => {
        await AsyncStorage.setItem(LANGUAGE_KEY, lng);
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        resources: {
            en: { translation: en },
            he: { translation: he },
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
