'use client';
import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useSearchParams } from 'next/navigation';

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

interface Estimate {
  am_reimbursement: number;
  patient_share: number;
  am_rate: number;
}

function BillingContent() {
  const { t, locale } = useLanguage();
  const searchParams = useSearchParams();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [estimates, setEstimates] = useState<Record<string, Estimate>>({});
  const [paying, setPaying] = useState<string | null>(null);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

  const success = searchParams.get('success');
  const cancelled = searchParams.get('cancelled');

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    pending: { color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200', label: t('billing.status_pending') },
    paid: { color: 'text-green-600', bg: 'bg-green-50 border-green-200', label: t('billing.status_paid') },
    cancelled: { color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200', label: t('billing.status_cancelled') },
  };

  useEffect(() => { fetchInvoices(); }, []);

  async function fetchInvoices() {
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch('/api/billing/patient', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data);
        fetchEstimates(data, token!);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchEstimates(data: Invoice[], token: string) {
    const est: Record<string, Estimate> = {};
    for (const invoice of data) {
      const res = await fetch(`/api/billing/estimate/${invoice.total}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) est[invoice.id] = await res.json();
    }
    setEstimates(est);
  }

  async function handlePay(invoiceId: string) {
    setPaying(invoiceId);
    try {
      const token = localStorage.getItem('access_token');
      const res = await fetch(`/api/billing/create-checkout/${invoiceId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        window.location.href = data.checkout_url;
      }
    } finally {
      setPaying(null);
    }
  }

  function downloadReceipt(invoice: Invoice) {
    const estimate = estimates[invoice.id];
    const content = `
MEDIVIO - RECU DE PAIEMENT
===========================
Numero : ${invoice.invoice_number}
Date : ${new Date(invoice.created_at).toLocaleDateString(dateLocale)}
Description : ${invoice.description}

Montant HT : ${invoice.amount.toFixed(2)} ${invoice.currency}
${invoice.discount > 0 ? `Remise fidelite : -${invoice.discount.toFixed(2)} ${invoice.currency}` : ''}
TOTAL TTC : ${invoice.total.toFixed(2)} ${invoice.currency}

--- ESTIMATION REMBOURSEMENT ---
Assurance Maladie (${estimate?.am_rate || 70}%) : ${estimate?.am_reimbursement?.toFixed(2) || '0.00'} ${invoice.currency}
Reste à charge estimé : ${estimate?.patient_share?.toFixed(2) || invoice.total.toFixed(2)} ${invoice.currency}

Statut : ${statusConfig[invoice.status]?.label}
${invoice.paid_at ? `Paye le : ${new Date(invoice.paid_at).toLocaleDateString(dateLocale)}` : ''}

Ce recu peut etre transmis a votre mutuelle pour remboursement complementaire.
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recu-${invoice.invoice_number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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

      <div className="max-w-2xl mx-auto px-4 py-12">
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-center">
            <p className="text-green-700 font-semibold">✅ Paiement effectue avec succes !</p>
          </div>
        )}
        {cancelled && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-center">
            <p className="text-red-700 font-semibold">❌ Paiement annule.</p>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('billing.my_invoices')}</h1>
          <p className="text-gray-500 mt-1">{t('billing.my_invoices_subtitle')}</p>
        </div>

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
              <div key={invoice.id} className={`rounded-2xl border-2 p-6 ${statusConfig[invoice.status]?.bg}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusConfig[invoice.status]?.color}`}>
                    {statusConfig[invoice.status]?.label}
                  </span>
                  <span className="text-xs text-gray-400">{invoice.invoice_number}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 mb-1">{invoice.description}</p>
                <p className="text-xs text-gray-400 mb-4">{new Date(invoice.created_at).toLocaleDateString(dateLocale)}</p>

                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{t('billing.amount')}</span>
                    <span>{invoice.amount.toFixed(2)} {invoice.currency}</span>
                  </div>
                  {invoice.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>{t('billing.discount')}</span>
                      <span>-{invoice.discount.toFixed(2)} {invoice.currency}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-1">
                    <span>{t('billing.total')}</span>
                    <span>{invoice.total.toFixed(2)} {invoice.currency}</span>
                  </div>
                </div>

                {/* Estimation remboursement */}
                {estimates[invoice.id] && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-blue-700 mb-2">📋 {t('billing.reimbursement_estimate')}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-blue-700">
                        <span>{t('billing.am_reimbursement')} ({estimates[invoice.id].am_rate}%)</span>
                        <span>~{estimates[invoice.id].am_reimbursement.toFixed(2)} {invoice.currency}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-blue-900">
                        <span>{t('billing.patient_share')}</span>
                        <span>~{estimates[invoice.id].patient_share.toFixed(2)} {invoice.currency}</span>
                      </div>
                    </div>
                    <p className="text-xs text-blue-500 mt-2">{t('billing.estimate_disclaimer')}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <button onClick={() => downloadReceipt(invoice)} className="flex-1 border border-gray-300 py-2 rounded-xl text-sm text-gray-600 hover:bg-white transition-colors">
                    {t('billing.download')}
                  </button>
                  {invoice.status === 'pending' && (
                    <button onClick={() => handlePay(invoice.id)} disabled={paying === invoice.id} className="btn-primary flex-1 py-2 text-sm">
                      {paying === invoice.id ? t('billing.redirecting') : t('billing.pay')}
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

export default function PatientBillingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-gray-400">Chargement...</p></div>}>
      <BillingContent />
    </Suspense>
  );
}
