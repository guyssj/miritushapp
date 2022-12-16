import { NavigationContainer } from '@react-navigation/native';
import TabNav from './TabNavigator';
import Login from './LoginStuck';
import { View } from 'react-native';
import React from 'react';
import { color } from '../theme';
import { useSelector } from 'react-redux';

const AuthNav = () => {
    const { isSignIn } = useSelector(state => state.user);
    console.log(isSignIn)
    return (
        <NavigationContainer>
            <View style={{ flex: 1, backgroundColor: color.palette.offWhiteBack }}>
                {isSignIn ? (
                    <TabNav />
                ) : (
                    <Login />
                )
                }
            </View>
        </NavigationContainer>
    )
}

export default AuthNav;