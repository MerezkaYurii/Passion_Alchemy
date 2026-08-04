export interface LonersFormData {
  gender: string;
  age: string;
  orientation: string;
  relationshipStatus: string;
  mainGoal: string;
  preferredPace: string;
  emotionalConnection: string;
  hasIssues: string;
}

export interface LonersFormProps {
  onResult: (data: LonersAnalysisResult) => void;
}

export interface langCode {
  langCode: 'en' | 'ru';
}

export interface LonersAnalysisResult {
text: string;
response?: string;
  output?: string;
  analysis?: string;
}

export interface LonersFullFormData {
    sexualDesireFrequency: string;
    sexualDesireTriggers: string;
    preludeImportance: string;
    initiativePartner: string;
    experimentsAttitude: string;
    feelingWanted: string;
    biggestBlock: string;
    postcoitalFeeling: string;
    communicationOpenness: string;
    whatIsMoreImportant: string;
    masturbationFrequency: string;
    biggestNeed: string;
  }
  
export interface LonersFullFormProps {
  onResult: (data: LonersFullAnalysisResult) => void;
}

export interface LonersFullAnalysisResult {
text: string;
response?: string;
  output?: string;
  analysis?: string;
}