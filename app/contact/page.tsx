'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState } from 'react';

export default function ContactPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', organization: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.png" alt="Medivio" width={32} height={32} style={{ objectFit: 'contain' }} />
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
        </div>
      </header>

      <section className="pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden" style={{background: 'linear-gradient(160deg, #EEF2FF 0%, #F0FAFA 50%, #ffffff 100%)'}}>
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full opacity-20 blur-3xl" style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)'}} />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 text-blue-700 text-xs font-bold px-4 py-2 rounded-full mb-6 bg-blue-50 border border-blue-100">
            {t('contact_page.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            {t('contact_page.title')}<br />
            <span style={{background: 'linear-gradient(135deg, #009E88, #2B5EF8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{t('contact_page.highlight')}</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10">{t('contact_page.desc')}</p>

          {status === 'success' ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <h2 className="font-bold text-green-800 text-xl mb-2">{t('contact_page.success_title')}</h2>
              <p className="text-green-600">{t('contact_page.success_desc')}</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-blue-600 font-semibold">
                {t('contact_page.send_another')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact_page.name')} *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder={t('contact_page.placeholder_name')}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact_page.email')} *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                    placeholder={t('contact_page.placeholder_email')}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact_page.org')} <span className="text-gray-400 font-normal">{t('contact_page.org_optional')}</span></label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={e => setForm({...form, organization: e.target.value})}
                  placeholder={t('contact_page.placeholder_org')}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t('contact_page.message')} *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  placeholder={t('contact_page.placeholder_message')}
                  className="input-field resize-none"
                />
              </div>
              {status === 'error' && (
                <p className="text-red-500 text-sm">{t('contact_page.error')}</p>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full text-white font-bold py-4 rounded-2xl text-lg transition-all hover:scale-105 bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? t('contact_page.sending') : t('contact_page.submit')}
              </button>
              <p className="text-xs text-gray-400 text-center">
                {t('contact_page.privacy_text')} <button onClick={() => router.push('/privacy')} className="underline">{t('contact_page.privacy')}</button>.
              </p>
            </form>
          )}
        </div>
      </section>

      <footer className="py-6 px-6 bg-gray-900 text-center">
        <p className="text-gray-400 text-sm">© 2026 Medivio. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
