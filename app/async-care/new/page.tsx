'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const SPECIALTIES = [
  'Medecine generale', 'Dermatologie', 'Cardiologie', 'Gynecologie',
  'Psychiatrie', 'Neurologie', 'Pediatrie', 'ORL', 'Ophtalmologie',
  'Orthopédie', 'Gastro-enterologie', 'Urologie'
];

export default function NewAsyncCasePage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [specialty, setSpecialty] = useState('');
  const [complaint, setComplaint] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);

  async function fetchQuestions(spec: string) {
    setLoadingQuestions(true);
    try {
      const res = await fetch(`/api/async-care/questionnaire/${encodeURIComponent(spec)}`);
      if (res.ok) {
        const data = await res.json();
        setQuestions(data.questions);
      }
    } finally {
      setLoadingQuestions(false);
    }
  }

  function handleSpecialty(spec: string) {
    setSpecialty(spec);
    fetchQuestions(spec);
    setStep(2);
  }

  function handleComplaint() {
    if (!complaint.trim()) return;
    setStep(3);
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/async-care/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          specialty,
          chief_complaint: complaint,
          symptoms: symptoms.split(',').map(s => s.trim()).filter(Boolean),
          questionnaire_answers: answers,
        }),
      });
      if (res.ok) {
        router.push('/async-care');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={() => step > 1 ? setStep(step - 1) : router.push('/async-care')} className="text-sm text-gray-500 hover:text-gray-700">
            {t('async.back')}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Indicateur etapes */}
        <div className="flex items-center gap-3 mb-10">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {s < step ? '✓' : s}
              </div>
              {s < 4 && <div className={`flex-1 h-1 w-12 rounded-full ${s < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Etape 1 - Specialite */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('async.step1_title')}</h1>
            <p className="text-gray-500 mb-6">{t('async.step1_subtitle')}</p>
            <div className="grid grid-cols-2 gap-3">
              {SPECIALTIES.map(spec => (
                <button key={spec} onClick={() => handleSpecialty(spec)} className="bg-white border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-2xl p-4 text-left transition-all">
                  <p className="font-semibold text-gray-900 text-sm">{spec}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Etape 2 - Motif */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('async.step2_title')}</h1>
            <p className="text-gray-500 mb-6">{t('async.step2_subtitle')}</p>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('async.chief_complaint')}</label>
                <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]" placeholder={t('async.complaint_placeholder')} value={complaint} onChange={e => setComplaint(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('async.symptoms_label')}</label>
                <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('async.symptoms_placeholder')} value={symptoms} onChange={e => setSymptoms(e.target.value)} />
              </div>
              <button onClick={handleComplaint} disabled={!complaint.trim()} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors">
                {t('async.next')}
              </button>
            </div>
          </div>
        )}

        {/* Etape 3 - Questionnaire */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('async.step3_title')}</h1>
            <p className="text-gray-500 mb-6">{t('async.step3_subtitle')}</p>
            {loadingQuestions ? (
              <p className="text-gray-400 text-center py-8">{t('async.loading')}</p>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                {questions.map((q, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{q}</label>
                    <input className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('async.answer_placeholder')} value={answers[q] || ''} onChange={e => setAnswers({...answers, [q]: e.target.value})} />
                  </div>
                ))}
                <button onClick={() => setStep(4)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors mt-2">
                  {t('async.next')}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Etape 4 - Confirmation */}
        {step === 4 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('async.step4_title')}</h1>
            <p className="text-gray-500 mb-6">{t('async.step4_subtitle')}</p>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{t('async.specialty')}</span>
                <span className="font-semibold text-gray-900">{specialty}</span>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 mb-1">{t('async.chief_complaint')}</p>
                <p className="text-sm font-medium text-gray-900">{complaint}</p>
              </div>
              {symptoms && (
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-500 mb-1">{t('async.symptoms_label')}</p>
                  <p className="text-sm text-gray-900">{symptoms}</p>
                </div>
              )}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-500 mb-2">{t('async.questionnaire')}</p>
                {Object.entries(answers).filter(([, v]) => v).map(([q, a]) => (
                  <div key={q} className="mb-2">
                    <p className="text-xs text-gray-500">{q}</p>
                    <p className="text-sm font-medium text-gray-900">{a}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleSubmit} disabled={submitting} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-colors text-lg">
              {submitting ? t('async.submitting') : t('async.submit_case')}
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">{t('async.submit_disclaimer')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
