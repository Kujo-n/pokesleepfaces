import { db } from '@/firebase/config';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, collection, getDocs } from 'firebase/firestore';
import { Pokemon } from '@/data/mockData';

// User Collection Structure:
// users/{userId}/collections/{pokemonId}
// Document contains: { collectedStyles: [styleId1, styleId2, ...] }

export const toggleSleepStyle = async (userId: string, pokemonId: string, styleId: string, isCollected: boolean) => {
    if (!db) throw new Error("Firebase not initialized");
    const docRef = doc(db as any, `users/${userId}/collections/${pokemonId}`);

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

export const toggleAllStyles = async (userId: string, pokemon: Pokemon, isSelected: boolean) => {
    if (!db) throw new Error("Firebase not initialized");
    const docRef = doc(db as any, `users/${userId}/collections/${pokemon.id}`);
    const allStyleIds = pokemon.styles.map(s => s.id);

    try {
        if (isSelected) {
            await setDoc(docRef, {
                collectedStyles: allStyleIds
            }, { merge: true });
        } else {
            await setDoc(docRef, {
                collectedStyles: []
            }, { merge: true });
        }
    } catch (error) {
        console.error("Error toggling all styles:", error);
        throw error;
    }
};

export const subscribeToUserCollection = (userId: string, callback: (collected: Set<string>) => void) => {
    if (!db) return () => { };
    const collectionRef = collection(db as any, `users/${userId}/collections`);

    return onSnapshot(collectionRef, (snapshot) => {
        const newCollected = new Set<string>();
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.collectedStyles && Array.isArray(data.collectedStyles)) {
                data.collectedStyles.forEach((id: string) => newCollected.add(id));
            }
        });
        callback(newCollected);
    });
};

export const checkIfNewUser = async (userId: string): Promise<boolean> => {
    if (!db) return false;

    try {
        const collectionRef = collection(db as any, `users/${userId}/collections`);
        const snapshot = await getDocs(collectionRef);

        // コレクションが空 = 新規ユーザー
        return snapshot.empty;
    } catch (e) {
        console.error('Failed to check if user is new', e);
        return false; // エラー時は既存ユーザーとして扱う（安全側）
    }
};
