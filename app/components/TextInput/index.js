import React from "react";
import { TextInput as RNTextInput, View } from "react-native";
import TextInputStyle from "./textInput.style";



///Text input Custom
const TextInput = ({ editable, value, style, containerStyle, placeholder, secureTextEntry = false, leftIcon, onChangeText, rightIcon }) => {
    return (
        <View style={[TextInputStyle.textInputContainer, containerStyle]}>
            {leftIcon}
            <RNTextInput
                editable={editable}
                value={value}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={'#A2A2A2'}
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={[TextInputStyle.textInput, style]} />
            {rightIcon}
        </View>
    );
}

export default TextInput;