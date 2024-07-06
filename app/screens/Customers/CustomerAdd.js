import { Avatar } from "@rneui/base";
import React, { useRef, useState } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { Button, TextInput } from "../../components"
import { color, useTheme } from "../../theme";

const CustomerAddScreen = ({ navigation }) => {
    const [firstName, onFirstNameChange] = useState("");
    const [lastName, onLastNameChange] = useState("");
    const [phoneNumber, onPhoneNumberChange] = useState("");
    const theme = useTheme();
    const queryClient = useQueryClient();

    const mutation = useMutation(api.customers.save, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('customers')
            navigation.goBack();
        }
    })

    const inputRefs = {
        firstName: useRef(null),
        lastName: useRef(null),
        phoneNumber: useRef(null),
    };

    const focusNextField = (key) => {
        console.log(inputRefs[key])
        inputRefs[key].current.focus();
    };



    const handleSaveCustomer = () => {
        mutation.mutate({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber })
    }

    return (

        <KeyboardAvoidingView
            keyboardVerticalOffset={120}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <Avatar
                        size={100}
                        rounded
                        title={firstName.charAt(0) + lastName.charAt(0)}
                        containerStyle={{ backgroundColor: theme.palette.secondary.main }}
                    />
                    <View style={styles.loginInputsContainer}>
                        <TextInput
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('lastName')}
                            ref={inputRefs.firstName}
                            label={'First name'}
                            placeholder={"First name"}
                            value={firstName}
                            onChangeText={onFirstNameChange} />
                        <TextInput
                            returnKeyType="next"
                            onSubmitEditing={() => focusNextField('phoneNumber')}
                            ref={inputRefs.lastName}
                            label={'Last name'}
                            placeholder={"Last name"}
                            value={lastName}
                            onChangeText={onLastNameChange} />
                        <TextInput
                            label={'Phone number'}
                            returnKeyType="done"
                            onSubmitEditing={() => handleSaveCustomer()}
                            ref={inputRefs.phoneNumber}
                            placeholder={"Phone number"}
                            value={phoneNumber}
                            onChangeText={onPhoneNumberChange} />
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title="Save" onPress={() => handleSaveCustomer()} />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    loginScreenContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    container: {
        padding: 2,
        backgroundColor: color.background,
        flex: 1
    },
    header: {
        fontSize: 36
    },
    loginInputsContainer: {
        width: '90%',

    },
    btnContainer: {
        width: '95%',
        marginTop: 'auto'
    },
});
export default CustomerAddScreen