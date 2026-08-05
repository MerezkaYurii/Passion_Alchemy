"use client";

import { useLonersStore } from "@/app/store/lonersSlice";
import { useDictionary } from "@/app/hooks/useDictionary";

export default function UserAnswersSummary() {
  const shortFormData = useLonersStore((state) => state.shortFormData);
  const fullFormData = useLonersStore((state) => state.fullFormData);
  const dict = useDictionary();
  if (!shortFormData && !fullFormData) {
    return null;
  }

  return (
    <div className="space-y-6 text-white text-sm sm:text-base">
      {/* Первая анкета */}
      {shortFormData && (
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
          <h3 className="text-md font-semibold text-[#4f83fd] mb-3">
            {dict.Loners.title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-gray-400">{dict.LonersForm.gender}:</span>{" "}
              {shortFormData.gender}
            </div>
            <div>
              <span className="text-gray-400">{dict.LonersForm.age}:</span>{" "}
              {shortFormData.age}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.orientation}:
              </span>{" "}
              {shortFormData.orientation}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.relationshipStatus}:
              </span>{" "}
              {shortFormData.relationshipStatus}
            </div>
            <div>
              <span className="text-gray-400">{dict.LonersForm.mainGoal}:</span>{" "}
              {shortFormData.mainGoal}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.preferredPace}:
              </span>{" "}
              {shortFormData.preferredPace}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.emotionalConnection}:
              </span>{" "}
              {shortFormData.emotionalConnection}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersForm.hasIssues}:
              </span>{" "}
              {shortFormData.hasIssues}
            </div>
          </div>
        </div>
      )}

      {/* Вторая анкета */}
      {fullFormData && (
        <div className="bg-gray-900/60 p-4 rounded-xl border border-gray-700/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.sexualDesireFrequency}:
              </span>{" "}
              {fullFormData.sexualDesireFrequency}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.sexualDesireTriggers}:
              </span>{" "}
              {fullFormData.sexualDesireTriggers}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.preludeImportance}:
              </span>{" "}
              {fullFormData.preludeImportance}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.initiativePartner}:
              </span>{" "}
              {fullFormData.initiativePartner}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.experimentsAttitude}:
              </span>{" "}
              {fullFormData.experimentsAttitude}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.feelingWanted}:
              </span>{" "}
              {fullFormData.feelingWanted}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.biggestBlock}:
              </span>{" "}
              {fullFormData.biggestBlock}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.postcoitalFeeling}:
              </span>{" "}
              {fullFormData.postcoitalFeeling}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.communicationOpenness}:
              </span>{" "}
              {fullFormData.communicationOpenness}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.whatIsMoreImportant}:
              </span>{" "}
              {fullFormData.whatIsMoreImportant}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.masturbationFrequency}:
              </span>{" "}
              {fullFormData.masturbationFrequency}
            </div>
            <div>
              <span className="text-gray-400">
                {dict.LonersFullResultForm.biggestNeed}:
              </span>{" "}
              {fullFormData.biggestNeed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
