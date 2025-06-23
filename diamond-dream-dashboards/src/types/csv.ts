/**
 * TypeScript interfaces for CSV data structures
 * These define the expected format for uploaded CSV files
 */

// Player data structure from CSV
export interface PlayerCSV {
  name: string;
  number: string;
  position: string;
  grade: string;
  battingAvg: string;
  era?: string;
  gamesPlayed: string;
  atBats: string;
  hits: string;
  runs: string;
  rbis: string;
  stolenBases: string;
  wins?: string;
  losses?: string;
  strikeouts?: string;
  fielding?: string;
}

// Game data structure from CSV
export interface GameCSV {
  date: string;
  opponent: string;
  homeAway: string;
  result: string;
  teamRuns: string;
  opponentRuns: string;
  highlights?: string;
}

// Schedule data structure from CSV
export interface ScheduleCSV {
  date: string;
  opponent: string;
  homeAway: string;
  time: string;
  location: string;
}

// Processed player data (after CSV parsing)
export interface Player {
  id: string;
  name: string;
  position: string;
  gamesPlayed: number;
  battingAvg: number;
  onBasePct: number;
  sluggingPct: number;
  ops: number;
  hits: number;
  doubles: number;
  triples: number;
  homeRuns: number;
  rbis: number;
  runs: number;
  walks: number;
  strikeouts: number;
  stolenBases: number;
  caughtStealing: number;
  inningsPitched: number;
  wins: number;
  losses: number;
  saves: number;
  earnedRuns: number;
  era: number | null;
  whip: number | null;
  pitchingStrikeouts: number;
  totalChances: number;
  assists: number;
  putouts: number;
  fieldingPct: number;
  errors: number;
  doublePlays: number;
  inningsCatching: number;
  passedBalls: number;
  stolenBasesAllowed: number;
  caughtStealingPct: number;
  trend: 'up' | 'down' | 'stable';
  
  // Legacy properties for backward compatibility
  number?: number;
  grade?: string;
  atBats?: number;
  fielding?: number;
  singles?: number;
}

// Processed game data (after CSV parsing)
export interface Game {
  id: string;
  date: string;
  opponent: string;
  homeAway: string;
  result: 'W' | 'L';
  score: string;
  teamRuns: number;
  opponentRuns: number;
  highlights?: string;
}

// Processed schedule data (after CSV parsing)
export interface Schedule {
  id: string;
  date: string;
  opponent: string;
  homeAway: string;
  time: string;
  location: string;
}

// Team statistics calculated from player and game data
export interface TeamStats {
  totalGames: number;
  totalWins: number;
  totalLosses: number;
  teamBattingAvg: number;
  teamERA: number;
  totalRuns: number;
  totalRBIs: number;
  totalHits: number;
  totalHomeRuns: number;
  totalStolenBases: number;
  totalStrikeouts: number;
  totalErrors: number;
  fieldingPercentage: number;
  
  // Legacy properties for backward compatibility
  season?: string;
  record?: string;
  winPercentage?: number;
  runsAllowed?: number;
  runDifferential?: number;
  teamEra?: number;
  errors?: number;
}

// CSV upload response
export interface CSVUploadResponse {
  success: boolean;
  message: string;
  data?: {
    players?: Player[];
    games?: Game[];
    schedule?: Schedule[];
    teamStats?: TeamStats;
  };
  errors?: string[];
}

// File upload state
export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
} 