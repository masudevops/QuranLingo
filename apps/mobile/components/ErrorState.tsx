import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import Button3D from './Button3D';

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}

export default function ErrorState({
    title = "Oops!",
    message,
    onRetry
}: ErrorStateProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>😕</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <Button3D
                    title="TRY AGAIN"
                    onPress={onRetry}
                    variant="primary"
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emoji: {
        fontSize: 64,
        marginBottom: SPACING.lg,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.slate800,
        marginBottom: SPACING.sm,
    },
    message: {
        fontSize: 16,
        color: COLORS.slate500,
        textAlign: 'center',
        marginBottom: SPACING.xl,
        lineHeight: 24,
    },
});
