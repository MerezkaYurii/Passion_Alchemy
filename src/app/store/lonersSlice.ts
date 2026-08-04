import { create } from 'zustand';
import { LonersAnalysisResult } from '@/app/types/lonersTypes';

interface LonersState {
  result: LonersAnalysisResult | null;
  setLonersResult: (result: LonersAnalysisResult) => void;
  clearLonersResult: () => void;
}

export const useLonersStore = create<LonersState>((set) => ({
  result: null,
  setLonersResult: (result) => set({ result }),
  clearLonersResult: () => set({ result: null }),
}));