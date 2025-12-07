import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '../PokemonCard';
import { Pokemon } from '@/data/mockData';

const mockPokemon: Pokemon = {
  id: 'test-001',
  dexNumber: 1,
  name: 'テストポケモン',
  sleepType: 'うとうと',
  type: 'くさ',
  fields: ['ワカクサ'],
  styles: [
    { id: 'style1', name: 'スタイル1', rarity: 1 },
    { id: 'style2', name: 'スタイル2', rarity: 2 }
  ]
};

describe('PokemonCard', () => {
  test('renders pokemon name and dex number', () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        collectedStyles={new Set()}
        onToggleStyle={jest.fn()}
        onToggleAll={jest.fn()}
      />
    );

    expect(screen.getByText('テストポケモン')).toBeInTheDocument();
    expect(screen.getByText('#001')).toBeInTheDocument();
  });

  test('displays correct collected count', () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        collectedStyles={new Set(['style1'])}
        onToggleStyle={jest.fn()}
        onToggleAll={jest.fn()}
      />
    );

    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  test('calls onToggleStyle when style button clicked', () => {
    const onToggleStyle = jest.fn();
    render(
      <PokemonCard
        pokemon={mockPokemon}
        collectedStyles={new Set()}
        onToggleStyle={onToggleStyle}
        onToggleAll={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText('スタイル1'));
    expect(onToggleStyle).toHaveBeenCalledWith('style1');
  });

  test('calls onToggleAll with correct parameters', () => {
    const onToggleAll = jest.fn();
    render(
      <PokemonCard
        pokemon={mockPokemon}
        collectedStyles={new Set()}
        onToggleStyle={jest.fn()}
        onToggleAll={onToggleAll}
      />
    );

    fireEvent.click(screen.getByText('全選択'));
    expect(onToggleAll).toHaveBeenCalledWith(mockPokemon, true);

    fireEvent.click(screen.getByText('全解除'));
    expect(onToggleAll).toHaveBeenCalledWith(mockPokemon, false);
  });

  test('filters styles by selectedField', () => {
    const multiFieldPokemon: Pokemon = {
      id: 'test-001',
      dexNumber: 1,
      name: 'テストポケモン',
      sleepType: 'うとうと',
      type: 'くさ',
      fields: ['ワカクサ', 'シアン'],
      styles: [
        { id: 'style1', name: 'スタイル1', rarity: 1 }, // excludeFromFieldsなし = 全フィールド出現
        { id: 'style2', name: 'スタイル2', rarity: 2, excludeFromFields: ['ワカクサ'] } // ワカクサでは出現しない
      ]
    };

    render(
      <PokemonCard
        pokemon={multiFieldPokemon}
        collectedStyles={new Set()}
        onToggleStyle={jest.fn()}
        onToggleAll={jest.fn()}
        selectedField="ワカクサ"
      />
    );

    expect(screen.getByText('スタイル1')).toBeInTheDocument();
    expect(screen.queryByText('スタイル2')).not.toBeInTheDocument();
  });
});
