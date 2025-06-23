/**
 * CSV Processing Utilities for SDYS Softball Statistics
 * 
 * This module handles the processing of the four main CSV files:
 * - Offense.csv: Batting statistics
 * - Pitching.csv: Pitching statistics  
 * - Defense.csv: Fielding statistics
 * - Catching.csv: Catcher-specific statistics
 */

import Papa from 'papaparse';
import { Player, TeamStats } from '../types/csv';

// Interface for raw CSV data from offense file
interface OffenseCSV {
  'Player Name': string;
  'GP=Games played': string;
  'PA=Plate appearances': string;
  'AB=At bats': string;
  'AVG=Batting average': string;
  'OBP=On-base percentage': string;
  'OPS=On-base percentage plus slugging percentage': string;
  'SLG=Slugging percentage': string;
  'H=Hits': string;
  '1B=Singles': string;
  '2B=Doubles': string;
  '3B=Triples': string;
  'HR=Home runs': string;
  'RBI=Runs batted in': string;
  'R=Runs scored': string;
  'BB=Base on balls (walks)': string;
  'SO=Strikeouts': string;
  'SB=Stolen bases': string;
  'SB%=Stolen base percentage': string;
  'CS=Caught stealing': string;
  'PIK=Picked off': string;
}

// Interface for raw CSV data from pitching file
interface PitchingCSV {
  'Player Name': string;
  'IP=Innings pitched': string;
  'Games Played': string;
  'GS=Games started': string;
  'W=Wins': string;
  'L=Losses': string;
  'SV=Saves': string;
  'ER=Earned runs allowed': string;
  'BB=Base on balls (walks)': string;
  'SO=Strikeouts': string;
  'ERA=Earned run average': string;
  'WHIP=Walks plus hits per innings pitched': string;
}

// Interface for raw CSV data from defense file
interface DefenseCSV {
  'Player Name': string;
  'TC=Total Chances': string;
  'A=Assists': string;
  'PO=Putouts': string;
  'FPCT=Fielding Percentage': string;
  'E=Errors': string;
  'DP=Double Plays': string;
  'TP=Triple Plays': string;
}

// Interface for raw CSV data from catching file
interface CatchingCSV {
  'Player Name': string;
  'INN=Innings played as catcher': string;
  'PB=Passed balls allowed': string;
  'SB=Stolen bases allowed': string;
  'CS=Runners caught stealing': string;
  'CS%=Runners caught stealing percentage': string;
  'PIK=Runners picked off': string;
}

/**
 * Safely converts a string to a number, returning 0 if invalid
 */
const safeParseFloat = (value: string): number => {
  if (!value || value === '-' || value === '' || value === 'N/A') return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Safely converts a string to an integer, returning 0 if invalid
 */
const safeParseInt = (value: string): number => {
  if (!value || value === '-' || value === '' || value === 'N/A') return 0;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Determines player position based on their statistics
 */
const determinePosition = (offense: OffenseCSV, pitching: PitchingCSV, catching: CatchingCSV): string => {
  const inningsPitched = safeParseFloat(pitching['IP=Innings pitched']);
  const inningsCatching = safeParseFloat(catching['INN=Innings played as catcher']);
  
  if (inningsPitched > 0) return 'P';
  if (inningsCatching > 0) return 'C';
  
  // Default position based on name or other criteria
  return 'IF'; // Infield
};

/**
 * Calculates player trend based on performance metrics
 */
const calculateTrend = (battingAvg: number, gamesPlayed: number): 'up' | 'down' | 'stable' => {
  if (battingAvg > 0.350) return 'up';
  if (battingAvg < 0.200) return 'down';
  return 'stable';
};

/**
 * Processes offense CSV data with better error handling
 */
const processOffenseData = (csvText: string): OffenseCSV[] => {
  console.log('Processing offense data...');
  
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  console.log('Raw offense data rows:', result.data.length);

  // Filter out the "Totals" row and empty rows, and ensure Player Name exists
  const filteredData = result.data
    .filter((row: any) => {
      const playerName = row['Player Name'];
      return playerName && 
             playerName !== 'Totals' && 
             playerName.trim() !== '' &&
             playerName !== 'Player Name'; // Skip header row if it gets through
    }) as OffenseCSV[];

  console.log('Filtered offense data rows:', filteredData.length);
  return filteredData;
};

/**
 * Processes pitching CSV data with better error handling
 */
const processPitchingData = (csvText: string): PitchingCSV[] => {
  console.log('Processing pitching data...');
  
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  console.log('Raw pitching data rows:', result.data.length);

  return result.data
    .filter((row: any) => {
      const playerName = row['Player Name'];
      return playerName && 
             playerName !== 'Totals' && 
             playerName.trim() !== '' &&
             playerName !== 'Player Name';
    }) as PitchingCSV[];
};

/**
 * Processes defense CSV data with better error handling
 */
const processDefenseData = (csvText: string): DefenseCSV[] => {
  console.log('Processing defense data...');
  
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  console.log('Raw defense data rows:', result.data.length);

  return result.data
    .filter((row: any) => {
      const playerName = row['Player Name'];
      return playerName && 
             playerName !== 'Totals' && 
             playerName.trim() !== '' &&
             playerName !== 'Player Name';
    }) as DefenseCSV[];
};

/**
 * Processes catching CSV data with better error handling
 */
const processCatchingData = (csvText: string): CatchingCSV[] => {
  console.log('Processing catching data...');
  
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  console.log('Raw catching data rows:', result.data.length);

  return result.data
    .filter((row: any) => {
      const playerName = row['Player Name'];
      return playerName && 
             playerName !== 'Totals' && 
             playerName.trim() !== '' &&
             playerName !== 'Player Name';
    }) as CatchingCSV[];
};

/**
 * Combines all CSV data into a unified Player object
 */
const combinePlayerData = (
  offense: OffenseCSV,
  pitching: PitchingCSV,
  defense: DefenseCSV,
  catching: CatchingCSV
): Player => {
  const battingAvg = safeParseFloat(offense['AVG=Batting average']);
  const gamesPlayed = safeParseInt(offense['GP=Games played']);
  const era = safeParseFloat(pitching['ERA=Earned run average']);
  
  return {
    id: `player-${offense['Player Name'].toLowerCase().replace(/\s+/g, '-')}`,
    name: offense['Player Name'],
    number: 0, // Not provided in CSV, will need to be added manually
    position: determinePosition(offense, pitching, catching),
    grade: '', // Not provided in CSV, will need to be added manually
    battingAvg,
    era: era > 0 ? era : null,
    gamesPlayed,
    atBats: safeParseInt(offense['AB=At bats']),
    hits: safeParseInt(offense['H=Hits']),
    runs: safeParseInt(offense['R=Runs scored']),
    rbis: safeParseInt(offense['RBI=Runs batted in']),
    stolenBases: safeParseInt(offense['SB=Stolen bases']),
    wins: safeParseInt(pitching['W=Wins']),
    losses: safeParseInt(pitching['L=Losses']),
    strikeouts: safeParseInt(pitching['SO=Strikeouts']),
    fielding: safeParseFloat(defense['FPCT=Fielding Percentage']),
    inningsPitched: safeParseFloat(pitching['IP=Innings pitched']),
    trend: calculateTrend(battingAvg, gamesPlayed),
  };
};

/**
 * Main function to process all CSV files and return unified player data
 */
export const processCSVFiles = async (files: {
  offense: File;
  pitching: File;
  defense: File;
  catching: File;
}): Promise<{ players: Player[]; teamStats: TeamStats }> => {
  try {
    console.log('Starting CSV processing...');
    
    // Read all CSV files
    const [offenseText, pitchingText, defenseText, catchingText] = await Promise.all([
      files.offense.text(),
      files.pitching.text(),
      files.defense.text(),
      files.catching.text(),
    ]);

    console.log('Files read successfully');

    // Process each CSV file
    const offenseData = processOffenseData(offenseText);
    const pitchingData = processPitchingData(pitchingText);
    const defenseData = processDefenseData(defenseText);
    const catchingData = processCatchingData(catchingText);

    console.log('Data processed:', {
      offense: offenseData.length,
      pitching: pitchingData.length,
      defense: defenseData.length,
      catching: catchingData.length
    });

    // Create a map for quick lookup
    const pitchingMap = new Map(pitchingData.map(p => [p['Player Name'], p]));
    const defenseMap = new Map(defenseData.map(d => [d['Player Name'], d]));
    const catchingMap = new Map(catchingData.map(c => [c['Player Name'], c]));

    // Combine data for each player
    const players: Player[] = offenseData.map(offense => {
      const pitching = pitchingMap.get(offense['Player Name']) || {} as PitchingCSV;
      const defense = defenseMap.get(offense['Player Name']) || {} as DefenseCSV;
      const catching = catchingMap.get(offense['Player Name']) || {} as CatchingCSV;

      return combinePlayerData(offense, pitching, defense, catching);
    });

    console.log('Combined players:', players.length);

    // Calculate team statistics
    const teamStats = calculateTeamStats(players, pitchingData);

    console.log('Team stats calculated:', teamStats);

    return { players, teamStats };
  } catch (error) {
    console.error('Error processing CSV files:', error);
    throw new Error(`Failed to process CSV files: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Calculates team statistics from player data
 */
const calculateTeamStats = (players: Player[], pitchingData: PitchingCSV[]): TeamStats => {
  if (players.length === 0) {
    return {
      season: '2025',
      record: '0-0',
      wins: 0,
      losses: 0,
      winPercentage: 0,
      gamesPlayed: 0,
      totalRuns: 0,
      runsAllowed: 0,
      runDifferential: 0,
      teamBattingAvg: 0,
      teamEra: 0,
      totalHits: 0,
      totalRbis: 0,
      totalStolenBases: 0,
      totalStrikeouts: 0,
      fieldingPercentage: 0,
      errors: 0,
    };
  }

  const totalGames = Math.max(...players.map(p => p.gamesPlayed));
  const totalWins = players.reduce((sum, p) => sum + p.wins, 0);
  const totalLosses = players.reduce((sum, p) => sum + p.losses, 0);
  const totalRuns = players.reduce((sum, p) => sum + p.runs, 0);
  const totalHits = players.reduce((sum, p) => sum + p.hits, 0);
  const totalAtBats = players.reduce((sum, p) => sum + p.atBats, 0);
  const totalRbis = players.reduce((sum, p) => sum + p.rbis, 0);
  const totalStolenBases = players.reduce((sum, p) => sum + p.stolenBases, 0);
  const totalStrikeouts = players.reduce((sum, p) => sum + p.strikeouts, 0);
  const totalFielding = players.reduce((sum, p) => sum + p.fielding, 0);

  const teamBattingAvg = totalAtBats > 0 ? totalHits / totalAtBats : 0;
  
  // Calculate team ERA from pitching data
  let teamEra = 0;
  let totalInningsPitched = 0;
  let totalEarnedRuns = 0;
  
  // Calculate weighted ERA using innings pitched
  pitchingData.forEach(pitcher => {
    const inningsPitched = safeParseFloat(pitcher['IP=Innings pitched']);
    const earnedRuns = safeParseInt(pitcher['ER=Earned runs allowed']);
    
    if (inningsPitched > 0 && earnedRuns >= 0) {
      totalInningsPitched += inningsPitched;
      totalEarnedRuns += earnedRuns;
    }
  });
  
  if (totalInningsPitched > 0) {
    teamEra = (totalEarnedRuns * 9) / totalInningsPitched;
  }
  
  const fieldingPercentage = players.length > 0 ? totalFielding / players.length : 0;

  return {
    season: '2025',
    record: `${totalWins}-${totalLosses}`,
    wins: totalWins,
    losses: totalLosses,
    winPercentage: totalWins + totalLosses > 0 ? totalWins / (totalWins + totalLosses) : 0,
    gamesPlayed: totalGames,
    totalRuns,
    runsAllowed: 0, // Would need game data
    runDifferential: totalRuns,
    teamBattingAvg,
    teamEra,
    totalHits,
    totalRbis,
    totalStolenBases,
    totalStrikeouts,
    fieldingPercentage,
    errors: 0, // Would need to calculate from fielding data
  };
};

/**
 * Validates CSV file structure
 */
export const validateCSVStructure = (csvText: string, expectedHeaders: string[]): boolean => {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (result.data.length === 0) return false;

  const firstRow = result.data[0] as any;
  return expectedHeaders.every(header => firstRow.hasOwnProperty(header));
}; 