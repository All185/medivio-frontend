'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SeniorRdvPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [type, setType] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  }

  useEffect(() => {
    if (step === 1) speak(t('senior.rdv_step1_voice'));
    if (step === 2) speak(t('senior.rdv_step2_voice'));
    if (step === 3) speak(t('senior.rdv_step3_voice'));
  }, [step]);

  function handleType(selected: string) {
    setType(selected);
    setStep(2);
  }

  function handleConfirm() {
    setStep(3);
    speak(t('senior.rdv_confirmed_voice'));
    setTimeout(() => router.push('/appointments/new'), 3000);
  }

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={40} height={40} />
          <span className="font-bold text-gray-900 text-xl">Medivio</span>
        </div>
        <button onClick={() => router.push('/senior')} className="text-gray-500 text-lg">
          {t('senior.back')}
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {/* Indicateur d'etapes */}
        <div className="flex items-center gap-4 mb-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s < step ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-16 h-2 rounded-full ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="text-center space-y-8 w-full max-w-lg">
            <h1 className="text-4xl font-bold text-gray-900">{t('senior.rdv_step1_title')}</h1>
            <p className="text-2xl text-gray-600">{t('senior.rdv_step1_subtitle')}</p>
            <div className="grid grid-cols-1 gap-6">
              <button onClick={() => handleType('urgent')} className="bg-red-600 hover:bg-red-700 text-white p-8 rounded-3xl text-3xl font-bold shadow-lg flex items-center gap-4 justify-center">
                <span className="text-5xl">🚨</span>
                {t('senior.rdv_urgent')}
              </button>
              <button onClick={() => handleType('normal')} className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-3xl text-3xl font-bold shadow-lg flex items-center gap-4 justify-center">
                <span className="text-5xl">📅</span>
                {t('senior.rdv_normal')}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-8 w-full max-w-lg">
            <h1 className="text-4xl font-bold text-gray-900">{t('senior.rdv_step2_title')}</h1>
            <div className="bg-white rounded-3xl p-8 shadow-lg space-y-4 text-left">
              <div className="flex items-center gap-4">
                <span className="text-4xl">{type === 'urgent' ? '🚨' : '📅'}</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{type === 'urgent' ? t('senior.rdv_urgent') : t('senior.rdv_normal')}</p>
                  <p className="text-lg text-gray-500">{t('senior.rdv_type_label')}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-3xl text-3xl font-bold shadow-lg flex items-center gap-4 justify-center">
                <span className="text-5xl">✅</span>
                {t('senior.rdv_confirm')}
              </button>
              <button onClick={() => setStep(1)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-6 rounded-3xl text-2xl font-bold shadow-lg">
                {t('senior.rdv_modify')}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-8">
            <div className="text-9xl animate-bounce">✅</div>
            <h1 className="text-4xl font-bold text-green-700">{t('senior.rdv_confirmed_title')}</h1>
            <p className="text-2xl text-gray-600">{t('senior.rdv_confirmed_subtitle')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
