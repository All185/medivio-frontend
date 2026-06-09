'use client';
import { useState, useEffect, useRef } from 'react';

interface Patient {
  id: string;
  full_name: string;
  email: string;
}

interface PatientSearchProps {
  onSelect: (patient: Patient) => void;
  placeholder?: string;
}

export default function PatientSearch({ onSelect, placeholder = "Rechercher un patient..." }: PatientSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selected, setSelected] = useState<Patient | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`/api/auth/patients/search?q=${encodeURIComponent(query)}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setShowResults(true);
        }
      } finally {
        setLoading(false);
      }
    }, 300);
  }, [query]);

  function handleSelect(patient: Patient) {
    setSelected(patient);
    setQuery(patient.full_name || patient.email);
    setShowResults(false);
    onSelect(patient);
  }

  function handleClear() {
    setSelected(null);
    setQuery('');
    setResults([]);
    setShowResults(false);
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          placeholder={placeholder}
          value={query}
          onChange={e => { setQuery(e.target.value); setSelected(null); }}
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        {loading && (
          <span className="absolute right-3 top-3 text-gray-400 text-xs">⏳</span>
        )}
        {selected && (
          <button onClick={handleClear} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm">✕</button>
        )}
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
          {results.map(patient => (
            <button
              key={patient.id}
              onClick={() => handleSelect(patient)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0 transition-colors"
            >
              <p className="text-sm font-medium text-gray-900">{patient.full_name || 'Sans nom'}</p>
              <p className="text-xs text-gray-400">{patient.email}</p>
            </button>
          ))}
        </div>
      )}

      {showResults && results.length === 0 && !loading && query.length >= 2 && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-1 px-4 py-3">
          <p className="text-sm text-gray-400">Aucun patient trouvé</p>
        </div>
      )}
    </div>
  );
}
