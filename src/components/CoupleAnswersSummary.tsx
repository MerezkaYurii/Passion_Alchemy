"use client";

import { useCoupleStore } from "@/app/store/coupleSlice";
import { Dictionary } from "@/i18n-config";
import { PartnerData, PairData } from "@/app/types/coupleTypes";
import { useEffect } from "react";

interface UserAnswersSummaryProps {
  dict: Dictionary;
}

export default function UserAnswersSummary({ dict }: UserAnswersSummaryProps) {
  const shortFormData = useCoupleStore((state) => state.shortFormData);
  const fullFormData = useCoupleStore((state) => state.fullFormData);
  const setShortFormData = useCoupleStore((state) => state.setShortFormData);

  useEffect(() => {
    if (!shortFormData) {
      const savedData = localStorage.getItem("coupleShortForm");
      if (savedData) {
        try {
          setShortFormData(JSON.parse(savedData));
        } catch (e) {
          console.error("Error parsing shortFormData from localStorage", e);
        }
      }
    }
  }, [shortFormData, setShortFormData]);

  if (!shortFormData && !fullFormData) {
    return null;
  }

  const OPTION_MAP: Record<string, string> = {
    gender: "genderOptions",
    age: "ageOptions",
    orientation: "orientationOptions",
    pace: "paceOptions",
    emotionalConnection: "emotionalConnectionOptions",
    sexualDesire: "sexualDesireOptions",
    intimateGoal: "intimateGoalOptions",
    desireFrequency: "desireFrequencyOptions",
    desireTriggers: "desireTriggersOptions",
    foreplayImportance: "foreplayImportanceOptions",
    initiative: "initiativeOptions",
    experimentsOpenness: "experimentsOpennessOptions",
    feelingDesiredImportance: "feelingDesiredImportanceOptions",
    relaxationBarriers: "relaxationBarriersOptions",
    desireCommunicationEase: "desireCommunicationEaseOptions",
    currentSexFrequency: "currentSexFrequencyOptions",
    mainIssues: "mainIssuesOptions",
    desiredAdditions: "desiredAdditionsOptions",
    overallSatisfaction: "overallSatisfactionOptions",
  };

  const toCamelCase = (str: string) =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

  const getValueText = (fieldKey: string, value: string): string => {
    if (!value) return "";

    const formattedValue = toCamelCase(value);
    const optionsKey = OPTION_MAP[fieldKey] || `${fieldKey}Options`;

    const dictRecord = dict as unknown as Record<
      string,
      Record<string, Record<string, string>>
    >;

    const translated =
      dictRecord.CoupleForm?.[optionsKey]?.[formattedValue] ||
      dictRecord.CoupleFullResultForm?.[optionsKey]?.[formattedValue] ||
      dictRecord.pairQuestionnaire?.[optionsKey]?.[formattedValue];

    return translated || value;
  };

  const renderPartnerBlock = (title: string, partner: PartnerData) => (
    <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/40">
      <h4 className="text-lg font-light text-white underline italic mb-2">
        {title}
      </h4>
      <div className="space-y-1">
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.desireFrequency}:
          </span>{" "}
          {getValueText("desireFrequency", partner.desireFrequency)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.desireTriggers}:
          </span>{" "}
          {getValueText("desireTriggers", partner.desireTriggers)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.foreplayImportance}:
          </span>{" "}
          {getValueText("foreplayImportance", partner.foreplayImportance)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.initiative}:
          </span>{" "}
          {getValueText("initiative", partner.initiative)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.experimentsOpenness}:
          </span>{" "}
          {getValueText("experimentsOpenness", partner.experimentsOpenness)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.feelingDesiredImportance}:
          </span>{" "}
          {getValueText(
            "feelingDesiredImportance",
            partner.feelingDesiredImportance,
          )}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.relaxationBarriers}:
          </span>{" "}
          {getValueText("relaxationBarriers", partner.relaxationBarriers)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.desireCommunicationEase}:
          </span>{" "}
          {getValueText(
            "desireCommunicationEase",
            partner.desireCommunicationEase,
          )}
        </div>
      </div>
    </div>
  );

  const renderPairBlock = (pair: PairData) => (
    <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/40 sm:col-span-2">
      <h4 className="text-lg font-light text-white italic underline mb-2">
        {dict.pairQuestionnaire.pairSubTitle || "Общие вопросы пары"}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.currentSexFrequency}:
          </span>{" "}
          {getValueText("currentSexFrequency", pair.currentSexFrequency)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.mainIssues}:
          </span>{" "}
          {getValueText("mainIssues", pair.mainIssues)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.desiredAdditions}:
          </span>{" "}
          {getValueText("desiredAdditions", pair.desiredAdditions)}
        </div>
        <div>
          <span className="text-gray-300">
            {dict.pairQuestionnaire.overallSatisfaction}:
          </span>{" "}
          {getValueText("overallSatisfaction", pair.overallSatisfaction)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 text-white text-sm sm:text-base">
      {/* Первая анкета (Шаг 1) */}
      {shortFormData && (
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
          <h3 className="text-xl font-light underline italic text-white mb-3">
            {dict.CoupleForm?.subtitle || "Информация о партнёрах"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Партнёр 1 */}
            {shortFormData.partner1 && (
              <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/40">
                <h4 className="text-lg font-light text-white underline italic mb-2">
                  {dict.CoupleForm?.partner1_title || "Партнёр 1 (Вы)"}
                </h4>
                <div className="space-y-1">
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.gender}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText("gender", shortFormData.partner1.gender)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.age}:{" "}
                    </span>
                    <span className="font-medium">
                      {shortFormData.partner1.age}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.orientation}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText(
                        "orientation",
                        shortFormData.partner1.orientation,
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.pace}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText("pace", shortFormData.partner1.pace)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.emotionalConnection}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText(
                        "emotionalConnection",
                        shortFormData.partner1.emotionalConnection,
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.sexualDesire}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText(
                        "sexualDesire",
                        shortFormData.partner1.sexualDesire,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Партнёр 2 */}
            {shortFormData.partner2 && (
              <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/40">
                <h4 className="text-lg font-light text-white underline italic mb-2">
                  {dict.CoupleForm?.partner2_title || "Партнёр 2"}
                </h4>
                <div className="space-y-1">
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.gender}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText("gender", shortFormData.partner2.gender)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.age}:{" "}
                    </span>
                    <span className="font-medium">
                      {shortFormData.partner2.age}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.orientation}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText(
                        "orientation",
                        shortFormData.partner2.orientation,
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.pace}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText("pace", shortFormData.partner2.pace)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.emotionalConnection}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText(
                        "emotionalConnection",
                        shortFormData.partner2.emotionalConnection,
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-300">
                      {dict.CoupleForm?.sexualDesire}:{" "}
                    </span>
                    <span className="font-medium">
                      {getValueText(
                        "sexualDesire",
                        shortFormData.partner2.sexualDesire,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Общие вопросы / Цель пары */}
            {shortFormData.intimateGoal && (
              <div className="bg-gray-800/40 p-3 rounded-lg border border-gray-700/40 sm:col-span-2">
                <h4 className="text-lg font-light text-white underline italic mb-2">
                  {dict.CoupleForm?.pairSubTitle || "Общий вопрос для пары:"}
                </h4>

                <div>
                  <span className="text-gray-300">
                    {dict.CoupleForm?.intimateGoal}:{" "}
                  </span>
                  <span className="font-medium">
                    {getValueText("intimateGoal", shortFormData.intimateGoal)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Вторая анкета */}
      {fullFormData && (
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
          <h3 className="text-xl font-light underline italic text-white mb-3">
            {dict.pairQuestionnaire.fullTitle || "Детальная анкета пары"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fullFormData.partner1 &&
              renderPartnerBlock(
                dict.pairQuestionnaire.partner1SubTitle || "Партнер 1",
                fullFormData.partner1,
              )}
            {fullFormData.partner2 &&
              renderPartnerBlock(
                dict.pairQuestionnaire.partner2SubTitle || "Партнер 2",
                fullFormData.partner2,
              )}
            {fullFormData.pair && renderPairBlock(fullFormData.pair)}
          </div>
        </div>
      )}
    </div>
  );
}
