import React from "react";
import { TextInput as RNTextInput, View } from "react-native";
import TextInputStyle from "./textInput.style";



///Text input Custom
const TextInput = ({ value, style, placeholder, secureTextEntry = false, leftIcon, onChangeText }) => {
    return (
        <View style={TextInputStyle.textInputContainer}>
            {leftIcon}
            <RNTextInput
                value={value}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={'#A2A2A2'}
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={[TextInputStyle.textInput, style]} />
        </View>
    );
}

export default TextInput;