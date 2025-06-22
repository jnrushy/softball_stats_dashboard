const express = require('express');
const router = express.Router();
const { games, upcomingGames } = require('../data/mockData');

// Get all completed games
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: games,
      count: games.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch games'
    });
  }
});

// Get game by ID
router.get('/:id', (req, res) => {
  try {
    const game = games.find(g => g.id === req.params.id);
    
    if (!game) {
      return res.status(404).json({
        success: false,
        error: 'Game not found'
      });
    }
    
    res.json({
      success: true,
      data: game
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch game'
    });
  }
});

// Get upcoming games
router.get('/schedule/upcoming', (req, res) => {
  try {
    res.json({
      success: true,
      data: upcomingGames,
      count: upcomingGames.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch upcoming games'
    });
  }
});

// Get games by result (W/L)
router.get('/result/:result', (req, res) => {
  try {
    const result = req.params.result.toUpperCase();
    const filteredGames = games.filter(g => g.result === result);
    
    res.json({
      success: true,
      data: filteredGames,
      count: filteredGames.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch games by result'
    });
  }
});

// Get recent games (last 5)
router.get('/recent/last5', (req, res) => {
  try {
    const recentGames = games
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
    
    res.json({
      success: true,
      data: recentGames
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent games'
    });
  }
});

// Get games by home/away
router.get('/location/:location', (req, res) => {
  try {
    const location = req.params.location;
    const filteredGames = games.filter(g => 
      g.homeAway.toLowerCase() === location.toLowerCase()
    );
    
    res.json({
      success: true,
      data: filteredGames,
      count: filteredGames.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch games by location'
    });
  }
});

module.exports = router; 