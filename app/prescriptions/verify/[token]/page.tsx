'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

interface PrescriptionItem {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface Prescription {
  id: string;
  token: string;
  status: string;
  notes: string;
  created_at: string;
  expires_at: string;
  prescription_items: PrescriptionItem[];
}

export default function VerifyPrescriptionPage() {
  const { token } = useParams();
  const [prescription, setPrescription] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dispensing, setDispensing] = useState(false);
  const [dispensed, setDispensed] = useState(false);

  useEffect(() => {
    fetchPrescription();
  }, [token]);

  async function fetchPrescription() {
    try {
      const res = await fetch(`/api/prescriptions/verify/${token}`);
      if (res.ok) {
        const data = await res.json();
        if (data.error) {
          setError(true);
        } else {
          setPrescription(data);
        }
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDispense() {
    setDispensing(true);
    try {
      const res = await fetch(`/api/prescriptions/dispense/${token}`, {
        method: 'PATCH',
      });
      if (res.ok) setDispensed(true);
    } finally {
      setDispensing(false);
    }
  }

  const statusConfig: Record<string, { color: string; label: string; bg: string }> = {
    active: { color: 'text-green-700', label: 'Active', bg: 'bg-green-50 border-green-200' },
    dispensed: { color: 'text-blue-700', label: 'Dispensée', bg: 'bg-blue-50 border-blue-200' },
    expired: { color: 'text-gray-500', label: 'Expiree', bg: 'bg-gray-50 border-gray-200' },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <span className="text-sm text-gray-500">Verification ordonnance</span>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {loading ? (
          <p className="text-gray-400 text-center py-12">Verification en cours...</p>
        ) : error ? (
          <div className="bg-white rounded-2xl border border-red-200 p-12 text-center">
            <div className="text-5xl mb-4">❌</div>
            <h2 className="text-xl font-bold text-red-600 mb-2">Ordonnance invalide</h2>
            <p className="text-gray-500">Cette ordonnance est introuvable ou a expire.</p>
          </div>
        ) : prescription ? (
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Verification ordonnance</h1>
              <p className="text-gray-500 mt-1">Scannee le {new Date(prescription.created_at).toLocaleDateString('fr-FR')}</p>
            </div>

            <div className={`rounded-2xl border-2 p-6 ${statusConfig[prescription.status]?.bg}`}>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-lg font-bold ${statusConfig[prescription.status]?.color}`}>
                  Statut : {statusConfig[dispensed ? 'dispensed' : prescription.status]?.label}
                </span>
                <span className="text-sm text-gray-500">
                  Expire le {new Date(prescription.expires_at).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <div className="space-y-3">
                {prescription.prescription_items.map(item => (
                  <div key={item.id} className="bg-white rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-gray-900">{item.medication}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.dosage} - {item.frequency} - {item.duration}</p>
                    {item.instructions && <p className="text-xs text-gray-400 mt-1">{item.instructions}</p>}
                  </div>
                ))}
              </div>

              {prescription.notes && (
                <div className="bg-white rounded-xl p-4 border border-gray-100 mt-3">
                  <p className="text-sm text-gray-600">{prescription.notes}</p>
                </div>
              )}
            </div>

            {!dispensed && prescription.status === 'active' && (
              <button
                onClick={handleDispense}
                disabled={dispensing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition-colors text-lg"
              >
                {dispensing ? 'Traitement...' : 'Marquer comme dispensee'}
              </button>
            )}

            {(dispensed || prescription.status === 'dispensed') && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">✅</div>
                <p className="font-bold text-green-700">Ordonnance dispensee avec succes</p>
              </div>
            )}

            {prescription.status === 'expired' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">⚠️</div>
                <p className="font-bold text-red-700">Cette ordonnance a expire</p>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
