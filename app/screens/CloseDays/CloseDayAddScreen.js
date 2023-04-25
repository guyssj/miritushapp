import { Avatar } from "@rneui/base";
import React, { useState } from "react"
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { Button, TextInput } from "../../components"
import { color, useTheme } from "../../theme";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { format } from 'date-fns'
import Icons from 'react-native-vector-icons/MaterialIcons';


const CloseDayAddScreen = ({ navigation, route }) => {

    const [date, setDate] = useState(new Date());
    const [dateInput, setDateInput] = useState("");
    const [notes, setNotes] = useState("");
    const theme = useTheme();
    const queryClient = useQueryClient();

    const mutation = useMutation(api.calendar.saveCloseDay, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('closeDays')
            navigation.goBack();
        }
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date)
        setDateInput(format(date, "dd/MM/yyyy"))
        hideDatePicker();
    };


    const handleSaveCloseDay = () => {
        mutation.mutate({ date: date, notes: notes })
    }

    return (

        <KeyboardAvoidingView
            keyboardVerticalOffset={130}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginInputsContainer}>
                        <TouchableOpacity activeOpaticy={1} onPress={showDatePicker}>
                            <TextInput
                                editable={false}
                                placeholder={"Date"}
                                containerStyle={{
                                    justifyContent: 'space-between',
                                }}
                                rightIcon={<Icons name='calendar-today' color={color.palette.blue} style={styles.icon} size={30} />}
                                value={dateInput}
                                onChangeText={setDate} />
                        </TouchableOpacity>
                        <Text>
                        </Text>
                        <DateTimePickerModal
                            display="inline"
                            date={date}
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                        <TextInput
                            placeholder={"Notes"}
                            value={notes}
                            onChangeText={setNotes} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Save" onPress={() => handleSaveCloseDay()} />
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
export default CloseDayAddScreen