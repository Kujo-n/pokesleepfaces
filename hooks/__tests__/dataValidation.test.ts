
import { MOCK_POKEMON } from '@/data/mockData';

// I need to use ts-node or run via jest or similar.
// Since I already have a working test setup, I will use a test file for this check.

describe('ID Consistency Check', () => {
    it('All style IDs should start with their Pokemon ID', () => {
        const inconsistencies = [];
        MOCK_POKEMON.forEach(p => {
            p.styles.forEach(s => {
                // We expect style ID to contain Pokemon ID.
                // Format seems to be: {PokemonID}-{Index}
                // But strictly checking startsWith is safer.
                if (!s.id.startsWith(p.id)) {
                    inconsistencies.push({
                        pokemonId: p.id,
                        styleId: s.id
                    });
                }
            });
        });

        if (inconsistencies.length > 0) {
            console.error('Found inconsistencies:', inconsistencies);
        }
        expect(inconsistencies.length).toBe(0);
    });
});
