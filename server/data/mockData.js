const { v4: uuidv4 } = require('uuid');

// Mock player data
const players = [
  {
    id: uuidv4(),
    name: "Sarah Johnson",
    number: 12,
    position: "Pitcher",
    grade: "Senior",
    battingAvg: 0.342,
    era: 2.15,
    gamesPlayed: 18,
    atBats: 65,
    hits: 22,
    runs: 15,
    rbis: 18,
    stolenBases: 8,
    wins: 12,
    losses: 3,
    strikeouts: 89,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Emily Rodriguez",
    number: 8,
    position: "Catcher",
    grade: "Junior",
    battingAvg: 0.389,
    era: null,
    gamesPlayed: 20,
    atBats: 72,
    hits: 28,
    runs: 22,
    rbis: 25,
    stolenBases: 3,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Maya Thompson",
    number: 3,
    position: "First Base",
    grade: "Senior",
    battingAvg: 0.298,
    era: null,
    gamesPlayed: 19,
    atBats: 67,
    hits: 20,
    runs: 18,
    rbis: 22,
    stolenBases: 2,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Alexis Chen",
    number: 15,
    position: "Second Base",
    grade: "Sophomore",
    battingAvg: 0.315,
    era: null,
    gamesPlayed: 17,
    atBats: 54,
    hits: 17,
    runs: 12,
    rbis: 14,
    stolenBases: 6,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Jordan Williams",
    number: 7,
    position: "Shortstop",
    grade: "Junior",
    battingAvg: 0.367,
    era: null,
    gamesPlayed: 20,
    atBats: 73,
    hits: 27,
    runs: 24,
    rbis: 19,
    stolenBases: 11,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Taylor Davis",
    number: 22,
    position: "Third Base",
    grade: "Senior",
    battingAvg: 0.289,
    era: null,
    gamesPlayed: 18,
    atBats: 62,
    hits: 18,
    runs: 16,
    rbis: 21,
    stolenBases: 4,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Riley Martinez",
    number: 5,
    position: "Left Field",
    grade: "Freshman",
    battingAvg: 0.278,
    era: null,
    gamesPlayed: 16,
    atBats: 54,
    hits: 15,
    runs: 11,
    rbis: 12,
    stolenBases: 5,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Casey Brown",
    number: 9,
    position: "Center Field",
    grade: "Junior",
    battingAvg: 0.401,
    era: null,
    gamesPlayed: 20,
    atBats: 72,
    hits: 29,
    runs: 28,
    rbis: 16,
    stolenBases: 15,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: uuidv4(),
    name: "Quinn Anderson",
    number: 11,
    position: "Right Field",
    grade: "Sophomore",
    battingAvg: 0.323,
    era: null,
    gamesPlayed: 19,
    atBats: 65,
    hits: 21,
    runs: 19,
    rbis: 17,
    stolenBases: 7,
    wins: 0,
    losses: 0,
    strikeouts: 0,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  }
];

// Mock game data
const games = [
  {
    id: uuidv4(),
    date: "2024-03-15",
    opponent: "Riverside High",
    homeAway: "Home",
    result: "W",
    score: "8-3",
    teamRuns: 8,
    opponentRuns: 3,
    highlights: "Sarah Johnson pitched complete game, 12 strikeouts"
  },
  {
    id: uuidv4(),
    date: "2024-03-18",
    opponent: "Central Academy",
    homeAway: "Away",
    result: "W",
    score: "6-2",
    teamRuns: 6,
    opponentRuns: 2,
    highlights: "Casey Brown 3-4 with 2 stolen bases"
  },
  {
    id: uuidv4(),
    date: "2024-03-22",
    opponent: "Westside Prep",
    homeAway: "Home",
    result: "L",
    score: "4-7",
    teamRuns: 4,
    opponentRuns: 7,
    highlights: "Jordan Williams 2-3 with home run"
  },
  {
    id: uuidv4(),
    date: "2024-03-25",
    opponent: "East Valley",
    homeAway: "Away",
    result: "W",
    score: "10-1",
    teamRuns: 10,
    opponentRuns: 1,
    highlights: "Team batting .450 for the game"
  },
  {
    id: uuidv4(),
    date: "2024-03-29",
    opponent: "North High",
    homeAway: "Home",
    result: "W",
    score: "5-3",
    teamRuns: 5,
    opponentRuns: 3,
    highlights: "Emily Rodriguez walk-off double"
  },
  {
    id: uuidv4(),
    date: "2024-04-02",
    opponent: "South Academy",
    homeAway: "Away",
    result: "W",
    score: "9-4",
    teamRuns: 9,
    opponentRuns: 4,
    highlights: "Quinn Anderson 4 RBI performance"
  },
  {
    id: uuidv4(),
    date: "2024-04-05",
    opponent: "Lincoln High",
    homeAway: "Home",
    result: "L",
    score: "3-6",
    teamRuns: 3,
    opponentRuns: 6,
    highlights: "Maya Thompson solo home run"
  },
  {
    id: uuidv4(),
    date: "2024-04-09",
    opponent: "Jefferson Prep",
    homeAway: "Away",
    result: "W",
    score: "7-2",
    teamRuns: 7,
    opponentRuns: 2,
    highlights: "Alexis Chen 3-3 with 2 doubles"
  },
  {
    id: uuidv4(),
    date: "2024-04-12",
    opponent: "Franklin High",
    homeAway: "Home",
    result: "W",
    score: "11-0",
    teamRuns: 11,
    opponentRuns: 0,
    highlights: "Sarah Johnson no-hitter, 15 strikeouts"
  },
  {
    id: uuidv4(),
    date: "2024-04-16",
    opponent: "Washington Academy",
    homeAway: "Away",
    result: "W",
    score: "6-5",
    teamRuns: 6,
    opponentRuns: 5,
    highlights: "Taylor Davis game-winning RBI single"
  }
];

// Team statistics
const teamStats = {
  season: "2024",
  record: "8-2",
  wins: 8,
  losses: 2,
  winPercentage: 0.800,
  gamesPlayed: 10,
  totalRuns: 69,
  runsAllowed: 33,
  runDifferential: 36,
  teamBattingAvg: 0.324,
  teamEra: 2.85,
  totalHits: 219,
  totalRbis: 183,
  totalStolenBases: 67,
  totalStrikeouts: 89,
  fieldingPercentage: 0.956,
  errors: 12
};

// Season schedule (upcoming games)
const upcomingGames = [
  {
    id: uuidv4(),
    date: "2024-04-19",
    opponent: "Madison High",
    homeAway: "Home",
    time: "4:00 PM",
    location: "Home Field"
  },
  {
    id: uuidv4(),
    date: "2024-04-23",
    opponent: "Adams Academy",
    homeAway: "Away",
    time: "3:30 PM",
    location: "Adams Field"
  },
  {
    id: uuidv4(),
    date: "2024-04-26",
    opponent: "Monroe High",
    homeAway: "Home",
    time: "4:00 PM",
    location: "Home Field"
  },
  {
    id: uuidv4(),
    date: "2024-04-30",
    opponent: "Jackson Prep",
    homeAway: "Away",
    time: "3:30 PM",
    location: "Jackson Field"
  },
  {
    id: uuidv4(),
    date: "2024-05-03",
    opponent: "Wilson High",
    homeAway: "Home",
    time: "4:00 PM",
    location: "Home Field"
  }
];

module.exports = {
  players,
  games,
  teamStats,
  upcomingGames
}; 