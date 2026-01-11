import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface TapWordProps {
    prompt: string;
    ayah: string;
    answer: string;
    onAnswer: (correct: boolean) => void;
}

export default function TapWord({ prompt, ayah, answer, onAnswer }: TapWordProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    // Split ayah into words
    const words = ayah.split(' ');

    const handleWordPress = (word: string) => {
        if (showFeedback) return;

        setSelected(word);
        setShowFeedback(true);

        const isCorrect = word === answer;
        setTimeout(() => {
            onAnswer(isCorrect);
        }, 1500);
    };

    const isCorrect = selected === answer;

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>{prompt}</Text>

            {/* Ayah with tappable words */}
            <View style={styles.ayahContainer}>
                {words.map((word, index) => (
                    <TouchableOpacity
                        key={`${word}-${index}`}
                        style={[
                            styles.wordButton,
                            selected === word && (isCorrect ? styles.correctWord : styles.incorrectWord),
                            !showFeedback && selected === word && styles.selectedWord,
                        ]}
                        onPress={() => handleWordPress(word)}
                        disabled={showFeedback}
                    >
                        <Text style={[
                            styles.wordText,
                            selected === word && (isCorrect ? styles.correctText : styles.incorrectText)
                        ]}>
                            {word}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Feedback */}
            {showFeedback && (
                <View style={[
                    styles.feedbackContainer,
                    isCorrect ? styles.correctFeedback : styles.incorrectFeedback
                ]}>
                    <Text style={styles.feedbackText}>
                        {isCorrect ? '✓ Correct!' : `✗ The correct word is: ${answer}`}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.lg,
    },
    prompt: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.slate800,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    ayahContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: SPACING.sm,
        padding: SPACING.lg,
        backgroundColor: COLORS.gray100,
        borderRadius: RADIUS.lg,
        marginVertical: SPACING.xl,
    },
    wordButton: {
        padding: SPACING.md,
        paddingHorizontal: SPACING.lg,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.gray200,
    },
    selectedWord: {
        borderColor: COLORS.secondary,
        backgroundColor: '#E3F2FD',
    },
    correctWord: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F5E9',
    },
    incorrectWord: {
        borderColor: COLORS.error,
        backgroundColor: '#FFEBEE',
    },
    wordText: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.slate800,
        textAlign: 'center',
    },
    correctText: {
        color: COLORS.primary,
    },
    incorrectText: {
        color: COLORS.error,
    },
    feedbackContainer: {
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginTop: SPACING.lg,
    },
    correctFeedback: {
        backgroundColor: '#E8F5E9',
    },
    incorrectFeedback: {
        backgroundColor: '#FFEBEE',
    },
    feedbackText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: COLORS.slate800,
    },
});
