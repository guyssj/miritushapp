import React from 'react';
import { Text, useColorScheme, StyleSheet } from 'react-native';
import { typography } from '../../theme'; // <== Import your theme

const Typography = ({
    variant = 'body',
    style,
    children,
    ...props
}) => {
    const colorScheme = useColorScheme(); // 'light' | 'dark'

    return (
        <Text
            style={[
                styles.base,
                typography[variant],
                // eslint-disable-next-line react-native/no-inline-styles
                { color: colorScheme === 'dark' ? '#ffffff' : '#111111' },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    base: {
        // Any global styles (optional)
        textAlign: 'left',
    },
});

export default Typography;
