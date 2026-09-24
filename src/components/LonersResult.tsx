"use client";

import { openGumroadCheckout } from "@/app/lib/openGumroad";
import { LonersAnalysisResult } from "@/app/types/lonersTypes";
import { Dictionary } from "@/i18n-config";
import { useRouter } from "next/navigation";

interface ResultProps {
  report: LonersAnalysisResult | null;
  lang: string;
  dict: Dictionary;
}

export default function LonersResult({ report, lang, dict }: ResultProps) {
  const router = useRouter();
  if (!report) return null;

  const resultText =
    report.text || report.output || report.analysis || report.response || "";

  return (
    <div className="container mx-auto p-6 bg-gray-900/40 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 my-8 text-white">
      <h2 className="text-2xl font-light text-white italic underline  mb-4 text-center">
        {dict.LonersResult.title}
      </h2>
      <div className="whitespace-pre-line text-gray-200 leading-relaxed mb-6">
        {resultText ||
          "AI response not found in the data structure. / Ответ от ИИ не найден в структуре данных."}
      </div>

      {/* Секция продажи полного разбора */}
      <div className="p-4 bg-gray-700 rounded-lg text-center">
        <h3 className="text-lg font-light text-white  underline mb-2">
          {dict.LonersResult.full_analysis}
        </h3>
        <p className="text-sm text-white mb-4 font-light">
          {dict.LonersResult.full_analysis_text}
        </p>
        <button
          // onClick={() =>
          //   handleCheckout(
          //     getEnvVar("NEXT_PUBLIC_STRIPE_PRICE_LONERS_FULL_RESULT", ""),
          //     lang,
          //     "lonersPaidForm",
          //   )
          // }
          onClick={() => {
            // router.push(`/${lang}/lonersPaidForm`);
            openGumroadCheckout("lonersFullResult", lang);
          }}
          className="px-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white"
        >
          {dict.LonersResult.full_analysis_button}
        </button>
      </div>
    </div>
  );
}
