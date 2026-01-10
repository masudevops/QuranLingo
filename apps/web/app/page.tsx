export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 font-sans">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-4xl font-bold">QuranLingo API & Admin</h1>
        <p className="text-lg text-gray-600">
          Backend is running locally.
        </p>

        <div className="grid gap-4 text-left p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold">Quick Links for Testing:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a href="/api/lesson/next" className="text-blue-600 hover:underline">
                Check API functionality (/api/lesson/next)
              </a>
            </li>
            <li>
              <a href="/api/quran/surahs" className="text-blue-600 hover:underline">
                List Surahs (/api/quran/surahs)
              </a>
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 max-w-md">
          Open the <strong>apps/mobile</strong> directory to run the React Native app.
        </p>
      </main>
    </div>
  );
}
