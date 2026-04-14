/**
 * 管理画面用 Firestore CRUD 関数
 * マスターデータ（ポケモン・フィールド）の書き込み操作を提供する
 */
import { db } from '@/firebase/config';
import { doc, setDoc, deleteDoc, Firestore, serverTimestamp } from 'firebase/firestore';
import { Pokemon } from '@/data/mockData';

// 環境に応じたマスターコレクション名
const ENV = process.env.NEXT_PUBLIC_ENV || 'production';
const MASTER_COLLECTION = ENV === 'staging' ? 'master_staging' : 'master';

/**
 * ポケモンデータのバリデーション
 * @throws バリデーションエラーがある場合
 */
export function validatePokemon(pokemon: Partial<Pokemon>): string[] {
    const errors: string[] = [];

    if (!pokemon.name || pokemon.name.trim() === '') {
        errors.push('名前は必須です');
    }
    if (!pokemon.dexNumber || pokemon.dexNumber < 1) {
        errors.push('図鑑番号は1以上の数値を入力してください');
    }
    if (!pokemon.type || pokemon.type.trim() === '') {
        errors.push('タイプは必須です');
    }
    if (!pokemon.sleepType || !['うとうと', 'すやすや', 'ぐっすり'].includes(pokemon.sleepType)) {
        errors.push('睡眠タイプを選択してください');
    }
    if (!pokemon.fields || pokemon.fields.length === 0) {
        errors.push('出現フィールドを1つ以上選択してください');
    }
    if (!pokemon.styles || pokemon.styles.length === 0) {
        errors.push('寝顔スタイルを1つ以上追加してください');
    }

    // スタイルのバリデーション
    pokemon.styles?.forEach((style, index) => {
        if (!style.name || style.name.trim() === '') {
            errors.push(`スタイル${index + 1}: 名前は必須です`);
        }
        if (!style.rarity || style.rarity < 1 || style.rarity > 4) {
            errors.push(`スタイル${index + 1}: レアリティは1〜4の範囲で指定してください`);
        }
    });

    return errors;
}

/**
 * ポケモンIDを自動生成する
 */
export function generatePokemonId(dexNumber: number, name: string): string {
    return `p${dexNumber}_${name}`;
}

/**
 * スタイルIDを自動生成する
 */
export function generateStyleId(pokemonId: string, index: number): string {
    return `${pokemonId}-${index + 1}`;
}

/**
 * ポケモンをFirestoreに保存する（新規作成・更新兼用）
 */
export async function savePokemon(pokemon: Pokemon): Promise<void> {
    if (!db) throw new Error('Firebase未初期化');

    const errors = validatePokemon(pokemon);
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }

    const docRef = doc(
        db as Firestore,
        MASTER_COLLECTION, 'pokemon', 'entries', pokemon.id
    );

    await setDoc(docRef, {
        ...pokemon,
        updatedAt: serverTimestamp()
    });
}

/**
 * ポケモンをFirestoreから削除する
 */
export async function deletePokemon(pokemonId: string): Promise<void> {
    if (!db) throw new Error('Firebase未初期化');

    if (!pokemonId || pokemonId.trim() === '') {
        throw new Error('ポケモンIDが不正です');
    }

    const docRef = doc(
        db as Firestore,
        MASTER_COLLECTION, 'pokemon', 'entries', pokemonId
    );

    await deleteDoc(docRef);
}

/**
 * フィールド名リストをFirestoreに保存する
 */
export async function saveFieldNames(fieldNames: string[]): Promise<void> {
    if (!db) throw new Error('Firebase未初期化');

    if (!Array.isArray(fieldNames) || fieldNames.length === 0) {
        throw new Error('フィールド名を1つ以上指定してください');
    }

    // 空文字チェック
    const invalidFields = fieldNames.filter(f => !f || f.trim() === '');
    if (invalidFields.length > 0) {
        throw new Error('空のフィールド名が含まれています');
    }

    // 重複チェック
    const uniqueNames = new Set(fieldNames);
    if (uniqueNames.size !== fieldNames.length) {
        throw new Error('重複するフィールド名があります');
    }

    const docRef = doc(db as Firestore, MASTER_COLLECTION, 'fields');

    await setDoc(docRef, {
        names: fieldNames,
        updatedAt: serverTimestamp()
    });
}
