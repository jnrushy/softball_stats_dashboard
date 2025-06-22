export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  grade: string;
  battingAvg: number;
  era: number | null;
  gamesPlayed: number;
  atBats: number;
  hits: number;
  runs: number;
  rbis: number;
  stolenBases: number;
  wins: number;
  losses: number;
  strikeouts: number;
  image: string;
}

export interface Game {
  id: string;
  date: string;
  opponent: string;
  homeAway: string;
  result: 'W' | 'L';
  score: string;
  teamRuns: number;
  opponentRuns: number;
  highlights: string;
}

export interface UpcomingGame {
  id: string;
  date: string;
  opponent: string;
  homeAway: string;
  time: string;
  location: string;
}

export interface TeamStats {
  season: string;
  record: string;
  wins: number;
  losses: number;
  winPercentage: number;
  gamesPlayed: number;
  totalRuns: number;
  runsAllowed: number;
  runDifferential: number;
  teamBattingAvg: number;
  teamEra: number;
  totalHits: number;
  totalRbis: number;
  totalStolenBases: number;
  totalStrikeouts: number;
  fieldingPercentage: number;
  errors: number;
}

export interface TeamOverview {
  teamName: string;
  season: string;
  record: string;
  winPercentage: number;
  totalPlayers: number;
  nextGame: UpcomingGame | null;
  lastUpdated: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  error?: string;
}

export interface BattingStats {
  totalAtBats: number;
  totalHits: number;
  totalRuns: number;
  totalRbis: number;
  totalStolenBases: number;
  teamBattingAvg: number;
  topHitter: Player;
}

export interface PitchingStats {
  totalWins: number;
  totalLosses: number;
  totalStrikeouts: number;
  teamEra: number;
  topPitcher: Player;
}

export interface FieldingStats {
  fieldingPercentage: number;
  totalErrors: number;
  gamesPlayed: number;
}

export interface SeasonSummary {
  record: string;
  winPercentage: number;
  totalRuns: number;
  runsAllowed: number;
  runDifferential: number;
  gamesPlayed: number;
  teamBattingAvg: number;
  teamEra: number;
  fieldingPercentage: number;
}

export interface PerformanceTrends {
  recentRecord: string;
  averageRunsScored: number;
  averageRunsAllowed: number;
  recentGames: Array<{
    date: string;
    result: 'W' | 'L';
    score: string;
  }>;
}

export interface TeamLeaders {
  batting: Array<{ name: string; value: number; stat: string }>;
  rbis: Array<{ name: string; value: number; stat: string }>;
  stolenBases: Array<{ name: string; value: number; stat: string }>;
  wins: Array<{ name: string; value: number; stat: string }>;
  strikeouts: Array<{ name: string; value: number; stat: string }>;
} 