import axios from 'axios'
import { getToken } from '@/lib/auth'

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials : le navigateur envoie automatiquement le httpOnly cookie
  // dès que le backend le définira — aucun changement de code requis à ce moment-là.
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  // Fallback localStorage pendant la phase transitoire.
  // À retirer une fois le backend migré vers httpOnly cookie.
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
