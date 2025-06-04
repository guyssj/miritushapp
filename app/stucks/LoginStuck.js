import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';

const LoginStuck = createNativeStackNavigator();

const Login = () => {
    return (
        <LoginStuck.Navigator screenOptions={{ headerShown: false }}>
            <LoginStuck.Screen name="Login" component={LoginScreen} />
        </LoginStuck.Navigator>
    );
};

export default Login;
