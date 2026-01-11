import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProgress {
    currentLessonId: string;
    completedLessons: string[];
    xp: number;
    streak: number;
    lastActiveDate: string;
    wordsLearned: number;
}

const STORAGE_KEY = '@QuranLingo:userProgress';

const defaultProgress: UserProgress = {
    currentLessonId: 'cmk8sg5q60002mj91lfjy5rfk', // First lesson ID
    completedLessons: [],
    xp: 0,
    streak: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    wordsLearned: 0,
};

export const loadProgress = async (): Promise<UserProgress> => {
    try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
            const progress: UserProgress = JSON.parse(data);

            // Check streak
            const today = new Date().toISOString().split('T')[0];
            const lastDate = new Date(progress.lastActiveDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

            if (diffDays > 1) {
                // Streak broken
                progress.streak = 0;
            }

            return progress;
        }
        return defaultProgress;
    } catch (error) {
        console.error('Error loading progress:', error);
        return defaultProgress;
    }
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error('Error saving progress:', error);
    }
};

export const updateProgressOnLessonComplete = async (
    lessonId: string,
    xpEarned: number,
    wordsCount: number
): Promise<UserProgress> => {
    const progress = await loadProgress();

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Update streak
    if (progress.lastActiveDate === today) {
        // Same day, no change
    } else if (progress.lastActiveDate === yesterday) {
        // Consecutive day
        progress.streak += 1;
    } else {
        // New streak
        progress.streak = 1;
    }

    // Update progress
    if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
    }
    progress.currentLessonId = lessonId; // Keep current for now (will implement "next lesson" logic later)
    progress.xp += xpEarned;
    progress.wordsLearned += wordsCount;
    progress.lastActiveDate = today;

    await saveProgress(progress);
    return progress;
};
