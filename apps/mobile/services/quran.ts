import { API_URL } from '../constants/api';

export interface Word {
    id: number;
    position: number;
    text: string;
    translation: string;
    transliteration: string;
}

export interface Ayah {
    id: number;
    number: number;
    text: string;
    translation: string;
    words: Word[];
}

export interface SurahDetails {
    ayahs: Ayah[];
}

export async function fetchSurahDetails(id: number): Promise<SurahDetails> {
    const response = await fetch(`${API_URL}/quran/surah/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch surah');
    }
    return response.json();
}
