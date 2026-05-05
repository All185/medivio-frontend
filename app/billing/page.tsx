'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

export default function PatientBillingPage() {
  const { t, locale } = useLanguage();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const localeMap: Record<string, string> = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', pt: 'pt-BR', ar: 'ar-SA',
  };
  const dateLocale = localeMap[locale] || 'fr-FR';

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
      if (res.ok) setInvoices(await res.json());
    } finally {
      setLoading(false);
    }
  }

  async function handlePay(invoiceId: string) {
    const token = localStorage.getItem('access_token');
    const res = await fetch(`/api/billing/pay/${invoiceId}`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (res.ok) fetchInvoices();
  }

  function downloadInvoice(invoice: Invoice) {
    const content = `
MEDIVIO - FACTURE
=================
Numero : ${invoice.invoice_number}
Date : ${new Date(invoice.created_at).toLocaleDateString(dateLocale)}
Description : ${invoice.description}

Montant HT : ${invoice.amount.toFixed(2)} ${invoice.currency}
Remise fidelite : -${invoice.discount.toFixed(2)} ${invoice.currency}
TOTAL : ${invoice.total.toFixed(2)} ${invoice.currency}

Statut : ${statusConfig[invoice.status]?.label}
${invoice.paid_at ? `Paye le : ${new Date(invoice.paid_at).toLocaleDateString(dateLocale)}` : ''}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoice_number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
          <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">{t('billing.back')}</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
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
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${statusConfig[invoice.status]?.color}`}>
                        {statusConfig[invoice.status]?.label}
                      </span>
                      <span className="text-xs text-gray-400">{invoice.invoice_number}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{invoice.description}</p>
                    <p className="text-xs text-gray-400">{new Date(invoice.created_at).toLocaleDateString(dateLocale)}</p>
                    <div className="mt-3 space-y-1">
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
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => downloadInvoice(invoice)} className="flex-1 border border-gray-300 py-2 rounded-xl text-sm text-gray-600 hover:bg-white transition-colors">
                    {t('billing.download')}
                  </button>
                  {invoice.status === 'pending' && (
                    <button onClick={() => handlePay(invoice.id)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-sm font-semibold transition-colors">
                      {t('billing.pay')}
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
