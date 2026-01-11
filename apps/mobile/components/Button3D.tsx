import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface Button3DProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
}

export default function Button3D({ title, onPress, variant = 'primary', disabled = false }: Button3DProps) {
    const [pressed, setPressed] = useState(false);

    const handlePressIn = () => {
        if (!disabled) {
            setPressed(true);
        }
    };

    const handlePressOut = () => {
        setPressed(false);
    };

    const handlePress = () => {
        if (!disabled) {
            onPress();
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            disabled={disabled}
            style={[
                styles.container,
                variant === 'primary' && styles.primaryContainer,
                variant === 'secondary' && styles.secondaryContainer,
                variant === 'outline' && styles.outlineContainer,
                pressed && styles.pressed,
                disabled && styles.disabled,
            ]}
        >
            <Text style={[
                styles.text,
                variant === 'primary' && styles.primaryText,
                variant === 'secondary' && styles.secondaryText,
                variant === 'outline' && styles.outlineText,
                disabled && styles.disabledText,
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        borderRadius: RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.xs,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    primaryContainer: {
        backgroundColor: COLORS.primary,
    },
    secondaryContainer: {
        backgroundColor: COLORS.secondary,
    },
    outlineContainer: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    pressed: {
        transform: [{ translateY: 2 }],
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    primaryText: {
        color: COLORS.white,
    },
    secondaryText: {
        color: COLORS.white,
    },
    outlineText: {
        color: COLORS.primary,
    },
    disabledText: {
        opacity: 0.7,
    },
});
