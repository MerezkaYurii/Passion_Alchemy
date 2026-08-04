'use client';

import { useState } from 'react';
import { useDictionary } from '@/app/hooks/useDictionary';
import { CoupleAnalysisResult, CoupleFormData } from '@/app/types/coupleTypes';
import GlobalLoader from '@/components/GlobalLoader';
import { useCoupleStore } from '@/app/store/coupleSlice';

export default function CoupleForm({
  onResult,
}: {
  onResult: (data: CoupleAnalysisResult) => void;
}) {
  const dict = useDictionary();
  const [loading, setLoading] = useState(false);
  const setCoupleResult = useCoupleStore((state) => state.setCoupleResult);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const [formData, setFormData] = useState<CoupleFormData>({
    partner1: {
      gender: '',
      age: '',
      orientation: '',
      preferredPace: '',
      emotionalConnection: '',
      sexualDesire: '',
    },
    partner2: {
      gender: '',
      age: '',
      orientation: '',
      preferredPace: '',
      emotionalConnection: '',
      sexualDesire: '',
    },
    mainImprovementGoal: '',
    lang:""
  });

  const handlePartnerChange = (
    partner: 'partner1' | 'partner2',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [partner]: {
        ...prev[partner],
        [field]: value,
      },
    }));
  };

  const handleGoalChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      mainImprovementGoal: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const currentLanguage = dict?.header?.language || 'en';

      const payload = {
        ...formData,
        lang: currentLanguage,
      };

      const res = await fetch('/api/couple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server error / Ошибка сервера:', errorText);
        setLoading(false);
        return;
      }

     
const contentType = res.headers.get('content-type') || '';
      let result;

      if (contentType.includes('application/json')) {
       const data = await res.json();
  result = Array.isArray(data) ? data[0] : data;
      } else {
        const textResult = await res.text();
        result = { text: textResult };
      }
      setCoupleResult(result);
      setIsSubmitted(true);
      onResult(result);
    } catch (error) {
      console.error('Client error / Ошибка на клиенте:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full h-auto">
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-6 pb-8 bg-gray-900/20 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 h-auto flex flex-col justify-between mb-20">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-auto">
          {/* ШАГ 1 */}
          <div className="flex flex-col gap-4 border-b border-gray-700/60 pb-6">
            <h3 className="text-xl font-medium text-white text-center md:text-left">
              {dict?.CoupleForm?.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Партнёр 1 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-blue-400 font-medium">{dict?.CoupleForm?.partner1_title}</h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.gender}</label>
                  <select
                    value={formData.partner1.gender}
                    onChange={(e) => handlePartnerChange('partner1', 'gender', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.gender === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholder1}</option>
                    <option value="male" className="bg-gray-800 text-white">{dict?.CoupleForm?.genderOptions.male}</option>
                    <option value="female" className="bg-gray-800 text-white">{dict?.CoupleForm?.genderOptions.female}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.age}</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    placeholder={dict?.CoupleForm?.placeholder2}
                    value={formData.partner1.age}
                    onChange={(e) => handlePartnerChange('partner1', 'age', e.target.value)}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Партнёр 2 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-blue-400 font-medium">{dict?.CoupleForm?.partner2_title}</h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.gender}</label>
                  <select
                    value={formData.partner2.gender}
                    onChange={(e) => handlePartnerChange('partner2', 'gender', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.gender === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholder1}</option>
                    <option value="male" className="bg-gray-800 text-white">{dict?.CoupleForm?.genderOptions.male}</option>
                    <option value="female" className="bg-gray-800 text-white">{dict?.CoupleForm?.genderOptions.female}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.age}</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    placeholder={dict?.CoupleForm?.placeholder2}
                    value={formData.partner2.age}
                    onChange={(e) => handlePartnerChange('partner2', 'age', e.target.value)}
                    className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ШАГ 2 */}
          <div className="flex flex-col gap-6 border-b border-gray-700/60 pb-6">
            <h3 className="text-xl font-medium text-white text-center md:text-left">
              {dict?.CoupleForm?.title2}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ответы Партнёра 1 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-blue-400 font-medium">{dict?.CoupleForm?.partner1_answers}</h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.orientation}</label>
                  <select
                    value={formData.partner1.orientation}
                    onChange={(e) => handlePartnerChange('partner1', 'orientation', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.orientation === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholder3}</option>
                    <option value="heterosexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.heterosexual}</option>
                    <option value="homosexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.homosexual}</option>
                    <option value="bisexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.bisexual}</option>
                    <option value="asexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.asexual}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.pace}</label>
                  <select
                    value={formData.partner1.preferredPace}
                    onChange={(e) => handlePartnerChange('partner1', 'preferredPace', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.preferredPace === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholderPace}</option>
                    <option value="gentle_slow" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.slow}</option>
                    <option value="passionate_intense" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.fast}</option>
                    <option value="varied" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.varied}</option>
                    <option value="depends_on_mood" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.dependsOnMood}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.emotionalConnection}</label>
                  <select
                    value={formData.partner1.emotionalConnection}
                    onChange={(e) => handlePartnerChange('partner1', 'emotionalConnection', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.emotionalConnection === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholderEmotionalConnection}</option>
                    <option value="very_important" className="bg-gray-800 text-white">{dict?.CoupleForm?.emotionalConnectionOptions.veryImportant}</option>
                    <option value="important" className="bg-gray-800 text-white">{dict?.CoupleForm?.emotionalConnectionOptions.important}</option>
                    <option value="not_so_important" className="bg-gray-800 text-white">{dict?.CoupleForm?.emotionalConnectionOptions.notSoImportant}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.sexualDesire}</label>
                  <select
                    value={formData.partner1.sexualDesire}
                    onChange={(e) => handlePartnerChange('partner1', 'sexualDesire', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner1.sexualDesire === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholderSexualDesire}</option>
                    <option value="high" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.high}</option>
                    <option value="medium" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.medium}</option>
                    <option value="low" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.low}</option>
                    <option value="fluctuating" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.unstable}</option>
                  </select>
                </div>
              </div>

              {/* Ответы Партнёра 2 */}
              <div className="flex flex-col gap-4 bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
                <h4 className="text-lg text-blue-400 font-medium">{dict?.CoupleForm?.partner2_answers}</h4>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.orientation}</label>
                  <select
                    value={formData.partner2.orientation}
                    onChange={(e) => handlePartnerChange('partner2', 'orientation', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.orientation === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholder3}</option>
                    <option value="heterosexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.heterosexual}</option>
                    <option value="homosexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.homosexual}</option>
                    <option value="bisexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.bisexual}</option>
                    <option value="asexual" className="bg-gray-800 text-white">{dict?.CoupleForm?.orientationOptions.asexual}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.pace}</label>
                  <select
                    value={formData.partner2.preferredPace}
                    onChange={(e) => handlePartnerChange('partner2', 'preferredPace', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.preferredPace === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholderPace}</option>
                    <option value="gentle_slow" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.slow}</option>
                    <option value="passionate_intense" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.fast}</option>
                    <option value="varied" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.varied}</option>
                    <option value="depends_on_mood" className="bg-gray-800 text-white">{dict?.CoupleForm?.paceOptions.dependsOnMood}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.emotionalConnection}</label>
                  <select
                    value={formData.partner2.emotionalConnection}
                    onChange={(e) => handlePartnerChange('partner2', 'emotionalConnection', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.emotionalConnection === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholderEmotionalConnection}</option>
                    <option value="very_important" className="bg-gray-800 text-white">{dict?.CoupleForm?.emotionalConnectionOptions.veryImportant}</option>
                    <option value="important" className="bg-gray-800 text-white">{dict?.CoupleForm?.emotionalConnectionOptions.important}</option>
                    <option value="not_so_important" className="bg-gray-800 text-white">{dict?.CoupleForm?.emotionalConnectionOptions.notSoImportant}</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="text-white font-light text-sm mb-1">{dict?.CoupleForm?.sexualDesire}</label>
                  <select
                    value={formData.partner2.sexualDesire}
                    onChange={(e) => handlePartnerChange('partner2', 'sexualDesire', e.target.value)}
                    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                      formData.partner2.sexualDesire === '' ? 'text-gray-400' : 'text-white'
                    }`}
                    required
                  >
                    <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholderSexualDesire}</option>
                    <option value="high" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.high}</option>
                    <option value="medium" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.medium}</option>
                    <option value="low" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.low}</option>
                    <option value="fluctuating" className="bg-gray-800 text-white">{dict?.CoupleForm?.sexualDesireOptions.unstable}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* ШАГ 3 */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium text-white text-center md:text-left">
              {dict?.CoupleForm?.title3}
            </h3>

            <div className="flex flex-col bg-gray-800/40 p-4 rounded-xl border border-gray-700/40">
              <label className="text-white font-light text-sm mb-2">
                {dict?.CoupleForm?.question3}
              </label>
              <select
                value={formData.mainImprovementGoal}
                onChange={(e) => handleGoalChange(e.target.value)}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.mainImprovementGoal === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">{dict?.CoupleForm?.placeholder4}</option>
                <option value="passion" className="bg-gray-800 text-white">{dict?.CoupleForm?.options3.harmony}</option>
                <option value="tenderness" className="bg-gray-800 text-white">{dict?.CoupleForm?.options3.variety}</option>
                <option value="understanding" className="bg-gray-800 text-white">{dict?.CoupleForm?.options3.pleasure}</option>
                <option value="frequency" className="bg-gray-800 text-white">{dict?.CoupleForm?.options3.emotional}</option>
                <option value="novelty" className="bg-gray-800 text-white">{dict?.CoupleForm?.options3.confidence}</option>
                <option value="routine" className="bg-gray-800 text-white">{dict?.CoupleForm?.options3.routine}</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || isSubmitted}
                    
            className="w-full md:w-1/2 mx-auto mt-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/80 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all  border duration-300"
          >
            {loading ? dict?.GlobalLoader?.text : dict?.CoupleForm?.submit}
          </button>
        </form>
      </div>
    </section>
  );
}