import { create } from 'zustand';
import { LonersAnalysisResult, LonersFormData, LonersFullFormData } from '@/app/types/lonersTypes';

interface LonersState {
result: LonersAnalysisResult | null;
  shortFormData: LonersFormData | null;
  fullFormData: LonersFullFormData | null;
  setLonersResult: (result: LonersAnalysisResult) => void;
  setShortFormData: (formData: LonersFormData) => void;
  setFullFormData: (formData: LonersFullFormData) => void;
  clearLonersResult: () => void;
}

export const useLonersStore = create<LonersState>((set) => ({
result: null,
  shortFormData: null,
  fullFormData: null,
  setLonersResult: (result) => set({ result }),
  setShortFormData: (shortFormData) => set({ shortFormData }),
  setFullFormData: (fullFormData) => set({ fullFormData }),
  clearLonersResult: () => set({ result: null, shortFormData: null, fullFormData: null }),
}));