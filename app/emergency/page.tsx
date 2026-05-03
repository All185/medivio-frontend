'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Level = 'critical' | 'urgent' | 'standard' | null;

interface Result {
  level: Level;
  recommendation: string;
  call_samu: boolean;
}

export default function EmergencyPage() {
  const [symptoms, setSymptoms] = useState('');
  const [pain, setPain] = useState(5);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const levelConfig = {
    critical: { color: 'bg-red-600', label: 'CRITIQUE', border: 'border-red-600' },
    urgent: { color: 'bg-orange-500', label: 'URGENT', border: 'border-orange-500' },
    standard: { color: 'bg-green-500', label: 'STANDARD', border: 'border-green-500' },
  };

  async function handleSubmit() {
    if (!symptoms.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/emergency/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms, pain_level: pain, patient_id: 'current-user-id' }),
      });
      const data = await res.json();
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Medivio" width={36} height={36} />
          <span className="font-bold text-gray-900 text-lg">Medivio</span>
        </div>
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">Retour au tableau de bord</Link>
      </header>
      <div className="flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Mode Urgence</h1>
            <p className="text-gray-500 mt-1">Decrivez vos symptomes pour etre oriente rapidement.</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            {!result ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Decrivez vos symptomes</label>
                  <textarea className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]" placeholder="Ex: douleur thoracique, essoufflement, vertiges..." value={symptoms} onChange={e => setSymptoms(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Niveau de douleur : <span className="font-bold text-blue-600">{pain}/10</span></label>
                  <input type="range" min={1} max={10} value={pain} onChange={e => setPain(Number(e.target.value))} className="w-full accent-blue-600" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Leger</span>
                    <span>Insupportable</span>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={loading || !symptoms.trim()} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                  {loading ? 'Analyse en cours...' : 'Analyser mon urgence'}
                </button>
                <p className="text-xs text-center text-gray-400">En cas de danger immediat, appelez directement le 15</p>
              </div>
            ) : (
              <div className="space-y-5">
                {result.level && (
                  <div className={`rounded-xl border-2 ${levelConfig[result.level].border} p-5 text-center`}>
                    <div className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold mb-3 ${levelConfig[result.level].color}`}>{levelConfig[result.level].label}</div>
                    <p className="text-gray-700 text-sm">{result.recommendation}</p>
                  </div>
                )}
                {result.call_samu && (
                  <button onClick={() => window.location.href = 'tel:15'} className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg transition-colors">Appeler le SAMU - 15</button>
                )}
                <button onClick={() => setResult(null)} className="w-full border border-gray-300 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">Nouvelle analyse</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
