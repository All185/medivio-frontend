'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const SPECIALTIES = [
  'Médecine générale', 'Cardiologie', 'Dermatologie', 'Gynécologie',
  'Neurologie', 'Ophtalmologie', 'Orthopédie', 'Pédiatrie',
  'Psychiatrie', 'Radiologie', 'Rhumatologie', 'Urologie', 'Autre'
];

export default function DemandeAccesPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    specialty: '', rpps: '', cabinet: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/request-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Erreur lors de l\'envoi');
      setStatus('success');
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-3">Demande envoyée !</h2>
          <p className="text-gray-500 mb-8">Nous examinons votre dossier et vous répondrons par email dans les 24h.</p>
          <button onClick={() => router.push('/')} className="text-white font-bold px-8 py-3 rounded-2xl w-full" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={32} height={32} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
      </header>

      <div className="pt-28 pb-16 px-6 flex items-start justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 max-w-lg w-full">
          <div className="text-center mb-8">
            <div className="inline-block text-white text-xs font-bold px-4 py-2 rounded-full mb-4" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}}>
              Accès gratuit — 3 mois
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Demande d'accès</h1>
            <p className="text-gray-500 text-sm">Réservé aux professionnels de santé. Votre demande sera validée sous 24h.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Prénom *</label>
                <input name="first_name" value={form.first_name} onChange={handleChange} required placeholder="Jean"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Nom *</label>
                <input name="last_name" value={form.last_name} onChange={handleChange} required placeholder="Dupont"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Email professionnel *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jean.dupont@cabinet.fr"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Spécialité *</label>
              <select name="specialty" value={form.specialty} onChange={handleChange} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition bg-white">
                <option value="">Sélectionner...</option>
                {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Numéro RPPS *</label>
              <input name="rpps" value={form.rpps} onChange={handleChange} required placeholder="11 chiffres"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition" />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Cabinet / Établissement</label>
              <input name="cabinet" value={form.cabinet} onChange={handleChange} placeholder="Cabinet médical du Centre"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-400 transition" />
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">{errorMsg}</p>
            )}

            <button type="submit" disabled={status === 'loading'}
              className="text-white font-bold px-8 py-4 rounded-2xl text-base transition-all hover:scale-105 disabled:opacity-60 mt-2"
              style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', boxShadow: '0 8px 32px rgba(43,94,248,0.25)'}}>
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              En soumettant ce formulaire, vous acceptez notre{' '}
              <span className="text-blue-500 cursor-pointer" onClick={() => router.push('/privacy')}>politique de confidentialité</span>.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
