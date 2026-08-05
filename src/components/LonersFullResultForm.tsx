"use client";

import { useDictionary } from "@/app/hooks/useDictionary";
import { useState } from "react";
import GlobalLoader from "./GlobalLoader";
import { LonersFormProps, LonersFullFormData } from "@/app/types/lonersTypes";
import { useLonersStore } from "@/app/store/lonersSlice";
import { useRouter } from "next/navigation";

export default function LonersFullResultForm({ onResult }: LonersFormProps) {
  const dict = useDictionary();
  const router = useRouter();
  const shortFormData = useLonersStore((state) => state.shortFormData);
  const setFullFormData = useLonersStore((state) => state.setFullFormData);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<LonersFullFormData>({
    sexualDesireFrequency: "",
    sexualDesireTriggers: "",
    preludeImportance: "",
    initiativePartner: "",
    experimentsAttitude: "",
    feelingWanted: "",
    biggestBlock: "",
    postcoitalFeeling: "",
    communicationOpenness: "",
    whatIsMoreImportant: "",
    masturbationFrequency: "",
    biggestNeed: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFullFormData(formData);

    // 2. Объединяем данные первой и второй анкет в один JSON
    const currentLanguage = dict?.header?.language || "en";
    const payload = {
      ...shortFormData, // Ответы 1-й анкеты
      ...formData, // Ответы 2-й анкеты
      lang: currentLanguage,
    };

    try {
      const res = await fetch("/api/lonersFull", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          "Server error (text) / Ошибка сервера (текст):",
          errorText,
        );
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
      if (onResult) {
        onResult(result);
      }

      // Вытаскиваем текст результата
      const resultText = result.text || result.analysis || result.output || "";
      // Переходим на отдельную страницу результата
      router.push(`/lonersFull/result?text=${encodeURIComponent(resultText)}`);
    } catch (error) {
      console.error("Client-side error / Ошибка на клиенте", error);
    } finally {
      setLoading(false);
    }
  };

  if (!dict) return null;

  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full h-auto">
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-6 pb-8 bg-gray-900/20 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 h-auto flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-auto">
          {/* Общая сетка grid для всех полей */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left items-center">
            {/* 1. Как часто у тебя возникает сексуальное желание? */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.sexualDesireFrequency}
              </label>
              <select
                name="sexualDesireFrequency"
                value={formData.sexualDesireFrequency}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.sexualDesireFrequency === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder20}
                </option>
                <option
                  value="almostEveryDay"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireFrequencyOptions
                    ?.almostEveryDay || ""}
                </option>
                <option
                  value="severalTimesAWeek"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireFrequencyOptions
                    ?.severalTimesAWeek || ""}
                </option>
                <option value="onceAWeek" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.sexualDesireFrequencyOptions
                    ?.onceAWeek || ""}
                </option>
                <option
                  value="lessThanOnceAWeek"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireFrequencyOptions
                    ?.lessThanOnceAWeek || ""}
                </option>
                <option
                  value="dependsOnMood"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireFrequencyOptions
                    ?.dependsOnMood || ""}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.sexualDesireFrequencyText}
            </div>

            {/* 2. Что чаще всего запускает твоё желание */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.sexualDesireTriggers}
              </label>
              <select
                name="sexualDesireTriggers"
                value={formData.sexualDesireTriggers}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.sexualDesireTriggers === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder21}
                </option>
                <option
                  value="emotionalCloseness"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireTriggersOptions
                    ?.emotionalCloseness || ""}
                </option>
                <option
                  value="physicalTouch"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireTriggersOptions
                    ?.physicalTouch || ""}
                </option>
                <option
                  value="visualImagination"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireTriggersOptions
                    ?.visualImagination || ""}
                </option>
                <option value="atmosphere" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.sexualDesireTriggersOptions
                    ?.atmosphere || ""}
                </option>
                <option value="spontaneity" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.sexualDesireTriggersOptions
                    ?.spontaneity || ""}
                </option>
                <option
                  value="dependsOnMood"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.sexualDesireTriggersOptions
                    ?.dependsOnMood || ""}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.sexualDesireTriggersText}
            </div>

            {/* 3. Насколько тебе важна прелюдия? */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.preludeImportance}
              </label>
              <select
                name="preludeImportance"
                value={formData.preludeImportance}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.preludeImportance === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder22}
                </option>
                <option value="essential" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.preludeImportanceOptions
                      .veryImportant
                  }
                </option>
                <option value="important" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.preludeImportanceOptions.important}
                </option>
                <option value="middle" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.preludeImportanceOptions.middle}
                </option>
                <option
                  value="notSoImportant"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.preludeImportanceOptions
                      .notSoImportant
                  }
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.preludeImportanceText}
            </div>

            {/* 4. Кто чаще проявляет инициативу?   */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.initiativePartner}
              </label>
              <select
                name="initiativePartner"
                value={formData.initiativePartner}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.initiativePartner === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder23}
                </option>
                <option value="usualyMe" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.initiativOptions.usualyMe}
                </option>
                <option
                  value="usualyPartner"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.initiativOptions.usualyPartner}
                </option>
                <option value="aboutEqual" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.initiativOptions.aboutEqual}
                </option>
                <option
                  value="dependsOnSituation"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.initiativOptions
                      .dependsOnSituation
                  }
                </option>
                <option
                  value="hardToInitiate"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.initiativOptions.hardToInitiate}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.initiativText}
            </div>

            {/* 5. Как ты относишься к экспериментам в сексе?  */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.experimentsAttitude}
              </label>
              <select
                name="experimentsAttitude"
                value={formData.experimentsAttitude}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.experimentsAttitude === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder24}
                </option>
                <option value="veryOpen" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.experimentsAttitudeOptions
                      .veryOpen
                  }
                </option>
                <option
                  value="openWithCaution"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.experimentsAttitudeOptions
                      .openWithCaution
                  }
                </option>
                <option value="likeFamiliar" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.experimentsAttitudeOptions
                      .likeFamiliar
                  }
                </option>
                <option
                  value="closedToExperiments"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.experimentsAttitudeOptions
                      .closedToExperiments
                  }
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.experimentsAttitudeText}
            </div>

            {/* 6. Насколько тебе важно чувствовать себя желанным(-ой)?  */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.feelingWanted}
              </label>
              <select
                name="feelingWanted"
                value={formData.feelingWanted}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.feelingWanted === "" ? "text-gray-400" : "text-white"
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder25}
                </option>
                <option value="critical" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.feelingWantedOptions.critical}
                </option>
                <option
                  value="veryImportant"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.feelingWantedOptions.veryImportant}
                </option>
                <option value="important" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.feelingWantedOptions.important}
                </option>
                <option
                  value="notSoImportant"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.feelingWantedOptions
                      .notSoImportant
                  }
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.feelingWantedText}
            </div>

            {/* 7. Что для тебя является самым большим блоком в интимной жизни?  */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.biggestBlock}
              </label>
              <select
                name="biggestBlock"
                value={formData.biggestBlock}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.biggestBlock === "" ? "text-gray-400" : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder26}
                </option>
                <option value="anxiety" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestBlockOptions.anxiety}
                </option>
                <option value="stress" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestBlockOptions.stress}
                </option>
                <option
                  value="arousalIssues"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.biggestBlockOptions.arousalIssues}
                </option>
                <option value="insecurity" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestBlockOptions.insecurity}
                </option>
                <option value="loneliness" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestBlockOptions.loneliness}
                </option>
                <option value="none" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestBlockOptions.none}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.biggestBlockText}
            </div>

            {/* 8. Как ты обычно чувствуешь себя после секса? */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.postcoitalFeeling}
              </label>
              <select
                name="postcoitalFeeling"
                value={formData.postcoitalFeeling}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.postcoitalFeeling === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder3}
                </option>
                <option value="connected" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.connected}
                </option>
                <option value="relaxed" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.relaxed}
                </option>
                <option value="energetic" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.energetic}
                </option>
                <option value="satisfied" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.satisfied}
                </option>
                <option value="tired" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.tired}
                </option>
                <option value="neutral" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.neutral}
                </option>
                <option value="avoidance" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.postcoitalFeelingOptions.avoidance}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.postcoitalFeelingText}
            </div>

            {/* 9. Насколько ты открыт(-а) говорить с партнёром о своих желаниях?  */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.communicationOpenness}
              </label>
              <select
                name="communicationOpenness"
                value={formData.communicationOpenness}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.communicationOpenness === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder31}
                </option>
                <option value="openly" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.communicationOpennessOptions
                      .openly
                  }
                </option>
                <option value="sometimes" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.communicationOpennessOptions
                      .sometimes
                  }
                </option>
                <option value="hardToSay" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.communicationOpennessOptions
                      .hardToSay
                  }
                </option>
                <option
                  value="dependsOnPartner"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.communicationOpennessOptions
                      .dependsOnPartner
                  }
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.communicationOpennessText}
            </div>

            {/* 10. Что для тебя важнее в сексе? */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.whatIsMoreImportant}
              </label>
              <select
                name="whatIsMoreImportant"
                value={formData.whatIsMoreImportant}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.whatIsMoreImportant === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder32}
                </option>
                <option
                  value="emotionalConnection"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.whatIsMoreImportantOptions
                      .emotionalConnection
                  }
                </option>
                <option
                  value="physicalPleasure"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.whatIsMoreImportantOptions
                      .physicalPleasure
                  }
                </option>
                <option value="dominance" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.whatIsMoreImportantOptions
                      .dominance
                  }
                </option>
                <option value="playfulness" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.whatIsMoreImportantOptions
                      .playfulness
                  }
                </option>

                <option value="intensity" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.whatIsMoreImportantOptions
                      .intensity
                  }
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.whatIsMoreImportantText}
            </div>

            {/* 11. Как часто ты мастурбируешь? */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.masturbationFrequency}
              </label>
              <select
                name="masturbationFrequency"
                value={formData.masturbationFrequency}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.masturbationFrequency === ""
                    ? "text-gray-400"
                    : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder33}
                </option>
                <option
                  value="severalTimesAWeek"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.masturbationFrequencyOptions
                      .severalTimesAWeek
                  }
                </option>
                <option value="onceAWeek" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.masturbationFrequencyOptions
                      .onceAWeek
                  }
                </option>
                <option value="rarely" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.masturbationFrequencyOptions
                      .rarely
                  }
                </option>
                <option value="almostNever" className="bg-gray-800 text-white">
                  {
                    dict.LonersFullResultForm.masturbationFrequencyOptions
                      .almostNever
                  }
                </option>

                <option
                  value="preferNotToSay"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.masturbationFrequencyOptions
                      .preferNotToSay
                  }
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.masturbationFrequencyText}
            </div>

            {/* 12. Чего тебе сейчас больше всего не хватает в сексуальной сфере?   */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersFullResultForm.biggestNeed}
              </label>
              <select
                name="biggestNeed"
                value={formData.biggestNeed}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.biggestNeed === "" ? "text-gray-400" : "text-white"
                }`}
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersFullResultForm.placeholder34}
                </option>
                <option
                  value="emotionalConnection"
                  className="bg-gray-800 text-white"
                >
                  {
                    dict.LonersFullResultForm.biggestNeedOptions
                      .emotionalConnection
                  }
                </option>
                <option value="moreVariety" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestNeedOptions.moreVariety}
                </option>
                <option
                  value="betterTechnique"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.biggestNeedOptions.betterTechnique}
                </option>
                <option
                  value="moreInitiative"
                  className="bg-gray-800 text-white"
                >
                  {dict.LonersFullResultForm.biggestNeedOptions.moreInitiative}
                </option>
                <option value="lessAnxiety" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestNeedOptions.lessAnxiety}
                </option>
                <option value="noPartner" className="bg-gray-800 text-white">
                  {dict.LonersFullResultForm.biggestNeedOptions.noPartner}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersFullResultForm.biggestNeedText}
            </div>
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading || isSubmitted}
            className="w-full md:w-1/2 mx-auto mt-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/80 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all  border duration-300"
          >
            {loading ? dict.LonersForm.submitLoading : dict.LonersForm.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

//Чтобы получить результат в другом компоненте, используй
//setLonersResult(result);
