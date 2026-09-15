"use client";

import { Suspense } from "react";
import CoupleAnswersSummary from "@/components/CoupleAnswersSummary";
import { Dictionary } from "@/i18n-config";
import AnsweresAICoupleFullResult from "./AnsweresAICoupleFullResult";
import DownloadPdfButtonCouple from "./DownloadPdfButtonCouple";

interface Props {
  dict: Dictionary;
}

export default function CoupleFullResultClient({ dict }: Props) {
  return (
    <>
      <div id="pdf-container" className="w-full max-w-7xl mx-auto p-4 ">
        {/* Блок с ответами клиента */}
        <div className="w-full bg-gray-900 mb-10 mt-6 p-6 rounded-xl border border-gray-700/50 text-white">
          <CoupleAnswersSummary dict={dict} />
        </div>

        {/* Блок с ответом ИИ */}
        <div className="w-full bg-gray-900 mb-4 mt-6 p-6 rounded-xl border border-gray-700/50 text-white">
          <Suspense
            fallback={<div className="text-white">{dict.suspense.loading}</div>}
          >
            <AnsweresAICoupleFullResult dict={dict} />
          </Suspense>
        </div>
      </div>
      {/* Кнопка внизу */}
      <div className="flex justify-center">
        <DownloadPdfButtonCouple text={dict.resultPageCoupleFull.button} />
      </div>
    </>
  );
}
