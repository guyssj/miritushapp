import { I18nManager, StyleSheet } from "react-native";
import { color, spacing, typography } from "../../theme";

///Input Style
export const createStylesInput = (colors, spacing) =>
    StyleSheet.create({
        input: {
            ...typography.body,
            height: 65,
            borderWidth: 0,
            color: colors.gray[600],
            borderRadius: spacing[3],
            paddingHorizontal: spacing[2],
            marginBottom: spacing[2],
            backgroundColor: colors.secondary[50],
            textAlign: I18nManager.isRTL ? 'right' : 'left',

        },
        textInputContainer: {
            width: '100%'
        }
    });