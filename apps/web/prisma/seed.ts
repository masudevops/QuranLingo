import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding...')

    // 1. Create a Course
    const course = await prisma.course.create({
        data: {
            title: "Quranic Arabic Foundations",
            description: "Learn 80% of Quranic keys in 50 lessons",
            units: {
                create: [
                    {
                        title: "Unit 1: The Opening",
                        order: 1,
                        lessons: {
                            create: [
                                {
                                    title: "Lesson 1: Basics of Al-Fatihah",
                                    order: 1,
                                    exercises: {
                                        create: [
                                            {
                                                type: "MCQ",
                                                content: JSON.stringify({
                                                    prompt: "What does 'Al-Hamd' mean?",
                                                    options: ["The Praise", "The Merciful", "The King"],
                                                    answer: "The Praise"
                                                }),
                                                difficulty: 1
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

    console.log('Created course:', course.id)
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
