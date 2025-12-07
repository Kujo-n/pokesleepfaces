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

// 複数ポケモンカードの全選択/全解除テスト
describe('PokemonCard - 複数カード一括操作', () => {
  const mockPokemonList: Pokemon[] = [
    {
      id: 'poke-001',
      dexNumber: 1,
      name: 'フシギダネ',
      sleepType: 'うとうと',
      type: 'くさ',
      fields: ['ワカクサ'],
      styles: [
        { id: 'poke-001-style1', name: 'スタイルA', rarity: 1 },
        { id: 'poke-001-style2', name: 'スタイルB', rarity: 2 }
      ]
    },
    {
      id: 'poke-002',
      dexNumber: 25,
      name: 'ピカチュウ',
      sleepType: 'すやすや',
      type: 'でんき',
      fields: ['ワカクサ', 'シアン'],
      styles: [
        { id: 'poke-002-style1', name: 'スタイルC', rarity: 1 },
        { id: 'poke-002-style2', name: 'スタイルD', rarity: 3 }
      ]
    },
    {
      id: 'poke-003',
      dexNumber: 133,
      name: 'イーブイ',
      sleepType: 'ぐっすり',
      type: 'ノーマル',
      fields: ['シアン', 'トープ'],
      styles: [
        { id: 'poke-003-style1', name: 'スタイルE', rarity: 1 },
        { id: 'poke-003-style2', name: 'スタイルF', rarity: 2 },
        { id: 'poke-003-style3', name: 'スタイルG', rarity: 4 }
      ]
    }
  ];

  test('3つのカードそれぞれで全選択が正しく呼ばれる', () => {
    const onToggleAll = jest.fn();
    const collectedStyles = new Set<string>();

    const { rerender } = render(
      <>
        {mockPokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            collectedStyles={collectedStyles}
            onToggleStyle={jest.fn()}
            onToggleAll={onToggleAll}
          />
        ))}
      </>
    );

    // 各カードの全選択ボタンをクリック
    const selectAllButtons = screen.getAllByText('全選択');
    expect(selectAllButtons).toHaveLength(3);

    selectAllButtons.forEach((btn, index) => {
      fireEvent.click(btn);
      expect(onToggleAll).toHaveBeenNthCalledWith(index + 1, mockPokemonList[index], true);
    });

    expect(onToggleAll).toHaveBeenCalledTimes(3);
  });

  test('3つのカードそれぞれで全解除が正しく呼ばれる', () => {
    const onToggleAll = jest.fn();
    // 全てのスタイルが収集済みの状態
    const collectedStyles = new Set<string>([
      'poke-001-style1', 'poke-001-style2',
      'poke-002-style1', 'poke-002-style2',
      'poke-003-style1', 'poke-003-style2', 'poke-003-style3'
    ]);

    render(
      <>
        {mockPokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            collectedStyles={collectedStyles}
            onToggleStyle={jest.fn()}
            onToggleAll={onToggleAll}
          />
        ))}
      </>
    );

    // 各カードの全解除ボタンをクリック
    const deselectAllButtons = screen.getAllByText('全解除');
    expect(deselectAllButtons).toHaveLength(3);

    deselectAllButtons.forEach((btn, index) => {
      fireEvent.click(btn);
      expect(onToggleAll).toHaveBeenNthCalledWith(index + 1, mockPokemonList[index], false);
    });

    expect(onToggleAll).toHaveBeenCalledTimes(3);
  });

  test('全選択→全解除の連続操作が正しく動作する', () => {
    const onToggleAll = jest.fn();
    const collectedStyles = new Set<string>();

    render(
      <>
        {mockPokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            collectedStyles={collectedStyles}
            onToggleStyle={jest.fn()}
            onToggleAll={onToggleAll}
          />
        ))}
      </>
    );

    const selectAllButtons = screen.getAllByText('全選択');
    const deselectAllButtons = screen.getAllByText('全解除');

    // 各カードで「全選択」→「全解除」を連続実行
    for (let i = 0; i < 3; i++) {
      fireEvent.click(selectAllButtons[i]);
      fireEvent.click(deselectAllButtons[i]);
    }

    // 計6回呼ばれている（3カード × 2操作）
    expect(onToggleAll).toHaveBeenCalledTimes(6);

    // 正しい順序で呼ばれているか確認
    expect(onToggleAll).toHaveBeenNthCalledWith(1, mockPokemonList[0], true);
    expect(onToggleAll).toHaveBeenNthCalledWith(2, mockPokemonList[0], false);
    expect(onToggleAll).toHaveBeenNthCalledWith(3, mockPokemonList[1], true);
    expect(onToggleAll).toHaveBeenNthCalledWith(4, mockPokemonList[1], false);
    expect(onToggleAll).toHaveBeenNthCalledWith(5, mockPokemonList[2], true);
    expect(onToggleAll).toHaveBeenNthCalledWith(6, mockPokemonList[2], false);
  });

  test('収集状態に応じて正しいカウントが表示される', () => {
    // 部分的に収集済みの状態
    const collectedStyles = new Set<string>([
      'poke-001-style1', // フシギダネ: 1/2
      'poke-002-style1', 'poke-002-style2', // ピカチュウ: 2/2
      // イーブイ: 0/3
    ]);

    render(
      <>
        {mockPokemonList.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            collectedStyles={collectedStyles}
            onToggleStyle={jest.fn()}
            onToggleAll={jest.fn()}
          />
        ))}
      </>
    );

    // 各カードの収集状況が正しく表示されているか
    expect(screen.getByText('1 / 2')).toBeInTheDocument(); // フシギダネ
    expect(screen.getByText('2 / 2')).toBeInTheDocument(); // ピカチュウ
    expect(screen.getByText('0 / 3')).toBeInTheDocument(); // イーブイ
  });
});

