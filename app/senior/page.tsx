'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

interface Profile {
  autonomy_level: number;
  successful_actions: number;
  interactions_count: number;
}

export default function SeniorPage() {
  const { t, locale } = useLanguage();
const langMap: Record<string, string> = {
  fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
};
const speechLang = langMap[locale] || 'fr-FR';
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    fetchProfile();
    greetUser();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/senior/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setProfile(await res.json());
    } finally {
      setLoading(false);
    }
  }

  function greetUser() {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour < 12) greeting = t('senior.good_morning');
    else if (hour < 18) greeting = t('senior.good_afternoon');
    else greeting = t('senior.good_evening');
    speak(`${greeting}. ${t('senior.how_can_i_help')}`);
  }

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLang;
      utterance.rate = 0.85;
      utterance.pitch = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }

  function startListening() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMessage(t('senior.voice_not_supported'));
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      handleVoiceCommand(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
      speak(t('senior.voice_error'));
    };
    recognitionRef.current = recognition;
    recognition.start();
  }

  async function handleVoiceCommand(transcript: string) {
    await logInteraction('voice_command', true);
    if (transcript.includes('médecin') || transcript.includes('consultation') || transcript.includes('rendez')) {
      speak(t('senior.going_to_appointment'));
      setTimeout(() => router.push('/senior/rdv'), 2000);
    } else if (transcript.includes('médicament') || transcript.includes('ordonnance')) {
      speak(t('senior.going_to_medications'));
      setTimeout(() => router.push('/prescriptions'), 2000);
    } else if (transcript.includes('aide') || transcript.includes('help')) {
      speak(t('senior.help_message'));
    } else {
      speak(t('senior.not_understood'));
    }
  }

  async function logInteraction(action: string, success: boolean) {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/senior/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ action, success }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.leveled_up) {
          speak(t('senior.level_up'));
          setProfile(prev => prev ? { ...prev, autonomy_level: data.level } : prev);
        }
      }
    } catch {}
  }

  async function handleAction(action: string, path: string, voiceText: string) {
    await logInteraction(action, true);
    speak(voiceText);
    setTimeout(() => router.push(path), 1500);
  }

  const level = profile?.autonomy_level || 1;

  const levelConfig = {
    1: {
      buttons: [
        { icon: '👨‍⚕️', label: t('senior.see_doctor'), action: 'rdv', path: '/senior/rdv', voice: t('senior.going_to_appointment'), color: 'bg-blue-600 hover:bg-blue-700' },
        { icon: '💊', label: t('senior.my_medications'), action: 'medications', path: '/prescriptions', voice: t('senior.going_to_medications'), color: 'bg-green-600 hover:bg-green-700' },
        { icon: '🆘', label: t('senior.help'), action: 'help', path: '/emergency', voice: t('senior.help_message'), color: 'bg-red-600 hover:bg-red-700' },
      ],
      fontSize: 'text-3xl',
      iconSize: 'text-6xl',
      padding: 'p-10',
    },
    2: {
      buttons: [
        { icon: '👨‍⚕️', label: t('senior.see_doctor'), action: 'rdv', path: '/senior/rdv', voice: t('senior.going_to_appointment'), color: 'bg-blue-600 hover:bg-blue-700' },
        { icon: '💊', label: t('senior.my_medications'), action: 'medications', path: '/prescriptions', voice: t('senior.going_to_medications'), color: 'bg-green-600 hover:bg-green-700' },
        { icon: '🧾', label: t('senior.my_invoices'), action: 'billing', path: '/billing', voice: t('senior.going_to_billing'), color: 'bg-yellow-500 hover:bg-yellow-600' },
        { icon: '🆘', label: t('senior.help'), action: 'help', path: '/emergency', voice: t('senior.help_message'), color: 'bg-red-600 hover:bg-red-700' },
        { icon: '👨‍👩‍👧', label: t('senior.family'), action: 'family', path: '/senior/family', voice: t('senior.going_to_family'), color: 'bg-purple-600 hover:bg-purple-700' },
      ],
      fontSize: 'text-2xl',
      iconSize: 'text-5xl',
      padding: 'p-8',
    },
    3: {
      buttons: [
        { icon: '👨‍⚕️', label: t('senior.see_doctor'), action: 'rdv', path: '/appointments/new', voice: t('senior.going_to_appointment'), color: 'bg-blue-600 hover:bg-blue-700' },
        { icon: '💊', label: t('senior.my_medications'), action: 'medications', path: '/prescriptions', voice: t('senior.going_to_medications'), color: 'bg-green-600 hover:bg-green-700' },
        { icon: '🧾', label: t('senior.my_invoices'), action: 'billing', path: '/billing', voice: t('senior.going_to_billing'), color: 'bg-yellow-500 hover:bg-yellow-600' },
        { icon: '🆘', label: t('senior.help'), action: 'help', path: '/emergency', voice: t('senior.help_message'), color: 'bg-red-600 hover:bg-red-700' },
        { icon: '👨‍👩‍👧', label: t('senior.family'), action: 'family', path: '/senior/family', voice: t('senior.going_to_family'), color: 'bg-purple-600 hover:bg-purple-700' },
        { icon: '📊', label: t('senior.dashboard'), action: 'dashboard', path: '/dashboard', voice: t('senior.going_to_dashboard'), color: 'bg-gray-600 hover:bg-gray-700' },
      ],
      fontSize: 'text-xl',
      iconSize: 'text-4xl',
      padding: 'p-6',
    },
  };

  const config = levelConfig[level as keyof typeof levelConfig];

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={40} height={40} />
          <span className="font-bold text-gray-900 text-xl hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{t('senior.level')} {level}/3</span>
          <div className="flex gap-1">
            {[1,2,3].map(l => (
              <div key={l} className={`w-3 h-3 rounded-full ${l <= level ? 'bg-blue-600' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        {speaking && (
          <div className="mb-6 bg-blue-100 border border-blue-300 rounded-2xl px-6 py-3 flex items-center gap-3">
            <span className="text-2xl animate-pulse">🔊</span>
            <span className="text-blue-700 font-medium">{t('senior.speaking')}</span>
          </div>
        )}

        {listening && (
          <div className="mb-6 bg-green-100 border border-green-300 rounded-2xl px-6 py-3 flex items-center gap-3">
            <span className="text-2xl animate-pulse">🎤</span>
            <span className="text-green-700 font-medium">{t('senior.listening')}</span>
          </div>
        )}

        <div className={`grid ${level === 1 ? 'grid-cols-1' : level === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-6 w-full max-w-2xl mb-8`}>
          {config.buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => handleAction(btn.action, btn.path, btn.voice)}
              className={`${btn.color} ${config.padding} rounded-3xl text-white flex flex-col items-center gap-4 transition-transform active:scale-95 shadow-lg`}
            >
              <span className={config.iconSize}>{btn.icon}</span>
              <span className={`${config.fontSize} font-bold text-center leading-tight`}>{btn.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={startListening}
          disabled={listening || speaking}
          className="bg-white border-4 border-blue-600 text-blue-600 font-bold text-xl px-10 py-5 rounded-full shadow-lg hover:bg-blue-50 disabled:opacity-50 transition-all flex items-center gap-3"
        >
          <span className="text-3xl">{listening ? '🎤' : '🎙️'}</span>
          {listening ? t('senior.listening') : t('senior.speak_to_me')}
        </button>

        {message && (
          <p className="mt-4 text-gray-600 text-lg text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
