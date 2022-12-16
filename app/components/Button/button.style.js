import { StyleSheet } from "react-native";
import { color, spacing } from "../../theme";

const ButtonStyle = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: color.palette.blue,
        borderRadius: 10,
        paddingVertical: spacing[4],
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        alignSelf: "center",
    }
});

export default ButtonStyle;