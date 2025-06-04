import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNavigator';
import Login from './LoginStuck';
import { ActivityIndicator, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api';
import { useQuery } from 'react-query';
import { userSignInSet } from '../store/reducers/user';
import { SignalRProvider } from '../signalR/signalRContext';
import { Platform } from 'react-native';
import useColors from '../theme/useColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';


const AuthNav = () => {
    const LANGUAGE_KEY = 'user-language';

    const { isSignIn } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [userLang, setUserLang] = useState('');
    const { i18n } = useTranslation();
    const { isLoading } = useQuery('userInfo', () => api.users.userinfo(), {
        onError: async (error) => {
            await AsyncStorage.removeItem('accessToken');
        },
        onSuccess: async () => {
            dispatch(userSignInSet(true));
        }
    });

    useEffect(() => {
        AsyncStorage.getItem(LANGUAGE_KEY).then(code => {
            setUserLang(code);
        });
    }, []);
    const { colors } = useColors();
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: colors.primary.main,
            background: 'rgb(242, 242, 242)'
        },
        fonts: Platform.select({
            ios: {
                regular: {
                    fontFamily: 'NotoSansHebrew-Regular',
                    fontWeight: '400',
                },
                medium: {
                    fontFamily: 'NotoSansHebrew-Light',
                    fontWeight: '500',
                },
                bold: {
                    fontFamily: 'NotoSansHebrew-Bold',
                    fontWeight: '600',
                },
                heavy: {
                    fontFamily: 'NotoSansHebrew-ExtraBold',
                    fontWeight: '700',
                },
            },
            default: {
                regular: {
                    fontFamily: 'NotoSansHebrew-Regular',
                    fontWeight: 'normal',
                },
                medium: {
                    fontFamily: 'NotoSansHebrew-Light',
                    fontWeight: 'normal',
                },
                bold: {
                    fontFamily: 'NotoSansHebrew-Bold',
                    fontWeight: '600',
                },
                heavy: {
                    fontFamily: 'NotoSansHebrew-ExtraBold',
                    fontWeight: '700',
                },
            },
        }),
    };

    if (isLoading) {
        return (<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>)
    }
    return (
        <SignalRProvider>
            <NavigationContainer direction={i18n.dir(userLang)} theme={navTheme}>
                <View style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
                    {isSignIn && !isLoading ? <TabNav /> : <Login />}
                </View>
            </NavigationContainer>
        </SignalRProvider>
    )
}

export default AuthNav;
