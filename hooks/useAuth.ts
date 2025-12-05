'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

/**
 * Firebase認証状態を管理するカスタムフック
 * @returns {User | null} 現在のユーザー（未ログインの場合はnull）
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) return;

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};
