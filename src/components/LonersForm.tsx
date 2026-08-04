'use client';

import { useDictionary } from '@/app/hooks/useDictionary';
import { useState } from 'react';
import GlobalLoader from './GlobalLoader';
import { LonersFormData, LonersFormProps } from '@/app/types/lonersTypes';
import { useLonersStore } from '@/app/store/lonersSlice';


export default function LonersForm({ onResult }: LonersFormProps) {
  const dict = useDictionary();
const setLonersResult = useLonersStore((state) => state.setLonersResult);
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<LonersFormData>({
    gender: '',
    age: '',
    orientation: '',
    relationshipStatus: '',
    mainGoal: '',
    preferredPace: '',
    emotionalConnection: '',
    hasIssues: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
     const res = await fetch('/api/loners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          'Server error (text) / Ошибка сервера (текст):',
          errorText
        );
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






  
      setLonersResult(result);
      setIsSubmitted(true);
      onResult(result);
    } catch (error) {
      console.error('Client-side error / Ошибка на клиенте', error);
    } finally {
      setLoading(false);
    }
  };

  if (!dict) return null;

  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full h-auto">
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-6 pb-8 bg-gray-900/20 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 h-auto flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-auto">
          {/* Общая сетка grid для всех полей */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left items-center">
            
            {/* 1. Пол */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.gender}
            </label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
      formData.gender === '' ? 'text-gray-400' : 'text-white'
    }`}
    required
  >
    <option value="" disabled className="bg-gray-800 text-gray-400">
      {dict.LonersForm.placeholder1}
    </option>
    <option value="male" className="bg-gray-800 text-white">
      {dict.LonersForm.genderOptions?.male || 'Мужчина'}
    </option>
    <option value="female" className="bg-gray-800 text-white">
      {dict.LonersForm.genderOptions?.female || 'Женщина'}
    </option>
  </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.genderText}
            </div>

            {/* 2. Возраст */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.age}
              </label>
              <input
                type="number"
                name="age"
                min="18"
                max="100"
                placeholder={dict.LonersForm.placeholder2}
                value={formData.age}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.ageText}
            </div>

            {/* 3. Ориентация */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.orientation}
              </label>
              <select
                name="orientation"
                value={formData.orientation}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.orientation === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersForm.placeholder3}
                </option>
                <option value="heterosexual" className="bg-gray-800 text-white">
                  {dict.LonersForm.orientationOptions.heterosexual}
                </option>
                <option value="homosexual" className="bg-gray-800 text-white">
                  {dict.LonersForm.orientationOptions.homosexual}
                </option>
                <option value="bisexual" className="bg-gray-800 text-white">
                  {dict.LonersForm.orientationOptions.bisexual}
                </option>
                <option value="asexual" className="bg-gray-800 text-white">
                  {dict.LonersForm.orientationOptions.asexual}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.orientationText}
            </div>

            {/* 4. Текущий статус */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.relationshipStatus}
              </label>
              <select
                name="relationshipStatus"
                value={formData.relationshipStatus}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.relationshipStatus === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersForm.placeholder4}
                </option>
                <option value="single" className="bg-gray-800 text-white">
                  {dict.LonersForm.statusOptions.single}
                </option>
                <option value="inrelationship" className="bg-gray-800 text-white">
                  {dict.LonersForm.statusOptions.inrelationship}
                </option>
                <option value="married" className="bg-gray-800 text-white">
                  {dict.LonersForm.statusOptions.married}
                </option>
                <option value="searching" className="bg-gray-800 text-white">
                  {dict.LonersForm.statusOptions.searching}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.relationshipStatusText}
            </div>

            {/* 5. Главная цель */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.mainGoal}
              </label>
              <select
                name="mainGoal"
                value={formData.mainGoal}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.mainGoal === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersForm.placeholder5}
                </option>
                <option value="understand_self" className="bg-gray-800 text-white">
                  {dict.LonersForm.goalOptions.understandSelf}
                </option>
                <option value="increase_desire" className="bg-gray-800 text-white">
                  {dict.LonersForm.goalOptions.increaseDesire}
                </option>
                <option value="improve_intimate_life" className="bg-gray-800 text-white">
                  {dict.LonersForm.goalOptions.improveIntimateLife}
                </option>
                <option value="explore_preferences" className="bg-gray-800 text-white">
                  {dict.LonersForm.goalOptions.explorePreferences}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.mainGoalText}
            </div>

            {/* 6. Предпочитаемый темп */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.preferredPace}
              </label>
              <select
                name="preferredPace"
                value={formData.preferredPace}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.preferredPace === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersForm.placeholderPace}
                </option>
                <option value="gentle_slow" className="bg-gray-800 text-white">
                  {dict.LonersForm.paceOptions.gentleSlow}
                </option>
                <option value="passionate_intense" className="bg-gray-800 text-white">
                  {dict.LonersForm.paceOptions.passionateIntense}
                </option>
                <option value="varied" className="bg-gray-800 text-white">
                  {dict.LonersForm.paceOptions.varied}
                </option>
                <option value="depends_on_mood" className="bg-gray-800 text-white">
                  {dict.LonersForm.paceOptions.dependsOnMood}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.paceText}
            </div>

            {/* 7. Эмоциональная связь */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.emotionalConnection}
              </label>
              <select
                name="emotionalConnection"
                value={formData.emotionalConnection}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.emotionalConnection === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersForm.placeholderEmotionalConnection}
                </option>
                <option value="very_important" className="bg-gray-800 text-white">
                  {dict.LonersForm.emotionalConnectionOptions.veryImportant}
                </option>
                <option value="important" className="bg-gray-800 text-white">
                  {dict.LonersForm.emotionalConnectionOptions.important}
                </option>
                <option value="not_so_important" className="bg-gray-800 text-white">
                  {dict.LonersForm.emotionalConnectionOptions.notSoImportant}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.emotionalConnectionText}
            </div>

            {/* 8. Проблемы с желанием или дискомфорт */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.LonersForm.hasIssues}
              </label>
              <select
                name="hasIssues"
                value={formData.hasIssues}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors ${
                  formData.hasIssues === '' ? 'text-gray-400' : 'text-white'
                }`}
                required
              >
                <option value="" disabled className="bg-gray-800 text-gray-400">
                  {dict.LonersForm.placeholderHasIssues}
                </option>
                <option value="yes" className="bg-gray-800 text-white">
                  {dict.LonersForm.hasIssuesOptions.yes}
                </option>
                <option value="sometimes" className="bg-gray-800 text-white">
                  {dict.LonersForm.hasIssuesOptions.sometimes}
                </option>
                <option value="no" className="bg-gray-800 text-white">
                  {dict.LonersForm.hasIssuesOptions.no}
                </option>
              </select>
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.LonersForm.hasIssuesText}
            </div>

          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading || isSubmitted}
            className="w-full md:w-1/2 mx-auto mt-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/80 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all  border duration-300"
          >
            {loading
              ? dict.LonersForm.submitLoading
              : dict.LonersForm.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

//Чтобы получить результат в другом компоненте, используй
//setLonersResult(result);