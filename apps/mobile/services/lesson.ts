import { API_URL } from '../constants/api';

export interface Exercise {
    id: string;
    type: 'MCQ' | 'MATCH' | 'FILL_BLANK' | 'TAP_WORD';
    content: any;
    difficulty: number;
}

export interface Lesson {
    id: string;
    title: string;
    exercises: Exercise[];
}

export async function fetchNextLesson(userId?: string): Promise<Lesson> {
    const response = await fetch(`${API_URL}/lesson/next${userId ? `?userId=${userId}` : ''}`);
    if (!response.ok) {
        throw new Error('Failed to fetch lesson');
    }
    return response.json();
}
