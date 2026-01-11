import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

const BASE_URL = "https://api.quran.com/api/v4";

async function getAyahs(surahNumber: number) {
    console.log(`Checking cache for Surah ${surahNumber}...`);
    const cached = await prisma.cachedAyah.findMany({
        where: { surahId: surahNumber },
        include: { words: true },
        orderBy: { number: "asc" },
    });

    if (cached.length > 0) {
        console.log("Found in cache");
        return cached;
    }

    console.log(`Fetching Ayahs for Surah ${surahNumber} from API...`);
    // Fetch Verses with Words and Translation (131 = The Clear Quran)
    const res = await fetch(
        `${BASE_URL}/verses/by_chapter/${surahNumber}?language=en&words=true&translations=131&fields=text_uthmani&per_page=50`
    );

    if (!res.ok) throw new Error("Failed to fetch ayahs: " + res.statusText);
    const data = await res.json();

    console.log("Data fetched, mapping...");
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

    console.log(`Saving ${ayahsData.length} ayahs to cache...`);

    // START TRANSACTION
    await prisma.$transaction(async (tx: any) => {
        for (const ayah of ayahsData) {
            console.log(`Saving Ayah ${ayah.number}...`);
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

    console.log("Saved.");
    return ayahsData;
}

getAyahs(1).catch(e => {
    console.error("ERROR:", e);
    process.exit(1);
});
