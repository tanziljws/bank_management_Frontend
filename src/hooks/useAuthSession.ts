import { useEffect, useState } from 'react';

import { authChangedEventName, getSession, type AuthSession } from '@/lib/auth-storage';

export function useAuthSession() {
  const [session, setCurrentSession] = useState<AuthSession | null>(() => getSession());

  useEffect(() => {
    const update = () => setCurrentSession(getSession());
    window.addEventListener(authChangedEventName(), update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener(authChangedEventName(), update);
      window.removeEventListener('storage', update);
    };
  }, []);

  return session;
}

