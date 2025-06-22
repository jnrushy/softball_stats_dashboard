const express = require('express');
const router = express.Router();
const { players, games, teamStats } = require('../data/mockData');

// Get team statistics
router.get('/team', (req, res) => {
  try {
    res.json({
      success: true,
      data: teamStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch team statistics'
    });
  }
});

// Get batting statistics summary
router.get('/batting', (req, res) => {
  try {
    const battingStats = {
      totalAtBats: players.reduce((sum, p) => sum + p.atBats, 0),
      totalHits: players.reduce((sum, p) => sum + p.hits, 0),
      totalRuns: players.reduce((sum, p) => sum + p.runs, 0),
      totalRbis: players.reduce((sum, p) => sum + p.rbis, 0),
      totalStolenBases: players.reduce((sum, p) => sum + p.stolenBases, 0),
      teamBattingAvg: teamStats.teamBattingAvg,
      topHitter: players.reduce((top, current) => 
        current.battingAvg > top.battingAvg ? current : top
      )
    };
    
    res.json({
      success: true,
      data: battingStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch batting statistics'
    });
  }
});

// Get pitching statistics summary
router.get('/pitching', (req, res) => {
  try {
    const pitchers = players.filter(p => p.era !== null);
    const pitchingStats = {
      totalWins: pitchers.reduce((sum, p) => sum + p.wins, 0),
      totalLosses: pitchers.reduce((sum, p) => sum + p.losses, 0),
      totalStrikeouts: pitchers.reduce((sum, p) => sum + p.strikeouts, 0),
      teamEra: teamStats.teamEra,
      topPitcher: pitchers.reduce((top, current) => 
        current.era < top.era ? current : top
      )
    };
    
    res.json({
      success: true,
      data: pitchingStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pitching statistics'
    });
  }
});

// Get fielding statistics
router.get('/fielding', (req, res) => {
  try {
    const fieldingStats = {
      fieldingPercentage: teamStats.fieldingPercentage,
      totalErrors: teamStats.errors,
      gamesPlayed: teamStats.gamesPlayed
    };
    
    res.json({
      success: true,
      data: fieldingStats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch fielding statistics'
    });
  }
});

// Get season summary
router.get('/season-summary', (req, res) => {
  try {
    const summary = {
      record: teamStats.record,
      winPercentage: teamStats.winPercentage,
      totalRuns: teamStats.totalRuns,
      runsAllowed: teamStats.runsAllowed,
      runDifferential: teamStats.runDifferential,
      gamesPlayed: teamStats.gamesPlayed,
      teamBattingAvg: teamStats.teamBattingAvg,
      teamEra: teamStats.teamEra,
      fieldingPercentage: teamStats.fieldingPercentage
    };
    
    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch season summary'
    });
  }
});

// Get performance trends (last 5 games)
router.get('/trends', (req, res) => {
  try {
    const recentGames = games
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    const trends = {
      recentRecord: `${recentGames.filter(g => g.result === 'W').length}-${recentGames.filter(g => g.result === 'L').length}`,
      averageRunsScored: recentGames.reduce((sum, g) => sum + g.teamRuns, 0) / recentGames.length,
      averageRunsAllowed: recentGames.reduce((sum, g) => sum + g.opponentRuns, 0) / recentGames.length,
      recentGames: recentGames.map(g => ({
        date: g.date,
        result: g.result,
        score: g.score
      }))
    };
    
    res.json({
      success: true,
      data: trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch performance trends'
    });
  }
});

module.exports = router; 