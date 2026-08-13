"use client";

import { Suspense } from "react";
import AnsweresAILonersFull from "@/components/AnsweresAILonersFull";
import UserAnswersSummary from "@/components/UserAnswersSummary";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import { Dictionary } from "@/i18n-config";

interface Props {
  dict: Dictionary;
}

export default function LonersFullResultClient({ dict }: Props) {
  return (
    <>
      <div id="pdf-container" className="w-full max-w-7xl mx-auto p-4">
        {/* Блок с ответами клиента */}
        <div className="w-full bg-gray-900 mb-10 mt-6 p-6 rounded-xl border border-gray-700/50 text-white">
          <UserAnswersSummary dict={dict} />
        </div>

        {/* Блок с ответом ИИ */}
        <div className="w-full bg-gray-900 mb-10 mt-6 p-6 rounded-xl border border-gray-700/50 text-white">
          <Suspense
            fallback={<div className="text-white">{dict.suspense.loading}</div>}
          >
            <AnsweresAILonersFull dict={dict} />
          </Suspense>
        </div>
      </div>
      {/* Кнопка внизу */}
      <div className="flex justify-center">
        <DownloadPdfButton text={dict.resultPage.button} />
      </div>
    </>
  );
}
