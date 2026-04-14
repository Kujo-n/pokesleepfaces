'use client';

import { auth } from '@/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',').filter(Boolean);

export default function AuthButton() {
    const { user } = useAuth();
    const isAdmin = user && ADMIN_UIDS.includes(user.uid);

    const handleSignIn = async () => {
        if (!auth) {
            alert("Firebase設定が完了していません");
            return;
        }
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in:", error);
            alert(`ログインに失敗しました: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleSignOut = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (user) {
        return (
            <div className="flex items-center gap-3">
                {isAdmin && (
                    <Link
                        href="/admin"
                        className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
                        title="データ管理画面"
                        aria-label="管理画面を開く"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </Link>
                )}
                {user.photoURL && (
                    <Image
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                )}
                <button
                    onClick={handleSignOut}
                    className="text-sm text-gray-600 hover:text-gray-900 underline"
                >
                    ログアウト
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={handleSignIn}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
            Googleでログイン
        </button>
    );
}
