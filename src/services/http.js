import axios from 'axios'

// ─── Base Instance ────────────────────────────────────────────────────────────
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.cinemax.com/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Attaches auth token if present, logs outgoing requests in dev mode
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cinemax_auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} → ${config.baseURL}${config.url}`, config.data ?? '')
    }

    return config
  },
  (error) => {
    console.error('[API Request Error]', error)
    return Promise.reject(error)
  }
)

// ─── Response Interceptor ────────────────────────────────────────────────────
// Normalises responses & handles global error scenarios (401, 403, 500, etc.)
apiClient.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      console.log(`[API Response] ${response.status} ←`, response.data)
    }
    return response
  },
  (error) => {
    const { response } = error

    if (!response) {
      // Network error / server unreachable
      console.error('[API] Network error — no response received')
      return Promise.reject(new Error('Network error. Please check your connection.'))
    }

    switch (response.status) {
      case 400:
        console.error('[API 400] Bad Request:', response.data?.message)
        break
      case 401:
        console.warn('[API 401] Unauthorised — clearing session')
        localStorage.removeItem('cinemax_auth_token')
        break
      case 403:
        console.error('[API 403] Forbidden')
        break
      case 422:
        console.error('[API 422] Validation error:', response.data?.errors)
        break
      case 500:
        console.error('[API 500] Internal Server Error')
        break
      default:
        console.error(`[API ${response.status}]`, response.data?.message ?? 'Unknown error')
    }

    return Promise.reject(error)
  }
)

export default apiClient
