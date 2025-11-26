const fs = require('fs');
const path = require('path');

const MOCK_DATA_PATH = path.join(__dirname, '../data/mockData.ts');

// Read the current mockData.ts
let content = fs.readFileSync(MOCK_DATA_PATH, 'utf-8');

// Extract the MOCK_POKEMON array
const arrayMatch = content.match(/export const MOCK_POKEMON: Pokemon\[\] = (\[[\s\S]*?\]);/);
if (!arrayMatch) {
    console.error('Could not find MOCK_POKEMON array');
    process.exit(1);
}

const arrayString = arrayMatch[1];

// Parse the array (we'll use a simple approach - extract each Pokemon object)
const pokemonObjects = [];
let currentObject = '';
let braceCount = 0;
let inArray = false;

for (let i = 1; i < arrayString.length - 1; i++) {
    const char = arrayString[i];

    if (char === '{' && !inArray) {
        braceCount++;
        currentObject += char;
    } else if (char === '}' && !inArray) {
        currentObject += char;
        braceCount--;

        if (braceCount === 0 && currentObject.trim()) {
            pokemonObjects.push(currentObject.trim());
            currentObject = '';
        }
    } else if (char === '[') {
        inArray = true;
        currentObject += char;
    } else if (char === ']') {
        inArray = false;
        currentObject += char;
    } else {
        currentObject += char;
    }
}

console.log(`Found ${pokemonObjects.length} Pokémon`);

// Parse each Pokemon to extract dexNumber for sorting
const pokemonWithDex = pokemonObjects.map(objStr => {
    const dexMatch = objStr.match(/"dexNumber":\s*(\d+)/);
    const dexNumber = dexMatch ? parseInt(dexMatch[1]) : 9999;
    return { dexNumber, objStr };
});

// Sort by dexNumber
pokemonWithDex.sort((a, b) => a.dexNumber - b.dexNumber);

console.log('Sorted Pokémon by dexNumber');

// Reconstruct the array
const sortedArray = '[\n    ' + pokemonWithDex.map(p => p.objStr).join(',\n    ') + '\n]';

// Replace in the content
const newContent = content.replace(
    /export const MOCK_POKEMON: Pokemon\[\] = \[[\s\S]*?\];/,
    `export const MOCK_POKEMON: Pokemon[] = ${sortedArray};`
);

// Write back to file
fs.writeFileSync(MOCK_DATA_PATH, newContent, 'utf-8');

console.log('Successfully sorted MOCK_POKEMON array by dexNumber');
console.log('\nFirst 5 Pokémon:');
pokemonWithDex.slice(0, 5).forEach(p => {
    const nameMatch = p.objStr.match(/"name":\s*"([^"]+)"/);
    console.log(`  No.${p.dexNumber}: ${nameMatch ? nameMatch[1] : 'Unknown'}`);
});

console.log('\nLast 5 Pokémon:');
pokemonWithDex.slice(-5).forEach(p => {
    const nameMatch = p.objStr.match(/"name":\s*"([^"]+)"/);
    console.log(`  No.${p.dexNumber}: ${nameMatch ? nameMatch[1] : 'Unknown'}`);
});
