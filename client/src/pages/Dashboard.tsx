import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  TrendingUp,
  Target,
  Award
} from 'lucide-react';
import { TeamOverview, Game, Player, TeamLeaders } from '../types';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        // For now, we'll simulate the data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Lady Eagles Softball</h1>
        <p className="text-primary-100">2024 Season Dashboard</p>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Trophy className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Season Record</p>
              <p className="text-2xl font-bold text-gray-900">8-2</p>
            </div>
          </div>
        </div>

        <div className="stat-card-success">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Win Percentage</p>
              <p className="text-2xl font-bold text-gray-900">80%</p>
            </div>
          </div>
        </div>

        <div className="stat-card-warning">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Batting</p>
              <p className="text-2xl font-bold text-gray-900">.324</p>
            </div>
          </div>
        </div>

        <div className="stat-card-error">
          <div className="flex items-center">
            <div className="p-2 bg-error-100 rounded-lg">
              <Award className="h-6 w-6 text-error-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team ERA</p>
              <p className="text-2xl font-bold text-gray-900">2.85</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Games and Next Game */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Games */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Games</h3>
            <div className="space-y-3">
              {[
                { date: '2024-04-16', opponent: 'Washington Academy', result: 'W', score: '6-5' },
                { date: '2024-04-12', opponent: 'Franklin High', result: 'W', score: '11-0' },
                { date: '2024-04-09', opponent: 'Jefferson Prep', result: 'W', score: '7-2' },
                { date: '2024-04-05', opponent: 'Lincoln High', result: 'L', score: '3-6' },
                { date: '2024-04-02', opponent: 'South Academy', result: 'W', score: '9-4' }
              ].map((game, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      game.result === 'W' ? 'bg-success-100 text-success-800' : 'bg-error-100 text-error-800'
                    }`}>
                      {game.result}
                    </span>
                    <span className="text-sm text-gray-600">{game.date}</span>
                    <span className="font-medium">{game.opponent}</span>
                  </div>
                  <span className="font-semibold">{game.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Next Game */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Game</h3>
          <div className="bg-primary-50 rounded-lg p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">vs</p>
              <p className="text-xl font-bold text-gray-900 mb-2">Madison High</p>
              <p className="text-sm text-gray-600 mb-1">Friday, April 19</p>
              <p className="text-sm text-gray-600 mb-3">4:00 PM • Home</p>
              <button className="btn-primary w-full">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Team Leaders */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Leaders</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Batting Average</h4>
            <div className="space-y-2">
              {[
                { name: 'Casey Brown', avg: '.401' },
                { name: 'Jordan Williams', avg: '.367' },
                { name: 'Emily Rodriguez', avg: '.389' }
              ].map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.avg}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">RBIs</h4>
            <div className="space-y-2">
              {[
                { name: 'Emily Rodriguez', rbis: 25 },
                { name: 'Maya Thompson', rbis: 22 },
                { name: 'Taylor Davis', rbis: 21 }
              ].map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.rbis}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Stolen Bases</h4>
            <div className="space-y-2">
              {[
                { name: 'Casey Brown', sb: 15 },
                { name: 'Jordan Williams', sb: 11 },
                { name: 'Quinn Anderson', sb: 7 }
              ].map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.sb}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Wins</h4>
            <div className="space-y-2">
              {[
                { name: 'Sarah Johnson', wins: 12 },
                { name: 'Team Total', wins: 8 }
              ].map((player, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{player.name}</span>
                  <span className="font-medium">{player.wins}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 