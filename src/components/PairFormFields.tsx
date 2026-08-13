import React from "react";
import { CoupleSurveyFormData, PairData } from "@/app/types/coupleTypes";
import { Dictionary } from "@/i18n-config";

interface PairFormFieldsProps {
  formData: CoupleSurveyFormData;
  dict: Dictionary;
  handlePartnerChange: (
    partner: "partner1" | "partner2" | "pair",
    field: keyof PairData,
    value: string,
  ) => void;
}

export const PairFormFields: React.FC<PairFormFieldsProps> = ({
  formData,
  dict,
  handlePartnerChange,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
      {/* 9. currentSexFrequency */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.currentSexFrequency}
        </label>
        <select
          name="currentSexFrequency"
          value={formData.pair.currentSexFrequency}
          onChange={(e) =>
            handlePartnerChange("pair", "currentSexFrequency", e.target.value)
          }
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            formData.pair.currentSexFrequency === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder9}
          </option>
          <option value="severalTimesWeek" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.currentSexFrequencyOptions
              ?.severalTimesWeek || ""}
          </option>
          <option value="onceWeek" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.currentSexFrequencyOptions?.onceWeek || ""}
          </option>
          <option value="oneTwoTimesMonth" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.currentSexFrequencyOptions
              ?.oneTwoTimesMonth || ""}
          </option>
          <option value="lessThanOnceMonth" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.currentSexFrequencyOptions
              ?.lessThanOnceMonth || ""}
          </option>
          <option value="almostNever" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.currentSexFrequencyOptions?.almostNever ||
              ""}
          </option>
        </select>
      </div>

      {/* 10. mainIssues */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.mainIssues}
        </label>
        <select
          name="mainIssues"
          value={formData.pair.mainIssues}
          onChange={(e) =>
            handlePartnerChange("pair", "mainIssues", e.target.value)
          }
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            formData.pair.mainIssues === "" ? "text-gray-400" : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder10}
          </option>
          <option
            value="desireFrequencyDifference"
            className="bg-gray-800 text-white"
          >
            {dict.pairQuestionnaire?.mainIssuesOptions
              ?.desireFrequencyDifference || ""}
          </option>
          <option value="lackOfVariety" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.mainIssuesOptions?.lackOfVariety || ""}
          </option>
          <option
            value="lackOfEmotionalCloseness"
            className="bg-gray-800 text-white"
          >
            {dict.pairQuestionnaire?.mainIssuesOptions
              ?.lackOfEmotionalCloseness || ""}
          </option>
          <option value="fatigueAndRoutine" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.mainIssuesOptions?.fatigueAndRoutine || ""}
          </option>
          <option
            value="arousalDifficulties"
            className="bg-gray-800 text-white"
          >
            {dict.pairQuestionnaire?.mainIssuesOptions?.arousalDifficulties ||
              ""}
          </option>
          <option value="almostNothing" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.mainIssuesOptions?.almostNothing || ""}
          </option>
        </select>
      </div>

      {/* 11. desiredAdditions */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.desiredAdditions}
        </label>
        <select
          name="desiredAdditions"
          value={formData.pair.desiredAdditions}
          onChange={(e) =>
            handlePartnerChange("pair", "desiredAdditions", e.target.value)
          }
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            formData.pair.desiredAdditions === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder11}
          </option>
          <option value="morePassion" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desiredAdditionsOptions?.morePassion || ""}
          </option>
          <option value="moreTenderness" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desiredAdditionsOptions?.moreTenderness ||
              ""}
          </option>
          <option value="morePlayfulness" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desiredAdditionsOptions?.morePlayfulness ||
              ""}
          </option>
          <option value="moreDepth" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desiredAdditionsOptions?.moreDepth || ""}
          </option>
          <option value="moreFreedom" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.desiredAdditionsOptions?.moreFreedom || ""}
          </option>
        </select>
      </div>

      {/* 12. overallSatisfaction */}
      <div className="flex flex-col">
        <label className="text-white font-light text-ms mb-1">
          {dict.pairQuestionnaire?.overallSatisfaction}
        </label>
        <select
          name="overallSatisfaction"
          value={formData.pair.overallSatisfaction}
          onChange={(e) =>
            handlePartnerChange("pair", "overallSatisfaction", e.target.value)
          }
          className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
            formData.pair.overallSatisfaction === ""
              ? "text-gray-400"
              : "text-white"
          }`}
        >
          <option value="" disabled className="bg-gray-800 text-gray-400">
            {dict.pairQuestionnaire?.placeholder12}
          </option>
          <option value="fullySatisfied" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.overallSatisfactionOptions
              ?.fullySatisfied || ""}
          </option>
          <option value="generallyGood" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.overallSatisfactionOptions
              ?.generallyGood || ""}
          </option>
          <option value="medium" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.overallSatisfactionOptions?.medium || ""}
          </option>
          <option value="ratherDissatisfied" className="bg-gray-800 text-white">
            {dict.pairQuestionnaire?.overallSatisfactionOptions
              ?.ratherDissatisfied || ""}
          </option>
        </select>
      </div>
    </div>
  );
};
