export interface CoupleFormData {
    partner1: {
      gender: string,
      age:string,
      orientation: string,
      preferredPace: string,
      emotionalConnection: string,
      sexualDesire: string,
    },
    partner2: {
      gender: string,
      age: string,
      orientation: string,
      preferredPace: string,
      emotionalConnection: string,
      sexualDesire: string,
    },
    mainImprovementGoal: string,
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

