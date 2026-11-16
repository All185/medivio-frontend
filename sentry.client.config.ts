import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // Réduire à 10 % — 100 % expose trop de données médicales en traces
  tracesSampleRate: 0.1,
  // Replay uniquement sur erreur (pas de session replay proactif)
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0,
  integrations: [
    Sentry.replayIntegration({
      // Masquer tout le texte et bloquer les médias pour protéger les données patients
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  enabled: process.env.NODE_ENV === "production",
});
