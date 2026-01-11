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
    } catch (e: any) {
        console.error("Error in getSurahDetails:", e);
        return NextResponse.json(
            { error: `Failed to fetch surah details: ${e.message}` },
            { status: 500 }
        );
    }
}
