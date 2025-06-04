import React from "react"
import { TouchableOpacity } from "react-native";
import Icons from 'react-native-vector-icons/Ionicons';
import useColors from "../../theme/useColors";


const CloseButton = ({ onPress, ...props }) => {
    const { colors } = useColors();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8} accessibilityLabel="חזרה" {...props}>
            <Icons size={30} color={colors.primary.main} name="close-circle" />
        </TouchableOpacity>
    )
}

export default CloseButton;