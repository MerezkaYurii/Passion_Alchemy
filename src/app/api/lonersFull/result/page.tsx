import { getDictionary } from "@/app/lib/get-dictionary";
import { exportElementToPdf } from "@/app/utils/exportPdf";
import AnsweresAILonersFull from "@/components/AnsweresAILonersFull";
import UserAnswersSummary from "@/components/LonersUserAnswersSummary";
import { Suspense } from "react";

export default async function ResultLonersFullPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ru" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const handleDownload = () => {
    exportElementToPdf("pdf-container", "loners-full-report.pdf");
  };

  return (
    <main className="flex flex-col items-center justify-center ">
      <div className="container w-full max-w-7x bg-gray-800/60 mb-6 mt-6 rounded-2xl">
        <div className="max-w-4xl bg-gray-900/50 mt-10 mb-10 mx-auto p-6 rounded-2xl ">
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic font-light text-left pl-10 text-white  ">
            {dict.resultPage.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded mb2" />

          {/* Блок с ответами клиента из стора */}
          <div className="container w-full max-w-7xl bg-gray-800/60 mb-10 mt-6 p-6 rounded-xl">
            <UserAnswersSummary />
          </div>

          <div className="container w-full max-w-7xl bg-gray-800/60 mb-10 mt-6 p-6 rounded-xl">
            <Suspense
              fallback={
                <div className="text-white">{dict.suspense.loading}</div>
              }
            >
              <AnsweresAILonersFull />
            </Suspense>
          </div>

          {/* Кнопка внизу */}
          <div className="flex justify-center">
            <button
              onClick={handleDownload}
              className="  w-3/4 bg-[#0f3995]  hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8 "
            >
              {dict.resultPage.button}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
