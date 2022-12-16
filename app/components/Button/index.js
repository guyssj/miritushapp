import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import ButtonStyle from './button.style';


const Button = ({ style, outline, onPress, title }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[ButtonStyle.appButtonContainer, style]}>
            <Text style={ButtonStyle.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button;
