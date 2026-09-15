import { getDictionary } from "@/app/lib/get-dictionary";
import CoupleFullResultClient from "@/components/CoupleFullResultClient";

export default async function CoupleFullResultPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ru" }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang === "ru" ? "ru" : "en";
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center justify-center mb-20">
      <div className="container w-full max-w-7x bg-gray-800/60 mb-6 mt-6 rounded-2xl">
        <div className="max-w-4xl bg-gray-900/50 mt-10 mb-10 mx-auto p-6 rounded-2xl">
          <h2 className="text-lg sm:text-xl lg:text-2xl italic font-light text-left pl-10 text-white">
            {dict.resultPageCoupleFull.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded mb-2" />

          {/* Клиентский блок с данными из стора */}
          <CoupleFullResultClient dict={dict} />
        </div>
      </div>
    </main>
  );
}
