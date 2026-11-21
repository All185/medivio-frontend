'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export interface Medicament {
  codeCis: string
  denomination: string
  formePharmaceutique: string
  voiesAdministration?: string
  etatCommercialisation?: string
  titulaire?: string
  surveillanceRenforcee?: string
}

interface MedicamentSearchProps {
  value: string
  onChange: (value: string, medicament?: Medicament) => void
  placeholder?: string
  className?: string
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

export default function MedicamentSearch({
  value,
  onChange,
  placeholder = 'Rechercher un médicament…',
  className = '',
}: MedicamentSearchProps) {
  const [query, setQuery] = useState(value)
  const [results, setResults] = useState<Medicament[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Medicament | null>(null)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [showRCP, setShowRCP] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const debouncedQuery = useDebounce(query, 300)

  // Fermer le dropdown si clic en dehors
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Recherche BDPM
  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setResults([])
      setOpen(false)
      return
    }
    if (selected && debouncedQuery === selected.denomination) return

    const controller = new AbortController()
    setLoading(true)

    fetch(`/api/bdpm/v1/medicaments?search=${encodeURIComponent(debouncedQuery)}&pageSize=8`, {
      signal: controller.signal,
    })
      .then(r => r.json())
      .then(data => {
        // L'API renvoie { data: [...] } ou directement un tableau
        const list: Medicament[] = Array.isArray(data) ? data : (data?.data ?? data?.medicaments ?? [])
        setResults(list)
        setOpen(list.length > 0)
        setActiveIdx(-1)
      })
      .catch(() => {/* AbortError ou réseau — silencieux */})
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debouncedQuery, selected])

  function selectMedicament(med: Medicament) {
    setSelected(med)
    setQuery(med.denomination)
    setOpen(false)
    onChange(med.denomination, med)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setQuery(v)
    setSelected(null)
    onChange(v)
    if (v.length < 3) setOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      selectMedicament(results[activeIdx])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full border border-gray-300 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        />
        {loading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : query.length >= 3 && !selected ? (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7 7 0 1 0 6.65 6.65a7 7 0 0 0 9.9 9.9z" />
          </svg>
        ) : selected ? (
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : null}
      </div>

      {/* Dropdown résultats */}
      {open && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-72 overflow-y-auto">
          {results.map((med, idx) => (
            <li
              key={med.codeCis ?? idx}
              onMouseDown={() => selectMedicament(med)}
              className={`px-4 py-3 cursor-pointer border-b border-gray-50 last:border-0 ${
                idx === activeIdx ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-semibold text-gray-900 leading-tight">{med.denomination}</p>
              <p className="text-xs text-gray-400 mt-0.5">{med.formePharmaceutique}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Badges médicament sélectionné */}
      {selected && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {selected.formePharmaceutique && (
            <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-full font-medium">
              {selected.formePharmaceutique}
            </span>
          )}
          {selected.voiesAdministration && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {selected.voiesAdministration}
            </span>
          )}
          {selected.surveillanceRenforcee === 'Oui' && (
            <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
              ⚠ Surveillance renforcée
            </span>
          )}
          <button
            type="button"
            onClick={() => setShowRCP(true)}
            className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 font-medium ml-auto"
          >
            Voir la fiche RCP
          </button>
        </div>
      )}

      {/* Modal RCP */}
      {showRCP && selected && (
        <RCPModal codeCis={selected.codeCis} denomination={selected.denomination} onClose={() => setShowRCP(false)} />
      )}
    </div>
  )
}

/* ─── Modal RCP inline ─── */

interface RCPSection {
  titre?: string
  intitule?: string
  contenu?: string
  texte?: string
  [key: string]: unknown
}

function RCPModal({ codeCis, denomination, onClose }: { codeCis: string; denomination: string; onClose: () => void }) {
  const [sections, setSections] = useState<RCPSection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(0)

  useEffect(() => {
    fetch(`/api/bdpm/v1/medicaments/${codeCis}/rcp`)
      .then(r => r.json())
      .then(data => {
        // L'API renvoie { sections: [...] } ou un tableau
        const s: RCPSection[] = Array.isArray(data) ? data : (data?.sections ?? data?.rcp ?? [])
        setSections(s)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [codeCis])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-100">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Fiche RCP — BDPM ANSM</div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">{denomination}</h2>
            <p className="text-xs text-gray-400 mt-0.5">CIS {codeCis}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Corps */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center py-8">
              Fiche indisponible pour ce médicament.
            </p>
          )}
          {!loading && !error && sections.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-8">Aucune information RCP disponible.</p>
          )}
          {!loading && !error && sections.length > 0 && (
            <div className="space-y-2">
              {sections.map((section, idx) => {
                const title = section.titre ?? section.intitule ?? `Section ${idx + 1}`
                const content = section.contenu ?? section.texte ?? ''
                return (
                  <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenSection(openSection === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-semibold text-gray-800">{title}</span>
                      <svg
                        className={`w-4 h-4 text-gray-400 transition-transform ${openSection === idx ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openSection === idx && content && (
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3 whitespace-pre-wrap">
                        {content}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 text-xs text-gray-400 text-center">
          Source : Base de Données Publique des Médicaments — ANSM • Données non contractuelles, usage professionnel uniquement
        </div>
      </div>
    </div>
  )
}
