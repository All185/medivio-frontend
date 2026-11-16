import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  // Le navigateur envoie automatiquement le httpOnly cookie sur chaque requête.
  withCredentials: true,
})

export default api
