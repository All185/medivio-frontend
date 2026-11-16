/**
 * Utilitaires d'authentification centralisés.
 *
 * Token JWT transmis via httpOnly cookie (géré par le navigateur automatiquement).
 * localStorage ne stocke plus que l'objet utilisateur (données d'affichage, non sensibles).
 */

export interface AuthUser {
  id: string
  email: string
  full_name: string
  role: 'patient' | 'doctor' | 'admin'
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

/** Vérifie si l'utilisateur est authentifié (présence de l'objet user en localStorage) */
export function isAuthenticated(): boolean {
  return !!getUser()
}

/**
 * Déconnecte l'utilisateur :
 *   1. Appelle POST /api/v1/auth/logout → le backend efface le httpOnly cookie.
 *   2. Efface l'objet user du localStorage.
 */
export async function logout(): Promise<void> {
  try {
    await fetch('/api/v1/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
  } catch {
    // serveur indisponible — on efface quand même localement
  }

  try {
    localStorage.removeItem('user')
  } catch {
    // rien à faire
  }
}

/** Stocke l'objet utilisateur après login/register (le token est dans le httpOnly cookie) */
export function storeAuth(_token: string, user: AuthUser): void {
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch {
    // quota exceeded ou mode privé — on continue sans storage local
  }
}
