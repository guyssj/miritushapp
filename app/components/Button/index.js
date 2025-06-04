import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { color } from '../../theme';
import Typography from '../Typography/Typography';
import useStyles from '../../theme/useStyles';
import { buttonStyles } from './button.style';


const Button = ({ style, textStyle, textStyleContainer, onPress, title, loading = false, disabled = false }) => {

    const { styles: ButtonStyle, colors } = useStyles(buttonStyles);
    return (
        <TouchableOpacity disabled={loading || disabled} onPress={onPress} style={[ButtonStyle.appButtonContainer, style, (disabled || loading) && { backgroundColor: colors.gray[500] }]}>
            <View style={[ButtonStyle.buttonTextContainer, textStyleContainer]}>
                <Typography variant="body" style={[ButtonStyle.appButtonText, textStyle]}>{title}</Typography>
                {loading && <ActivityIndicator style={{ marginRight: 20 }} color={'white'} />}
            </View>
        </TouchableOpacity>
    )
}

export default Button;
