const axios = require('axios');
const fs = require('fs');
const path = require('path');

// スプレッドシートID
const SPREADSHEET_ID = '1ICPss2oPRC9PDJz2HTnSNn-QY2noYuw5ONc-W78AxjU';

// 各シートのGID（シートID）
// 公開されたHTMLから取得したIDを使用
const SHEET_GIDS = {
    pokemon: '0',
    styles: '1333359802',
    fields: '2090466339'
};

// CSVエクスポートURLを構築
const SHEET_URLS = {
    pokemon: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GIDS.pokemon}`,
    styles: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GIDS.styles}`,
    fields: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GIDS.fields}`
};

/**
 * Google SheetsからCSVデータを取得する
 * @param {string} url - CSV公開URL
 * @returns {Promise<Array<Array<string>>>} - 2次元配列のデータ
 */
async function fetchCSVData(url) {
    try {
        const response = await axios.get(url);
        const csvText = response.data;

        // CSVをパース
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        return lines.map(line => {
            // 簡易的なCSVパース（ダブルクォートで囲まれたカンマを考慮）
            const values = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"') {
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    values.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }
            values.push(current.trim());

            return values;
        });
    } catch (error) {
        console.error(`❌ Error fetching CSV from ${url}:`, error.message);
        throw error;
    }
}

/**
 * 2次元配列をオブジェクトの配列に変換する
 * @param {Array<Array<string>>} data - 2次元配列データ
 * @returns {Array<Object>} - オブジェクトの配列
 */
function parseSheetData(data) {
    if (data.length === 0) return [];

    const headers = data[0]; // 1行目がヘッダー
    const rows = data.slice(1); // 2行目以降がデータ

    return rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index] || '';
        });
        return obj;
    });
}



/**
 * メイン処理
 */
async function main() {
    console.log('🚀 Starting Google Sheets data sync...\n');

    try {
        // 1. 各シートのデータを取得
        console.log('📥 Fetching data from Google Sheets...');
        const [pokemonData, stylesData, fieldsData] = await Promise.all([
            fetchCSVData(SHEET_URLS.pokemon),
            fetchCSVData(SHEET_URLS.styles),
            fetchCSVData(SHEET_URLS.fields)
        ]);

        // 2. データをパース
        console.log('📊 Parsing sheet data...');
        const pokemon = parseSheetData(pokemonData);
        const styles = parseSheetData(stylesData);
        const fields = parseSheetData(fieldsData);

        // 3. Fieldsをorder順にソートして配列に変換
        const sortedFields = fields
            .sort((a, b) => parseInt(a.order) - parseInt(b.order))
            .map(f => f.name);

        console.log(`✅ Loaded ${pokemon.length} Pokemon, ${styles.length} Styles, ${sortedFields.length} Fields\n`);

        // 4. Pokemonデータを処理
        console.log('🔨 Processing Pokemon data...');
        const processedPokemon = pokemon.map(p => {
            // IDを自動生成
            const id = `p${p.dexNumber}_${p.name}`;

            // fieldsを列から取得
            // sortedFieldsにあるフィールド名の列の値が 'TRUE' の場合のみ採用
            const fieldsArray = sortedFields.filter(fieldName => {
                const val = p[fieldName];
                return val && val.trim().toUpperCase() === 'TRUE';
            });

            // このポケモンに対応するstylesを取得
            const pokemonStyles = styles
                .filter(s => s.pokemonName === p.name)
                .map((s, index) => {
                    // Style IDを自動生成
                    const styleId = `p${p.dexNumber}_${p.name}-${index + 1}`;

                    // この寝顔の出現フィールドを列から取得
                    // フィールド名の列の値が 'TRUE' の場合のみ採用
                    const styleFields = sortedFields.filter(fieldName => {
                        const val = s[fieldName];
                        return val && val.trim().toUpperCase() === 'TRUE';
                    });

                    // ポケモンの出現フィールドのうち、この寝顔では出現しないものを抽出
                    const excludeFromFields = fieldsArray.filter(f => !styleFields.includes(f));

                    // 基本プロパティ
                    const result = {
                        id: styleId,
                        name: s.styleName,
                        rarity: parseInt(s.rarity)
                    };

                    // 除外フィールドがある場合のみプロパティを追加（データ量削減）
                    if (excludeFromFields.length > 0) {
                        result.excludeFromFields = excludeFromFields;
                    }

                    return result;
                });

            // バリデーション: stylesが見つからない場合は警告
            if (pokemonStyles.length === 0) {
                console.warn(`⚠️  Warning: No styles found for Pokemon "${p.name}"`);
            }

            return {
                id: id,
                dexNumber: parseInt(p.dexNumber),
                name: p.name,
                type: p.type,
                sleepType: p.sleepType,
                fields: fieldsArray,
                styles: pokemonStyles
            };
        });

        // 5. TypeScriptコードを生成
        console.log('📝 Generating TypeScript code...');
        const tsCode = generateTypeScriptCode(sortedFields, processedPokemon);

        // 6. ファイルに書き込み
        const outputPath = path.join(__dirname, '../data/mockData.ts');
        fs.writeFileSync(outputPath, tsCode, 'utf-8');

        console.log(`\n✅ Successfully generated ${outputPath}`);
        console.log(`📊 Summary: ${processedPokemon.length} Pokemon, ${sortedFields.length} Fields`);

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

/**
 * TypeScriptコードを生成する
 * @param {Array<string>} fields - フィールド名の配列
 * @param {Array<Object>} pokemon - ポケモンデータの配列
 * @returns {string} - TypeScriptコード
 */
function generateTypeScriptCode(fields, pokemon) {
    return `export type SleepStyle = {
    id: string;
    name: string;
    rarity: number; // 1-4 stars
    excludeFromFields?: string[]; // ポケモンfieldsから除外するフィールド（省略時は全fields出現）
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

export const FIELD_NAMES = ${JSON.stringify(fields, null, 4)};

export const MOCK_POKEMON: Pokemon[] = ${JSON.stringify(pokemon, null, 4)};
`;
}

// スクリプト実行
main();
