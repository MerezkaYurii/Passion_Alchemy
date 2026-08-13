export interface CoupleFormData {
    partner1: {
      gender: string,
      age:string,
      orientation: string,
      pace:string,
      preferredPace: string,
      emotionalConnection: string,
      sexualDesire: string,
    },
    partner2: {
      gender: string,
      age: string,
      pace:string,
      orientation: string,
      preferredPace: string,
      emotionalConnection: string,
      sexualDesire: string,
    },
    intimateGoal: string,
    lang:string
  }


export interface CoupleFormProps {
  onResult: (data: CoupleAnalysisResult) => void;
}

export interface langCode {
  langCode: 'en' | 'ru';
}

export interface CoupleAnalysisResult {
text: string;
response?: string;
  output?: string;
  analysis?: string;
}

export interface PartnerData {
  desireFrequency: string;
  desireTriggers: string;
  foreplayImportance: string;
  initiative: string;
  experimentsOpenness: string;
  feelingDesiredImportance: string;
  relaxationBarriers: string;
  desireCommunicationEase: string;
}

export interface PairData {
  currentSexFrequency: string;
  mainIssues: string;
  desiredAdditions: string;
  overallSatisfaction: string;
}

export interface CoupleSurveyFormData {
  partner1: PartnerData;
  partner2: PartnerData;
  pair: PairData;
}
export interface CoupleSurveyFormProps {
  onSubmit?: (data: CoupleSurveyFormData) => void;
  lang?: "ru" | "en";
}