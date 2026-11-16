/**
 * Utilitaires d'authentification centralisés.
 *
 * ÉTAT ACTUEL : token JWT stocké dans localStorage (vulnérable XSS).
 * MIGRATION EN COURS → httpOnly cookie.
 *
 * Côté backend requis pour finaliser la migration :
 *   1. POST /auth/login   → Set-Cookie: access_token=…; HttpOnly; Secure; SameSite=Strict
 *   2. POST /auth/logout  → Set-Cookie: access_token=; Max-Age=0 (clear)
 *   3. Lire le token depuis le cookie en priorité sur le header Authorization
 *
 * Une fois le backend prêt, retirer les appels localStorage.setItem dans AuthForm.tsx
 * et l'intercepteur Authorization dans lib/api.ts.
 */

export interface AuthUser {
  id: string
  email: string
  full_name: string
  role: 'patient' | 'doctor' | 'admin'
}

/** Récupère le token JWT (localStorage → sera remplacé par cookie httpOnly) */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem('access_token')
  } catch {
    return null
  }
}

/** Récupère l'utilisateur courant depuis localStorage */
export function getUser(): AuthUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('user')
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

/** Vérifie si l'utilisateur est authentifié */
export function isAuthenticated(): boolean {
  return !!getToken()
}

/**
 * Déconnecte l'utilisateur :
 *   1. Appelle POST /api/v1/auth/logout pour invalider le token côté serveur
 *      et effacer le httpOnly cookie (quand le backend le supportera).
 *   2. Efface localStorage en fallback.
 */
export async function logout(): Promise<void> {
  // Appel best-effort : on ne bloque pas la déconnexion si le serveur est
  // indisponible ou si le cookie n'est pas encore supporté côté backend.
  try {
    const token = getToken()
    await fetch('/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include', // envoie le cookie si présent
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
  } catch {
    // serveur indisponible — on efface quand même localement
  }

  // Nettoyage localStorage (phase transitoire)
  try {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  } catch {
    // rien à faire
  }
}

/** Stocke les credentials après login/register (phase transitoire localStorage) */
export function storeAuth(token: string, user: AuthUser): void {
  try {
    localStorage.setItem('access_token', token)
    localStorage.setItem('user', JSON.stringify(user))
  } catch {
    // quota exceeded ou mode privé — on continue sans storage local
  }
}
