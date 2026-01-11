import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database with production-quality lessons...')

    // Clear existing data
    await prisma.exercise.deleteMany({})
    await prisma.lesson.deleteMany({})
    await prisma.unit.deleteMany({})
    await prisma.course.deleteMany({})

    // Create Course with 3 complete lessons
    const course = await prisma.course.create({
        data: {
            title: "Quranic Arabic Foundations",
            description: "Master the most common Quranic words and phrases",
            units: {
                create: [
                    {
                        title: "Unit 1: Al-Fatihah & Essentials",
                        order: 1,
                        lessons: {
                            create: [
                                // ===== LESSON 1: Al-Fatihah Basics =====
                                {
                                    title: "Al-Fatihah: The Opening",
                                    order: 1,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'الْحَمْدُ' (Al-Hamd) mean?",
                                                    options: ["The Praise", "The Merciful", "The King", "The Guide"],
                                                    answer: "The Praise"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match the Arabic words to their meanings:",
                                                    pairs: [
                                                        { arabic: "الرَّحْمَٰنِ", english: "The Most Merciful" },
                                                        { arabic: "الرَّحِيمِ", english: "The Most Compassionate" },
                                                        { arabic: "مَالِكِ", english: "Master" }
                                                    ]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'يَوْمِ الدِّينِ' (Yawm al-Deen) mean?",
                                                    options: ["Day of Judgment", "Day of Prayer", "Day of Fasting", "Day of Charity"],
                                                    answer: "Day of Judgment"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: بِسْمِ اللَّهِ ___ الرَّحِيمِ",
                                                    answer: "الرَّحْمَٰنِ",
                                                    options: ["الرَّحْمَٰنِ", "الْحَمْدُ", "مَالِكِ", "نَسْتَعِينُ"]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'إِيَّاكَ نَعْبُدُ' mean?",
                                                    options: ["You alone we worship", "Guide us", "The straight path", "Those who earned Your anger"],
                                                    answer: "You alone we worship"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "TAP_WORD",
                                                content: JSON.stringify({
                                                    prompt: "Tap the word that means 'Guide us':",
                                                    ayah: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                                                    answer: "اهْدِنَا"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match these key phrases:",
                                                    pairs: [
                                                        { arabic: "إِيَّاكَ نَعْبُدُ", english: "You alone we worship" },
                                                        { arabic: "إِيَّاكَ نَسْتَعِينُ", english: "You alone we ask for help" },
                                                        { arabic: "اهْدِنَا", english: "Guide us" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What is 'الصِّرَاطَ الْمُسْتَقِيمَ'?",
                                                    options: ["The straight path", "The curved path", "The hidden path", "The difficult path"],
                                                    answer: "The straight path"
                                                }),
                                                difficulty: 2
                                            }
                                        ]
                                    }
                                },

                                // ===== LESSON 2: Common Quranic Words =====
                                {
                                    title: "Essential Quranic Vocabulary",
                                    order: 2,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'اللَّهُ' (Allah) mean?",
                                                    options: ["God (The One)", "The Prophet", "The Book", "The Angel"],
                                                    answer: "God (The One)"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match the names of Allah:",
                                                    pairs: [
                                                        { arabic: "الرَّحْمَٰنُ", english: "The Most Merciful" },
                                                        { arabic: "الْعَلِيمُ", english: "The All-Knowing" },
                                                        { arabic: "الْقَدِيرُ", english: "The All-Powerful" }
                                                    ]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'صَلَاة' (Salah) mean?",
                                                    options: ["Prayer", "Fasting", "Charity", "Pilgrimage"],
                                                    answer: "Prayer"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: ___ أَكْبَرُ (God is the Greatest)",
                                                    answer: "اللَّهُ",
                                                    options: ["اللَّهُ", "الرَّحْمَٰنُ", "الْحَمْدُ", "الْمَلِكُ"]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'كِتَاب' (Kitab) mean?",
                                                    options: ["Book", "Prayer", "Angel", "Prophet"],
                                                    answer: "Book"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match these common words:",
                                                    pairs: [
                                                        { arabic: "رَبّ", english: "Lord" },
                                                        { arabic: "نَبِيّ", english: "Prophet" },
                                                        { arabic: "مَلَك", english: "Angel" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'إِيمَان' (Iman) mean?",
                                                    options: ["Faith/Belief", "Prayer", "Fasting", "Charity"],
                                                    answer: "Faith/Belief"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: لَا إِلَٰهَ إِلَّا ___",
                                                    answer: "اللَّهُ",
                                                    options: ["اللَّهُ", "الرَّحْمَٰنُ", "الْمَلِكُ", "الْقَدِيرُ"]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'سُبْحَانَ اللَّهِ' mean?",
                                                    options: ["Glory be to Allah", "Allah is the Greatest", "Praise be to Allah", "There is no god but Allah"],
                                                    answer: "Glory be to Allah"
                                                }),
                                                difficulty: 2
                                            }
                                        ]
                                    }
                                },

                                // ===== LESSON 3: Surah Al-Ikhlas =====
                                {
                                    title: "Surah Al-Ikhlas: The Sincerity",
                                    order: 3,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'قُلْ' mean in 'قُلْ هُوَ اللَّهُ أَحَدٌ'?",
                                                    options: ["Say", "He", "God", "One"],
                                                    answer: "Say"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'أَحَدٌ' (Ahad) mean?",
                                                    options: ["One/Unique", "Two", "Many", "First"],
                                                    answer: "One/Unique"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: قُلْ هُوَ اللَّهُ ___",
                                                    answer: "أَحَدٌ",
                                                    options: ["أَحَدٌ", "الصَّمَدُ", "يَلِدْ", "يُولَدْ"]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'الصَّمَدُ' (As-Samad) mean?",
                                                    options: ["The Eternal, The Absolute", "The One", "The Merciful", "The Powerful"],
                                                    answer: "The Eternal, The Absolute"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "TAP_WORD",
                                                content: JSON.stringify({
                                                    prompt: "Tap the word meaning 'He begets not':",
                                                    ayah: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
                                                    answer: "يَلِدْ"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match the phrases from Al-Ikhlas:",
                                                    pairs: [
                                                        { arabic: "لَمْ يَلِدْ", english: "He begets not" },
                                                        { arabic: "لَمْ يُولَدْ", english: "Nor was He begotten" },
                                                        { arabic: "لَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", english: "There is none comparable to Him" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What is the main theme of Surah Al-Ikhlas?",
                                                    options: ["The Oneness of Allah", "The Day of Judgment", "Prayer", "Charity"],
                                                    answer: "The Oneness of Allah"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: اللَّهُ ___",
                                                    answer: "الصَّمَدُ",
                                                    options: ["الصَّمَدُ", "أَحَدٌ", "الرَّحْمَٰنُ", "الْمَلِكُ"]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "How many verses are in Surah Al-Ikhlas?",
                                                    options: ["4", "3", "5", "7"],
                                                    answer: "4"
                                                }),
                                                difficulty: 1
                                            }
                                        ]
                                    }
                                },

                                // ===== LESSON 4: Common Verbs =====
                                {
                                    title: "Essential Quranic Verbs",
                                    order: 4,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'عَبَدَ' (abada) mean?",
                                                    options: ["To worship", "To pray", "To fast", "To believe"],
                                                    answer: "To worship"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match the verbs:",
                                                    pairs: [
                                                        { arabic: "صَلَّى", english: "To pray" },
                                                        { arabic: "آمَنَ", english: "To believe" },
                                                        { arabic: "شَكَرَ", english: "To thank" }
                                                    ]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'قَرَأَ' (qara'a) mean?",
                                                    options: ["To read/recite", "To write", "To listen", "To understand"],
                                                    answer: "To read/recite"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: ___ اللَّهَ (Worship Allah)",
                                                    answer: "اعْبُدُوا",
                                                    options: ["اعْبُدُوا", "صَلُّوا", "اقْرَأُوا", "اشْكُرُوا"]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'سَجَدَ' (sajada) mean?",
                                                    options: ["To prostrate", "To stand", "To sit", "To bow"],
                                                    answer: "To prostrate"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match these action verbs:",
                                                    pairs: [
                                                        { arabic: "ذَكَرَ", english: "To remember" },
                                                        { arabic: "سَبَّحَ", english: "To glorify" },
                                                        { arabic: "كَبَّرَ", english: "To magnify" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'تَابَ' (taba) mean?",
                                                    options: ["To repent", "To pray", "To fast", "To give"],
                                                    answer: "To repent"
                                                }),
                                                difficulty: 2
                                            }
                                        ]
                                    }
                                },

                                // ===== LESSON 5: Names of Allah (Part 1) =====
                                {
                                    title: "Beautiful Names of Allah - Part 1",
                                    order: 5,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'الْغَفُورُ' (Al-Ghafoor) mean?",
                                                    options: ["The Most Forgiving", "The Most Merciful", "The Most Powerful", "The Most Wise"],
                                                    answer: "The Most Forgiving"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match the Names of Allah:",
                                                    pairs: [
                                                        { arabic: "الْحَكِيمُ", english: "The All-Wise" },
                                                        { arabic: "الْعَزِيزُ", english: "The Almighty" },
                                                        { arabic: "اللَّطِيفُ", english: "The Subtle" }
                                                    ]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'السَّمِيعُ' (As-Samee') mean?",
                                                    options: ["The All-Hearing", "The All-Seeing", "The All-Knowing", "The All-Powerful"],
                                                    answer: "The All-Hearing"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: اللَّهُ ___ (Allah is All-Seeing)",
                                                    answer: "الْبَصِيرُ",
                                                    options: ["الْبَصِيرُ", "السَّمِيعُ", "الْعَلِيمُ", "الْقَدِيرُ"]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'الْكَرِيمُ' (Al-Kareem) mean?",
                                                    options: ["The Most Generous", "The Most Merciful", "The Most Forgiving", "The Most Wise"],
                                                    answer: "The Most Generous"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match these Divine Names:",
                                                    pairs: [
                                                        { arabic: "الْوَهَّابُ", english: "The Bestower" },
                                                        { arabic: "الرَّزَّاقُ", english: "The Provider" },
                                                        { arabic: "الْفَتَّاحُ", english: "The Opener" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            }
                                        ]
                                    }
                                },

                                // ===== LESSON 6: Pronouns =====
                                {
                                    title: "Quranic Pronouns",
                                    order: 6,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'أَنْتَ' (anta) mean?",
                                                    options: ["You (masculine singular)", "I", "He", "We"],
                                                    answer: "You (masculine singular)"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match the pronouns:",
                                                    pairs: [
                                                        { arabic: "نَحْنُ", english: "We" },
                                                        { arabic: "هُوَ", english: "He" },
                                                        { arabic: "هُمْ", english: "They (masculine)" }
                                                    ]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'أَنَا' (ana) mean?",
                                                    options: ["I", "You", "He", "We"],
                                                    answer: "I"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete: ___ رَبُّكُمْ (I am your Lord)",
                                                    answer: "أَنَا",
                                                    options: ["أَنَا", "نَحْنُ", "هُوَ", "أَنْتَ"]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "TAP_WORD",
                                                content: JSON.stringify({
                                                    prompt: "Tap the pronoun meaning 'You':",
                                                    ayah: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
                                                    answer: "إِيَّاكَ"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Match these pronoun forms:",
                                                    pairs: [
                                                        { arabic: "أَنْتُمْ", english: "You (plural masculine)" },
                                                        { arabic: "هُمَا", english: "They (dual)" },
                                                        { arabic: "هِيَ", english: "She" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            }
                                        ]
                                    }
                                },

                                // ===== LESSON 7: Unit 1 Review =====
                                {
                                    title: "Unit 1 Review: Foundations",
                                    order: 7,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "From Al-Fatihah: What does 'الرَّحْمَٰنِ الرَّحِيمِ' mean?",
                                                    options: ["The Most Merciful, The Most Compassionate", "The King, The Master", "The Guide, The Helper", "The Forgiving, The Wise"],
                                                    answer: "The Most Merciful, The Most Compassionate"
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Review: Match key vocabulary:",
                                                    pairs: [
                                                        { arabic: "صَلَاة", english: "Prayer" },
                                                        { arabic: "إِيمَان", english: "Faith" },
                                                        { arabic: "رَحْمَة", english: "Mercy" }
                                                    ]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "FILL_BLANK",
                                                content: JSON.stringify({
                                                    prompt: "Complete the Shahada: لَا إِلَٰهَ إِلَّا ___",
                                                    answer: "اللَّهُ",
                                                    options: ["اللَّهُ", "الرَّحْمَٰنُ", "الْمَلِكُ", "الْقَدِيرُ"]
                                                }),
                                                difficulty: 1
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "Which Name of Allah means 'The All-Knowing'?",
                                                    options: ["الْعَلِيمُ", "الْحَكِيمُ", "الْقَدِيرُ", "الْكَرِيمُ"],
                                                    answer: "الْعَلِيمُ"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "TAP_WORD",
                                                content: JSON.stringify({
                                                    prompt: "Tap the word meaning 'Guide us':",
                                                    ayah: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
                                                    answer: "اهْدِنَا"
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MATCH",
                                                content: JSON.stringify({
                                                    prompt: "Review: Match verbs to meanings:",
                                                    pairs: [
                                                        { arabic: "عَبَدَ", english: "To worship" },
                                                        { arabic: "قَرَأَ", english: "To read" },
                                                        { arabic: "شَكَرَ", english: "To thank" }
                                                    ]
                                                }),
                                                difficulty: 2
                                            },
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What is the main theme of Surah Al-Ikhlas?",
                                                    options: ["The Oneness of Allah", "Prayer", "Charity", "Fasting"],
                                                    answer: "The Oneness of Allah"
                                                }),
                                                difficulty: 2
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    })

    console.log('✅ Seeded course:', course.id)
    console.log('✅ Created Unit 1 with 7 complete lessons')
    console.log('✅ Total exercises:', 8 + 9 + 9 + 7 + 6 + 6 + 7, '= 52')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
