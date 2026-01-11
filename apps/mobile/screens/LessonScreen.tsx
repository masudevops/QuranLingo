import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchNextLesson, Exercise } from '../services/lesson';
import { COLORS, SPACING, RADIUS } from '../constants/theme';
import Button3D from '../components/Button3D';
import MatchPairs from '../components/MatchPairs';
import FillBlank from '../components/FillBlank';
import TapWord from '../components/TapWord';
import { updateProgressOnLessonComplete } from '../services/storage';

import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';

export default function LessonScreen({ navigation }: any) {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [saving, setSaving] = useState(false);

    const { data: lesson, isLoading, error, refetch } = useQuery({
        queryKey: ['nextLesson'],
        queryFn: () => fetchNextLesson(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.skeletonContainer}>
                    <Skeleton width="60%" height={24} style={{ marginBottom: SPACING.lg }} />
                    <Skeleton width="100%" height={200} style={{ marginBottom: SPACING.md }} />
                    <Skeleton width="100%" height={60} style={{ marginBottom: SPACING.sm }} />
                    <Skeleton width="100%" height={60} style={{ marginBottom: SPACING.sm }} />
                    <Skeleton width="100%" height={60} style={{ marginBottom: SPACING.sm }} />
                    <Skeleton width="100%" height={60} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorState
                    title="Can't Load Lesson"
                    message="Check your internet connection and try again."
                    onRetry={() => refetch()}
                />
            </SafeAreaView>
        );
    }

    if (!lesson || lesson.exercises.length === 0) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.errorTitle}>📚</Text>
                    <Text style={styles.errorText}>No lessons available</Text>
                    <Button3D title="GO BACK" onPress={() => navigation.goBack()} />
                </View>
            </SafeAreaView>
        );
    }

    const currentExercise = lesson.exercises[currentExerciseIndex] as Exercise;
    const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;
    const xpEarned = correctAnswers * 10;

    const handleAnswer = (correct: boolean) => {
        setIsCorrect(correct);
        setShowFeedback(true);
        if (correct) {
            setCorrectAnswers(prev => prev + 1);
        }
    };

    const handleContinue = () => {
        if (currentExerciseIndex < lesson.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
            setShowFeedback(false);
        } else {
            setCompleted(true);
        }
    };

    const handleMCQAnswer = (option: string) => {
        const correct = option === currentExercise.content.answer;
        handleAnswer(correct);
    };

    // Completion Screen
    if (completed) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.completionContainer}>
                    <Text style={styles.completionEmoji}>🎉</Text>
                    <Text style={styles.completionTitle}>Lesson Complete!</Text>
                    <Text style={styles.completionSubtitle}>{lesson.title}</Text>

                    <View style={styles.statsCard}>
                        <View style={styles.statRow}>
                            <Text style={styles.statLabel}>Correct Answers</Text>
                            <Text style={styles.statValue}>{correctAnswers}/{lesson.exercises.length}</Text>
                        </View>
                        <View style={styles.statRow}>
                            <Text style={styles.statLabel}>XP Earned</Text>
                            <Text style={styles.xpValue}>+{xpEarned} XP</Text>
                        </View>
                    </View>

                    <Button3D
                        title={saving ? "SAVING..." : "CONTINUE"}
                        onPress={async () => {
                            setSaving(true);
                            // Save progress
                            const wordsLearned = Math.floor(lesson.exercises.length / 2); // Rough estimate
                            await updateProgressOnLessonComplete(lesson.id, xpEarned, wordsLearned);
                            setSaving(false);
                            navigation.navigate('Home');
                        }}
                        variant="primary"
                        disabled={saving}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.progressText}>
                    {currentExerciseIndex + 1} of {lesson.exercises.length}
                </Text>
            </View>

            {/* Exercise Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
                {currentExercise.type === 'MCQ' && (
                    <View style={styles.exerciseCard}>
                        <Text style={styles.prompt}>{currentExercise.content.prompt}</Text>
                        <View style={styles.optionsContainer}>
                            {currentExercise.content.options.map((opt: string, idx: number) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.optionButton,
                                        showFeedback && opt === currentExercise.content.answer && styles.correctOption,
                                        showFeedback && opt !== currentExercise.content.answer && styles.incorrectOption,
                                    ]}
                                    onPress={() => handleMCQAnswer(opt)}
                                    disabled={showFeedback}
                                >
                                    <Text style={styles.optionText}>{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}

                {currentExercise.type === 'MATCH' && (
                    <MatchPairs
                        prompt={currentExercise.content.prompt}
                        pairs={currentExercise.content.pairs}
                        onAnswer={handleAnswer}
                    />
                )}

                {currentExercise.type === 'FILL_BLANK' && (
                    <FillBlank
                        prompt={currentExercise.content.prompt}
                        answer={currentExercise.content.answer}
                        options={currentExercise.content.options}
                        onAnswer={handleAnswer}
                    />
                )}

                {currentExercise.type === 'TAP_WORD' && (
                    <TapWord
                        prompt={currentExercise.content.prompt}
                        ayah={currentExercise.content.ayah}
                        answer={currentExercise.content.answer}
                        onAnswer={handleAnswer}
                    />
                )}
            </ScrollView>

            {/* Continue Button */}
            {showFeedback && (
                <View style={styles.footer}>
                    <View style={[
                        styles.feedbackBanner,
                        isCorrect ? styles.correctBanner : styles.incorrectBanner
                    ]}>
                        <Text style={styles.feedbackText}>
                            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </Text>
                    </View>
                    <Button3D
                        title="CONTINUE"
                        onPress={handleContinue}
                        variant="primary"
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    skeletonContainer: {
        flex: 1,
        padding: SPACING.lg,
        justifyContent: 'center',
    },
    loadingText: {
        marginTop: SPACING.md,
        fontSize: 16,
        color: COLORS.slate500,
    },
    errorTitle: {
        fontSize: 48,
        marginBottom: SPACING.md,
    },
    errorText: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.slate800,
        marginBottom: SPACING.sm,
    },
    errorDetail: {
        fontSize: 14,
        color: COLORS.slate500,
        marginBottom: SPACING.xl,
        textAlign: 'center',
    },
    progressContainer: {
        padding: SPACING.md,
        paddingBottom: SPACING.sm,
    },
    progressBarBg: {
        height: 8,
        backgroundColor: COLORS.gray200,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
        marginBottom: SPACING.xs,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.slate700,
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    contentInner: {
        flexGrow: 1,
        padding: SPACING.lg,
    },
    exerciseCard: {
        flex: 1,
        justifyContent: 'center',
    },
    prompt: {
        fontSize: 20,
        fontWeight: '600',
        color: COLORS.slate800,
        marginBottom: SPACING.xl,
        textAlign: 'center',
        lineHeight: 28,
    },
    optionsContainer: {
        gap: SPACING.md,
    },
    optionButton: {
        padding: SPACING.lg,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.md,
        borderWidth: 2,
        borderColor: COLORS.gray200,
    },
    correctOption: {
        borderColor: COLORS.primary,
        backgroundColor: '#E8F5E9',
    },
    incorrectOption: {
        opacity: 0.5,
    },
    optionText: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.slate800,
        textAlign: 'center',
    },
    footer: {
        padding: SPACING.md,
        paddingBottom: SPACING.lg,
    },
    feedbackBanner: {
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.md,
        alignItems: 'center',
    },
    correctBanner: {
        backgroundColor: '#E8F5E9',
    },
    incorrectBanner: {
        backgroundColor: '#FFEBEE',
    },
    feedbackText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.slate800,
    },
    completionContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    completionEmoji: {
        fontSize: 80,
        marginBottom: SPACING.lg,
    },
    completionTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: SPACING.sm,
    },
    completionSubtitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.slate700,
        marginBottom: SPACING.xxl,
        textAlign: 'center',
    },
    statsCard: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: SPACING.xl,
        marginBottom: SPACING.xxl,
        ...COLORS.gray200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    statLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.slate700,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.slate800,
    },
    xpValue: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.primary,
    },
});
