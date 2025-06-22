const express = require('express');
const router = express.Router();
const { players } = require('../data/mockData');

// Get all players
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: players,
      count: players.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch players'
    });
  }
});

// Get player by ID
router.get('/:id', (req, res) => {
  try {
    const player = players.find(p => p.id === req.params.id);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        error: 'Player not found'
      });
    }
    
    res.json({
      success: true,
      data: player
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch player'
    });
  }
});

// Get players by position
router.get('/position/:position', (req, res) => {
  try {
    const position = req.params.position;
    const filteredPlayers = players.filter(p => 
      p.position.toLowerCase() === position.toLowerCase()
    );
    
    res.json({
      success: true,
      data: filteredPlayers,
      count: filteredPlayers.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch players by position'
    });
  }
});

// Get top performers by batting average
router.get('/stats/batting-leaders', (req, res) => {
  try {
    const battingLeaders = players
      .filter(p => p.battingAvg > 0)
      .sort((a, b) => b.battingAvg - a.battingAvg)
      .slice(0, 5);
    
    res.json({
      success: true,
      data: battingLeaders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch batting leaders'
    });
  }
});

// Get pitching leaders
router.get('/stats/pitching-leaders', (req, res) => {
  try {
    const pitchingLeaders = players
      .filter(p => p.era && p.era > 0)
      .sort((a, b) => a.era - b.era)
      .slice(0, 3);
    
    res.json({
      success: true,
      data: pitchingLeaders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pitching leaders'
    });
  }
});

module.exports = router; 