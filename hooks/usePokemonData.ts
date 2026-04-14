'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { db } from '@/firebase/config';
import { collection, getDocs, doc, getDoc, Firestore } from 'firebase/firestore';
import { MOCK_POKEMON, FIELD_NAMES, Pokemon } from '@/data/mockData';

// 環境に応じたマスターコレクション名
const ENV = process.env.NEXT_PUBLIC_ENV || 'production';
const MASTER_COLLECTION = ENV === 'staging' ? 'master_staging' : 'master';

/**
 * PokemonDataContextの型定義
 * アプリ全体で共有するポケモンマスターデータ
 */
type PokemonDataContextType = {
  pokemonList: Pokemon[];
  fieldNames: string[];
  isLoading: boolean;
  error: string | null;
  isUsingFallback: boolean;
};

/**
 * デフォルト値: フォールバックとしてmockDataを使用
 */
const defaultValue: PokemonDataContextType = {
  pokemonList: MOCK_POKEMON,
  fieldNames: FIELD_NAMES,
  isLoading: false,
  error: null,
  isUsingFallback: true,
};

export const PokemonDataContext = createContext<PokemonDataContextType>(defaultValue);

/**
 * PokemonDataContextを使用するカスタムフック
 * コンポーネントからContext経由でデータを取得する
 */
export const usePokemonData = (): PokemonDataContextType => {
  return useContext(PokemonDataContext);
};

/**
 * Firestoreからマスターデータを読み込むカスタムフック
 * - 成功時: Firestoreのデータを返す
 * - 失敗時: mockData.tsのデータにフォールバック
 */
export const usePokemonDataLoader = (): PokemonDataContextType => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(MOCK_POKEMON);
  const [fieldNames, setFieldNames] = useState<string[]>(FIELD_NAMES);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingFallback, setIsUsingFallback] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!db) {
        // Firestore未初期化の場合はフォールバック
        setIsLoading(false);
        return;
      }

      try {
        // フィールド名とポケモンデータを並列で取得
        const [fieldsResult, pokemonResult] = await Promise.all([
          loadFieldNames(),
          loadPokemonList(),
        ]);

        if (fieldsResult) {
          setFieldNames(fieldsResult);
        }

        if (pokemonResult && pokemonResult.length > 0) {
          setPokemonList(pokemonResult);
          // データが1件以上あればフォールバックではないと判定
          setIsUsingFallback(false);
        }
      } catch (e) {
        const message = e instanceof Error ? e.message : 'マスターデータの読み込みに失敗しました';
        console.error('マスターデータ読み込みエラー:', message);
        setError(message);
        // フォールバック: mockData.ts のデータをそのまま使用
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return { pokemonList, fieldNames, isLoading, error, isUsingFallback };
};

/**
 * Firestoreからフィールド名一覧を取得する
 */
async function loadFieldNames(): Promise<string[] | null> {
  if (!db) return null;

  try {
    const docRef = doc(db as Firestore, MASTER_COLLECTION, 'fields');
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      if (Array.isArray(data.names)) {
        return data.names;
      }
    }
    return null;
  } catch (e) {
    console.error('フィールド名の読み込みに失敗:', e);
    return null;
  }
}

/**
 * Firestoreからポケモン一覧を取得する
 * コレクション方式: /master/pokemon/{pokemonId}
 */
async function loadPokemonList(): Promise<Pokemon[] | null> {
  if (!db) return null;

  try {
    const colRef = collection(db as Firestore, MASTER_COLLECTION, 'pokemon', 'entries');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      return null;
    }

    const list: Pokemon[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: data.id,
        dexNumber: data.dexNumber,
        name: data.name,
        type: data.type,
        sleepType: data.sleepType,
        fields: data.fields || [],
        styles: (data.styles || []).map((s: Record<string, unknown>) => ({
          id: s.id as string,
          name: s.name as string,
          rarity: s.rarity as number,
          ...(s.excludeFromFields ? { excludeFromFields: s.excludeFromFields as string[] } : {}),
        })),
      });
    });

    // 図鑑番号順 → 名前順でソート
    list.sort((a, b) => a.dexNumber - b.dexNumber || a.name.localeCompare(b.name));
    return list;
  } catch (e) {
    console.error('ポケモンデータの読み込みに失敗:', e);
    return null;
  }
}
