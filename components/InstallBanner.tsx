'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function InstallBanner() {
  const [visible, setVisible] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('install-banner-dismissed');
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (!dismissed && isIOS && !isStandalone) setVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem('install-banner-dismissed', '1');
    setVisible(false);
    setShowGuide(false);
  };

  if (!visible) return null;

  return (
    <>
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-6" onClick={() => setShowGuide(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="font-extrabold text-gray-900 text-lg mb-4">Installer Medivio</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{background:'linear-gradient(135deg,#009E88,#2B5EF8)'}}>1</div>
                <p className="font-semibold text-gray-800 text-sm">Appuie sur le bouton Partager en bas de Safari</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{background:'linear-gradient(135deg,#009E88,#2B5EF8)'}}>2</div>
                <p className="font-semibold text-gray-800 text-sm">Selectionne Sur l'ecran d'accueil</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{background:'linear-gradient(135deg,#009E88,#2B5EF8)'}}>3</div>
                <p className="font-semibold text-gray-800 text-sm">Appuie sur Ajouter</p>
              </div>
            </div>
            <button onClick={() => setShowGuide(false)} className="mt-6 w-full py-3 rounded-xl text-white font-bold text-sm" style={{background:'linear-gradient(135deg,#009E88,#2B5EF8)'}}>Compris</button>
          </div>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
        <div className="rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl" style={{background:'linear-gradient(135deg,#009E88,#2B5EF8)'}}>
          <Image src="/logo.png" alt="Medivio" width={36} height={36} className="rounded-xl shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight">Installer Medivio</p>
            <p className="text-white/75 text-xs leading-tight">Acces rapide depuis ton ecran d'accueil</p>
          </div>
          <button onClick={() => setShowGuide(true)} className="bg-white text-xs font-bold px-3 py-2 rounded-xl shrink-0" style={{color:'#2B5EF8'}}>Comment installer</button>
          <button onClick={dismiss} className="text-white/80 ml-1 shrink-0">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
      </div>
    </>
  );
}
