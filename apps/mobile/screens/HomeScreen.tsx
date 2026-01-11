import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import Button3D from '../components/Button3D';
import { loadProgress, UserProgress } from '../services/storage';

export default function HomeScreen({ navigation }: any) {
    const [progress, setProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        loadUserProgress();
    }, []);

    const loadUserProgress = async () => {
        const data = await loadProgress();
        setProgress(data);
    };

    // Reload progress when screen comes into focus
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUserProgress();
        });
        return unsubscribe;
    }, [navigation]);

    if (!progress) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </SafeAreaView>
        );
    }

    const completionPercentage = Math.min((progress.completedLessons.length / 7) * 100, 100); // 7 lessons in Unit 1
    const currentLessonNumber = progress.completedLessons.length + 1;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>QuranLingo</Text>
                    <Text style={styles.subtitle}>Master Quranic Arabic</Text>
                </View>

                {/* Stats Dashboard */}
                <View style={styles.statsContainer}>
                    {/* XP Card */}
                    <View style={[styles.statCard, styles.statCardSmall]}>
                        <Text style={styles.statIcon}>⭐</Text>
                        <Text style={styles.statValue}>{progress.xp}</Text>
                        <Text style={styles.statLabel}>XP</Text>
                    </View>

                    {/* Streak Card */}
                    <View style={[styles.statCard, styles.statCardSmall]}>
                        <Text style={styles.statIcon}>🔥</Text>
                        <Text style={styles.statValue}>{progress.streak}</Text>
                        <Text style={styles.statLabel}>Day Streak</Text>
                    </View>

                    {/* Words Learned Card */}
                    <View style={[styles.statCard, styles.statCardSmall]}>
                        <Text style={styles.statIcon}>📚</Text>
                        <Text style={styles.statValue}>{progress.wordsLearned}</Text>
                        <Text style={styles.statLabel}>Words</Text>
                    </View>
                </View>

                {/* Continue Learning Card */}
                <View style={styles.continueCard}>
                    <View style={styles.continueHeader}>
                        <Text style={styles.continueTitle}>Continue Learning</Text>
                        <Text style={styles.continueSubtitle}>
                            Lesson {currentLessonNumber} of 7
                        </Text>
                    </View>

                    {/* Progress Bar */}
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${completionPercentage}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{Math.round(completionPercentage)}%</Text>
                    </View>

                    <Button3D
                        title={progress.completedLessons.length === 0 ? "START LEARNING" : "CONTINUE"}
                        onPress={() => navigation.navigate('Lesson')}
                        variant="primary"
                    />
                </View>

                {/* Mascot / Hero Area */}
                <View style={styles.hero}>
                    <View style={styles.mascotPlaceholder}>
                        <Text style={{ fontSize: 48 }}>🕌</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.actionsContainer}>
                    <Button3D
                        title="READ QURAN"
                        onPress={() => navigation.navigate('Read', { surahId: 1 })}
                        variant="secondary"
                    />

                    <Button3D
                        title="PRACTICE (COMING SOON)"
                        onPress={() => { }}
                        variant="outline"
                        disabled
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        flexGrow: 1,
        padding: SPACING.lg,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 16,
        color: COLORS.slate500,
    },
    header: {
        marginTop: SPACING.md,
        marginBottom: SPACING.xl,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.slate500,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: SPACING.sm,
        marginBottom: SPACING.xl,
    },
    statCard: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: SPACING.md,
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    statCardSmall: {
        paddingVertical: SPACING.lg,
    },
    statIcon: {
        fontSize: 28,
        marginBottom: SPACING.xs,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.slate800,
        marginBottom: SPACING.xs / 2,
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.slate500,
        textTransform: 'uppercase',
    },
    continueCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.xl,
        ...SHADOWS.md,
    },
    continueHeader: {
        marginBottom: SPACING.md,
    },
    continueTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.slate800,
        marginBottom: SPACING.xs / 2,
    },
    continueSubtitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.slate500,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    progressBarBg: {
        flex: 1,
        height: 8,
        backgroundColor: COLORS.gray200,
        borderRadius: RADIUS.full,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: RADIUS.full,
    },
    progressText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.slate700,
        minWidth: 40,
        textAlign: 'right',
    },
    hero: {
        alignItems: 'center',
        marginVertical: SPACING.lg,
    },
    mascotPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: COLORS.gray100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.sm,
    },
    actionsContainer: {
        gap: SPACING.md,
        marginTop: SPACING.lg,
    },
});
