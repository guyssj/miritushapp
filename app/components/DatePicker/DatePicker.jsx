import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icons from 'react-native-vector-icons/MaterialIcons';
import useStyles from '../../theme/useStyles';
import Typography from '../Typography/Typography';
import { typography } from '../../theme';


const DatePicker = ({ setDate, dateNow, selectedValue, onConfirm, label, placeholder }) => {
    const { colors, styles } = useStyles(createStyle);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        onConfirm(date);
        hideDatePicker();
    };
    return (
        <View>
            <Typography style={styles.label}>{label}</Typography>
            <TouchableOpacity activeOpaticy={1} onPress={showDatePicker}>
                <View style={styles.input}>
                    <TextInput
                        style={{
                            ...typography.body,
                        }}
                        editable={false}
                        placeholder={placeholder}
                        value={selectedValue}
                        onChangeText={setDate} />
                    <Icons name="calendar-today" color={colors.primary.main} size={30} />

                </View>

            </TouchableOpacity>
            <DateTimePickerModal
                display="inline"
                date={dateNow}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};
const createStyle = (colors, spacing) =>
    StyleSheet.create({
        input: {
            ...typography.body,
            height: 65,
            borderWidth: 1,
            borderColor: colors.gray[400],
            color: colors.gray[400],
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: spacing[3],
            paddingHorizontal: spacing[2],
            marginBottom: spacing[2],
            backgroundColor: colors.gray[50],
        },
        label: {
            marginBottom: spacing[2],
        },
    });
export default DatePicker;
