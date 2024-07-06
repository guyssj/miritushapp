import React, { forwardRef } from "react";
import { TextInput as RNTextInput, Text, View, TextInputProps } from "react-native";
import TextInputStyle from "./textInput.style";



///Text input Custom
const TextInput = forwardRef(({ returnKeyType, onSubmitEditing, keyboardType, editable, value, style, labelStyle, containerStyle, placeholder, secureTextEntry = false, leftIcon, onChangeText, rightIcon, label }, ref) => {
    return (
        <View>
            <Text style={[TextInputStyle.label, labelStyle]}>{label}</Text>
            <View style={[TextInputStyle.textInputContainer, containerStyle]}>
                {leftIcon}
                <RNTextInput
                    ref={ref}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    editable={editable}
                    value={value}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={'#A1a1a1'}
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    style={[TextInputStyle.textInput, style]} />
                {rightIcon}
            </View>
        </View>
    );
})

export default TextInput;