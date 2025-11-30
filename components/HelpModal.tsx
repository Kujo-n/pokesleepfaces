'use client';

import { useEffect } from 'react';

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/50 transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                    <h2 className="text-lg font-bold text-gray-900">ヘルプ・よくある質問</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <section>
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-blue-600">Q.</span>
                            ログインしないと利用できませんか？
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-100">
                            ログインなしでも利用可能です。
                            <br />
                            ただし、別端末へデータ移行や共有ができません。
                            ログインしていない場合、データはお使いのブラウザ内に保存されるためです。
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-blue-600">Q.</span>
                            機種変更時などのデータ移行はどうすればよいですか？
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-100">
                            Googleアカウントでログインしてください。
                            <br />
                            初回ログイン以降はデータがクラウドに保存されるようになります。同じGoogleアカウントを使用することでどの端末でもデータを共有できます。
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-blue-600">Q.</span>
                            ブラウザの履歴を削除したら記録も消えてしまいました。
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-100">
                            Googleアカウントでログインしてください。最後にログインしていた時の入力状態に復元されます。
                            <br />
                            ログインせずに利用されていた場合は復元不可です。
                        </p>
                    </section>

                    <section>
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="text-blue-600">Q.</span>
                            フィルタの使い方は？
                        </h3>
                        <div className="text-sm text-gray-600 leading-relaxed pl-6 border-l-2 border-gray-100 space-y-2">
                            <p>
                                <span className="font-bold text-gray-800">フィールド:</span> 指定フィールドに出現するポケモンのみを表示します。
                            </p>
                            <p>
                                <span className="font-bold text-gray-800">睡眠タイプ:</span> 指定睡眠タイプの寝顔のみを表示します。
                            </p>
                            <p>
                                <span className="font-bold text-gray-800">未収集のみ:</span> チェックを入れると、まだ寝顔を持っていないポケモンのみを表示します。
                            </p>
                        </div>
                    </section>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                    <p className="text-xs text-center text-gray-500">
                        このアプリは非公式のファンメイドアプリです。
                    </p>
                </div>
            </div>
        </div>
    );
}
