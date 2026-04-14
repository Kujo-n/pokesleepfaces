'use client';

import { ReactNode } from 'react';
import { PokemonDataContext, usePokemonDataLoader } from '@/hooks/usePokemonData';

type Props = {
  children: ReactNode;
};

/**
 * ポケモンマスターデータをアプリ全体に提供するProvider
 * layout.tsx でアプリをラップして使用する
 */
export default function PokemonDataProvider({ children }: Props) {
  const data = usePokemonDataLoader();

  return (
    <PokemonDataContext.Provider value={data}>
      {children}
    </PokemonDataContext.Provider>
  );
}
