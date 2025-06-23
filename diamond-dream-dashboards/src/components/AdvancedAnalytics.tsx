/**
 * Advanced Analytics Component
 * 
 * Calculates and displays advanced baseball metrics including WAR (Wins Above Replacement),
 * OPS (On-base Plus Slugging), wOBA (Weighted On-base Average), and other sabermetric stats.
 * Uses real data from the context to provide sophisticated performance analysis.
 */

import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ComposedChart,
  Line,
  LineChart
} from 'recharts';
import { 
  Calculator, 
  Target, 
  Award, 
  Zap, 
  Trophy,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useData } from "@/context/DataContext";

export const AdvancedAnalytics = () => {
  const { players, teamStats } = useData();

  /**
   * Calculates OPS (On-base Plus Slugging) for a player
   * OPS = OBP + SLG
   */
  const calculateOPS = (player: any) => {
    if (!player.atBats || player.atBats === 0) return 0;
    
    // Calculate OBP (On-base Percentage)
    const hits = player.hits || 0;
    const walks = player.walks || 0; // We don't have walks in our data, so this will be 0
    const atBats = player.atBats;
    const obp = (hits + walks) / (atBats + walks);
    
    // Calculate SLG (Slugging Percentage)
    const singles = player.singles || 0;
    const doubles = player.doubles || 0;
    const triples = player.triples || 0;
    const homeRuns = player.homeRuns || 0;
    const slg = (singles + (2 * doubles) + (3 * triples) + (4 * homeRuns)) / atBats;
    
    return obp + slg;
  };

  /**
   * Calculates wOBA (Weighted On-base Average) approximation
   * Since we don't have all the data, this is a simplified version
   */
  const calculateWOBA = (player: any) => {
    if (!player.atBats || player.atBats === 0) return 0;
    
    // A more standard simplified wOBA calculation
    const singles = player.singles || 0;
    const doubles = player.doubles || 0;
    const triples = player.triples || 0;
    const homeRuns = player.homeRuns || 0;
    const walks = player.walks || 0; // Still 0, but good practice
    const atBats = player.atBats;
    const plateAppearances = atBats + walks;

    if (plateAppearances === 0) return 0;

    const woba = (0.89 * singles + 1.27 * doubles + 1.62 * triples + 2.10 * homeRuns) / plateAppearances;
    return woba;
  };

  /**
   * Calculates WAR (Wins Above Replacement) approximation
   * This is a simplified version since we don't have all the data needed for exact WAR
   */
  const calculateWAR = (player: any) => {
    if (!player.gamesPlayed || player.gamesPlayed === 0) return 0;
    
    // Simplified WAR calculation based on available stats
    let war = 0;
    
    // Batting component (40% of WAR)
    if (player.battingAvg > 0) {
      const battingWAR = (player.battingAvg - 0.25) * 100; // Base WAR from batting average
      war += Math.max(0, battingWAR);
      
      // Bonus for RBI production
      if (player.rbis > 0) {
        war += (player.rbis / player.gamesPlayed) * 0.5;
      }
      
      // Bonus for stolen bases
      if (player.stolenBases > 0) {
        war += (player.stolenBases / player.gamesPlayed) * 0.3;
      }
    }
    
    // Pitching component (40% of WAR)
    if (player.era && player.era > 0) {
      const era = player.era;
      const innings = player.inningsPitched || 0;
      
      // Approximate pitching WAR (lower ERA = higher WAR)
      const eraWAR = (4.00 - era) * (innings / 9) * 0.8;
      war += Math.max(0, eraWAR);
      
      // Bonus for wins
      if (player.wins > 0) {
        war += player.wins * 0.2;
      }
      
      // Bonus for strikeouts
      if (player.strikeouts > 0) {
        war += (player.strikeouts / player.gamesPlayed) * 0.1;
      }
    }
    
    // Fielding component (20% of WAR)
    if (player.fielding > 0) {
      const fieldingPct = player.fielding;
      const fieldingWAR = (fieldingPct - 0.95) * 200; // Fielding contribution
      war += Math.max(0, fieldingWAR);
    }
    
    // Games played adjustment
    war *= (player.gamesPlayed / 20); // Normalize to 20 games
    
    return Math.round(war * 10) / 10; // Round to 1 decimal place
  };

  /**
   * Calculates player efficiency rating
   */
  const calculateEfficiency = (player: any) => {
    if (!player.gamesPlayed || player.gamesPlayed === 0) return 0;
    
    let efficiency = 0;
    
    // Batting efficiency
    if (player.battingAvg > 0) {
      efficiency += player.battingAvg * 50;
    }
    
    // RBI efficiency
    if (player.rbis > 0) {
      efficiency += (player.rbis / player.gamesPlayed) * 10;
    }
    
    // Fielding efficiency
    if (player.fielding > 0) {
      efficiency += player.fielding * 30;
    }
    
    // Pitching efficiency
    if (player.era && player.era > 0) {
      efficiency += Math.max(0, (4.00 - player.era) * 10);
    }
    
    return Math.round(efficiency);
  };

  /**
   * Generates advanced metrics data for charts
   */
  const generateAdvancedMetrics = () => {
    return players
      .filter(player => player.gamesPlayed > 0)
      .map(player => ({
        name: player.name,
        war: calculateWAR(player),
        ops: calculateOPS(player) * 1000, // Scale up for better visibility
        woba: calculateWOBA(player) * 1000, // Scale up for better visibility
        efficiency: calculateEfficiency(player),
        battingAvg: player.battingAvg,
        era: player.era || 0,
        fielding: player.fielding,
      }))
      .sort((a, b) => b.war - a.war);
  };

  /**
   * Calculates team advanced metrics
   */
  const calculateTeamAdvancedMetrics = () => {
    if (players.length === 0) return null;
    
    const totalWAR = players.reduce((sum, p) => sum + calculateWAR(p), 0);
    const avgOPS = players.reduce((sum, p) => sum + calculateOPS(p), 0) / players.length;
    const avgWOBA = players.reduce((sum, p) => sum + calculateWOBA(p), 0) / players.length;
    const totalEfficiency = players.reduce((sum, p) => sum + calculateEfficiency(p), 0);
    
    return {
      totalWAR: Math.round(totalWAR * 10) / 10,
      avgOPS: Math.round(avgOPS * 1000) / 1000,
      avgWOBA: Math.round(avgWOBA * 1000) / 1000,
      avgEfficiency: Math.round(totalEfficiency / players.length),
      playerCount: players.length,
    };
  };

  const advancedMetrics = generateAdvancedMetrics();
  const teamMetrics = calculateTeamAdvancedMetrics();

  if (!teamStats || players.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">No data available. Please upload CSV files to view advanced analytics.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Advanced Metrics Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total WAR</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics?.totalWAR || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg OPS</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics?.avgOPS || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg wOBA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics?.avgWOBA || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMetrics?.avgEfficiency || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WAR Leaders Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Trophy className="w-5 h-5 text-primary" />
              WAR Leaders
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Wins Above Replacement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {advancedMetrics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={advancedMetrics.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      color: 'hsl(var(--card-foreground))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                    formatter={(value: number) => [value, 'WAR']}
                  />
                  <Bar dataKey="war" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No advanced metrics available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Efficiency Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Player Efficiency Ratings</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Overall performance efficiency score</CardDescription>
          </CardHeader>
          <CardContent>
            {advancedMetrics.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={advancedMetrics.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      color: 'hsl(var(--card-foreground))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                    formatter={(value: number) => [value, 'Efficiency']}
                  />
                  <Bar dataKey="efficiency" fill="hsl(var(--secondary-foreground))" opacity={0.6} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                No efficiency data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Advanced Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Advanced Metrics Breakdown</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Detailed sabermetric analysis for each player</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-foreground">Player</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-foreground">WAR</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-foreground">OPS</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-foreground">wOBA</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-foreground">Efficiency</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-foreground">AVG</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-foreground">ERA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {advancedMetrics.slice(0, 15).map((player) => (
                  <tr key={player.name}>
                    <td className="py-3 px-4 text-foreground font-medium">{player.name}</td>
                    <td className="py-3 px-4 text-right font-medium">
                      <Badge variant={player.war > 0.5 ? "default" : "secondary"} className="bg-primary/10 text-primary-foreground hover:bg-primary/20 border border-primary/20">
                        {player.war}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{(player.ops / 1000).toFixed(3)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{(player.woba / 1000).toFixed(3)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{player.efficiency}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{player.battingAvg.toFixed(3)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">
                      {player.era > 0 ? player.era.toFixed(2) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Methodology Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Advanced Metrics Methodology</CardTitle>
          <CardDescription className="text-xs sm:text-sm">How these metrics are calculated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">WAR (Wins Above Replacement)</h4>
            <p className="text-sm text-muted-foreground">
              Measures a player's total value in wins compared to a replacement-level player. 
              Combines batting, pitching, and fielding contributions.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">OPS (On-base Plus Slugging)</h4>
            <p className="text-sm text-muted-foreground">
              Combines on-base percentage and slugging percentage to measure overall offensive production.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">wOBA (Weighted On-base Average)</h4>
            <p className="text-sm text-muted-foreground">
              Advanced offensive metric that weights different offensive events based on their run value.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-2">Efficiency Rating</h4>
            <p className="text-sm text-muted-foreground">
              Custom metric combining batting average, RBI production, fielding percentage, and pitching effectiveness.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 