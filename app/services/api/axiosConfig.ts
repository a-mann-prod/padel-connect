import axios from 'axios'

import { useEffect, useState } from 'react'
import { config } from '../config'
import { ACCESS_TOKEN_KEY, storage } from '../storage'
import { transformParams } from './queryHooks/utils'

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  async (config) => {
    if (config.params) {
      config.params = transformParams(config.params)
    }

    const accessToken = await storage.getItem(ACCESS_TOKEN_KEY)
    if (accessToken && !config.url?.includes('login')) {
      config.headers.Authorization = `JWT ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//     const four_padel_refresh = false

//     // Expired token error
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true // Marked as retryed

//       if (!four_padel_refresh) {
//         storage.removeItem(ACCESS_TOKEN_KEY)
//         storage.removeItem(REFRESH_TOKEN_KEY)

//         return Promise.reject(error)
//       }

//       // Trying to refresh token with new axios instance
//       const refreshToken = await storage.getItem(REFRESH_TOKEN_KEY)
//       if (refreshToken) {
//         try {
//           const { data } = await axios.post(
//             `${config.apiUrl}/auth/jwt/refresh/`,
//             {
//               refresh: refreshToken,
//             }
//           )
//           const newAccessToken = data.access

//           await storage.setItem(ACCESS_TOKEN_KEY, newAccessToken)

//           // Retry request with new access token
//           originalRequest.headers['Authorization'] = `JWT ${newAccessToken}`
//           return api(originalRequest)
//         } catch (refreshError) {
//           console.error('Error refreshing token:', refreshError)
//           storage.removeItem(ACCESS_TOKEN_KEY)
//           storage.removeItem(REFRESH_TOKEN_KEY)
//         }
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export default api

export const useIsTokenExpired = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false)

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setIsTokenExpired(true) // Détecter le statut du token
        }
        return Promise.reject(error)
      }
    )

    return () => {
      // Nettoyer l'intercepteur pour éviter les fuites de mémoire
      api.interceptors.response.eject(interceptor)
    }
  }, [])

  return isTokenExpired
}
