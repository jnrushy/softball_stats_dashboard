/**
 * Team Overview Component
 * 
 * Displays team performance charts, recent games, and key statistics.
 * Uses real data from the context to show actual team performance metrics.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Target, Award, Users, Trophy, Shield, Zap } from "lucide-react";
import { useData } from "../context/DataContext";

export const TeamOverview = () => {
  const { players, teamStats, teamLeaders } = useData();

  if (!teamStats) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">No team data available. Please upload CSV files to view team overview.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Team Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            Key Statistics
          </CardTitle>
          <CardDescription>Season performance metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Batting Average</span>
              <span className="text-gray-600">
                {teamStats.teamBattingAvg > 0 ? teamStats.teamBattingAvg.toFixed(3) : 'N/A'}
              </span>
            </div>
            <Progress 
              value={teamStats.teamBattingAvg > 0 ? teamStats.teamBattingAvg * 100 : 0} 
              className="h-2" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Win Percentage</span>
              <span className="text-gray-600">
                {teamStats.winPercentage > 0 ? (teamStats.winPercentage * 100).toFixed(1) + '%' : 'N/A'}
              </span>
            </div>
            <Progress 
              value={teamStats.winPercentage > 0 ? teamStats.winPercentage * 100 : 0} 
              className="h-2" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Fielding Percentage</span>
              <span className="text-gray-600">
                {teamStats.fieldingPercentage > 0 ? teamStats.fieldingPercentage.toFixed(3) : 'N/A'}
              </span>
            </div>
            <Progress 
              value={teamStats.fieldingPercentage > 0 ? teamStats.fieldingPercentage * 100 : 0} 
              className="h-2" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Team ERA</span>
              <span className="text-gray-600">
                {teamStats.teamEra > 0 ? teamStats.teamEra.toFixed(2) : 'N/A'}
              </span>
            </div>
            <Progress 
              value={teamStats.teamEra > 0 ? Math.max(0, 100 - (teamStats.teamEra * 10)) : 0} 
              className="h-2" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Offense Leaders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-orange-600" />
            Offense Leaders
          </CardTitle>
          <CardDescription>Top performers at the plate</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Batting Average</h4>
            <div className="space-y-1">
              {teamLeaders.batting.slice(0, 3).map((player, index) => (
                <div key={player.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.battingAvg.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">RBIs</h4>
            <div className="space-y-1">
              {teamLeaders.rbis.slice(0, 3).map((player, index) => (
                <div key={player.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.rbis}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Stolen Bases</h4>
            <div className="space-y-1">
              {teamLeaders.stolenBases.slice(0, 3).map((player, index) => (
                <div key={player.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.stolenBases}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Defense Leaders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Defense Leaders
          </CardTitle>
          <CardDescription>Top fielding performers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Fielding Percentage</h4>
            <div className="space-y-1">
              {players
                .filter(player => player.fielding > 0)
                .sort((a, b) => b.fielding - a.fielding)
                .slice(0, 3)
                .map((player, index) => (
                  <div key={player.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{player.name}</span>
                    <span className="font-medium">{player.fielding.toFixed(3)}</span>
                  </div>
                ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Games Played</h4>
            <div className="space-y-1">
              {players
                .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
                .slice(0, 3)
                .map((player, index) => (
                  <div key={player.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{player.name}</span>
                    <span className="font-medium">{player.gamesPlayed}</span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pitching Leaders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Pitching Leaders
          </CardTitle>
          <CardDescription>Top performers on the mound</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Wins</h4>
            <div className="space-y-1">
              {teamLeaders.wins.slice(0, 3).map((player, index) => (
                <div key={player.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.wins}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Strikeouts</h4>
            <div className="space-y-1">
              {teamLeaders.strikeouts.slice(0, 3).map((player, index) => (
                <div key={player.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.strikeouts}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">ERA (Pitchers Only)</h4>
            <div className="space-y-1">
              {players
                .filter(player => player.era !== null && player.era > 0)
                .sort((a, b) => (a.era || 0) - (b.era || 0))
                .slice(0, 3)
                .map((player, index) => (
                  <div key={player.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{player.name}</span>
                    <span className="font-medium">{(player.era || 0).toFixed(2)}</span>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
