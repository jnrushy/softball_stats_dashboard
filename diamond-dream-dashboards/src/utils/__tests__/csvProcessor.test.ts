/**
 * CSV Processor Tests
 * 
 * Tests for the CSV processing utilities to ensure data is parsed correctly.
 */

import { processCSVFiles } from '../csvProcessor';

// Mock CSV data that matches the SDYS format
const mockOffenseCSV = `Player Name,GP=Games played,PA=Plate appearances,AB=At bats,AVG=Batting average,OBP=On-base percentage,OPS=On-base percentage plus slugging percentage,SLG=Slugging percentage,H=Hits,1B=Singles,2B=Doubles,3B=Triples,HR=Home runs,RBI=Runs batted in,R=Runs scored,BB=Base on balls (walks),SO=Strikeouts,SB=Stolen bases,SB%=Stolen base percentage,CS=Caught stealing,PIK=Picked off
Scarlett Walter,24,47,41,0.22,0.289,0.557,0.268,9,8,0,1,0,5,5,4,7,3,0,2,0,3,2,6,85.71,1,0,17,36.17,11.8,0.571,82.93,5,11.43,8.57,51.43,0.265,0.188,25,3,1,11,154,3.277,5,10.64,7,14.89,-,0,0,0
Emma Blake,26,63,57,0.263,0.333,0.632,0.298,15,13,2,0,0,2,17,6,5,2,0,0,0,3,5,10,83.33,2,0,30,47.62,10.5,1.2,91.23,17,19.23,25,55.77,0.288,0.148,40,1,2,17,182,2.889,4,6.35,8,12.7,-,0,0,0`;

const mockPitchingCSV = `Player Name,IP=Innings pitched,Games Played,GS=Games started,BF=Total batters faced,#P=Total pitches,W=Wins,L=Losses,SV=Saves,SVO=Save opportunities,BS=Blown saves,SV%=Save percentage,H=Hits allowed,R=Runs allowed,ER=Earned runs allowed,BB=Base on balls (walks),SO=Strikeouts,ERA=Earned run average,WHIP=Walks plus hits per innings pitched
Scarlett Walter,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,1,2,0.5,3,0,0,0,0,0,0-0,0,-,0,0
Emma Blake,7.1,5,3,43,181,1,1,0,0,0,-,9,12,11,13,6,2,2,9,3,6,0,0,1,5,83.33,12,0.321,24.7,4.209,30.23,3,1,1,2,5.804,48.07,48.84,57.14,14.29,28.57,1.773,2,8,4,3,8.84,0.14,0.462,68.18,31.82,1,0,18.18,27.27,50,0.409,0.467,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,0,0,-,-,-,69,38,25,0.913,6,3,0,0,0,0,0-0,0,-,0,0`;

const mockDefenseCSV = `Player Name,TC=Total Chances,A=Assists,PO=Putouts,FPCT=Fielding Percentage,E=Errors,DP=Double Plays,TP=Triple Plays,INN=Innings played as catcher,PB=Passed balls allowed,SB=Stolen bases allowed,SB-ATT=Stolen bases - Stealing attempts,CS=Runners caught stealing,CS%=Runners caught stealing percentage,PIK=Runners picked off,CI=Batter advances on catcher's interference
Scarlett Walter,6,1,2,0.5,3,0,0,0,0,0,0-0,0,-,0,0
Emma Blake,69,38,25,0.913,6,3,0,0,0,0,0-0,0,-,0,0`;

const mockCatchingCSV = `Player Name,INN=Innings played as catcher,PB=Passed balls allowed,SB=Stolen bases allowed,SB-ATT=Stolen bases - Stealing attempts,CS=Runners caught stealing,CS%=Runners caught stealing percentage,PIK=Runners picked off,CI=Batter advances on catcher's interference
Scarlett Walter,0,0,0,0-0,0,-,0,0
Emma Blake,0,0,0,0-0,0,-,0,0`;

describe('CSV Processor', () => {
  test('should process CSV files and return valid player data', async () => {
    // Create mock File objects
    const createMockFile = (content: string, name: string): File => {
      const blob = new Blob([content], { type: 'text/csv' });
      return new File([blob], name, { type: 'text/csv' });
    };

    const files = {
      offense: createMockFile(mockOffenseCSV, 'offense.csv'),
      pitching: createMockFile(mockPitchingCSV, 'pitching.csv'),
      defense: createMockFile(mockDefenseCSV, 'defense.csv'),
      catching: createMockFile(mockCatchingCSV, 'catching.csv'),
    };

    const result = await processCSVFiles(files);

    // Verify the result structure
    expect(result).toHaveProperty('players');
    expect(result).toHaveProperty('teamStats');
    expect(Array.isArray(result.players)).toBe(true);
    expect(typeof result.teamStats).toBe('object');

    // Verify player data
    expect(result.players.length).toBeGreaterThan(0);
    
    const firstPlayer = result.players[0];
    expect(firstPlayer).toHaveProperty('id');
    expect(firstPlayer).toHaveProperty('name');
    expect(firstPlayer).toHaveProperty('battingAvg');
    expect(firstPlayer).toHaveProperty('gamesPlayed');
    expect(firstPlayer).toHaveProperty('hits');
    expect(firstPlayer).toHaveProperty('rbis');
    expect(firstPlayer).toHaveProperty('runs');

    // Verify team stats
    expect(result.teamStats).toHaveProperty('season');
    expect(result.teamStats).toHaveProperty('record');
    expect(result.teamStats).toHaveProperty('teamBattingAvg');
    expect(result.teamStats).toHaveProperty('totalHits');
    expect(result.teamStats).toHaveProperty('totalRbis');
  });

  test('should handle missing or invalid data gracefully', async () => {
    const invalidCSV = `Player Name,GP=Games played,AVG=Batting average
Invalid Player,-,N/A`;

    const createMockFile = (content: string, name: string): File => {
      const blob = new Blob([content], { type: 'text/csv' });
      return new File([blob], name, { type: 'text/csv' });
    };

    const files = {
      offense: createMockFile(invalidCSV, 'offense.csv'),
      pitching: createMockFile(mockPitchingCSV, 'pitching.csv'),
      defense: createMockFile(mockDefenseCSV, 'defense.csv'),
      catching: createMockFile(mockCatchingCSV, 'catching.csv'),
    };

    const result = await processCSVFiles(files);

    // Should still process successfully with fallback values
    expect(result.players.length).toBeGreaterThan(0);
    
    const invalidPlayer = result.players.find(p => p.name === 'Invalid Player');
    if (invalidPlayer) {
      expect(invalidPlayer.battingAvg).toBe(0);
      expect(invalidPlayer.gamesPlayed).toBe(0);
    }
  });

  test('should filter out "Totals" rows', async () => {
    const csvWithTotals = `Player Name,GP=Games played,AVG=Batting average
Scarlett Walter,24,0.22
Totals,26,0.303`;

    const createMockFile = (content: string, name: string): File => {
      const blob = new Blob([content], { type: 'text/csv' });
      return new File([blob], name, { type: 'text/csv' });
    };

    const files = {
      offense: createMockFile(csvWithTotals, 'offense.csv'),
      pitching: createMockFile(mockPitchingCSV, 'pitching.csv'),
      defense: createMockFile(mockDefenseCSV, 'defense.csv'),
      catching: createMockFile(mockCatchingCSV, 'catching.csv'),
    };

    const result = await processCSVFiles(files);

    // Should not include "Totals" as a player
    const totalsPlayer = result.players.find(p => p.name === 'Totals');
    expect(totalsPlayer).toBeUndefined();
    
    // Should only include actual players
    expect(result.players.length).toBe(1);
    expect(result.players[0].name).toBe('Scarlett Walter');
  });
}); 