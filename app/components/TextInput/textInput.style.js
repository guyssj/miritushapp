import { StyleSheet } from "react-native";
import { color, spacing } from "../../theme";

///Input Style
const TextInputStyle = StyleSheet.create({
    textInputContainer: {
        flexDirection: 'row',
        padding: spacing[4],
        backgroundColor: color.palette.lightGrey,
        borderRadius: spacing[2],
        margin: spacing[1],
        opacity: 0.8,
        overflow: "hidden",
        shadowColor: color.palette.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 8,
    },
    textInput: {
        fontSize: 16,
        color: color.text,
    }
});

export default TextInputStyle;