import { prisma } from "@/lib/prisma";
import { success, error } from "@/lib/api-response";

// GET /api/lesson/next?userId=...
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    // MVP: fetching the first incomplete lesson or just the first lesson if no user
    // For now, let's just fetch the first lesson of the first unit of the first course
    try {
        const firstCourse = await prisma.course.findFirst({
            include: {
                units: {
                    orderBy: { order: "asc" },
                    take: 1,
                    include: {
                        lessons: {
                            orderBy: { order: "asc" },
                            take: 1,
                            include: {
                                exercises: {
                                    orderBy: { difficulty: "asc" }
                                    // In real app, we randomized order
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!firstCourse || !firstCourse.units[0] || !firstCourse.units[0].lessons[0]) {
            return error("No lessons found", 404);
        }

        const lesson = firstCourse.units[0].lessons[0];

        // Transform exercises content from string back to JSON
        const exercises = lesson.exercises.map(ex => ({
            ...ex,
            content: JSON.parse(ex.content)
        }));

        return success({
            ...lesson,
            exercises
        });

    } catch (e) {
        console.error(e);
        return error("Internal Server Error");
    }
}
