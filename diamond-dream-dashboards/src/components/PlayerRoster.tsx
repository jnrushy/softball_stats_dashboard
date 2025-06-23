/**
 * Player Roster Component
 * 
 * Displays the team roster with individual player statistics and performance metrics.
 * Includes performance trend indicators.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { useData } from "../context/DataContext";

export const PlayerRoster = () => {
  const { players } = useData();

  /**
   * Gets the appropriate trend icon based on player performance
   */
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4" />;
    }
  };

  /**
   * Gets color coding for player positions
   */
  const getPositionColor = (position: string) => {
    const colors: { [key: string]: string } = {
      'P': 'bg-purple-100 text-purple-800',
      'C': 'bg-blue-100 text-blue-800',
      '1B': 'bg-green-100 text-green-800',
      '2B': 'bg-yellow-100 text-yellow-800',
      '3B': 'bg-orange-100 text-orange-800',
      'SS': 'bg-red-100 text-red-800',
      'LF': 'bg-pink-100 text-pink-800',
      'CF': 'bg-indigo-100 text-indigo-800',
      'RF': 'bg-cyan-100 text-cyan-800',
      'IF': 'bg-gray-100 text-gray-800',
    };
    return colors[position] || 'bg-gray-100 text-gray-800';
  };

  /**
   * Generates player initials for avatar
   */
  const getPlayerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Player Roster</h2>
          <p className="text-gray-600">Individual player statistics and performance</p>
        </div>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
          {players.length} Players
        </Badge>
      </div>

      {players.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">
              No players available
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <Card key={player.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500">
                      <AvatarFallback className="text-white font-semibold">
                        {getPlayerInitials(player.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{player.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getPositionColor(player.position)}`}>
                          {player.position}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {getTrendIcon(player.trend)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Batting Avg</span>
                      <span className="font-semibold">
                        {player.battingAvg > 0 ? player.battingAvg.toFixed(3) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hits</span>
                      <span className="font-semibold">{player.hits}</span>
                    </div>
                    {player.era && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">ERA</span>
                        <span className="font-semibold">{player.era.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fielding</span>
                      <span className="font-semibold">
                        {player.fielding > 0 ? player.fielding.toFixed(3) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RBI</span>
                      <span className="font-semibold">{player.rbis}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Games</span>
                      <span className="font-semibold">{player.gamesPlayed}</span>
                    </div>
                  </div>
                </div>
                
                {/* Additional stats */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Runs:</span>
                      <span className="ml-1 font-medium">{player.runs}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">SB:</span>
                      <span className="ml-1 font-medium">{player.stolenBases}</span>
                    </div>
                    {player.strikeouts > 0 && (
                      <div>
                        <span className="text-gray-500">SO:</span>
                        <span className="ml-1 font-medium">{player.strikeouts}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Top performer badge */}
                {player.battingAvg > 0.300 && (
                  <div className="mt-3 flex items-center gap-1 text-yellow-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-medium">Top Performer</span>
                  </div>
                )}

                {/* Pitching stats for pitchers */}
                {player.era && player.wins > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Wins:</span>
                      <span className="font-medium">{player.wins}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Losses:</span>
                      <span className="font-medium">{player.losses}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
