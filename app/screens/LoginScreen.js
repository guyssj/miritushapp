import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, TextInput } from '../components';
import LoginImage from '../svgs/LoginImage';
import { useDispatch, useSelector } from "react-redux";

import { color, spacing } from '../theme';
import Icons from 'react-native-vector-icons/MaterialIcons';
import api from '../api';
import { userSignInSet } from '../store/reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const [userName, onUserNameChange] = useState("");
    const [password, onPasswordChange] = useState("");
    const dispatch = useDispatch();
    const SignIn = async () => {
        //login with user name
        const user = await api.users.login(userName, password);
        //save the access_token in storage
        await AsyncStorage.setItem('accessToken', user.access_token)
        //update user was sgin in
        dispatch(userSignInSet(true))
    }

    return (
        <View style={styles.loginScreenContainer}>
            <View style={styles.imageContainer}>
                <LoginImage />
            </View>
            <View style={styles.loginInputsContainer}>
                <TextInput
                    onChangeText={onUserNameChange}
                    value={userName}
                    leftIcon={<Icons name='account-circle' color={color.palette.blue} style={styles.icon} size={30} />}
                    placeholder="User name" />
                <TextInput
                    leftIcon={<Icons name='vpn-key' color={color.palette.blue} style={styles.icon} size={30} />}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={onPasswordChange}
                    placeholder="Password" />
            </View>
            <View style={styles.loginButtonContainer}>
                <Button title="Sign In" onPress={() => SignIn()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginScreenContainer: {
        alignItems: 'center'
    },
    loginInputsContainer: {
        width: '90%'
    },
    imageContainer: {
        width: '80%',
        height: '50%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    loginButtonContainer: {
        width: '90%',
        marginTop: '50%'
    },
    icon: {
        paddingRight: spacing[3]
    }
});

export default LoginScreen;