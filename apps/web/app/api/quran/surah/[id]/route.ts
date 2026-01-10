import { NextResponse } from "next/server";
import { getAyahs } from "@/lib/quran-api";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Params are now Promise in Next.js 15+ (which might be used here given "latest")
) {
    try {
        const { id } = await params;
        const surahNumber = parseInt(id);
        if (isNaN(surahNumber)) {
            return NextResponse.json({ error: "Invalid surah ID" }, { status: 400 });
        }

        const ayahs = await getAyahs(surahNumber);
        return NextResponse.json({ ayahs });
    } catch (error) {
        console.error("Error fetching surah details:", error);
        return NextResponse.json(
            { error: "Failed to fetch surah details" },
            { status: 500 }
        );
    }
}
