import { getShopInfo } from "@/lib/shopify";

export default async function Home() {
  let shopInfo = null;
  let error = null;

  try {
    shopInfo = await getShopInfo();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Shopify Connection Test
        </h1>

        {error ? (
          <div className="p-4 bg-red-100 dark:bg-red-900 rounded-lg">
            <p className="text-red-700 dark:text-red-200">Error: {error}</p>
          </div>
        ) : shopInfo ? (
          <div className="p-6 bg-green-100 dark:bg-green-900 rounded-lg text-center">
            <p className="text-green-700 dark:text-green-200 text-lg">
              Connected!
            </p>
            <h2 className="text-2xl font-semibold text-green-800 dark:text-green-100 mt-2">
              {shopInfo.name}
            </h2>
            {shopInfo.description && (
              <p className="text-green-600 dark:text-green-300 mt-2">
                {shopInfo.description}
              </p>
            )}
          </div>
        ) : (
          <p className="text-zinc-500">Loading...</p>
        )}
      </main>
    </div>
  );
}
