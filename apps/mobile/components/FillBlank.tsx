import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface FillBlankProps {
    prompt: string;
    answer: string;
    options: string[];
    onAnswer: (correct: boolean) => void;
}

export default function FillBlank({ prompt, answer, options, onAnswer }: FillBlankProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleSelect = (option: string) => {
        setSelected(option);
        setShowFeedback(true);

        const isCorrect = option === answer;
        setTimeout(() => {
            onAnswer(isCorrect);
        }, 1500);
    };

    const isCorrect = selected === answer;

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>{prompt}</Text>

            {/* Sentence with blank */}
            <View style={styles.sentenceContainer}>
                <View style={[
                    styles.blankBox,
                    showFeedback && (isCorrect ? styles.correctBox : styles.incorrectBox)
                ]}>
                    {selected ? (
                        <Text style={[
                            styles.selectedText,
                            showFeedback && (isCorrect ? styles.correctText : styles.incorrectText)
                        ]}>
                            {selected}
                        </Text>
                    ) : (
                        <Text style={styles.placeholderText}>___</Text>
                    )}
                </View>
            </View>

            {/* Feedback */}
            {showFeedback && !isCorrect && (
                <View style={styles.feedbackContainer}>
                    <Text style={styles.feedbackText}>
                        Correct answer: <Text style={styles.correctAnswer}>{answer}</Text>
                    </Text>
                </View>
            )}

            {/* Word Bank */}
            {!showFeedback && (
                <View style={styles.optionsContainer}>
                    <Text style={styles.optionsLabel}>Choose the correct word:</Text>
                    <View style={styles.optionsGrid}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.optionButton,
                                    selected === option && styles.selectedOption
                                ]}
                                onPress={() => handleSelect(option)}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selected === option && styles.selectedOptionText
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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
    sentenceContainer: {
        alignItems: 'center',
        marginVertical: SPACING.xxl,
    },
    blankBox: {
        minWidth: 150,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.gray200,
        borderStyle: 'dashed',
        backgroundColor: COLORS.gray100,
        alignItems: 'center',
    },
    correctBox: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F5E9',
        borderStyle: 'solid',
    },
    incorrectBox: {
        borderColor: COLORS.error,
        backgroundColor: '#FFEBEE',
        borderStyle: 'solid',
    },
    selectedText: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.slate800,
    },
    correctText: {
        color: COLORS.primary,
    },
    incorrectText: {
        color: COLORS.error,
    },
    placeholderText: {
        fontSize: 24,
        color: COLORS.slate500,
    },
    feedbackContainer: {
        padding: SPACING.md,
        backgroundColor: '#FFF3E0',
        borderRadius: RADIUS.md,
        marginBottom: SPACING.lg,
    },
    feedbackText: {
        fontSize: 16,
        color: COLORS.slate700,
        textAlign: 'center',
    },
    correctAnswer: {
        fontWeight: '700',
        color: COLORS.primary,
        fontSize: 18,
    },
    optionsContainer: {
        marginTop: SPACING.xl,
    },
    optionsLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.slate700,
        marginBottom: SPACING.md,
        textAlign: 'center',
    },
    optionsGrid: {
        gap: SPACING.sm,
    },
    optionButton: {
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.gray200,
        alignItems: 'center',
    },
    selectedOption: {
        borderColor: COLORS.secondary,
        backgroundColor: '#E3F2FD',
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.slate800,
    },
    selectedOptionText: {
        color: COLORS.secondary,
    },
});
