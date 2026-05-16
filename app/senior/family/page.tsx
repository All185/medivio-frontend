'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface FamilyMember {
  id: string;
  family_email: string;
  family_name: string;
  can_book: boolean;
  can_view_health: boolean;
  created_at: string;
}

export default function SeniorFamilyPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => { fetchFamily(); }, []);

  async function fetchFamily() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/senior/family', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) setMembers(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!name.trim() || !email.trim()) return;
    setAdding(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/senior/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ family_name: name, family_email: email }),
      });
      if (res.ok) {
        setName('');
        setEmail('');
        setShowForm(false);
        fetchFamily();
      }
    } finally {
      setAdding(false);
    }
  }

  async function handleRemove(id: string) {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`/api/senior/family/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (res.ok) fetchFamily();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg hidden sm:block">Medivio</span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-gray-700">
            {t('senior.back')}
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('senior.family_title')}</h1>
            <p className="text-gray-500 mt-1">{t('senior.family_subtitle')}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary px-4 py-2 text-sm">
            + {t('senior.family_add')}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">{t('senior.family_add')}</h2>
            <div className="space-y-3">
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('senior.family_name_placeholder')} value={name} onChange={e => setName(e.target.value)} />
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('senior.family_email_placeholder')} type="email" value={email} onChange={e => setEmail(e.target.value)} />
              <button onClick={handleAdd} disabled={adding || !name || !email} className="btn-primary w-full py-3 text-sm">
                {adding ? t('senior.family_adding') : t('senior.family_add_confirm')}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('senior.loading')}</p>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">👨‍👩‍👧</div>
            <p className="text-gray-500">{t('senior.family_empty')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {members.map(member => (
              <div key={member.id} className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl font-bold text-purple-600">
                    {member.family_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{member.family_name}</p>
                    <p className="text-sm text-gray-500">{member.family_email}</p>
                    <div className="flex gap-2 mt-1">
                      {member.can_book && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{t('senior.family_can_book')}</span>}
                      {member.can_view_health && <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">{t('senior.family_can_view')}</span>}
                    </div>
                  </div>
                </div>
                <button onClick={() => handleRemove(member.id)} className="text-sm text-red-500 hover:text-red-700">
                  {t('senior.family_remove')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
