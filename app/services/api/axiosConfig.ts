import axios from 'axios'

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, storage } from '../storage'
import { transformParams } from './queryHooks/utils'

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL as string,
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
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Expired token error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // Marked as retryed

      // Trying to refresh token with new axios instance
      const refreshToken = await storage.getItem(REFRESH_TOKEN_KEY)
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL as string}/auth/jwt/refresh/`,
            {
              refreshToken,
            }
          )
          const newAccessToken = data.access

          await storage.setItem(ACCESS_TOKEN_KEY, newAccessToken)

          // Retry request with new access token
          originalRequest.headers['Authorization'] = `JWT ${newAccessToken}`
          return api(originalRequest)
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError)
          storage.removeItem(ACCESS_TOKEN_KEY)
          storage.removeItem(REFRESH_TOKEN_KEY)

          // TODO: something else to do ?
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api
