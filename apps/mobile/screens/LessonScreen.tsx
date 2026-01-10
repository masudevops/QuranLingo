import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { fetchNextLesson, Exercise } from '../services/lesson';

export default function LessonScreen() {
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const { data: lesson, isLoading, error } = useQuery({
        queryKey: ['nextLesson'],
        queryFn: () => fetchNextLesson(),
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
                <Text>Error loading lesson</Text>
                <Text>{error.message}</Text>
            </View>
        );
    }

    if (!lesson) {
        return (
            <View style={styles.center}>
                <Text>No lesson available</Text>
            </View>
        );
    }

    const currentExercise = lesson.exercises[currentExerciseIndex] as Exercise;

    const handleNext = () => {
        if (currentExerciseIndex < lesson.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
        } else {
            // TODO: Complete lesson logic
            alert("Lesson Completed!");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{lesson.title}</Text>
                <Text>Exercise {currentExerciseIndex + 1}/{lesson.exercises.length}</Text>
            </View>

            <View style={styles.content}>
                {currentExercise && currentExercise.type === 'MCQ' && (
                    <View>
                        <Text style={styles.prompt}>{currentExercise.content.prompt}</Text>
                        <View style={styles.optionsContainer}>
                            {currentExercise.content.options.map((opt: string, idx: number) => (
                                <TouchableOpacity key={idx} style={styles.optionButton} onPress={() => { }}>
                                    <Text style={styles.optionText}>{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                )}
                {currentExercise && currentExercise.type !== 'MCQ' && (
                    <View>
                        <Text style={styles.prompt}>{currentExercise.type}</Text>
                        <Text>{JSON.stringify(currentExercise.content, null, 2)}</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderColor: '#eee',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    prompt: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#2563eb', // Blue-600
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionsContainer: {
        gap: 12,
    },
    optionButton: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        backgroundColor: '#f9fafb',
    },
    optionText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
