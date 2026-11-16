import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions générales d\'utilisation',
  description: 'Conditions générales d\'utilisation de la plateforme Medivio.',
  robots: { index: false, follow: false },
}

export default function CguLayout({ children }: { children: React.ReactNode }) {
  return children
}
