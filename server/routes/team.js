const express = require('express');
const router = express.Router();
const { players, teamStats, upcomingGames } = require('../data/mockData');

// Get team overview
router.get('/overview', (req, res) => {
  try {
    const overview = {
      teamName: "Lady Eagles Softball",
      season: teamStats.season,
      record: teamStats.record,
      winPercentage: teamStats.winPercentage,
      totalPlayers: players.length,
      nextGame: upcomingGames[0] || null,
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: overview
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch team overview'
    });
  }
});

// Get roster
router.get('/roster', (req, res) => {
  try {
    const roster = players.map(player => ({
      id: player.id,
      name: player.name,
      number: player.number,
      position: player.position,
      grade: player.grade,
      image: player.image
    }));
    
    res.json({
      success: true,
      data: roster,
      count: roster.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roster'
    });
  }
});

// Get roster by position
router.get('/roster/position/:position', (req, res) => {
  try {
    const position = req.params.position;
    const positionRoster = players
      .filter(p => p.position.toLowerCase() === position.toLowerCase())
      .map(player => ({
        id: player.id,
        name: player.name,
        number: player.number,
        position: player.position,
        grade: player.grade,
        image: player.image
      }));
    
    res.json({
      success: true,
      data: positionRoster,
      count: positionRoster.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch roster by position'
    });
  }
});

// Get schedule
router.get('/schedule', (req, res) => {
  try {
    res.json({
      success: true,
      data: upcomingGames,
      count: upcomingGames.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schedule'
    });
  }
});

// Get team leaders
router.get('/leaders', (req, res) => {
  try {
    const leaders = {
      batting: players
        .filter(p => p.battingAvg > 0)
        .sort((a, b) => b.battingAvg - a.battingAvg)
        .slice(0, 3)
        .map(p => ({ name: p.name, value: p.battingAvg, stat: 'Batting Average' })),
      
      rbis: players
        .sort((a, b) => b.rbis - a.rbis)
        .slice(0, 3)
        .map(p => ({ name: p.name, value: p.rbis, stat: 'RBIs' })),
      
      stolenBases: players
        .sort((a, b) => b.stolenBases - a.stolenBases)
        .slice(0, 3)
        .map(p => ({ name: p.name, value: p.stolenBases, stat: 'Stolen Bases' })),
      
      wins: players
        .filter(p => p.wins > 0)
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 3)
        .map(p => ({ name: p.name, value: p.wins, stat: 'Wins' })),
      
      strikeouts: players
        .filter(p => p.strikeouts > 0)
        .sort((a, b) => b.strikeouts - a.strikeouts)
        .slice(0, 3)
        .map(p => ({ name: p.name, value: p.strikeouts, stat: 'Strikeouts' }))
    };
    
    res.json({
      success: true,
      data: leaders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch team leaders'
    });
  }
});

module.exports = router; 