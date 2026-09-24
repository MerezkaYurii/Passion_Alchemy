"use client";

import { useState } from "react";
import { useDictionary } from "@/app/hooks/useDictionary";
import { CoupleAnalysisResult, CoupleFormData } from "@/app/types/coupleTypes";
import GlobalLoader from "@/components/GlobalLoader";
import { useCoupleStore } from "@/app/store/coupleSlice";
import { formatAIField } from "@/app/utils/formatAIField";

export default function CoupleForm({
  onResult,
}: {
  onResult: (data: CoupleAnalysisResult) => void;
}) {
  const dict = useDictionary();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<CoupleFormData>({
    partner1: {
      gender: "",
      age: "",
      pace: "",
      orientation: "",
      preferredPace: "",
      emotionalConnection: "",
      sexualDesire: "",
    },
    partner2: {
      gender: "",
      age: "",
      pace: "",
      orientation: "",
      preferredPace: "",
      emotionalConnection: "",
      sexualDesire: "",
    },
    intimateGoal: "",
    lang: "",
  });

  // Вспомогательная функция для получения перевода значения
  const getValueText = (fieldKey: string, value: string): string => {
    if (!dict) return value;
    const cForm = dict.CoupleForm as Record<string, unknown>;

    if (fieldKey === "gender") {
      const options = cForm?.genderOptions as Record<string, string>;
      return options?.[value] || value;
    }
    if (fieldKey === "orientation") {
      const options = cForm?.orientationOptions as Record<string, string>;
      return options?.[value] || value;
    }
    if (fieldKey === "pace" || fieldKey === "preferredPace") {
      const options = cForm?.paceOptions as Record<string, string>;
      return options?.[value] || value;
    }
    if (fieldKey === "emotionalConnection") {
      const options = cForm?.emotionalConnectionOptions as Record<
        string,
        string
      >;
      return options?.[value] || value;
    }
    if (fieldKey === "sexualDesire") {
      const options = cForm?.sexualDesireOptions as Record<string, string>;
      return options?.[value] || value;
    }
    if (fieldKey === "intimateGoal") {
      const options = cForm?.intimateGoalOptions as Record<string, string>;
      return options?.[value] || value;
    }
    return value;
  };

  const handlePartnerChange = (
    partner: "partner1" | "partner2",
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [partner]: {
        ...prev[partner],
        [field]: value,
      },
    }));
  };

  const handleGoalChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      intimateGoal: value,
    }));
  };

  const setShortFormData = useCoupleStore((state) => state.setShortFormData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dict) return;
    setLoading(true);

    try {
      const currentLanguage = dict?.header?.language || "en";

      const langMap: Record<string, string> = {
        Русский: "ru",
        English: "en",
      };
      const shortLang =
        langMap[currentLanguage] || currentLanguage.toLowerCase();
      localStorage.setItem("app_lang", shortLang);

      const formatPartner = (partnerData: typeof formData.partner1) => {
        const result: Record<string, ReturnType<typeof formatAIField>> = {};
        Object.entries(partnerData).forEach(([key, val]) => {
          if (val) {
            result[key] = formatAIField(key, val, dict, getValueText);
          }
        });
        return result;
      };

      const payload = {
        partner1: formatPartner(formData.partner1),
        partner2: formatPartner(formData.partner2),
        intimateGoal: formatAIField(
          "intimateGoal",
          formData.intimateGoal,
          dict,
          getValueText,
        ),
        lang: currentLanguage,
      };

      setShortFormData(formData);
      localStorage.setItem("coupleShortForm", JSON.stringify(formData));
      sessionStorage.setItem("coupleShortForm", JSON.stringify(formData));

      const res = await fetch("/api/couple", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error / Ошибка сервера:", errorText);
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

      setIsSubmitted(true);
      onResult(result);
    } catch (error) {
      console.error("Client error / Ошибка на клиенте:", error);
      setIsSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full h-auto">
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-6 pb-8 bg-gray-900/20 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 h-auto flex flex-col justify-between mb-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-auto">
          {/* ШАГ 1 */}
          <div className="flex flex-col gap-4 border-b border-gray-700/60 pb-6">
            <h3 className="text-xl font-light italic underline text-white text-center md:text-left">
              {dict?.CoupleForm?.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Партнёр 1 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-white font-light underline italic">
                  {dict?.CoupleForm?.partner1_title}
                </h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.gender}
                  </label>
                  <select
                    value={formData.partner1.gender}
                    onChange={(e) =>
                      handlePartnerChange("partner1", "gender", e.target.value)
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.gender === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholder1}
                    </option>
                    <option value="male" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.genderOptions?.male}
                    </option>
                    <option value="female" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.genderOptions?.female}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.age}
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    placeholder={dict?.CoupleForm?.placeholder2}
                    value={formData.partner1.age}
                    onChange={(e) =>
                      handlePartnerChange("partner1", "age", e.target.value)
                    }
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Партнёр 2 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-white font-light underline italic">
                  {dict?.CoupleForm?.partner2_title}
                </h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.gender}
                  </label>
                  <select
                    value={formData.partner2.gender}
                    onChange={(e) =>
                      handlePartnerChange("partner2", "gender", e.target.value)
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.gender === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholder1}
                    </option>
                    <option value="male" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.genderOptions?.male}
                    </option>
                    <option value="female" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.genderOptions?.female}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.age}
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    placeholder={dict?.CoupleForm?.placeholder2}
                    value={formData.partner2.age}
                    onChange={(e) =>
                      handlePartnerChange("partner2", "age", e.target.value)
                    }
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ШАГ 2 */}
          <div className="flex flex-col gap-6 border-b border-gray-700/60 pb-6">
            <h3 className="text-xl font-light italic underline text-white text-center md:text-left">
              {dict?.CoupleForm?.title2}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ответы Партнёра 1 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-white font-light underline italic">
                  {dict?.CoupleForm?.partner1_answers}
                </h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.orientation}
                  </label>
                  <select
                    value={formData.partner1.orientation}
                    onChange={(e) =>
                      handlePartnerChange(
                        "partner1",
                        "orientation",
                        e.target.value,
                      )
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.orientation === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholder3}
                    </option>
                    <option
                      value="heterosexual"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.orientationOptions?.heterosexual}
                    </option>
                    <option
                      value="homosexual"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.orientationOptions?.homosexual}
                    </option>
                    <option value="bisexual" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.orientationOptions?.bisexual}
                    </option>
                    <option value="asexual" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.orientationOptions?.asexual}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.pace}
                  </label>
                  <select
                    value={formData.partner1.pace}
                    onChange={(e) =>
                      handlePartnerChange("partner1", "pace", e.target.value)
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.pace === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholderPace}
                    </option>
                    <option value="slow" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.paceOptions?.slow}
                    </option>
                    <option value="fast" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.paceOptions?.fast}
                    </option>
                    <option value="varied" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.paceOptions?.varied}
                    </option>
                    <option
                      value="dependsOnMood"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.paceOptions?.dependsOnMood}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.emotionalConnection}
                  </label>
                  <select
                    value={formData.partner1.emotionalConnection}
                    onChange={(e) =>
                      handlePartnerChange(
                        "partner1",
                        "emotionalConnection",
                        e.target.value,
                      )
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.emotionalConnection === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholderEmotionalConnection}
                    </option>
                    <option
                      value="very_important"
                      className="bg-gray-800 text-white"
                    >
                      {
                        dict?.CoupleForm?.emotionalConnectionOptions
                          ?.veryImportant
                      }
                    </option>
                    <option
                      value="important"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.emotionalConnectionOptions?.important}
                    </option>
                    <option
                      value="not_so_important"
                      className="bg-gray-800 text-white"
                    >
                      {
                        dict?.CoupleForm?.emotionalConnectionOptions
                          ?.notSoImportant
                      }
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.sexualDesire}
                  </label>
                  <select
                    value={formData.partner1.sexualDesire}
                    onChange={(e) =>
                      handlePartnerChange(
                        "partner1",
                        "sexualDesire",
                        e.target.value,
                      )
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.sexualDesire === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholderSexualDesire}
                    </option>
                    <option value="high" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.sexualDesireOptions?.high}
                    </option>
                    <option value="medium" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.sexualDesireOptions?.medium}
                    </option>
                    <option value="low" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.sexualDesireOptions?.low}
                    </option>
                    <option
                      value="fluctuating"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.sexualDesireOptions?.unstable}
                    </option>
                  </select>
                </div>
              </div>

              {/* Ответы Партнёра 2 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-white font-light underline italic">
                  {dict?.CoupleForm?.partner2_answers}
                </h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.orientation}
                  </label>
                  <select
                    value={formData.partner2.orientation}
                    onChange={(e) =>
                      handlePartnerChange(
                        "partner2",
                        "orientation",
                        e.target.value,
                      )
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.orientation === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholder3}
                    </option>
                    <option
                      value="heterosexual"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.orientationOptions?.heterosexual}
                    </option>
                    <option
                      value="homosexual"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.orientationOptions?.homosexual}
                    </option>
                    <option value="bisexual" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.orientationOptions?.bisexual}
                    </option>
                    <option value="asexual" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.orientationOptions?.asexual}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.pace}
                  </label>
                  <select
                    value={formData.partner2.pace}
                    onChange={(e) =>
                      handlePartnerChange("partner2", "pace", e.target.value)
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.pace === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholderPace}
                    </option>
                    <option value="slow" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.paceOptions?.slow}
                    </option>
                    <option value="fast" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.paceOptions?.fast}
                    </option>
                    <option value="varied" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.paceOptions?.varied}
                    </option>
                    <option
                      value="dependsOnMood"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.paceOptions?.dependsOnMood}
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.emotionalConnection}
                  </label>
                  <select
                    value={formData.partner2.emotionalConnection}
                    onChange={(e) =>
                      handlePartnerChange(
                        "partner2",
                        "emotionalConnection",
                        e.target.value,
                      )
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.emotionalConnection === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholderEmotionalConnection}
                    </option>
                    <option
                      value="very_important"
                      className="bg-gray-800 text-white"
                    >
                      {
                        dict?.CoupleForm?.emotionalConnectionOptions
                          ?.veryImportant
                      }
                    </option>
                    <option
                      value="important"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.emotionalConnectionOptions?.important}
                    </option>
                    <option
                      value="not_so_important"
                      className="bg-gray-800 text-white"
                    >
                      {
                        dict?.CoupleForm?.emotionalConnectionOptions
                          ?.notSoImportant
                      }
                    </option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">
                    {dict?.CoupleForm?.sexualDesire}
                  </label>
                  <select
                    value={formData.partner2.sexualDesire}
                    onChange={(e) =>
                      handlePartnerChange(
                        "partner2",
                        "sexualDesire",
                        e.target.value,
                      )
                    }
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.sexualDesire === ""
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                    required
                  >
                    <option
                      value=""
                      disabled
                      className="bg-gray-800 text-gray-400"
                    >
                      {dict?.CoupleForm?.placeholderSexualDesire}
                    </option>
                    <option value="high" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.sexualDesireOptions?.high}
                    </option>
                    <option value="medium" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.sexualDesireOptions?.medium}
                    </option>
                    <option value="low" className="bg-gray-800 text-white">
                      {dict?.CoupleForm?.sexualDesireOptions?.low}
                    </option>
                    <option
                      value="fluctuating"
                      className="bg-gray-800 text-white"
                    >
                      {dict?.CoupleForm?.sexualDesireOptions?.unstable}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ШАГ 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-light italic underline text-white text-center md:text-left">
              {dict?.CoupleForm?.title3_desc}
            </h3>

            <div className="flex flex-col bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
              <label className="text-white font-light text-sm mb-2">
                {dict?.CoupleForm?.intimateGoal}
              </label>
              <select
                value={formData.intimateGoal}
                onChange={(e) => handleGoalChange(e.target.value)}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.intimateGoal === "" ? "text-gray-400" : "text-white"
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict?.CoupleForm?.placeholder4}
                </option>
                <option value="harmony" className="bg-gray-800 text-white">
                  {dict?.CoupleForm?.intimateGoalOptions?.harmony}
                </option>
                <option value="variety" className="bg-gray-800 text-white">
                  {dict?.CoupleForm?.intimateGoalOptions?.variety}
                </option>
                <option value="pleasure" className="bg-gray-800 text-white">
                  {dict?.CoupleForm?.intimateGoalOptions?.pleasure}
                </option>
                <option value="emotional" className="bg-gray-800 text-white">
                  {dict?.CoupleForm?.intimateGoalOptions?.emotional}
                </option>
                <option value="confidence" className="bg-gray-800 text-white">
                  {dict?.CoupleForm?.intimateGoalOptions?.confidence}
                </option>
                <option value="routine" className="bg-gray-800 text-white">
                  {dict?.CoupleForm?.intimateGoalOptions?.routine}
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitted}
            className="w-full md:w-1/2 mx-auto mt-6 py-3 bg-[#0f3995] border-[#0f3995] text-white font-light rounded-full shadow-sm border transition-all duration-300 hover:bg-[#0f3995]/80 hover:shadow-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0f3995] disabled:hover:shadow-none"
          >
            {loading ? dict?.GlobalLoader?.text : dict?.CoupleForm?.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
