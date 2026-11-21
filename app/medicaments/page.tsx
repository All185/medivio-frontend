'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import MedicamentSearch, { type Medicament } from '@/components/MedicamentSearch'

export default function MedicamentsPage() {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState<Medicament | null>(null)
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null)
  const [rcpSections, setRcpSections] = useState<{ titre?: string; intitule?: string; contenu?: string; texte?: string }[]>([])
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(0)
  const [tab, setTab] = useState<'rcp' | 'notice'>('rcp')

  async function loadMedicament(med: Medicament) {
    setSelected(med)
    setLoadingDetail(true)
    setRcpSections([])
    setDetail(null)
    setOpenSection(0)

    try {
      const [detailRes, rcpRes] = await Promise.all([
        fetch(`/api/bdpm/v1/medicaments/${med.codeCis}`).then(r => r.json()),
        fetch(`/api/bdpm/v1/medicaments/${med.codeCis}/rcp`).then(r => r.json()),
      ])
      setDetail(detailRes)
      const sections = Array.isArray(rcpRes) ? rcpRes : (rcpRes?.sections ?? rcpRes?.rcp ?? [])
      setRcpSections(sections)
    } catch {
      // silencieux
    } finally {
      setLoadingDetail(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/dashboard')} className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Medivio" width={32} height={32} />
            <div>
              <span className="font-bold text-gray-900 text-sm">Dictionnaire médicaments</span>
              <span className="ml-2 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">BDPM · ANSM</span>
            </div>
          </div>
        </div>
        <LanguageSwitcher />
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Barre de recherche */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Rechercher un médicament</label>
          <MedicamentSearch
            value={searchValue}
            onChange={(val, med) => {
              setSearchValue(val)
              if (med) loadMedicament(med)
            }}
            placeholder="Nom de spécialité, DCI… (min. 3 caractères)"
          />
          <p className="text-xs text-gray-400 mt-3">
            Base de Données Publique des Médicaments — données ANSM, mises à jour 2×/jour
          </p>
        </div>

        {/* Fiche médicament */}
        {selected && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            {/* En-tête fiche */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">{selected.denomination}</h2>
                  <p className="text-sm text-gray-500 mt-1">{selected.formePharmaceutique}</p>
                </div>
                <span className="flex-shrink-0 text-xs font-mono bg-gray-100 text-gray-500 px-3 py-1 rounded-lg">
                  CIS {selected.codeCis}
                </span>
              </div>

              {/* Métadonnées */}
              {detail && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selected.voiesAdministration && (
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full">
                      {selected.voiesAdministration}
                    </span>
                  )}
                  {selected.etatCommercialisation && (
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${
                      selected.etatCommercialisation.includes('commercialisé')
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {selected.etatCommercialisation}
                    </span>
                  )}
                  {selected.surveillanceRenforcee === 'Oui' && (
                    <span className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full font-medium">
                      ⚠ Surveillance renforcée
                    </span>
                  )}
                  {selected.titulaire && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                      {selected.titulaire}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Tabs RCP / Notice */}
            <div className="flex border-b border-gray-100 px-6">
              <button
                onClick={() => setTab('rcp')}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  tab === 'rcp'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Résumé des caractéristiques (RCP)
              </button>
              <button
                onClick={() => {
                  setTab('notice')
                }}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  tab === 'notice'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Notice patient
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6">
              {loadingDetail && (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              {!loadingDetail && tab === 'rcp' && (
                <>
                  {rcpSections.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">Fiche RCP non disponible pour ce médicament.</p>
                  ) : (
                    <div className="space-y-2">
                      {rcpSections.map((section, idx) => {
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
                                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${openSection === idx ? 'rotate-180' : ''}`}
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
                </>
              )}

              {!loadingDetail && tab === 'notice' && (
                <NoticePatient codeCis={selected.codeCis} />
              )}
            </div>

            {/* Footer source */}
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 text-center">
              Source : ANSM — Base de Données Publique des Médicaments • Données non contractuelles, usage professionnel uniquement
            </div>
          </div>
        )}

        {/* État initial — aucune recherche */}
        {!selected && (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm">Recherchez un médicament pour afficher sa fiche</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Notice patient (chargée à la demande) ─── */
function NoticePatient({ codeCis }: { codeCis: string }) {
  const [sections, setSections] = useState<{ titre?: string; intitule?: string; contenu?: string; texte?: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(0)

  useEffect(() => {
    setLoading(true)
    setError(false)
    fetch(`/api/bdpm/v1/medicaments/${codeCis}/notice`)
      .then(r => r.json())
      .then(data => {
        const s = Array.isArray(data) ? data : (data?.sections ?? data?.notice ?? [])
        setSections(s)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [codeCis])

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (error || sections.length === 0) return (
    <p className="text-sm text-gray-500 text-center py-8">Notice patient non disponible.</p>
  )

  return (
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
              <svg className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${openSection === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  )
}
