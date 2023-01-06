import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ButtonStyle from './button.style';


const Button = ({ style, textStyle, onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[ButtonStyle.appButtonContainer, style]}>
            <Text style={[ButtonStyle.appButtonText, textStyle]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;
