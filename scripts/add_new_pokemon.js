const fs = require('fs');
const path = require('path');

const MOCK_DATA_PATH = path.join(__dirname, '../data/mockData.ts');

// New Pokémon data from 寝顔追加情報.md
const newPokemon = [
    {
        id: "p133_ハロウィンイーブイ",
        dexNumber: 133,
        name: "ハロウィンイーブイ",
        type: "ノーマル",
        sleepType: "すやすや",
        fields: ["ワカクサ本島", "ワカクサ本島EX"],
        styles: [
            { id: "p133_ハロウィンイーブイ-1", name: "まるまり寝", rarity: 1 },
            { id: "p133_ハロウィンイーブイ-2", name: "たれみみ寝", rarity: 2 }
        ]
    },
    {
        id: "p328_ナックラー",
        dexNumber: 328,
        name: "ナックラー",
        type: "ノーマル",
        sleepType: "ぐっすり",
        fields: ["トープ洞窟", "アンバー渓谷"],
        styles: [
            { id: "p328_ナックラー-1", name: "ぺったり寝", rarity: 1 },
            { id: "p328_ナックラー-2", name: "ストレッチ寝", rarity: 2 },
            { id: "p328_ナックラー-3", name: "もぐり寝", rarity: 3 },
            { id: "p328_ナックラー-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p329_ビブラーバ",
        dexNumber: 329,
        name: "ビブラーバ",
        type: "ノーマル",
        sleepType: "ぐっすり",
        fields: ["トープ洞窟", "アンバー渓谷"],
        styles: [
            { id: "p329_ビブラーバ-1", name: "はねやすめ寝", rarity: 1 },
            { id: "p329_ビブラーバ-2", name: "2番目の寝顔", rarity: 2 },
            { id: "p329_ビブラーバ-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p329_ビブラーバ-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p330_フライゴン",
        dexNumber: 330,
        name: "フライゴン",
        type: "ノーマル",
        sleepType: "ぐっすり",
        fields: ["トープ洞窟", "アンバー渓谷"],
        styles: [
            { id: "p330_フライゴン-1", name: "まるまり寝", rarity: 1 },
            { id: "p330_フライゴン-2", name: "2番目の寝顔", rarity: 2 },
            { id: "p330_フライゴン-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p330_フライゴン-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p371_タツベイ",
        dexNumber: 371,
        name: "タツベイ",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["アンバー渓谷"],
        styles: [
            { id: "p371_タツベイ-1", name: "そらとびたい寝", rarity: 1 },
            { id: "p371_タツベイ-2", name: "おおあくび寝", rarity: 2 },
            { id: "p371_タツベイ-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p371_タツベイ-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p372_コモルー",
        dexNumber: 372,
        name: "コモルー",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["アンバー渓谷"],
        styles: [
            { id: "p372_コモルー-1", name: "1番目の寝顔", rarity: 1 },
            { id: "p372_コモルー-2", name: "2番目の寝顔", rarity: 2 },
            { id: "p372_コモルー-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p372_コモルー-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p373_ボーマンダ",
        dexNumber: 373,
        name: "ボーマンダ",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["アンバー渓谷"],
        styles: [
            { id: "p373_ボーマンダ-1", name: "1番目の寝顔", rarity: 1 },
            { id: "p373_ボーマンダ-2", name: "2番目の寝顔", rarity: 2 },
            { id: "p373_ボーマンダ-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p373_ボーマンダ-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p557_イシズマイ",
        dexNumber: 557,
        name: "イシズマイ",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["アンバー渓谷"],
        styles: [
            { id: "p557_イシズマイ-1", name: "からにこもる寝", rarity: 1 },
            { id: "p557_イシズマイ-2", name: "こもらない寝", rarity: 2 },
            { id: "p557_イシズマイ-3", name: "からだいじ寝", rarity: 3 },
            { id: "p557_イシズマイ-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p558_イワパレス",
        dexNumber: 558,
        name: "イワパレス",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["アンバー渓谷"],
        styles: [
            { id: "p558_イワパレス-1", name: "1番目の寝顔", rarity: 1 },
            { id: "p558_イワパレス-2", name: "2番目の寝顔", rarity: 2 },
            { id: "p558_イワパレス-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p558_イワパレス-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p710_バケッチャ",
        dexNumber: 710,
        name: "バケッチャ",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["ワカクサ本島", "ゴールド旧発電所", "アンバー渓谷", "ワカクサ本島EX"],
        styles: [
            { id: "p710_バケッチャ-1", name: "うまり寝", rarity: 1 },
            { id: "p710_バケッチャ-2", name: "うかびぱたぱた寝", rarity: 2 },
            { id: "p710_バケッチャ-3", name: "ひかりてらし寝", rarity: 3 },
            { id: "p710_バケッチャ-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    },
    {
        id: "p711_パンプジン",
        dexNumber: 711,
        name: "パンプジン",
        type: "ノーマル",
        sleepType: "うとうと",
        fields: ["ワカクサ本島", "ゴールド旧発電所", "アンバー渓谷", "ワカクサ本島EX"],
        styles: [
            { id: "p711_パンプジン-1", name: "だきしめ寝", rarity: 1 },
            { id: "p711_パンプジン-2", name: "2番目の寝顔", rarity: 2 },
            { id: "p711_パンプジン-3", name: "3番目の寝顔", rarity: 3 },
            { id: "p711_パンプジン-4", name: "おなかのうえ寝", rarity: 4 }
        ]
    }
];

// Read the current mockData.ts
let content = fs.readFileSync(MOCK_DATA_PATH, 'utf-8');

// 1. Add "アンバー渓谷" to FIELD_NAMES if not already present
if (!content.includes('"アンバー渓谷"')) {
    content = content.replace(
        '"ワカクサ本島EX"',
        '"ワカクサ本島EX",\n    "アンバー渓谷"'
    );
    console.log('Added "アンバー渓谷" to FIELD_NAMES');
}

// 2. Find the end of MOCK_POKEMON array
const arrayEndMatch = content.match(/export const MOCK_POKEMON: Pokemon\[\] = \[[\s\S]*\];/);
if (!arrayEndMatch) {
    console.error('Could not find MOCK_POKEMON array');
    process.exit(1);
}

// Find the position just before the closing ];
const closingBracketIndex = content.lastIndexOf('];');
const insertPosition = content.lastIndexOf(',', closingBracketIndex) + 1;

// 3. Generate the new Pokémon entries
const newEntries = newPokemon.map(pokemon => {
    const stylesStr = pokemon.styles.map(style =>
        `            {\n                "id": "${style.id}",\n                "name": "${style.name}",\n                "rarity": ${style.rarity}\n            }`
    ).join(',\n');

    const fieldsStr = pokemon.fields.map(f => `"${f}"`).join(',\n            ');

    return `    {
        "id": "${pokemon.id}",
        "dexNumber": ${pokemon.dexNumber},
        "name": "${pokemon.name}",
        "type": "${pokemon.type}",
        "sleepType": "${pokemon.sleepType}",
        "fields": [
            ${fieldsStr}
        ],
        "styles": [
${stylesStr}
        ]
    }`;
}).join(',\n');

// Insert the new entries
const before = content.substring(0, insertPosition);
const after = content.substring(insertPosition);
content = before + ',\n' + newEntries + after;

// Write back to file
fs.writeFileSync(MOCK_DATA_PATH, content, 'utf-8');

console.log(`Successfully added ${newPokemon.length} new Pokémon to mockData.ts`);
console.log('Added Pokémon:');
newPokemon.forEach(p => console.log(`  - ${p.name} (No.${p.dexNumber})`));
