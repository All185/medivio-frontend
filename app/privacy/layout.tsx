import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment Medivio collecte, utilise et protège vos données personnelles. Conformité RGPD.',
  robots: { index: false, follow: false },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
