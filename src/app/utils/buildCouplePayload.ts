import { CoupleSurveyFormData } from "@/app/types/coupleTypes";

interface DictionarySection {
  [key: string]: unknown;
}

interface Dictionary {
  pairQuestionnaire?: DictionarySection;
  CoupleForm?: DictionarySection;
  [key: string]: unknown;
}

interface QuestionAnswer {
  question: string;
  answer: string;
}

export const buildCoupleAIPayload = (
  shortFormData: Record<string, unknown> | null,
  formData: CoupleSurveyFormData,
  lang: "ru" | "en",
  dict?: Dictionary
) => {
  const { mainImprovementGoal, ...cleanShortForm } = shortFormData || {};

  // Карта сопоставления для значений, у которых ключи в форме отличаются от словаря
  const valueAliases: Record<string, string> = {
    passionate_intense: "fast",
  };

  const getAnswerText = (key: string, value: string): string => {
    if (!value) return "";

    const targetValue = valueAliases[value] || value;

    if (dict) {
      // 1. Ищем в pairQuestionnaire[key + "Options"][targetValue]
      const pairOpts = dict.pairQuestionnaire?.[`${key}Options`];
      if (pairOpts && typeof pairOpts === "object" && (pairOpts as Record<string, string>)[targetValue]) {
        return (pairOpts as Record<string, string>)[targetValue];
      }

      // 2. Ищем в CoupleForm[key + "Options"][targetValue]
      const coupleOpts = dict.CoupleForm?.[`${key}Options`];
      if (coupleOpts && typeof coupleOpts === "object" && (coupleOpts as Record<string, string>)[targetValue]) {
        return (coupleOpts as Record<string, string>)[targetValue];
      }
    }

    return targetValue;
  };

  const getQA = (questionText: unknown, answerValue: string): QuestionAnswer => ({
    question: typeof questionText === "string" ? questionText : "",
    answer: answerValue || "",
  });

  const parsePartnerShort = (partnerData: Record<string, unknown> | undefined) => {
    if (!partnerData) return {};
    return {
      gender: getQA(dict?.CoupleForm?.gender || "Пол", getAnswerText("gender", String(partnerData.gender || ""))),
      age: getQA(dict?.CoupleForm?.age || "Возраст", String(partnerData.age || "")),
      orientation: getQA(dict?.CoupleForm?.orientation || "Сексуальная ориентация", getAnswerText("orientation", String(partnerData.orientation || ""))),
      sexualDesire: getQA(dict?.CoupleForm?.sexualDesire || "Как сейчас твоё сексуальное желание?", getAnswerText("sexualDesire", String(partnerData.sexualDesire || ""))),
      pace: getQA(dict?.CoupleForm?.pace || "Какой темп в сексе тебе нравится больше?", getAnswerText("pace", String(partnerData.pace || ""))),
      emotionalConnection: getQA(dict?.CoupleForm?.emotionalConnection || "Насколько важна эмоциональная связь во время интима?", getAnswerText("emotionalConnection", String(partnerData.emotionalConnection || ""))),
    };
  };

  const p1Short = cleanShortForm.partner1 as Record<string, unknown> | undefined;
  const p2Short = cleanShortForm.partner2 as Record<string, unknown> | undefined;

  const formattedShortForm = {
    partner1: parsePartnerShort(p1Short),
    partner2: parsePartnerShort(p2Short),
    intimateGoal: getQA(
      dict?.CoupleForm?.intimateGoal || "Что вы больше всего хотите улучшить в интимной жизни?",
      getAnswerText("intimateGoal", String(cleanShortForm.intimateGoal || ""))
    ),
  };

  return {
    lang,
    shortForm: formattedShortForm,
    fullForm: {
      partner1: {
        desireFrequency: getQA(
          dict?.pairQuestionnaire?.desireFrequency || "Как часто у тебя возникает сексуальное желание?",
          getAnswerText("desireFrequency", formData.partner1.desireFrequency)
        ),
        desireTriggers: getQA(
          dict?.pairQuestionnaire?.desireTriggers || "Что чаще всего запускает твоё желание?",
          getAnswerText("desireTriggers", formData.partner1.desireTriggers)
        ),
        foreplayImportance: getQA(
          dict?.pairQuestionnaire?.foreplayImportance || "Насколько тебе важна прелюдия?",
          getAnswerText("foreplayImportance", formData.partner1.foreplayImportance)
        ),
        initiative: getQA(
          dict?.pairQuestionnaire?.initiative || "Кто чаще проявляет инициативу в вашей паре?",
          getAnswerText("initiative", formData.partner1.initiative)
        ),
        experimentsOpenness: getQA(
          dict?.pairQuestionnaire?.experimentsOpenness || "Как ты относишься к экспериментам в сексе?",
          getAnswerText("experimentsOpenness", formData.partner1.experimentsOpenness)
        ),
        feelingDesiredImportance: getQA(
          dict?.pairQuestionnaire?.feelingDesiredImportance || "Насколько тебе важно чувствовать себя желанным(-ой) партнёром?",
          getAnswerText("feelingDesiredImportance", formData.partner1.feelingDesiredImportance)
        ),
        relaxationBarriers: getQA(
          dict?.pairQuestionnaire?.relaxationBarriers || "Что чаще всего мешает тебе полностью расслабиться в сексе?",
          getAnswerText("relaxationBarriers", formData.partner1.relaxationBarriers)
        ),
        desireCommunicationEase: getQA(
          dict?.pairQuestionnaire?.desireCommunicationEase || "Насколько легко тебе говорить партнёру о своих желаниях?",
          getAnswerText("desireCommunicationEase", formData.partner1.desireCommunicationEase)
        ),
      },
      partner2: {
        desireFrequency: getQA(
          dict?.pairQuestionnaire?.desireFrequency || "Как часто у тебя возникает сексуальное желание?",
          getAnswerText("desireFrequency", formData.partner2.desireFrequency)
        ),
        desireTriggers: getQA(
          dict?.pairQuestionnaire?.desireTriggers || "Что чаще всего запускает твоё желание?",
          getAnswerText("desireTriggers", formData.partner2.desireTriggers)
        ),
        foreplayImportance: getQA(
          dict?.pairQuestionnaire?.foreplayImportance || "Насколько тебе важна прелюдия?",
          getAnswerText("foreplayImportance", formData.partner2.foreplayImportance)
        ),
        initiative: getQA(
          dict?.pairQuestionnaire?.initiative || "Кто чаще проявляет инициативу в вашей паре?",
          getAnswerText("initiative", formData.partner2.initiative)
        ),
        experimentsOpenness: getQA(
          dict?.pairQuestionnaire?.experimentsOpenness || "Как ты относишься к экспериментам в сексе?",
          getAnswerText("experimentsOpenness", formData.partner2.experimentsOpenness)
        ),
        feelingDesiredImportance: getQA(
          dict?.pairQuestionnaire?.feelingDesiredImportance || "Насколько тебе важно чувствовать себя желанным(-ой) партнёром?",
          getAnswerText("feelingDesiredImportance", formData.partner2.feelingDesiredImportance)
        ),
        relaxationBarriers: getQA(
          dict?.pairQuestionnaire?.relaxationBarriers || "Что чаще всего мешает тебе полностью расслабиться в сексе?",
          getAnswerText("relaxationBarriers", formData.partner2.relaxationBarriers)
        ),
        desireCommunicationEase: getQA(
          dict?.pairQuestionnaire?.desireCommunicationEase || "Насколько легко тебе говорить партнёру о своих желаниях?",
          getAnswerText("desireCommunicationEase", formData.partner2.desireCommunicationEase)
        ),
      },
      pair: {
        currentSexFrequency: getQA(
          dict?.pairQuestionnaire?.currentSexFrequency || "Как часто у вас бывает секс сейчас?",
          getAnswerText("currentSexFrequency", formData.pair.currentSexFrequency)
        ),
        mainIssues: getQA(
          dict?.pairQuestionnaire?.mainIssues || "Что сейчас больше всего напрягает в вашей интимной жизни?",
          getAnswerText("mainIssues", formData.pair.mainIssues)
        ),
        desiredAdditions: getQA(
          dict?.pairQuestionnaire?.desiredAdditions || "Чего вам обоим сейчас больше всего хочется добавить?",
          getAnswerText("desiredAdditions", formData.pair.desiredAdditions)
        ),
        overallSatisfaction: getQA(
          dict?.pairQuestionnaire?.overallSatisfaction || "Насколько вы в целом удовлетворены своей интимной жизнью?",
          getAnswerText("overallSatisfaction", formData.pair.overallSatisfaction)
        ),
      },
    },
  };
};