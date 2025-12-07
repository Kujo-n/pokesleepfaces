import { db } from '@/firebase/config';
import { doc, setDoc, arrayUnion, arrayRemove, onSnapshot, collection, getDocs, Firestore, writeBatch } from 'firebase/firestore';

// 環境に応じたコレクション名
const ENV = process.env.NEXT_PUBLIC_ENV || 'production';
const USERS_COLLECTION = ENV === 'staging' ? 'users_staging' : 'users';

// User Collection Structure:
// users/{userId}/collections/{pokemonId} (production)
// users_staging/{userId}/collections/{pokemonId} (staging)
// Document contains: { collectedStyles: [styleId1, styleId2, ...] }

export const toggleSleepStyle = async (userId: string, pokemonId: string, styleId: string, isCollected: boolean) => {
    if (!db) throw new Error("Firebase not initialized");

    // 入力バリデーション追加
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid userId');
    }
    if (!pokemonId || typeof pokemonId !== 'string' || pokemonId.trim() === '') {
        throw new Error('Invalid pokemonId');
    }
    if (!styleId || typeof styleId !== 'string' || styleId.trim() === '') {
        throw new Error('Invalid styleId');
    }
    if (typeof isCollected !== 'boolean') {
        throw new Error('Invalid isCollected value');
    }

    const docRef = doc(db as Firestore, `${USERS_COLLECTION}/${userId}/collections/${pokemonId}`);

    try {
        if (isCollected) {
            // Add to collected
            await setDoc(docRef, {
                collectedStyles: arrayUnion(styleId)
            }, { merge: true });
        } else {
            // Remove from collected
            await setDoc(docRef, {
                collectedStyles: arrayRemove(styleId)
            }, { merge: true });
        }
    } catch (error) {
        console.error("Error updating sleep style:", error);
        throw error;
    }
};

export const toggleAllStyles = async (userId: string, pokemonId: string, styleIds: string[], isSelected: boolean) => {
    if (!db) throw new Error("Firebase not initialized");

    // バリデーション追加
    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
        throw new Error('Invalid userId');
    }
    if (!pokemonId || typeof pokemonId !== 'string' || pokemonId.trim() === '') {
        throw new Error('Invalid pokemonId');
    }
    if (!Array.isArray(styleIds) || styleIds.length === 0) {
        throw new Error('Invalid styleIds array');
    }
    if (styleIds.some(id => typeof id !== 'string' || id.trim() === '')) {
        throw new Error('Invalid styleId in array');
    }
    if (typeof isSelected !== 'boolean') {
        throw new Error('Invalid isSelected value');
    }

    const docRef = doc(db as Firestore, `${USERS_COLLECTION}/${userId}/collections/${pokemonId}`);

    try {
        if (isSelected) {
            await setDoc(docRef, {
                collectedStyles: arrayUnion(...styleIds)
            }, { merge: true });
        } else {
            await setDoc(docRef, {
                collectedStyles: arrayRemove(...styleIds)
            }, { merge: true });
        }
    } catch (error) {
        console.error("Error toggling all styles:", error);
        throw error;
    }
};

interface UserCollection {
    collectedStyles: string[];
}

export const subscribeToUserCollection = (userId: string, callback: (collected: Set<string>) => void) => {
    if (!db) return () => { };

    const collectionRef = collection(db as Firestore, `${USERS_COLLECTION}/${userId}/collections`).withConverter({
        toFirestore: (data: UserCollection) => data,
        fromFirestore: (snapshot, options) => {
            const data = snapshot.data(options);
            return data as UserCollection;
        }
    });

    return onSnapshot(collectionRef, (snapshot) => {
        const newCollected = new Set<string>();
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.collectedStyles && Array.isArray(data.collectedStyles)) {
                data.collectedStyles.forEach((id) => newCollected.add(id));
            }
        });
        callback(newCollected);
    });
};

export const checkIfNewUser = async (userId: string): Promise<boolean> => {
    if (!db) return false;

    try {
        const collectionRef = collection(db as Firestore, `${USERS_COLLECTION}/${userId}/collections`);
        const snapshot = await getDocs(collectionRef);

        // コレクションが空 = 新規ユーザー
        return snapshot.empty;
    } catch (e) {
        console.error('Failed to check if user is new', e);
        return false; // エラー時は既存ユーザーとして扱う（安全側）
    }
};

// Filter preferences
export interface FilterPreferences {
    selectedField: string;
    selectedSleepType: string;
    selectedRarity: string; // 'all' | '1' | '2' | '3' | '4'
    showUncollectedOnly: boolean;
}

export const saveFilterPreferences = async (userId: string, preferences: FilterPreferences) => {
    if (!db) throw new Error("Firebase not initialized");
    const docRef = doc(db as Firestore, `${USERS_COLLECTION}/${userId}/preferences/filters`);

    try {
        await setDoc(docRef, preferences, { merge: true });
    } catch (error) {
        console.error("Error saving filter preferences:", error);
        throw error;
    }
};

export const loadFilterPreferences = async (userId: string): Promise<FilterPreferences | null> => {
    if (!db) return null;

    try {
        const snapshot = await getDocs(collection(db as Firestore, `${USERS_COLLECTION}/${userId}/preferences`));
        const filterDoc = snapshot.docs.find(d => d.id === 'filters');
        if (filterDoc && filterDoc.exists()) {
            return filterDoc.data() as FilterPreferences;
        }
        return null;
    } catch (error) {
        console.error("Error loading filter preferences:", error);
        return null;
    }
};

export const toggleMultiplePokemonStyles = async (
    userId: string,
    updates: { pokemonId: string; styleIds: string[] }[],
    isSelected: boolean
) => {
    if (!db) throw new Error("Firebase not initialized");
    if (!userId) throw new Error("Invalid userId");
    if (updates.length === 0) return;

    // Firestore batch limit is 500.
    // If updates > 500, we need multiple batches.
    const BATCH_SIZE = 500;
    const chunks = [];
    for (let i = 0; i < updates.length; i += BATCH_SIZE) {
        chunks.push(updates.slice(i, i + BATCH_SIZE));
    }

    try {
        for (const chunk of chunks) {
            const batch = writeBatch(db as Firestore);

            chunk.forEach(({ pokemonId, styleIds }) => {
                const docRef = doc(db as Firestore, `${USERS_COLLECTION}/${userId}/collections/${pokemonId}`);
                if (isSelected) {
                    batch.set(docRef, {
                        collectedStyles: arrayUnion(...styleIds)
                    }, { merge: true });
                } else {
                    batch.set(docRef, {
                        collectedStyles: arrayRemove(...styleIds)
                    }, { merge: true });
                }
            });

            await batch.commit();
        }
    } catch (error) {
        console.error("Error batch toggling styles:", error);
        throw error;
    }
};
