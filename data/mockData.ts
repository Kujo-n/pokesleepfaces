export type SleepStyle = {
    id: string;
    name: string;
    rarity: number; // 1-4 stars
};

export type Pokemon = {
    id: string;
    dexNumber: number;
    name: string;
    type: string;
    sleepType: 'うとうと' | 'すやすや' | 'ぐっすり';
    fields: string[]; // 出現フィールド
    styles: SleepStyle[];
};

export const FIELD_NAMES = [
    'ワカクサ本島',
    'ワカクサ本島Ex',
    'シアンの砂浜',
    'トープ洞窟',
    'ウノハナ雪原',
    'ラピスラズリ湖畔',
    'ゴールド旧発電所',
    'アンバー渓谷',
];

export const MOCK_POKEMON: Pokemon[] = [
    {
        id: 'bulbasaur',
        dexNumber: 1,
        name: 'フシギダネ',
        type: 'grass',
        sleepType: 'うとうと',
        fields: ['ワカクサ本島', 'ラピスラズリ湖畔'],
        styles: [
            { id: 'bulbasaur-1', name: 'こうごうせい寝', rarity: 1 },
            { id: 'bulbasaur-2', name: 'ふんばり寝', rarity: 2 },
            { id: 'bulbasaur-3', name: 'ツルだして寝', rarity: 3 },
            { id: 'bulbasaur-4', name: 'おなかのうえ寝', rarity: 4 },
        ],
    },
    {
        id: 'charmander',
        dexNumber: 4,
        name: 'ヒトカゲ',
        type: 'fire',
        sleepType: 'すやすや',
        fields: ['ワカクサ本島', 'トープ洞窟'],
        styles: [
            { id: 'charmander-1', name: 'しっぽゆらゆら寝', rarity: 1 },
            { id: 'charmander-2', name: 'まるまり寝', rarity: 2 },
            { id: 'charmander-3', name: 'ばんざい寝', rarity: 3 },
            { id: 'charmander-4', name: 'おなかのうえ寝', rarity: 4 },
        ],
    },
    {
        id: 'squirtle',
        dexNumber: 7,
        name: 'ゼニガメ',
        type: 'water',
        sleepType: 'ぐっすり',
        fields: ['ワカクサ本島', 'シアンの砂浜'],
        styles: [
            { id: 'squirtle-1', name: 'からにこもる寝', rarity: 1 },
            { id: 'squirtle-2', name: 'あおむけ寝', rarity: 2 },
            { id: 'squirtle-3', name: 'うつぶせ寝', rarity: 3 },
            { id: 'squirtle-4', name: 'おなかのうえ寝', rarity: 4 },
        ],
    },
    {
        id: 'pikachu',
        dexNumber: 25,
        name: 'ピカチュウ',
        type: 'electric',
        sleepType: 'うとうと',
        fields: ['ワカクサ本島'],
        styles: [
            { id: 'pikachu-1', name: 'まるまり寝', rarity: 1 },
            { id: 'pikachu-2', name: 'ほうでん寝', rarity: 2 },
            { id: 'pikachu-3', name: 'しりもち寝', rarity: 3 },
            { id: 'pikachu-4', name: 'おなかのうえ寝', rarity: 4 },
        ],
    },
];
