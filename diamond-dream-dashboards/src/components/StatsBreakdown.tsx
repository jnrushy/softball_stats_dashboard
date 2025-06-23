/**
 * Statistics Breakdown Component
 * 
 * Displays detailed statistical analysis with charts and breakdowns.
 * Uses real data from the context to show actual performance metrics.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Target, TrendingUp, Award, Users } from "lucide-react";
import { useData } from "../context/DataContext";

export const StatsBreakdown = () => {
  const { players, teamStats, teamLeaders } = useData();

  /**
   * Generates batting average distribution data for the chart
   */
  const generateBattingDistribution = () => {
    const ranges = [
      { range: '0.000-0.200', count: 0, color: '#ef4444' },
      { range: '0.201-0.250', count: 0, color: '#f97316' },
      { range: '0.251-0.300', count: 0, color: '#eab308' },
      { range: '0.301-0.350', count: 0, color: '#22c55e' },
      { range: '0.351+', count: 0, color: '#10b981' },
    ];

    players.forEach(player => {
      if (player.battingAvg > 0) {
        if (player.battingAvg <= 0.200) ranges[0].count++;
        else if (player.battingAvg <= 0.250) ranges[1].count++;
        else if (player.battingAvg <= 0.300) ranges[2].count++;
        else if (player.battingAvg <= 0.350) ranges[3].count++;
        else ranges[4].count++;
      }
    });

    return ranges.filter(range => range.count > 0);
  };

  /**
   * Generates position distribution data
   */
  const generatePositionDistribution = () => {
    const positions: { [key: string]: number } = {};
    
    players.forEach(player => {
      positions[player.position] = (positions[player.position] || 0) + 1;
    });

    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];
    
    return Object.entries(positions).map(([position, count], index) => ({
      position,
      count,
      color: colors[index % colors.length],
    }));
  };

  /**
   * Generates top performers data for the bar chart
   */
  const generateTopPerformers = () => {
    return players
      .filter(player => player.battingAvg > 0)
      .sort((a, b) => b.battingAvg - a.battingAvg)
      .slice(0, 8)
      .map(player => ({
        name: player.name,
        battingAvg: player.battingAvg,
        hits: player.hits,
        rbis: player.rbis,
      }));
  };

  const battingDistribution = generateBattingDistribution();
  const positionDistribution = generatePositionDistribution();
  const topPerformers = generateTopPerformers();

  if (!teamStats || players.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500">No data available. Please upload CSV files to view statistics breakdown.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-medium">Total Hits</p>
                <p className="text-2xl font-bold">{teamStats.totalHits}</p>
              </div>
              <Target className="w-6 h-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs font-medium">Total RBIs</p>
                <p className="text-2xl font-bold">{teamStats.totalRbis}</p>
              </div>
              <Award className="w-6 h-6 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs font-medium">Stolen Bases</p>
                <p className="text-2xl font-bold">{teamStats.totalStolenBases}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs font-medium">Strikeouts</p>
                <p className="text-2xl font-bold">{teamStats.totalStrikeouts}</p>
              </div>
              <Users className="w-6 h-6 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Batting Average Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Batting Average Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Distribution of player batting averages</CardDescription>
          </CardHeader>
          <CardContent>
            {battingDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={battingDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No batting data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Position Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Position Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Number of players by position</CardDescription>
          </CardHeader>
          <CardContent>
            {positionDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={positionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ position, count }) => `${position}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {positionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No position data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Batting Average */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top 5 Batting Average</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Best hitters by average</CardDescription>
          </CardHeader>
          <CardContent>
            {topPerformers.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topPerformers.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 0.5]} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [value.toFixed(3), 'Batting Average']}
                  />
                  <Bar dataKey="battingAvg" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No batting data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top 5 RBI */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top 5 RBI Leaders</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Most runs batted in</CardDescription>
          </CardHeader>
          <CardContent>
            {players.filter(p => p.rbis > 0).length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={players
                    .filter(p => p.rbis > 0)
                    .sort((a, b) => b.rbis - a.rbis)
                    .slice(0, 5)
                    .map(p => ({ name: p.name, rbis: p.rbis }))
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [value, 'RBI']}
                  />
                  <Bar dataKey="rbis" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No RBI data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top 5 Runs Scored */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top 5 Runs Scored</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Most runs scored</CardDescription>
          </CardHeader>
          <CardContent>
            {players.filter(p => p.runs > 0).length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={players
                    .filter(p => p.runs > 0)
                    .sort((a, b) => b.runs - a.runs)
                    .slice(0, 5)
                    .map(p => ({ name: p.name, runs: p.runs }))
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [value, 'Runs']}
                  />
                  <Bar dataKey="runs" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No runs data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Detailed Statistics</CardTitle>
          <CardDescription className="text-xs sm:text-sm">Comprehensive team and individual statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900">Category</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900">Total</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900">Average</th>
                  <th className="text-right py-3 px-2 sm:px-4 font-medium text-gray-900">Leader</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 px-2 sm:px-4 text-gray-700">Games Played</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-medium">{teamStats.gamesPlayed}</td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {players.length > 0 ? (teamStats.gamesPlayed / players.length).toFixed(1) : 'N/A'}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {teamLeaders.batting[0]?.gamesPlayed || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 sm:px-4 text-gray-700">Total Hits</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-medium">{teamStats.totalHits}</td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {players.length > 0 ? (teamStats.totalHits / players.length).toFixed(1) : 'N/A'}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {teamLeaders.batting[0]?.hits || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 sm:px-4 text-gray-700">Total RBIs</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-medium">{teamStats.totalRbis}</td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {players.length > 0 ? (teamStats.totalRbis / players.length).toFixed(1) : 'N/A'}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {teamLeaders.rbis[0]?.rbis || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 sm:px-4 text-gray-700">Stolen Bases</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-medium">{teamStats.totalStolenBases}</td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {players.length > 0 ? (teamStats.totalStolenBases / players.length).toFixed(1) : 'N/A'}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {teamLeaders.stolenBases[0]?.stolenBases || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 sm:px-4 text-gray-700">Strikeouts</td>
                  <td className="py-3 px-2 sm:px-4 text-right font-medium">{teamStats.totalStrikeouts}</td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {players.length > 0 ? (teamStats.totalStrikeouts / players.length).toFixed(1) : 'N/A'}
                  </td>
                  <td className="py-3 px-2 sm:px-4 text-right text-gray-600">
                    {teamLeaders.strikeouts[0]?.strikeouts || 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
