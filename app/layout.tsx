import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'Medivio — Télémédecine augmentée par l\'IA',
    template: '%s | Medivio',
  },
  description: 'Medivio est une plateforme de télémédecine augmentée par l\'IA. Téléconsultation vidéo, ordonnances numériques, triage IA et suivi chronique — accessible en 5 langues.',
  keywords: ['télémédecine', 'téléconsultation', 'médecin en ligne', 'ordonnance numérique', 'santé numérique', 'IA médicale', 'telemedicine'],
  authors: [{ name: 'Medivio' }],
  creator: 'Medivio',
  publisher: 'Medivio',
  metadataBase: new URL('https://medivio.care'),
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://medivio.care',
    siteName: 'Medivio',
    title: 'Medivio — Télémédecine augmentée par l\'IA',
    description: 'Téléconsultation vidéo, ordonnances numériques, triage IA et suivi chronique. La télémédecine moderne, accessible à tous.',
    images: [
      {
        url: '/pwa-icon.png',
        width: 512,
        height: 512,
        alt: 'Medivio — Télémédecine augmentée par l\'IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medivio — Télémédecine augmentée par l\'IA',
    description: 'Téléconsultation vidéo, ordonnances numériques, triage IA et suivi chronique.',
    images: ['/pwa-icon.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Medivio',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#2B5EF8',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2B5EF8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Medivio" />
        <link rel="apple-touch-icon" href="/pwa-icon.png" />
      </head>
      <body className={`${jakartaSans.variable} antialiased`}>
        <LanguageProvider>
          <ServiceWorkerRegister />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
