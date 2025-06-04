import { StyleSheet } from "react-native";

export const buttonStyles = (colors, spacing) =>
    StyleSheet.create({
        appButtonContainer: {
            shadowColor: colors.gray[500],
            shadowOffset: {
                width: 0,
                height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,
            elevation: 15,
            backgroundColor: colors.primary.main,
            borderRadius: spacing[2],
            justifyContent: 'center'
        },
        appButtonText: {
            color: colors.white,
            alignSelf: "center",
        },
        buttonTextContainer: {
            flexDirection: 'row-reverse',
            justifyContent: 'center'
        }

    });
