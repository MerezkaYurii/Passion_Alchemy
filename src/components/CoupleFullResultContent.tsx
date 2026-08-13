"use client";

import { useState } from "react";

import { CoupleAnalysisResult } from "@/app/types/coupleTypes";

import { Dictionary } from "@/i18n-config";
import CoupleFullResultForm from "./CoupleFullResultForm";

export default function CoupleFullResultContent({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: "ru" | "en";
}) {
  const [report, setReport] = useState<CoupleAnalysisResult | null>(null);

  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full ">
      <div className="container mx-auto  w-full max-w-4xl overflow-hidden rounded-2xl relative  shadow-lg">
        {/* Заголовок секции */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic  underline font-medium text-left pl-10 text-white  ">
            {dict.CoupleFullResultContent.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white underline ">
            {dict.CoupleFullResultContent.text1title}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.CoupleFullResultContent.text1}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white underline ">
            {dict.CoupleFullResultContent.text2title}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.CoupleFullResultContent.text2}
          </p>
        </div>
        <CoupleFullResultForm onResult={setReport} lang={lang} />
      </div>
    </section>
  );
}
