import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchSurahDetails, Ayah, Word } from '../services/quran';
import { COLORS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';

export default function ReadScreen({ route, navigation }: any) {
    const { surahId = 1 } = route.params || {};
    const [showTranslation, setShowTranslation] = useState(true);

    let [fontsLoaded] = useFonts({
        Amiri_400Regular,
        Amiri_700Bold,
    });

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['surah', surahId],
        queryFn: () => fetchSurahDetails(surahId),
        staleTime: 1000 * 60 * 10, // 10 minutes
    });

    if (isLoading || !fontsLoaded) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Skeleton width={60} height={20} />
                    <Skeleton width={120} height={24} />
                    <Skeleton width={60} height={20} />
                </View>
                <View style={styles.skeletonContent}>
                    {[1, 2, 3].map((i) => (
                        <View key={i} style={styles.skeletonAyah}>
                            <Skeleton width="100%" height={80} style={{ marginBottom: SPACING.sm }} />
                            <Skeleton width="90%" height={40} />
                        </View>
                    ))}
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <ErrorState
                    title="Can't Load Surah"
                    message="Check your internet connection and try again."
                    onRetry={() => refetch()}
                />
            </SafeAreaView>
        );
    }

    const renderWord = (word: Word) => (
        <TouchableOpacity key={word.id} style={styles.wordContainer}>
            <Text style={styles.arabicWord}>{word.text}</Text>
            {showTranslation && (
                <Text style={styles.translationWord}>{word.translation}</Text>
            )}
        </TouchableOpacity>
    );

    const renderAyah = ({ item }: { item: Ayah }) => (
        <View style={styles.ayahCard}>
            <View style={styles.ayahHeader}>
                <View style={styles.ayahBadge}>
                    <Text style={styles.ayahNumber}>{item.number}</Text>
                </View>
            </View>
            <View style={styles.wordsRow}>
                {item.words.map(renderWord)}
            </View>
            <Text style={styles.fullTranslation}>{item.translation}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Surah Al-Fatihah</Text>
                <TouchableOpacity onPress={() => setShowTranslation(!showTranslation)}>
                    <Text style={styles.toggleText}>{showTranslation ? "Hide" : "Show"}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={data?.ayahs}
                renderItem={renderAyah}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING.md,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderColor: COLORS.gray200,
        ...SHADOWS.sm,
    },
    backButton: {
        padding: SPACING.xs,
    },
    backText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.primary,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.slate800,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    skeletonContent: {
        padding: SPACING.lg,
    },
    skeletonAyah: {
        marginBottom: SPACING.xl,
    },
    listContent: {
        padding: SPACING.lg,
    },
    ayahCard: {
        backgroundColor: COLORS.white,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },
    ayahHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: SPACING.md,
    },
    ayahBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ayahNumber: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.white,
    },
    wordsRow: {
        flexDirection: 'row-reverse', // RTL for Arabic
        flexWrap: 'wrap',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    wordContainer: {
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    arabicWord: {
        fontSize: 28,
        fontFamily: 'Amiri_400Regular',
        color: COLORS.slate800,
        marginBottom: SPACING.xs / 2,
    },
    translationWord: {
        fontSize: 10,
        color: COLORS.slate500,
        textAlign: 'center',
    },
    fullTranslation: {
        fontSize: 14,
        color: COLORS.slate600,
        fontStyle: 'italic',
        lineHeight: 22,
        marginTop: SPACING.xs,
    },
});
