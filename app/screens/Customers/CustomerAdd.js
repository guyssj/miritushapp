import { Avatar } from "@rneui/base";
import React, { useState } from "react"
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


    const handleSaveCustomer = () => {
        mutation.mutate({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber })
    }

    return (

        <KeyboardAvoidingView
            keyboardVerticalOffset={130}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <Avatar
                        size={100}
                        rounded
                        title={firstName.charAt(0) + lastName.charAt(0)}
                        containerStyle={{ backgroundColor: theme.palette.primary.main }}
                    />
                    <View style={styles.loginInputsContainer}>
                        <TextInput
                            placeholder={"First name"}
                            value={firstName}
                            onChangeText={onFirstNameChange} />
                        <TextInput
                            placeholder={"Last name"}
                            value={lastName}
                            onChangeText={onLastNameChange} />
                        <TextInput
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
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1
    },
    container: {
        backgroundColor: color.palette.offWhiteBack,
        flex: 1,
    },
    header: {
        fontSize: 36
    },
    loginInputsContainer: {
        width: '90%',

    },
    btnContainer: {
        width: '90%',
        marginTop: '30%'
    },
});
export default CustomerAddScreen