import { prisma } from "@/lib/prisma";

const BASE_URL = "https://api.quran.com/api/v4";

export interface Surah {
    number: number;
    name: string; // Arabic name
    englishName: string; // Translated name
    revelationType: string;
    numberOfAyahs: number;
}

export async function getSurahs(): Promise<Surah[]> {
    // 1. Check cache
    const cached = await prisma.cachedSurah.findMany({
        orderBy: { number: "asc" },
    });

    if (cached.length === 114) {
        return cached.map((s) => ({
            number: s.number,
            name: s.name,
            englishName: s.englishName,
            revelationType: "unknown", // schema doesn't have this yet, simplifying
            numberOfAyahs: 0, // schema doesn't have this yet
        }));
    }

    // 2. Fetch from API
    console.log("Fetching Surahs from API...");
    const res = await fetch(`${BASE_URL}/chapters?language=en`);
    if (!res.ok) throw new Error("Failed to fetch surahs");
    const data = await res.json();

    const surahs: Surah[] = data.chapters.map((c: any) => ({
        number: c.id,
        name: c.name_arabic,
        englishName: c.name_simple, // or name_complex
        revelationType: c.revelation_place,
        numberOfAyahs: c.verses_count,
    }));

    // 3. Cache them
    // Use transaction or Promise.all
    await prisma.$transaction(
        surahs.map((s) =>
            prisma.cachedSurah.upsert({
                where: { number: s.number },
                update: {},
                create: {
                    number: s.number,
                    name: s.name,
                    englishName: s.englishName,
                },
            })
        )
    );

    return surahs;
}

export async function getAyahs(surahNumber: number) {
    // Check cache logic here...
    // For MVP scaffold, I'll implementing basic fetching first
    // to avoid complex syncing logic in first pass without DB

    const cached = await prisma.cachedAyah.findMany({
        where: { surahId: surahNumber },
        include: { words: true },
        orderBy: { number: "asc" },
    });

    if (cached.length > 0) {
        return cached;
    }

    console.log(`Fetching Ayahs for Surah ${surahNumber} from API...`);
    // Fetch Verses with Words and Translation (131 = The Clear Quran)
    const res = await fetch(
        `${BASE_URL}/verses/by_chapter/${surahNumber}?language=en&words=true&translations=131&fields=text_uthmani&per_page=50`
    );

    if (!res.ok) throw new Error("Failed to fetch ayahs");
    const data = await res.json();

    const ayahsData = data.verses.map((v: any) => ({
        number: v.verse_key.split(':')[1] ? parseInt(v.verse_key.split(':')[1]) : v.id,
        text: v.text_uthmani,
        translation: v.translations?.[0]?.text || "",
        words: v.words.map((w: any) => ({
            position: w.position,
            text: w.text_uthmani || w.text,
            translation: w.translation?.text,
            transliteration: w.transliteration?.text
        }))
    }));

    // Save to Cache
    // We strictly assume CachedSurah exists (it is seeded/fetched by getSurahs)
    // But for safety, we might want to ensure it exists. 
    // For MVP, user flow is List -> Detail, so List would have cached Surahs.

    await prisma.$transaction(async (tx) => {
        for (const ayah of ayahsData) {
            const createdAyah = await tx.cachedAyah.create({
                data: {
                    surahId: surahNumber,
                    number: ayah.number,
                    text: ayah.text,
                    translation: ayah.translation,
                }
            });

            if (ayah.words && ayah.words.length > 0) {
                await tx.cachedWord.createMany({
                    data: ayah.words.map((w: any) => ({
                        ayahId: createdAyah.id,
                        position: w.position,
                        text: w.text,
                        translation: w.translation,
                        transliteration: w.transliteration
                    }))
                });
            }
        }
    });

    // Refetch to return consistent structure
    return await prisma.cachedAyah.findMany({
        where: { surahId: surahNumber },
        include: { words: true },
        orderBy: { number: "asc" },
    });
}
