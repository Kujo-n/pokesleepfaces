const fs = require('fs');
const path = require('path');

const MOCK_DATA_PATH = path.join(__dirname, '../data/mockData.ts');

// New Pokémon data for ミカルゲ
const newPokemon = {
    id: "p442_ミカルゲ",
    dexNumber: 442,
    name: "ミカルゲ",
    type: "ノーマル",
    sleepType: "うとうと",
    // Note: Fixed "ラピスラズリの湖畔" to "ラピスラズリ湖畔" to match FIELD_NAMES
    fields: ["ワカクサ本島", "ウノハナ雪原", "ラピスラズリ湖畔", "アンバー渓谷", "ワカクサ本島EX"],
    styles: [
        { id: "p442_ミカルゲ-1", name: "1番目の寝顔", rarity: 1 },
        { id: "p442_ミカルゲ-2", name: "2番目の寝顔", rarity: 2 },
        { id: "p442_ミカルゲ-3", name: "3番目の寝顔", rarity: 3 },
        { id: "p442_ミカルゲ-4", name: "おなかのうえ寝", rarity: 4 }
    ]
};

// Read the current mockData.ts
let content = fs.readFileSync(MOCK_DATA_PATH, 'utf-8');

// Find the end of MOCK_POKEMON array
const closingBracketIndex = content.lastIndexOf('];');
const insertPosition = content.lastIndexOf(',', closingBracketIndex) + 1;

// Generate the new Pokémon entry
const stylesStr = newPokemon.styles.map(style =>
    `            {\n                "id": "${style.id}",\n                "name": "${style.name}",\n                "rarity": ${style.rarity}\n            }`
).join(',\n');

const fieldsStr = newPokemon.fields.map(f => `"${f}"`).join(',\n            ');

const newEntry = `    {
        "id": "${newPokemon.id}",
        "dexNumber": ${newPokemon.dexNumber},
        "name": "${newPokemon.name}",
        "type": "${newPokemon.type}",
        "sleepType": "${newPokemon.sleepType}",
        "fields": [
            ${fieldsStr}
        ],
        "styles": [
${stylesStr}
        ]
    }`;

// Insert the new entry
const before = content.substring(0, insertPosition);
const after = content.substring(insertPosition);
content = before + ',\n' + newEntry + after;

// Write back to file
fs.writeFileSync(MOCK_DATA_PATH, content, 'utf-8');

console.log(`Successfully added ${newPokemon.name} (No.${newPokemon.dexNumber}) to mockData.ts`);
console.log('Note: Fixed field name from "ラピスラズリの湖畔" to "ラピスラズリ湖畔" to match FIELD_NAMES');
