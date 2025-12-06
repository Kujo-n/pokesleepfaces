// lib/localStorage.ts
// LocalStorageでの一時保存ユーティリティ

const STORAGE_KEY = 'pokesleep_temp_collection';
import { Pokemon } from '@/data/mockData';

export const saveToLocalStorage = (collectedStyles: Set<string>): boolean => {
    try {
        const data = Array.from(collectedStyles);
        const jsonString = JSON.stringify(data);

        // localStorage制限チェック（5MB）
        const sizeInBytes = new Blob([jsonString]).size;
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (sizeInBytes > maxSize) {
            console.warn('Data too large for localStorage:', sizeInBytes, 'bytes');
            alert('保存データが大きすぎます。ログインしてFirestoreに保存することをお勧めします。');
            return false;
        }

        localStorage.setItem(STORAGE_KEY, jsonString);
        return true;
    } catch (e) {
        console.error('Failed to save to localStorage', e);

        // QuotaExceededErrorの特別処理
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
            alert('ストレージの容量が不足しています。不要なデータを削除するか、ログインしてFirestoreに保存してください。');
        }
        return false;
    }
};

export const loadFromLocalStorage = (): Set<string> => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            return new Set(parsed);
        }
    } catch (e) {
        console.error('Failed to load from localStorage', e);
    }
    return new Set();
};

export const clearLocalStorage = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear localStorage', e);
    }
};

export const migrateToFirestore = async (
    userId: string,
    localData: Set<string>,
    toggleSleepStyle: (userId: string, pokemonId: string, styleId: string, isCollected: boolean) => Promise<void>,
    MOCK_POKEMON: Pokemon[],
    checkIfNewUser: (userId: string) => Promise<boolean>
) => {
    const isNewUser = await checkIfNewUser(userId);

    if (!isNewUser) {
        console.log('Existing user detected. Keeping local data as offline cache.');
        return;
    }

    console.log('New user detected. Migrating local data to Firestore...');
    const promises: Promise<void>[] = [];

    localData.forEach((styleId) => {
        const pokemon = MOCK_POKEMON.find((p) => p.styles.some((s) => s.id === styleId));
        if (pokemon) {
            promises.push(toggleSleepStyle(userId, pokemon.id, styleId, true));
        }
    });

    try {
        await Promise.all(promises);
        clearLocalStorage();
        console.log('Successfully migrated local data to Firestore');
    } catch (e) {
        console.error('Failed to migrate local data', e);
    }
};

