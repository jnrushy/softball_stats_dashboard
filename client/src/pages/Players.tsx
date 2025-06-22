import React from 'react';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

const Players: React.FC = () => {
  const players = [
    {
      id: '1',
      name: 'Sarah Johnson',
      number: 12,
      position: 'Pitcher',
      grade: 'Senior',
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
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Emily Rodriguez',
      number: 8,
      position: 'Catcher',
      grade: 'Junior',
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
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Casey Brown',
      number: 9,
      position: 'Center Field',
      grade: 'Junior',
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
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Team Roster</h1>
          <p className="text-gray-600">Player statistics and performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-primary-600" />
          <span className="text-sm text-gray-600">{players.length} Players</span>
        </div>
      </div>

      {/* Player Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player) => (
          <div key={player.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <img
                src={player.image}
                alt={player.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{player.name}</h3>
                  <span className="text-2xl font-bold text-primary-600">#{player.number}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{player.position} • {player.grade}</p>
                
                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Target className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-sm font-medium">Batting</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      {player.battingAvg ? player.battingAvg.toFixed(3) : 'N/A'}
                    </p>
                  </div>
                  
                  {player.era && (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Award className="h-4 w-4 text-primary-600 mr-1" />
                        <span className="text-sm font-medium">ERA</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{player.era}</p>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <TrendingUp className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-sm font-medium">RBIs</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{player.rbis}</p>
                  </div>
                  
                  <div className="text-center">
                    <span className="text-sm font-medium text-gray-600">Games</span>
                    <p className="text-lg font-bold text-gray-900">{player.gamesPlayed}</p>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">Hits:</span>
                      <span className="ml-1 font-medium">{player.hits}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Runs:</span>
                      <span className="ml-1 font-medium">{player.runs}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">SB:</span>
                      <span className="ml-1 font-medium">{player.stolenBases}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Players; 