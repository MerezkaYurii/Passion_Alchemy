'use client';

import { useState } from 'react';

import CoupleForm from './CoupleForm';
import CoupleResult from './CoupleResult';
import { CoupleAnalysisResult } from '@/app/types/coupleTypes';
import { Dictionary } from '@/i18n-config';



interface CouplesContentProps {
  lang: string;
  dict: Dictionary
}
export default function CouplesContent({ lang , dict}: CouplesContentProps) {
  const [analysisResult, setAnalysisResult] = useState<CoupleAnalysisResult | null>(null);

  return (
    <div>
              <CoupleForm onResult={(data) => setAnalysisResult(data)} />

      {analysisResult && (

        <CoupleResult report={analysisResult} lang={lang} dict={dict}/>
      )}
    </div>
  );
}