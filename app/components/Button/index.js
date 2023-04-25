import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../theme';
import ButtonStyle from './button.style';


const Button = ({ style, textStyle, textStyleContainer, onPress, title, loading = false, disabled = false }) => {
    return (
        <TouchableOpacity disabled={loading || disabled} onPress={onPress} style={[ButtonStyle.appButtonContainer, style, disabled && { backgroundColor: color.palette.lightGrey }]}>
            <View style={[ButtonStyle.buttonTextContainer, textStyleContainer]}>
                <Text style={[ButtonStyle.appButtonText, textStyle]}>{title}</Text>
                {loading && <ActivityIndicator style={{ marginRight: 20 }} color={'white'} />}
            </View>
        </TouchableOpacity>
    )
}

export default Button;
