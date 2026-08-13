"use client";

import { useLonersStore } from "@/app/store/lonersSlice";
import { Dictionary } from "@/i18n-config";

interface UserAnswersSummaryProps {
  dict: Dictionary;
}

export default function UserAnswersSummary({ dict }: UserAnswersSummaryProps) {
  const shortFormData = useLonersStore((state) => state.shortFormData);
  const fullFormData = useLonersStore((state) => state.fullFormData);

  if (!shortFormData && !fullFormData) {
    return null;
  }

  // Карты имен объектов с опциями в JSON
  const OPTION_MAP: Record<string, string> = {
    gender: "genderOptions",
    orientation: "orientationOptions",
    relationshipStatus: "statusOptions",
    mainGoal: "goalOptions",
    preferredPace: "paceOptions",
    emotionalConnection: "emotionalConnectionOptions",
  };

  // Функция приведения "increase_desire" -> "increaseDesire"
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

    // Ищем перевод в dict.LonersForm[optionsKey][formattedValue]
    const translated =
      dictRecord.LonersForm?.[optionsKey]?.[formattedValue] ||
      dictRecord.LonersFullResultForm?.[optionsKey]?.[formattedValue];

    return translated || value;
  };

  return (
    <div className="space-y-6 text-white text-sm sm:text-base">
      {/* Первая анкета */}
      {shortFormData && (
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
          <h3 className="text-xl  font-light underline italic text-white mb-3">
            {dict.LonersForm.title1}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-gray-400">{dict.LonersForm.gender}:</span>{" "}
              {getValueText("gender", shortFormData.gender)}
            </div>
            <div>
              <span className="text-gray-400">{dict.LonersForm.age}:</span>{" "}
              {shortFormData.age}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.orientation}:
              </span>{" "}
              {getValueText("orientation", shortFormData.orientation)}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.relationshipStatus}:
              </span>{" "}
              {getValueText(
                "relationshipStatus",
                shortFormData.relationshipStatus,
              )}
            </div>
            <div>
              <span className="text-gray-400">{dict.LonersForm.mainGoal}:</span>{" "}
              {getValueText("mainGoal", shortFormData.mainGoal)}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.preferredPace}:
              </span>{" "}
              {getValueText("preferredPace", shortFormData.preferredPace)}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.emotionalConnection}:
              </span>{" "}
              {getValueText(
                "emotionalConnection",
                shortFormData.emotionalConnection,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.hasIssues}:
              </span>{" "}
              {getValueText("hasIssues", shortFormData.hasIssues)}
            </div>
          </div>
        </div>
      )}

      {/* Вторая анкета */}
      {fullFormData && (
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
          <h3 className="text-xl  font-light underline italic text-white mb-3">
            {dict.LonersForm.title2}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.sexualDesireFrequency}:
              </span>{" "}
              {getValueText(
                "sexualDesireFrequency",
                fullFormData.sexualDesireFrequency,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.sexualDesireTriggers}:
              </span>{" "}
              {getValueText(
                "sexualDesireTriggers",
                fullFormData.sexualDesireTriggers,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.preludeImportance}:
              </span>{" "}
              {getValueText(
                "preludeImportance",
                fullFormData.preludeImportance,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.initiativePartner}:
              </span>{" "}
              {getValueText(
                "initiativePartner",
                fullFormData.initiativePartner,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.experimentsAttitude}:
              </span>{" "}
              {getValueText(
                "experimentsAttitude",
                fullFormData.experimentsAttitude,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.feelingWanted}:
              </span>{" "}
              {getValueText("feelingWanted", fullFormData.feelingWanted)}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.biggestBlock}:
              </span>{" "}
              {getValueText("biggestBlock", fullFormData.biggestBlock)}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.postcoitalFeeling}:
              </span>{" "}
              {getValueText(
                "postcoitalFeeling",
                fullFormData.postcoitalFeeling,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.communicationOpenness}:
              </span>{" "}
              {getValueText(
                "communicationOpenness",
                fullFormData.communicationOpenness,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.whatIsMoreImportant}:
              </span>{" "}
              {getValueText(
                "whatIsMoreImportant",
                fullFormData.whatIsMoreImportant,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.masturbationFrequency}:
              </span>{" "}
              {getValueText(
                "masturbationFrequency",
                fullFormData.masturbationFrequency,
              )}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.biggestNeed}:
              </span>{" "}
              {getValueText("biggestNeed", fullFormData.biggestNeed)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
