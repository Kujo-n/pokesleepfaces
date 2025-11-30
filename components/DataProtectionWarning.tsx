'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/firebase/config';
import { User } from 'firebase/auth';

export default function DataProtectionWarning() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    if (user) return null;

    return (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <div className="text-sm text-amber-800">
                    <p className="font-medium">データに関する注意事項</p>
                    <p className="mt-1 text-amber-700">
                        ログインしていない場合、データはお使いのブラウザ内に保存されます。
                        <span className="font-medium">閲覧データの削除</span>などを行うと入力データが消失します。
                        <br />
                        <span className="font-medium">ログイン</span>することで、データがクラウドに保護されます。
                    </p>
                </div>
            </div>
        </div>
    );
}
