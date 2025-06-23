#!/usr/bin/env node

/**
 * Data Update Script for SDYS Softball Dashboard
 * 
 * This script processes the CSV files and generates the embedded data structure
 * for the DataContext. Run this when you have new statistics to update.
 */

const fs = require('fs');
const path = require('path');

// Read the CSV files
const offenseData = fs.readFileSync('../data/SDYS 2025 Final Stats - Offense.csv', 'utf8');
const pitchingData = fs.readFileSync('../data/SDYS 2025 Final Stats - Pitching.csv', 'utf8');
const defenseData = fs.readFileSync('../data/SDYS 2025 Final Stats - Defense.csv', 'utf8');
const catchingData = fs.readFileSync('../data/SDYS 2025 Final Stats - Catching.csv', 'utf8');

// Simple CSV parsing function
function parseCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const row = {};
    headers.forEach((header, i) => {
      row[header] = values[i] || '';
    });
    return row;
  });
  return rows.filter(row => row['Player Name'] && row['Player Name'] !== 'Totals');
}

const offense = parseCSV(offenseData);
const pitching = parseCSV(pitchingData);
const defense = parseCSV(defenseData);
const catching = parseCSV(catchingData);

// Create players array
const players = offense.map(off => {
  const pitch = pitching.find(p => p['Player Name'] === off['Player Name']) || {};
  const def = defense.find(d => d['Player Name'] === off['Player Name']) || {};
  const catchData = catching.find(c => c['Player Name'] === off['Player Name']) || {};
  
  return {
    id: off['Player Name'].toLowerCase().replace(/\s+/g, '-'),
    name: off['Player Name'],
    position: parseFloat(pitch['IP=Innings pitched'] || '0') > 0 ? 'P' : 
              parseFloat(catchData['INN=Innings played as catcher'] || '0') > 0 ? 'C' : 'IF',
    gamesPlayed: parseInt(off['GP=Games played'] || '0'),
    battingAvg: parseFloat(off['AVG=Batting average'] || '0'),
    onBasePct: parseFloat(off['OBP=On-base percentage'] || '0'),
    sluggingPct: parseFloat(off['SLG=Slugging percentage'] || '0'),
    ops: parseFloat(off['OPS=On-base percentage plus slugging percentage'] || '0'),
    hits: parseInt(off['H=Hits'] || '0'),
    doubles: parseInt(off['2B=Doubles'] || '0'),
    triples: parseInt(off['3B=Triples'] || '0'),
    homeRuns: parseInt(off['HR=Home runs'] || '0'),
    rbis: parseInt(off['RBI=Runs batted in'] || '0'),
    runs: parseInt(off['R=Runs scored'] || '0'),
    walks: parseInt(off['BB=Base on balls (walks)'] || '0'),
    strikeouts: parseInt(off['SO=Strikeouts'] || '0'),
    stolenBases: parseInt(off['SB=Stolen bases'] || '0'),
    caughtStealing: parseInt(off['CS=Caught stealing'] || '0'),
    inningsPitched: parseFloat(pitch['IP=Innings pitched'] || '0'),
    wins: parseInt(pitch['W=Wins'] || '0'),
    losses: parseInt(pitch['L=Losses'] || '0'),
    saves: parseInt(pitch['SV=Saves'] || '0'),
    earnedRuns: parseFloat(pitch['ER=Earned runs allowed'] || '0'),
    era: parseFloat(pitch['ERA=Earned run average'] || '0'),
    whip: parseFloat(pitch['WHIP=Walks plus hits per innings pitched'] || '0'),
    pitchingStrikeouts: parseInt(pitch['SO=Strikeouts'] || '0'),
    totalChances: parseInt(def['TC=Total Chances'] || '0'),
    assists: parseInt(def['A=Assists'] || '0'),
    putouts: parseInt(def['PO=Putouts'] || '0'),
    fieldingPct: parseFloat(def['FPCT=Fielding Percentage'] || '0'),
    errors: parseInt(def['E=Errors'] || '0'),
    doublePlays: parseInt(def['DP=Double Plays'] || '0'),
    inningsCatching: parseFloat(catchData['INN=Innings played as catcher'] || '0'),
    passedBalls: parseInt(catchData['PB=Passed balls allowed'] || '0'),
    stolenBasesAllowed: parseInt(catchData['SB=Stolen bases allowed'] || '0'),
    caughtStealingPct: parseFloat(catchData['CS%=Runners caught stealing percentage'] || '0'),
    trend: parseFloat(off['AVG=Batting average'] || '0') > 0.35 ? 'up' : 
           parseFloat(off['AVG=Batting average'] || '0') < 0.2 ? 'down' : 'stable'
  };
});

// Calculate team stats
const teamStats = {
  totalGames: 26,
  totalWins: players.reduce((sum, p) => sum + p.wins, 0),
  totalLosses: players.reduce((sum, p) => sum + p.losses, 0),
  teamBattingAvg: parseFloat(offense.find(row => row['Player Name'] === 'Totals')?.['AVG=Batting average'] || '0'),
  teamERA: players.reduce((sum, p) => sum + p.earnedRuns, 0) / Math.max(players.reduce((sum, p) => sum + p.inningsPitched, 0) / 7, 1) * 7,
  totalRuns: players.reduce((sum, p) => sum + p.runs, 0),
  totalRBIs: players.reduce((sum, p) => sum + p.rbis, 0),
  totalHits: players.reduce((sum, p) => sum + p.hits, 0),
  totalHomeRuns: players.reduce((sum, p) => sum + p.homeRuns, 0),
  totalStolenBases: players.reduce((sum, p) => sum + p.stolenBases, 0),
  totalStrikeouts: players.reduce((sum, p) => sum + p.pitchingStrikeouts, 0),
  totalErrors: players.reduce((sum, p) => sum + p.errors, 0),
  fieldingPercentage: players.reduce((sum, p) => sum + p.totalChances, 0) > 0 ? 
    (players.reduce((sum, p) => sum + p.totalChances - p.errors, 0) / players.reduce((sum, p) => sum + p.totalChances, 0)) : 0
};

console.log('✅ Data processing complete!');
console.log(`📊 Processed ${players.length} players`);
console.log(`🏆 Team record: ${teamStats.totalWins}-${teamStats.totalLosses}`);
console.log(`📈 Team batting average: ${teamStats.teamBattingAvg.toFixed(3)}`);
console.log(`⚾ Team ERA: ${teamStats.teamERA.toFixed(2)}`);
console.log('\n📋 Next steps:');
console.log('1. Copy the embedded data below');
console.log('2. Update src/context/DataContext.tsx');
console.log('3. Test with npm run dev');
console.log('4. Deploy with npm run build && vercel --prod');
console.log('\n' + '='.repeat(50));
console.log('EMBEDDED DATA:');
console.log(JSON.stringify({ players, teamStats }, null, 2)); 