import { create } from 'zustand';
import { 

  CoupleFormData, 
  CoupleSurveyFormData 
} from '@/app/types/coupleTypes';

interface CoupleState {
  shortFormData: CoupleFormData | null;
  fullFormData: CoupleSurveyFormData | null;
  setShortFormData: (data: CoupleFormData) => void;
  setFullFormData: (data: CoupleSurveyFormData) => void;
  clearFormData: () => void;
}

export const useCoupleStore = create<CoupleState>((set) => ({
  shortFormData: null,
  fullFormData: null,
  setShortFormData: (shortFormData) => set({ shortFormData }),
  setFullFormData: (fullFormData) => set({ fullFormData }),
  clearFormData: () => set({ shortFormData: null, fullFormData: null }),
}));