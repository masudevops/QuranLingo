import { prisma } from "@/lib/prisma";

async function main() {
    const count = await prisma.cachedSurah.count();
    console.log(`Cached Surahs: ${count}`);
    const first = await prisma.cachedSurah.findUnique({ where: { number: 1 } });
    console.log('Surah 1:', first);
}

main().catch(console.error);
