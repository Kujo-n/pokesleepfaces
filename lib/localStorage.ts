// lib/localStorage.ts
// LocalStorageでの一時保存ユーティリティ

const STORAGE_KEY = 'pokesleep_temp_collection';
import { Pokemon } from '@/data/mockData';

export const saveToLocalStorage = (collectedStyles: Set<string>) => {
    try {
        const data = Array.from(collectedStyles);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to localStorage', e);
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
        console.log('Existing user detected. Clearing local data without migration.');
        clearLocalStorage();
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
