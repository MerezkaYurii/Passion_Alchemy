"use client";

import { useDictionary } from "@/app/hooks/useDictionary";
import { useState } from "react";

import { useRouter } from "next/navigation";
import {
  CoupleAnalysisResult,
  CoupleSurveyFormData,
  PairData,
  PartnerData,
} from "@/app/types/coupleTypes";
import GlobalLoader from "./GlobalLoader";
import { PartnerFormFields } from "./PartnerFormFields";
import { PairFormFields } from "./PairFormFields";
import { useCoupleStore } from "@/app/store/coupleSlice";
import { buildCoupleAIPayload } from "@/app/utils/buildCouplePayload";

interface CoupleFormProps {
  onResult?: (result: CoupleAnalysisResult) => void;
}

export default function CoupleFullResultForm({
  onResult,
  lang,
}: CoupleFormProps & { lang: "ru" | "en" }) {
  const initialPartnerState: PartnerData = {
    desireFrequency: "",
    desireTriggers: "",
    foreplayImportance: "",
    initiative: "",
    experimentsOpenness: "",
    feelingDesiredImportance: "",
    relaxationBarriers: "",
    desireCommunicationEase: "",
  };

  const dict = useDictionary();
  const router = useRouter();

  const setFullFormData = useCoupleStore((state) => state.setFullFormData);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CoupleSurveyFormData>({
    partner1: initialPartnerState,
    partner2: initialPartnerState,
    pair: {
      currentSexFrequency: "",
      mainIssues: "",
      desiredAdditions: "",
      overallSatisfaction: "",
    },
  });

  const handlePartnerChange = (
    partnerKey: "partner1" | "partner2" | "pair",
    field: keyof PartnerData | keyof PairData,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [partnerKey]: {
        ...prev[partnerKey],
        [field]: value,
      },
    }));
  };

  const storeShortFormData = useCoupleStore((state) => state.shortFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const currentShortForm =
      storeShortFormData ||
      JSON.parse(sessionStorage.getItem("coupleShortForm") || "{}");

    setFullFormData(formData);
    console.log("shortFormData:", currentShortForm);
    const payload = buildCoupleAIPayload(
      currentShortForm,
      formData,
      lang,
      dict,
    );

    const maxRetries = 2;
    const retryDelay = 5000;

    try {
      let res: Response | null = null;

      for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
          res = await fetch("/api/coupleFull", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (res.ok) break;

          if (attempt < maxRetries) {
            await new Promise((resolve) => setTimeout(resolve, retryDelay));
          }
        } catch (err) {
          if (attempt === maxRetries) throw err;
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
      }

      if (!res || !res.ok) {
        const errorText = res ? await res.text() : "Network Error";
        console.error("Server error after retries:", errorText);
        setLoading(false);
        return;
      }

      const contentType = res.headers.get("content-type") || "";
      let result;

      if (contentType.includes("application/json")) {
        const data = await res.json();
        result = Array.isArray(data) ? data[0] : data;
      } else {
        const textResult = await res.text();
        result = { text: textResult };
      }

      if (onResult) {
        onResult(result);
      }

      const resultText = result.text || result.analysis || result.output || "";

      sessionStorage.setItem("lonerResult", resultText);
      router.push(`/${lang}/coupleFullResult`);
    } catch (error) {
      console.error("Client-side error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!dict) return null;

  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full h-auto">
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-6 pb-8 bg-gray-900/20 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 h-auto flex flex-col justify-between">
        <h2 className="text-lg sm:text-xl lg:text-2xl italic underline font-light text-left pl-10 text-white">
          {dict.LonersFullResultForm?.title}
        </h2>
        <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 h-auto mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left items-center">
            <div>
              <h4 className="text-lg text-white font-light underline italic mb-2">
                {dict?.CoupleForm?.partner1_title}
              </h4>
              <PartnerFormFields
                partnerKey="partner1"
                formData={formData}
                dict={dict}
                handlePartnerChange={handlePartnerChange}
              />
            </div>
            <div>
              <h4 className="text-lg text-white font-light underline italic mb-2">
                {dict?.CoupleForm?.partner2_title}
              </h4>
              <PartnerFormFields
                partnerKey="partner2"
                formData={formData}
                dict={dict}
                handlePartnerChange={handlePartnerChange}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-light italic underline text-white text-center md:text-left  mb-4">
                {dict?.CoupleForm?.title3_desc}
              </h3>
              <PairFormFields
                formData={formData}
                dict={dict}
                handlePartnerChange={handlePartnerChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-1/2 mx-auto mt-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/80 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all border duration-300"
          >
            {loading ? dict.LonersForm?.submitLoading : dict.LonersForm?.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
