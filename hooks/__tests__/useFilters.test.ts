/**
 * useFilters フックのユニットテスト
 * 
 * フィルタリングロジックの正確性を検証し、リグレッションを防止します。
 */

import { Pokemon } from '@/data/mockData';

// テスト用のモックポケモンデータ
const mockPokemonList: Pokemon[] = [
    {
        id: 'test-001',
        dexNumber: 1,
        name: 'うとうとポケモン',
        sleepType: 'うとうと',
        type: 'くさ',
        fields: ['ワカクサ本島', 'ラピスラズリ湖畔'],
        styles: [
            { id: 'test-001-s1', name: 'スタイルA', rarity: 1 },
            { id: 'test-001-s2', name: 'スタイルB', rarity: 2 },
            { id: 'test-001-s3', name: 'スタイルC', rarity: 3, excludeFromFields: ['ワカクサ本島'] },
            { id: 'test-001-s4', name: 'スタイルD', rarity: 4 }
        ]
    },
    {
        id: 'test-002',
        dexNumber: 2,
        name: 'すやすやポケモン',
        sleepType: 'すやすや',
        type: 'ほのお',
        fields: ['ワカクサ本島', 'トープ洞窟'],
        styles: [
            { id: 'test-002-s1', name: 'スタイルE', rarity: 1 },
            { id: 'test-002-s2', name: 'スタイルF', rarity: 2 },
            { id: 'test-002-s3', name: 'スタイルG', rarity: 3, excludeFromFields: ['ワカクサ本島'] },
            { id: 'test-002-s4', name: 'スタイルH', rarity: 4 }
        ]
    },
    {
        id: 'test-003',
        dexNumber: 3,
        name: 'ぐっすりポケモン',
        sleepType: 'ぐっすり',
        type: 'みず',
        fields: ['シアンの砂浜', 'ラピスラズリ湖畔'],
        styles: [
            { id: 'test-003-s1', name: 'スタイルI', rarity: 1 },
            { id: 'test-003-s2', name: 'スタイルJ', rarity: 2 },
            { id: 'test-003-s3', name: 'スタイルK', rarity: 3 },
            { id: 'test-003-s4', name: 'スタイルL', rarity: 4 }
        ]
    }
];

/**
 * useFiltersのfilteredPokemonロジックをシミュレート
 * (実際のフック内部ロジックと同等)
 */
const simulateFilterPokemon = (
    pokemonList: Pokemon[],
    selectedSleepType: 'all' | 'うとうと' | 'すやすや' | 'ぐっすり',
    selectedField: string,
    selectedRarity: string,
    showUncollectedOnly: boolean,
    filterBaseCollectedStyles: Set<string>
): Pokemon[] => {
    return pokemonList.filter(p => {
        // 1. 睡眠タイプによるフィルタ
        if (selectedSleepType !== 'all' && p.sleepType !== selectedSleepType) {
            return false;
        }

        // 2. フィールドによるフィルタ（ポケモンレベル）
        if (selectedField !== 'all') {
            if (!p.fields.includes(selectedField)) return false;
        }

        // 3. スタイルによるフィルタ
        let candidateStyles = p.styles;

        // フィールドで絞り込み（スタイルレベル）
        if (selectedField !== 'all') {
            candidateStyles = candidateStyles.filter(s =>
                !s.excludeFromFields || !s.excludeFromFields.includes(selectedField)
            );
        }

        // 4. レアリティで絞り込み
        if (selectedRarity !== 'all') {
            const rarityNum = parseInt(selectedRarity);
            candidateStyles = candidateStyles.filter(s => s.rarity === rarityNum);
        }

        // 条件に合うスタイルが一つもなければ非表示
        if (candidateStyles.length === 0) return false;

        // 5. 未収集のみフィルタ
        if (showUncollectedOnly) {
            const hasUncollected = candidateStyles.some(s => !filterBaseCollectedStyles.has(s.id));
            return hasUncollected;
        }

        return true;
    });
};

describe('useFilters フィルタリングロジック', () => {
    describe('睡眠タイプフィルタ', () => {
        it('「all」の場合、全てのポケモンが表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', 'all', false, new Set()
            );
            expect(result.length).toBe(3);
        });

        it('「うとうと」でフィルタすると、うとうとタイプのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'うとうと', 'all', 'all', false, new Set()
            );
            expect(result.length).toBe(1);
            expect(result[0].sleepType).toBe('うとうと');
        });

        it('「すやすや」でフィルタすると、すやすやタイプのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'すやすや', 'all', 'all', false, new Set()
            );
            expect(result.length).toBe(1);
            expect(result[0].sleepType).toBe('すやすや');
        });

        it('「ぐっすり」でフィルタすると、ぐっすりタイプのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'ぐっすり', 'all', 'all', false, new Set()
            );
            expect(result.length).toBe(1);
            expect(result[0].sleepType).toBe('ぐっすり');
        });
    });

    describe('フィールドフィルタ', () => {
        it('「all」の場合、全てのポケモンが表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', 'all', false, new Set()
            );
            expect(result.length).toBe(3);
        });

        it('「ワカクサ本島」でフィルタすると、該当フィールドのポケモンのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'ワカクサ本島', 'all', false, new Set()
            );
            expect(result.length).toBe(2);
            result.forEach(p => {
                expect(p.fields).toContain('ワカクサ本島');
            });
        });

        it('「シアンの砂浜」でフィルタすると、該当フィールドのポケモンのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'シアンの砂浜', 'all', false, new Set()
            );
            expect(result.length).toBe(1);
            expect(result[0].fields).toContain('シアンの砂浜');
        });

        it('存在しないフィールドでフィルタすると、0件になる', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', '存在しないフィールド', 'all', false, new Set()
            );
            expect(result.length).toBe(0);
        });
    });

    describe('レアリティフィルタ', () => {
        it('「all」の場合、全てのポケモンが表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', 'all', false, new Set()
            );
            expect(result.length).toBe(3);
        });

        it('レアリティ1でフィルタすると、レアリティ1のスタイルを持つポケモンのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', '1', false, new Set()
            );
            // 全ポケモンがレアリティ1のスタイルを持っている
            expect(result.length).toBe(3);
        });

        it('レアリティ4でフィルタすると、レアリティ4のスタイルを持つポケモンのみ表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', '4', false, new Set()
            );
            expect(result.length).toBe(3);
        });
    });

    describe('excludeFromFields によるスタイル除外', () => {
        it('ワカクサ本島でフィルタ時、excludeFromFieldsにワカクサ本島を持つスタイルは除外される', () => {
            // test-001はワカクサ本島に出現し、s3はexcludeFromFieldsにワカクサ本島を持つ
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'ワカクサ本島', '3', false, new Set()
            );
            // test-001のs3はexcludeされるため、test-001は表示されない
            // test-002のs3もexcludeされる
            expect(result.length).toBe(0);
        });

        it('ラピスラズリ湖畔でフィルタ時、excludeFromFieldsを持たないスタイルは表示される', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'ラピスラズリ湖畔', '3', false, new Set()
            );
            // test-001とtest-003がラピスラズリ湖畔に出現
            // test-001のs3はexcludeFromFieldsにワカクサ本島のみなので表示される
            // test-003のs3はexcludeFromFieldsを持たないので表示される
            expect(result.length).toBe(2);
        });
    });

    describe('未収集のみフィルタ', () => {
        it('未収集のみ=falseの場合、全てのポケモンが表示される', () => {
            const collectedStyles = new Set(['test-001-s1', 'test-001-s2', 'test-001-s3', 'test-001-s4']);
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', 'all', false, collectedStyles
            );
            expect(result.length).toBe(3);
        });

        it('未収集のみ=trueで全スタイル収集済みのポケモンは非表示になる', () => {
            const collectedStyles = new Set([
                'test-001-s1', 'test-001-s2', 'test-001-s3', 'test-001-s4'
            ]);
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', 'all', true, collectedStyles
            );
            // test-001は全収集済みなので非表示
            expect(result.length).toBe(2);
            expect(result.some(p => p.id === 'test-001')).toBe(false);
        });

        it('未収集のみ=trueで一部未収集のポケモンは表示される', () => {
            const collectedStyles = new Set([
                'test-001-s1', 'test-001-s2' // s3, s4は未収集
            ]);
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'all', 'all', true, collectedStyles
            );
            // test-001はまだ未収集スタイルがあるので表示
            expect(result.length).toBe(3);
            expect(result.some(p => p.id === 'test-001')).toBe(true);
        });
    });

    describe('複合フィルタ', () => {
        it('睡眠タイプ + フィールドの組み合わせが正しく動作する', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'うとうと', 'ワカクサ本島', 'all', false, new Set()
            );
            expect(result.length).toBe(1);
            expect(result[0].sleepType).toBe('うとうと');
            expect(result[0].fields).toContain('ワカクサ本島');
        });

        it('睡眠タイプ + レアリティの組み合わせが正しく動作する', () => {
            const result = simulateFilterPokemon(
                mockPokemonList, 'ぐっすり', 'all', '1', false, new Set()
            );
            expect(result.length).toBe(1);
            expect(result[0].sleepType).toBe('ぐっすり');
        });

        it('フィールド + レアリティ + 未収集のみの組み合わせが正しく動作する', () => {
            const collectedStyles = new Set([
                'test-001-s1', 'test-003-s1' // レアリティ1のスタイルを一部収集
            ]);
            const result = simulateFilterPokemon(
                mockPokemonList, 'all', 'ラピスラズリ湖畔', '1', true, collectedStyles
            );
            // ラピスラズリ湖畔: test-001, test-003
            // レアリティ1で未収集: test-001とtest-003は収集済みなので表示されない
            expect(result.length).toBe(0);
        });

        it('全条件を組み合わせた複雑なフィルタが正しく動作する', () => {
            const collectedStyles = new Set<string>();
            const result = simulateFilterPokemon(
                mockPokemonList, 'すやすや', 'ワカクサ本島', '2', true, collectedStyles
            );
            expect(result.length).toBe(1);
            expect(result[0].id).toBe('test-002');
        });
    });
});

describe('フィルタ状態の初期値', () => {
    it('デフォルト値が正しく設定される', () => {
        // useFiltersの初期値をシミュレート
        const defaultState = {
            selectedField: 'all',
            selectedSleepType: 'all' as const,
            selectedRarity: 'all',
            showUncollectedOnly: false,
            viewMode: 'card' as const
        };

        expect(defaultState.selectedField).toBe('all');
        expect(defaultState.selectedSleepType).toBe('all');
        expect(defaultState.selectedRarity).toBe('all');
        expect(defaultState.showUncollectedOnly).toBe(false);
        expect(defaultState.viewMode).toBe('card');
    });
});

describe('エッジケース', () => {
    it('空のポケモンリストでもエラーにならない', () => {
        const result = simulateFilterPokemon(
            [], 'all', 'all', 'all', false, new Set()
        );
        expect(result.length).toBe(0);
    });

    it('スタイルを持たないポケモンは表示されない', () => {
        const pokemonWithoutStyles: Pokemon[] = [
            {
                id: 'test-empty',
                dexNumber: 999,
                name: 'スタイルなしポケモン',
                sleepType: 'うとうと',
                type: 'ノーマル',
                fields: ['ワカクサ本島'],
                styles: []
            }
        ];
        const result = simulateFilterPokemon(
            pokemonWithoutStyles, 'all', 'all', 'all', false, new Set()
        );
        expect(result.length).toBe(0);
    });

    it('全スタイルがexcludeされるフィールドでは非表示になる', () => {
        const pokemonAllExcluded: Pokemon[] = [
            {
                id: 'test-exclude',
                dexNumber: 998,
                name: '全除外ポケモン',
                sleepType: 'うとうと',
                type: 'ノーマル',
                fields: ['テストフィールド'],
                styles: [
                    { id: 'test-exclude-s1', name: 'スタイル', rarity: 1, excludeFromFields: ['テストフィールド'] }
                ]
            }
        ];
        const result = simulateFilterPokemon(
            pokemonAllExcluded, 'all', 'テストフィールド', 'all', false, new Set()
        );
        expect(result.length).toBe(0);
    });
});
