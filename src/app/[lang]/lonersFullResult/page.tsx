import { getDictionary } from "@/app/lib/get-dictionary";
import LonersFullResultContent from "@/components/LonersFullResultContent";
import Link from "next/link";

export default async function ResultLonersFullPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ru" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center justify-center ">
      <Link
        href={`/${lang}/`}
        className="text-sm z-10 mt-4 text-white hover:underline  hover:text-gray-400 whitespace-nowrap text-center block"
      >
        ← Back / Назад
      </Link>

      <div className="container w-full max-w-7x bg-gray-800/60 mb-6 mt-6 rounded-2xl">
        <div className="max-w-4xl bg-gray-900/50 mt-10 mb-10 mx-auto p-6 rounded-2xl ">
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic font-light text-left pl-10 text-white  ">
            {dict.resultPage.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded mb2" />

          <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6 z-10"></div>

          {/* Кнопка внизу */}
          <div className="flex justify-center">
            <button className="  w-3/4 bg-[#0f3995]  hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8 ">
              {dict.resultPage.button}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
