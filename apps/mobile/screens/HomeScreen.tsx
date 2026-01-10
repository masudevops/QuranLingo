import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation }: any) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>QuranLingo</Text>
                <Text style={styles.subtitle}>Master Quranic Arabic</Text>
            </View>

            <View style={styles.menu}>
                <TouchableOpacity
                    style={[styles.card, styles.blueCard]}
                    onPress={() => navigation.navigate('Lesson')}
                >
                    <Text style={styles.cardTitle}>Start Learning</Text>
                    <Text style={styles.cardDesc}>Continue where you left off</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.card, styles.greenCard]}
                    onPress={() => navigation.navigate('Read', { surahId: 1 })}
                >
                    <Text style={styles.cardTitle}>Read Quran</Text>
                    <Text style={styles.cardDesc}>Word-by-word analysis</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: 20,
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 18,
        color: '#6b7280',
        marginTop: 4,
    },
    menu: {
        gap: 16,
    },
    card: {
        padding: 24,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    blueCard: {
        backgroundColor: '#eff6ff', // blue-50
    },
    greenCard: {
        backgroundColor: '#f0fdf4', // green-50
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#111827',
    },
    cardDesc: {
        fontSize: 14,
        color: '#4b5563',
    },
});
