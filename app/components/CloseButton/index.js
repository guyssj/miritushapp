import React from "react"
import { TouchableOpacity } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import { useTheme } from "../../theme";


const CloseButton = ({ onPress, ...props }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} accessibilityLabel="חזרה" {...props}>
            <Icons size={30} color={theme.palette.primary.main} name="close-circle" />
        </TouchableOpacity>
    )
}

export default CloseButton;