import fs from 'fs';
import Papa from 'papaparse';

// Read the CSV files
const offenseText = fs.readFileSync('./public/SDYS 2025 Final Stats - Offense.csv', 'utf8');
const pitchingText = fs.readFileSync('./public/SDYS 2025 Final Stats - Pitching.csv', 'utf8');
const defenseText = fs.readFileSync('./public/SDYS 2025 Final Stats - Defense.csv', 'utf8');
const catchingText = fs.readFileSync('./public/SDYS 2025 Final Stats - Catching.csv', 'utf8');

console.log('=== TESTING CSV PROCESSING ===\n');

// Test offense file
console.log('Testing Offense CSV:');
const offenseResult = Papa.parse(offenseText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
});

console.log('Raw rows:', offenseResult.data.length);
console.log('Headers:', Object.keys(offenseResult.data[0] || {}));
console.log('First row:', offenseResult.data[0]);

// Filter data
const offenseData = offenseResult.data.filter(row => {
    const playerName = row['Player Name'];
    return playerName && 
           playerName !== 'Totals' && 
           playerName.trim() !== '' &&
           playerName !== 'Player Name';
});

console.log('Filtered rows:', offenseData.length);
console.log('Sample player:', offenseData[0]);

console.log('\n=== END TEST ==='); 