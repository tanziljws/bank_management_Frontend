import { http } from '@/lib/http';
import type { AuthSession, UserProfile } from '@/lib/auth-storage';

export type LoginRequest = {
  email: string;
  password: string;
};

export async function login(request: LoginRequest) {
  const response = await http.post<AuthSession>('/auth/login', request);
  return response.data;
}

export async function logout(refreshToken: string) {
  await http.post('/auth/logout', { refreshToken });
}

export async function getMe() {
  const response = await http.get<UserProfile>('/auth/me');
  return response.data;
}

