'use client';

import { auth } from '@/firebase/config';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export default function AuthButton() {
    const { user } = useAuth();

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
