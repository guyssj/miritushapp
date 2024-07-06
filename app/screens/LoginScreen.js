import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button, TextInput } from '../components';
import LoginImage from '../svgs/LoginImage';
import { useDispatch, useSelector } from "react-redux";

import { color, spacing } from '../theme';
import Icons from 'react-native-vector-icons/MaterialIcons';
import api from '../api';
import { userSignInSet } from '../store/reducers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import LogoApp from '../svgs/LogoApp';

const LoginScreen = () => {
    const [userName, onUserNameChange] = useState("");
    const [password, onPasswordChange] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const SignIn = async () => {
        //login with user name
        setLoading(true)
        const user = await api.users.login(userName, password).catch((error) => {
            setLoading(false)
        });
        //save the access_token in storage
        await AsyncStorage.setItem('accessToken', user.access_token)
        //update user was sgin in
        dispatch(userSignInSet(true));
        setLoading(false)
    }

    return (
        // <View style={styles.loginScreenContainer}>
        //     <View style={styles.imageContainer}>
        //         <LoginImage />
        //     </View>
        //     <View style={styles.loginInputsContainer}>
        //         <TextInput
        //             onChangeText={onUserNameChange}
        //             value={userName}
        //             leftIcon={<Icons name='account-circle' color={color.palette.blue} style={styles.icon} size={30} />}
        //             placeholder="User name" />
        //         <TextInput
        //             leftIcon={<Icons name='vpn-key' color={color.palette.blue} style={styles.icon} size={30} />}
        //             secureTextEntry={true}
        //             value={password}
        //             onChangeText={onPasswordChange}
        //             placeholder="Password" />
        //     </View>
        //     <View style={styles.loginButtonContainer}>
        //         <Button title="Sign In" loading={loading} onPress={() => SignIn()} />
        //     </View>
        // </View>
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <LogoApp />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>

                {/* Username Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={userName}
                    onChangeText={onUserNameChange}
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={onPasswordChange}
                    secureTextEntry
                />

                {/* Login Button */}
                <Button title={'Login'} loading={loading} onPress={() => SignIn()} style={styles.button}>
                </Button>

                {/* Forgot Password Link */}
                <Text style={styles.forgotPassword}>Forgot Password?</Text>

                {/* Signup Link */}
            </View>

            {/* Footer Text */}
            <Text style={styles.footerText}>© 2023 Nailbook. All rights reserved.</Text>
        </View>
    )
}

// const styles = StyleSheet.create({
//     loginScreenContainer: {
//         alignItems: 'center'
//     },
//     loginInputsContainer: {
//         width: '90%'
//     },
//     imageContainer: {
//         width: '80%',
//         height: '50%',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start'
//     },
//     loginButtonContainer: {
//         width: '90%',
//         marginTop: '50%'
//     },
//     icon: {
//         paddingRight: spacing[3]
//     }
// });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db', // Calming Blue
    },
    logoContainer: {
    },
    formContainer: {
        backgroundColor: '#ffffff', // White
        padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        alignItems: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff', // White text
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 0
    },
    button: {
        backgroundColor: '#2ecc71', // Vibrant Green
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff', // White text
    },
    forgotPassword: {
        color: '#2ecc71', // Vibrant Green
        marginTop: 10,
    },
    signupLink: {
        marginTop: 20,
        color: '#ffffff', // White text
    },
    signupLinkText: {
        color: '#2ecc71', // Vibrant Green
    },
    footerText: {
        marginTop: 20,
        color: '#154360', // Darker shade of the background color
    },
});

export default LoginScreen;