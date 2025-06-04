import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { createStylesInput } from './textInput.style';
import useStyles from '../../theme/useStyles';



///Text input Custom
const TextInput = forwardRef(({ returnKeyType, placeholderTextColor, onSubmitEditing, keyboardType, editable, value, style, containerStyle, placeholder, secureTextEntry = false, leftIcon, onChangeText, rightIcon }, ref) => {
    const [borderFocus, setBorderFocus] = useState({ borderWidth: 0, borderColor: '' });
    const { colors, styles: TextInputStyle } = useStyles(createStylesInput);
    return (
        <View style={[TextInputStyle.textInputContainer, containerStyle]}>
            {leftIcon}
            <RNTextInput
                ref={ref}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                editable={editable}
                value={value}
                onFocus={() => { setBorderFocus({ borderWidth: 1, borderColor: colors.primary.main }); }}
                onBlur={() => { setBorderFocus({ borderWidth: 0, borderColor: '' }); }}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={[TextInputStyle.input, borderFocus, style]} />
            {rightIcon}
        </View>
    );
});

export default TextInput;
