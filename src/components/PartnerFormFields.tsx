import React from "react";
import {
  CoupleSurveyFormData,
  PairData,
  PartnerData,
} from "@/app/types/coupleTypes";
import { Dictionary } from "@/i18n-config";

interface PartnerFormFieldsProps {
  partnerKey: "partner1" | "partner2";
  formData: CoupleSurveyFormData;
  dict: Dictionary;
  handlePartnerChange: (
    partner: "partner1" | "partner2" | "pair",
    field: keyof PartnerData | keyof PairData,
    value: string,
  ) => void;
}

export const PartnerFormFields: React.FC<PartnerFormFieldsProps> = ({
  partnerKey,
  formData,
  dict,
  handlePartnerChange,
}) => {
  const currentPartnerData = formData[partnerKey];

  // Хелпер для безопасного вызова handlePartnerChange с узким типом ключа
  const handleChange = (field: keyof PartnerData, value: string) => {
    handlePartnerChange(partnerKey, field, value);
  };

  return (
    <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
      {/* 1. desireFrequency */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.desireFrequency}
        </label>
        <select
          name="desireFrequency"
          value={currentPartnerData.desireFrequency}
          onChange={(e) => handleChange("desireFrequency", e.target.value)}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.desireFrequency === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder1}
          </option>
          <option value="almostEveryday" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireFrequencyOptions?.almostEveryday ||
              ""}
          </option>
          <option value="severalTimesWeek" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireFrequencyOptions?.severalTimesWeek ||
              ""}
          </option>
          <option value="onceWeekOrLess" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireFrequencyOptions?.onceWeekOrLess ||
              ""}
          </option>
          <option value="veryRarely" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireFrequencyOptions?.veryRarely || ""}
          </option>
          <option value="dependsOnMood" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireFrequencyOptions?.dependsOnMood ||
              ""}
          </option>
        </select>
      </div>

      {/* 2. desireTriggers */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.desireTriggers}
        </label>
        <select
          name="desireTriggers"
          value={currentPartnerData.desireTriggers}
          onChange={(e) => handleChange("desireTriggers", e.target.value)}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.desireTriggers === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder2}
          </option>
          <option value="emotionalCloseness" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireTriggersOptions
              ?.emotionalCloseness || ""}
          </option>
          <option value="physicalTouch" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.sexualDesireTriggersOptions
              ?.physicalTouch || ""}
          </option>
          <option value="atmosphere" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.sexualDesireTriggersOptions
              ?.atmosphere || ""}
          </option>
          <option value="visualImagination" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.sexualDesireTriggersOptions
              ?.visualImagination || ""}
          </option>
          <option value="spontaneity" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.sexualDesireTriggersOptions
              ?.spontaneity || ""}
          </option>
        </select>
      </div>

      {/* 3. foreplayImportance */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.foreplayImportance}
        </label>
        <select
          name="foreplayImportance"
          value={currentPartnerData.foreplayImportance}
          onChange={(e) => handleChange("foreplayImportance", e.target.value)}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.foreplayImportance === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder3}
          </option>
          <option value="veryImportant" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.preludeImportanceOptions
              ?.veryImportant || ""}
          </option>
          <option value="important" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.preludeImportanceOptions?.important ||
              ""}
          </option>
          <option value="medium" className="bg-gray-800 text-white">
            {dict.LonersFullResultForm?.preludeImportanceOptions?.middle || ""}
          </option>
          <option
            value="notParticularlyImportant"
            className="bg-gray-800 text-white"
          >
            {dict.LonersFullResultForm?.preludeImportanceOptions
              ?.notSoImportant || ""}
          </option>
        </select>
      </div>

      {/* 4. initiative */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.LonersFullResultForm?.initiativePartner}
        </label>
        <select
          name="initiative"
          value={currentPartnerData.initiative}
          onChange={(e) => handleChange("initiative", e.target.value)}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.initiative === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder4}
          </option>
          <option value="usuallyMe" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.initiativeOptions?.usuallyMe || ""}
          </option>
          <option value="usuallyPartner" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.initiativeOptions?.usuallyPartner || ""}
          </option>
          <option value="equally" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.initiativeOptions?.equally || ""}
          </option>
          <option value="rarelyAnyone" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.initiativeOptions?.rarelyAnyone || ""}
          </option>
        </select>
      </div>

      {/* 5. experimentsOpenness */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.experimentsOpenness}
        </label>
        <select
          name="experimentsOpenness"
          value={currentPartnerData.experimentsOpenness}
          onChange={(e) => handleChange("experimentsOpenness", e.target.value)}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.experimentsOpenness === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder5}
          </option>
          <option value="veryOpen" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.experimentsOpennessOptions?.veryOpen || ""}
          </option>
          <option value="generallyOpen" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.experimentsOpennessOptions
              ?.generallyOpen || ""}
          </option>
          <option value="preferFamiliar" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.experimentsOpennessOptions
              ?.preferFamiliar || ""}
          </option>
          <option value="ratherClosed" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.experimentsOpennessOptions?.ratherClosed ||
              ""}
          </option>
        </select>
      </div>

      {/* 6. feelingDesiredImportance */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.feelingDesiredImportance}
        </label>
        <select
          name="feelingDesiredImportance"
          value={currentPartnerData.feelingDesiredImportance}
          onChange={(e) =>
            handleChange("feelingDesiredImportance", e.target.value)
          }
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.feelingDesiredImportance === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder6}
          </option>
          <option
            value="criticallyImportant"
            className="bg-gray-800 text-white"
          >
            {dict.pairQuestionnaire?.feelingDesiredImportanceOptions
              ?.criticallyImportant || ""}
          </option>
          <option value="veryImportant" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.feelingDesiredImportanceOptions
              ?.veryImportant || ""}
          </option>
          <option value="important" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.feelingDesiredImportanceOptions
              ?.important || ""}
          </option>
          <option
            value="notParticularlyImportant"
            className="bg-gray-800 text-white"
          >
            {dict.pairQuestionnaire?.feelingDesiredImportanceOptions
              ?.notParticularlyImportant || ""}
          </option>
        </select>
      </div>

      {/* 7. relaxationBarriers */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.relaxationBarriers}
        </label>
        <select
          name="relaxationBarriers"
          value={currentPartnerData.relaxationBarriers}
          onChange={(e) => handleChange("relaxationBarriers", e.target.value)}
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.relaxationBarriers === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder7}
          </option>
          <option value="fatigueStress" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.relaxationBarriersOptions?.fatigueStress ||
              ""}
          </option>
          <option value="shyness" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.relaxationBarriersOptions?.shyness || ""}
          </option>
          <option value="thoughtsControl" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.relaxationBarriersOptions
              ?.thoughtsControl || ""}
          </option>
          <option value="lackOfTime" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.relaxationBarriersOptions?.lackOfTime ||
              ""}
          </option>
          <option value="almostNothing" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.relaxationBarriersOptions?.almostNothing ||
              ""}
          </option>
        </select>
      </div>

      {/* 8. desireCommunicationEase */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.desireCommunicationEase}
        </label>
        <select
          name="desireCommunicationEase"
          value={currentPartnerData.desireCommunicationEase}
          onChange={(e) =>
            handleChange("desireCommunicationEase", e.target.value)
          }
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            currentPartnerData.desireCommunicationEase === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder8}
          </option>
          <option value="easyAndFree" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireCommunicationEaseOptions
              ?.easyAndFree || ""}
          </option>
          <option
            value="canButNotAlwaysEasy"
            className="bg-gray-800 text-white"
          >
            {dict.pairQuestionnaire?.desireCommunicationEaseOptions
              ?.canButNotAlwaysEasy || ""}
          </option>
          <option value="difficult" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireCommunicationEaseOptions
              ?.difficult || ""}
          </option>
          <option value="almostNeverTalk" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desireCommunicationEaseOptions
              ?.almostNeverTalk || ""}
          </option>
        </select>
      </div>
    </div>
  );
};
