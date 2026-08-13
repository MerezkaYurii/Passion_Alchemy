import { LonersFormData } from "@/app/types/lonersTypes";

interface DictionarySection {
  [key: string]: unknown;
}

interface Dictionary {
  lonerQuestionnaire?: DictionarySection;
  LonersForm?: DictionarySection;
  [key: string]: unknown;
}

interface QuestionAnswer {
  question: string;
  answer: string;
}

export const buildLonerAIPayload = (
  shortFormData: LonersFormData | null,
  fullFormData: Record<string, string>,
  lang: "ru" | "en",
  dict?: Dictionary
) => {
  const getAnswerText = (key: string, value: string): string => {
    if (!value || !dict) return value;

    // 1. Ищем в lonerQuestionnaire[key + "Options"][value]
    const lonerOpts = dict.lonerQuestionnaire?.[`${key}Options`];
    if (lonerOpts && typeof lonerOpts === "object" && (lonerOpts as Record<string, string>)[value]) {
      return (lonerOpts as Record<string, string>)[value];
    }

    // 2. Ищем в LonersForm[key + "Options"][value]
    const formOpts = dict.LonersForm?.[`${key}Options`];
    if (formOpts && typeof formOpts === "object" && (formOpts as Record<string, string>)[value]) {
      return (formOpts as Record<string, string>)[value];
    }

    // 3. Ищем в LonersForm[key + "StatusOptions"][value] (для relationshipStatus)
    const statusOpts = dict.LonersForm?.[`${key}StatusOptions`];
    if (statusOpts && typeof statusOpts === "object" && (statusOpts as Record<string, string>)[value]) {
      return (statusOpts as Record<string, string>)[value];
    }

    return value;
  };

  const getQA = (questionText: unknown, answerValue: string): QuestionAnswer => ({
    question: typeof questionText === "string" ? questionText : "",
    answer: answerValue || "",
  });

  const formattedShortForm = shortFormData
    ? {
        gender: getQA(
          dict?.LonersForm?.gender || "✔️Пол",
          getAnswerText("gender", shortFormData.gender)
        ),
        age: getQA(
          dict?.LonersForm?.age || "✔️Возраст",
          shortFormData.age
        ),
        orientation: getQA(
          dict?.LonersForm?.orientation || "✔️✔️Сексуальная ориентация",
          getAnswerText("orientation", shortFormData.orientation)
        ),
        relationshipStatus: getQA(
          dict?.LonersForm?.relationshipStatus || "✔️Семейное положение",
          getAnswerText("relationshipStatus", shortFormData.relationshipStatus)
        ),
        mainGoal: getQA(
          dict?.LonersForm?.mainGoal || "✔️Главная цель",
          getAnswerText("mainGoal", shortFormData.mainGoal)
        ),
        preferredPace: getQA(
          dict?.LonersForm?.preferredPace || "✔️Предпочитаемый темп",
          getAnswerText("preferredPace", shortFormData.preferredPace)
        ),
        emotionalConnection: getQA(
          dict?.LonersForm?.emotionalConnection || "✔️Эмоциональная связь",
          getAnswerText("emotionalConnection", shortFormData.emotionalConnection)
        ),
        hasIssues: getQA(
          dict?.LonersForm?.hasIssues || "✔️Есть ли сложности",
          getAnswerText("hasIssues", shortFormData.hasIssues)
        ),
      }
    : null;

  const formattedFullForm = Object.keys(fullFormData).reduce(
    (acc, key) => {
      const questionText = dict?.lonerQuestionnaire?.[key] || key;
      const rawAnswer = fullFormData[key] || "";
      acc[key] = getQA(questionText, getAnswerText(key, rawAnswer));
      return acc;
    },
    {} as Record<string, QuestionAnswer>
  );

  return {
    lang,
    shortForm: formattedShortForm,
    fullForm: formattedFullForm,
  };
};