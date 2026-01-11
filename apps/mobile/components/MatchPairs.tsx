import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../constants/theme';

interface MatchPairsProps {
    prompt: string;
    pairs: Array<{ arabic: string; english: string }>;
    onAnswer: (correct: boolean) => void;
}

export default function MatchPairs({ prompt, pairs, onAnswer }: MatchPairsProps) {
    const [selectedArabic, setSelectedArabic] = useState<string | null>(null);
    const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
    const [matched, setMatched] = useState<Set<string>>(new Set());
    const [incorrect, setIncorrect] = useState<Set<string>>(new Set());

    // Shuffle arrays for display
    const [arabicWords] = useState(() => [...pairs].map(p => p.arabic).sort(() => Math.random() - 0.5));
    const [englishWords] = useState(() => [...pairs].map(p => p.english).sort(() => Math.random() - 0.5));

    const handleArabicPress = (word: string) => {
        if (matched.has(word)) return;
        setSelectedArabic(word);
        if (selectedEnglish) {
            checkMatch(word, selectedEnglish);
        }
    };

    const handleEnglishPress = (word: string) => {
        if (matched.has(word)) return;
        setSelectedEnglish(word);
        if (selectedArabic) {
            checkMatch(selectedArabic, word);
        }
    };

    const checkMatch = (arabic: string, english: string) => {
        const pair = pairs.find(p => p.arabic === arabic && p.english === english);

        if (pair) {
            // Correct match
            setMatched(new Set([...matched, arabic, english]));
            setSelectedArabic(null);
            setSelectedEnglish(null);

            // Check if all matched
            if (matched.size + 2 >= pairs.length * 2) {
                setTimeout(() => onAnswer(true), 500);
            }
        } else {
            // Incorrect match
            setIncorrect(new Set([arabic, english]));
            setTimeout(() => {
                setIncorrect(new Set());
                setSelectedArabic(null);
                setSelectedEnglish(null);
            }, 800);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.prompt}>{prompt}</Text>

            <View style={styles.columns}>
                {/* Arabic Column */}
                <View style={styles.column}>
                    {arabicWords.map((word) => (
                        <TouchableOpacity
                            key={word}
                            style={[
                                styles.wordButton,
                                matched.has(word) && styles.matched,
                                selectedArabic === word && styles.selected,
                                incorrect.has(word) && styles.incorrect,
                            ]}
                            onPress={() => handleArabicPress(word)}
                            disabled={matched.has(word)}
                        >
                            <Text style={[
                                styles.arabicText,
                                matched.has(word) && styles.matchedText
                            ]}>{word}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* English Column */}
                <View style={styles.column}>
                    {englishWords.map((word) => (
                        <TouchableOpacity
                            key={word}
                            style={[
                                styles.wordButton,
                                matched.has(word) && styles.matched,
                                selectedEnglish === word && styles.selected,
                                incorrect.has(word) && styles.incorrect,
                            ]}
                            onPress={() => handleEnglishPress(word)}
                            disabled={matched.has(word)}
                        >
                            <Text style={[
                                styles.englishText,
                                matched.has(word) && styles.matchedText
                            ]}>{word}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
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
    columns: {
        flexDirection: 'row',
        gap: SPACING.md,
        flex: 1,
    },
    column: {
        flex: 1,
        gap: SPACING.sm,
    },
    wordButton: {
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.gray200,
        minHeight: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selected: {
        borderColor: COLORS.secondary,
        backgroundColor: '#E3F2FD',
    },
    matched: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F5E9',
    },
    incorrect: {
        borderColor: COLORS.error,
        backgroundColor: '#FFEBEE',
    },
    arabicText: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.slate800,
        textAlign: 'center',
    },
    englishText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.slate700,
        textAlign: 'center',
    },
    matchedText: {
        color: COLORS.primary,
    },
});
