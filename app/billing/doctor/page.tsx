'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  discount: number;
  total: number;
  currency: string;
  status: string;
  description: string;
  created_at: string;
  paid_at: string | null;
}

interface Stats {
  total_revenue: number;
  pending_amount: number;
  total_invoices: number;
  paid_invoices: number;
  monthly_revenue: number;
}

export default function DoctorBillingPage() {
  const { t, locale } = useLanguage();
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    pending: { color: 'text-orange-600', bg: 'bg-orange-50', label: t('billing.status_pending') },
    paid: { color: 'text-green-600', bg: 'bg-green-50', label: t('billing.status_paid') },
    cancelled: { color: 'text-gray-500', bg: 'bg-gray-50', label: t('billing.status_cancelled') },
  };

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem('access_token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const [invRes, statsRes] = await Promise.all([
        fetch('/api/billing/doctor', { headers }),
        fetch('/api/billing/stats', { headers }),
      ]);
      if (invRes.ok) setInvoices(await invRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!patientId.trim() || !amount || !description.trim()) return;
    setCreating(true);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/billing/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ patient_id: patientId, amount: parseFloat(amount), description }),
      });
      if (res.ok) {
        setShowForm(false);
        setPatientId('');
        setAmount('');
        setDescription('');
        fetchData();
      }
    } finally {
      setCreating(false);
    }
  }

  async function handleCancel(invoiceId: string) {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`/api/billing/cancel/${invoiceId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (res.ok) fetchData();
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('billing.back')}</Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('billing.doctor_title')}</h1>
            <p className="text-gray-500 mt-1">{t('billing.doctor_subtitle')}</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary-doctor px-4 py-2 text-sm">
            + {t('billing.new_invoice')}
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: t('billing.total_revenue'), value: `${stats.total_revenue.toFixed(2)} EUR`, color: 'text-green-600' },
              { label: t('billing.monthly_revenue'), value: `${stats.monthly_revenue.toFixed(2)} EUR`, color: 'text-blue-600' },
              { label: t('billing.pending_amount'), value: `${stats.pending_amount.toFixed(2)} EUR`, color: 'text-orange-600' },
              { label: t('billing.total_invoices'), value: `${stats.paid_invoices}/${stats.total_invoices}`, color: 'text-gray-700' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire création */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="font-bold text-gray-900 mb-4">{t('billing.new_invoice')}</h2>
            <div className="space-y-3">
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('billing.patient_id_placeholder')} value={patientId} onChange={e => setPatientId(e.target.value)} />
              <input type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('billing.amount_placeholder')} value={amount} onChange={e => setAmount(e.target.value)} />
              <input className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={t('billing.description_placeholder')} value={description} onChange={e => setDescription(e.target.value)} />
              <button onClick={handleCreate} disabled={creating || !patientId || !amount || !description} className="btn-primary-doctor w-full py-3 text-sm">
                {creating ? t('billing.creating') : t('billing.create')}
              </button>
            </div>
          </div>
        )}

        {/* Liste factures */}
        {loading ? (
          <p className="text-gray-400 text-center py-12">{t('billing.loading')}</p>
        ) : invoices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">🧾</div>
            <p className="text-gray-500">{t('billing.no_invoices')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map(invoice => (
              <div key={invoice.id} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusConfig[invoice.status]?.bg} ${statusConfig[invoice.status]?.color}`}>
                        {statusConfig[invoice.status]?.label}
                      </span>
                      <span className="text-xs text-gray-400">{invoice.invoice_number}</span>
                      <span className="text-xs text-gray-400">{new Date(invoice.created_at).toLocaleDateString(dateLocale)}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{invoice.description}</p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-500">{t('billing.amount')} : {invoice.amount.toFixed(2)} {invoice.currency}</span>
                      {invoice.discount > 0 && <span className="text-green-600">-{invoice.discount.toFixed(2)} {invoice.currency}</span>}
                      <span className="font-bold text-gray-900">{t('billing.total')} : {invoice.total.toFixed(2)} {invoice.currency}</span>
                    </div>
                  </div>
                  {invoice.status === 'pending' && (
                    <button onClick={() => handleCancel(invoice.id)} className="text-xs text-red-500 hover:text-red-700 whitespace-nowrap">
                      {t('billing.cancel')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
