import { StyleSheet } from "react-native";
import { TColors } from "./colors";
import useColors from "./useColors";
import { useMemo } from "react";
import useSpacing from "./useSpacing";

interface Styles<T extends StyleSheet.NamedStyles<T>> {
    colors: TColors;
    spacing: number[];
    styles: T;
}

export default function <T extends StyleSheet.NamedStyles<T>>(
    createStyle: (colors: TColors, spacing?: number[]) => T,
): Styles<T> {
    const { colors } = useColors();
    const { spacing } = useSpacing();
    return {
        colors: colors,
        spacing: spacing,
        styles: useMemo(() => createStyle(colors, spacing), [colors, spacing, createStyle]),
    };
}