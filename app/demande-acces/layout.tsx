import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demande d\'accès',
  description: 'Rejoignez Medivio en avant-première. Remplissez votre demande d'accès avec votre numéro RPPS et commencez à consulter en télémédecine.',
  openGraph: {
    title: 'Demande d\'accès — Medivio',
    description: 'Accès réservé aux professionnels de santé. Remplissez votre demande avec votre numéro RPPS.',
    url: 'https://medivio.care/demande-acces',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function DemandeAccesLayout({ children }: { children: React.ReactNode }) {
  return children
}
