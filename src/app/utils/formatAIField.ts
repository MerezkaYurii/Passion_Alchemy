import { Dictionary } from "@/i18n-config";

export interface AIField {
  question: string;
  answer: string;
}

export function formatAIField(
  fieldKey: string,
  value: string,
  dict: Dictionary,
  getValueText: (key: string, val: string) => string
): AIField {
  const dictRecord = dict as unknown as Record<string, Record<string, string>>;


  const question =
    dictRecord.CoupleForm?.[fieldKey] ||
    dictRecord.pairQuestionnaire?.[fieldKey] ||
    dictRecord.LonersForm?.[fieldKey] ||
    dictRecord.LonersFullResultForm?.[fieldKey] ||
    fieldKey;

 
  const answer = getValueText(fieldKey, value);

  return {
    question,
    answer,
  };
}