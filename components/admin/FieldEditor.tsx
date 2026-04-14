'use client';

import { useState, useCallback } from 'react';
import { saveFieldNames } from '@/lib/adminDb';

type Props = {
    fieldNames: string[];
    onSaved: () => void;
};

/**
 * フィールド名の管理コンポーネント
 * - フィールドの追加・削除・並び替え
 * - 保存時にFirestoreに書き込み
 */
export default function FieldEditor({ fieldNames: initialFieldNames, onSaved }: Props) {
    const [fields, setFields] = useState<string[]>([...initialFieldNames]);
    const [newFieldName, setNewFieldName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 変更があるかチェック
    const hasChanges = JSON.stringify(fields) !== JSON.stringify(initialFieldNames);

    const handleAddField = useCallback(() => {
        const trimmed = newFieldName.trim();
        if (!trimmed) return;

        if (fields.includes(trimmed)) {
            setError('同じ名前のフィールドが既に存在します');
            return;
        }

        setFields(prev => [...prev, trimmed]);
        setNewFieldName('');
        setError(null);
    }, [newFieldName, fields]);

    const handleRemoveField = useCallback((index: number, fieldName: string) => {
        if (!confirm(`本当に「${fieldName}」を削除しますか？\n（※後からもう一度追加することは可能です）`)) return;
        setFields(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleMoveUp = useCallback((index: number) => {
        if (index === 0) return;
        setFields(prev => {
            const next = [...prev];
            [next[index - 1], next[index]] = [next[index], next[index - 1]];
            return next;
        });
    }, []);

    const handleMoveDown = useCallback((index: number) => {
        setFields(prev => {
            if (index >= prev.length - 1) return prev;
            const next = [...prev];
            [next[index], next[index + 1]] = [next[index + 1], next[index]];
            return next;
        });
    }, []);

    const handleSave = useCallback(async () => {
        setIsSaving(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await saveFieldNames(fields);
            setSuccessMessage('フィールドを保存しました');
            onSaved();
        } catch (e) {
            const message = e instanceof Error ? e.message : '保存に失敗しました';
            setError(message);
        } finally {
            setIsSaving(false);
        }
    }, [fields, onSaved]);

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">フィールド管理</h3>

            {/* エラー・成功メッセージ */}
            {error && (
                <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm" role="alert">
                    {error}
                </div>
            )}
            {successMessage && (
                <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm" role="status">
                    {successMessage}
                </div>
            )}

            {/* フィールド一覧 */}
            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div
                        key={`${field}-${index}`}
                        className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                        <span className="text-sm text-gray-500 w-6 text-right">{index + 1}.</span>
                        <span className="flex-1 text-sm font-medium text-gray-900">{field}</span>

                        {/* 並び替えボタン */}
                        <button
                            onClick={() => handleMoveUp(index)}
                            disabled={index === 0}
                            className="p-1 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label={`${field}を上に移動`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="18 15 12 9 6 15" />
                            </svg>
                        </button>
                        <button
                            onClick={() => handleMoveDown(index)}
                            disabled={index === fields.length - 1}
                            className="p-1 rounded text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label={`${field}を下に移動`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {/* 削除ボタン */}
                        <button
                            onClick={() => handleRemoveField(index, field)}
                            className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                            aria-label={`${field}を削除`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* 新規追加 */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddField();
                        }
                    }}
                    placeholder="新しいフィールド名"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    aria-label="新しいフィールド名を入力"
                />
                <button
                    onClick={handleAddField}
                    disabled={!newFieldName.trim()}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    追加
                </button>
            </div>

            {/* 保存ボタン */}
            {hasChanges && (
                <div className="flex justify-end pt-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {isSaving ? '保存中...' : '変更を保存'}
                    </button>
                </div>
            )}
        </div>
    );
}
