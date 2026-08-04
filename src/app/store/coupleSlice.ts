import { create } from 'zustand';
import { CoupleAnalysisResult } from '@/app/types/coupleTypes';

interface CoupleState {
  result: CoupleAnalysisResult | null;
  setCoupleResult: (result: CoupleAnalysisResult) => void;
  clearCoupleResult: () => void;
}

export const useCoupleStore = create<CoupleState>((set) => ({
  result: null,
  setCoupleResult: (result) => set({ result }),
  clearCoupleResult: () => set({ result: null }),
}));