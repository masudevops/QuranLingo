import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchSurahDetails, Ayah, Word } from '../services/quran';

export default function ReadScreen({ route, navigation }: any) {
    const { surahId = 1 } = route.params || {};
    // State to toggle translation view
    const [showTranslation, setShowTranslation] = useState(true);

    const { data, isLoading, error } = useQuery({
        queryKey: ['surah', surahId],
        queryFn: () => fetchSurahDetails(surahId),
    });

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text>Error loading Surah</Text>
            </View>
        );
    }

    const renderWord = (word: Word) => (
        <View key={word.id} style={styles.wordContainer}>
            <Text style={styles.arabicWord}>{word.text}</Text>
            {showTranslation && (
                <Text style={styles.translationWord}>{word.translation}</Text>
            )}
        </View>
    );

    const renderAyah = ({ item }: { item: Ayah }) => (
        <View style={styles.ayahContainer}>
            <View style={styles.ayahHeader}>
                <View style={styles.circle}>
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
                    <Text style={styles.toggleText}>{showTranslation ? "Hide EN" : "Show EN"}</Text>
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
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    backText: {
        fontSize: 16,
        color: '#2563eb',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    toggleText: {
        fontSize: 14,
        color: '#2563eb',
    },
    listContent: {
        padding: 16,
    },
    ayahContainer: {
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        paddingBottom: 16,
    },
    ayahHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ayahNumber: {
        fontSize: 12,
        color: '#666',
    },
    wordsRow: {
        flexDirection: 'row-reverse', // Arabic R2L
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 12,
    },
    wordContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    arabicWord: {
        fontSize: 24, // Large for readability
        fontFamily: Platform.OS === 'ios' ? 'GeezaPro' : 'serif', // Simple fallback
        marginBottom: 4,
    },
    translationWord: {
        fontSize: 10,
        color: '#666',
    },
    fullTranslation: {
        fontSize: 14,
        color: '#4b5563',
        fontStyle: 'italic',
        marginTop: 8,
    },
});
