import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { clearSession, getSession, setSession, type AuthSession } from '@/lib/auth-storage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authHttp = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type RetriableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

let refreshingTokenPromise: Promise<string | null> | null = null;

http.interceptors.request.use((config) => {
  const session = getSession();
  if (!session?.accessToken) return config;

  config.headers.Authorization = `Bearer ${session.accessToken}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined;
    if (!config) throw error;

    const status = error.response?.status;
    const requestUrl = config.url ?? '';
    const isAuthEndpoint = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/refresh');

    if (status !== 401 || config._retry || isAuthEndpoint) {
      throw error;
    }

    config._retry = true;

    const nextAccessToken = await refreshAccessToken();
    if (!nextAccessToken) {
      clearSession();
      throw error;
    }

    config.headers.Authorization = `Bearer ${nextAccessToken}`;
    return http(config);
  },
);

async function refreshAccessToken(): Promise<string | null> {
  if (refreshingTokenPromise) {
    return refreshingTokenPromise;
  }

  refreshingTokenPromise = (async () => {
    const session = getSession();
    if (!session?.refreshToken) return null;

    try {
      const response = await authHttp.post<AuthSession>('/auth/refresh', {
        refreshToken: session.refreshToken,
      });

      setSession(response.data);
      return response.data.accessToken;
    } catch {
      return null;
    } finally {
      refreshingTokenPromise = null;
    }
  })();

  return refreshingTokenPromise;
}
