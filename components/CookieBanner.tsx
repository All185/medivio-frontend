'use client';
import { useState, useEffect } from 'react';

const COOKIE_KEY = 'medivio_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_KEY);
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(COOKIE_KEY, 'accepted'); } catch {}
    setVisible(false);
  };

  const refuse = () => {
    try { localStorage.setItem(COOKIE_KEY, 'refused'); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex-1">
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">Médivio utilise des cookies</span> strictement nécessaires au bon fonctionnement du service. Aucune donnée n&rsquo;est transmise à des tiers à des fins publicitaires.{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Politique de confidentialité</a>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={refuse}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800 px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-400 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="text-sm font-bold text-white px-5 py-2 rounded-xl transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #009E88, #2B5EF8)' }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
