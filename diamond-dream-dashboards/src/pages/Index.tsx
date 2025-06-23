/**
 * Main Dashboard Page
 * 
 * Displays the softball team dashboard with embedded team data.
 * Includes team overview, player roster, statistics, and analysis sections.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Award, TrendingUp, Users, Target, BarChart3, PieChart } from "lucide-react";
import { useData } from "../context/DataContext";
import { TeamOverview } from "../components/TeamOverview";
import { PlayerRoster } from "../components/PlayerRoster";
import { StatsBreakdown } from "../components/StatsBreakdown";
import { AdvancedAnalytics } from "../components/AdvancedAnalytics";

const Index = () => {
  const { players, teamStats } = useData();

  /**
   * Renders the main dashboard
   */
  return (
    <>
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-foreground">SDYS All Stars 2025</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Girls Softball Team Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-4 sm:mt-0 self-end sm:self-center">
              <Badge variant="outline" className="text-xs sm:text-sm">
                2025 Season
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Average</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamStats.teamBattingAvg.toFixed(3)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Record (W-L)</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teamStats.totalWins}-{teamStats.totalLosses}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team ERA</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {teamStats.teamERA.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Players</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{players.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <div className="w-full overflow-x-auto pb-1">
            <TabsList className="grid w-full grid-cols-5 bg-muted p-1 rounded-lg min-w-max">
              <TabsTrigger 
                value="overview" 
                className="whitespace-nowrap text-xs font-medium px-2 sm:px-4"
              >
                <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Overview</span>
              </TabsTrigger>
              <TabsTrigger 
                value="roster" 
                className="whitespace-nowrap text-xs font-medium px-2 sm:px-4"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Roster</span>
                <span className="sm:hidden">Roster</span>
              </TabsTrigger>
              <TabsTrigger 
                value="stats" 
                className="whitespace-nowrap text-xs font-medium px-2 sm:px-4"
              >
                <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Stats</span>
                <span className="sm:hidden">Stats</span>
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="whitespace-nowrap text-xs font-medium px-2 sm:px-4"
              >
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
                <span className="sm:hidden">Analytics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="breakdown" 
                className="whitespace-nowrap text-xs font-medium px-2 sm:px-4"
              >
                <PieChart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Breakdown</span>
                <span className="sm:hidden">Breakdown</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <TeamOverview />
          </TabsContent>

          <TabsContent value="roster" className="space-y-6">
            <PlayerRoster />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Team Statistics</CardTitle>
                  <CardDescription>
                    Comprehensive team performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {teamStats.totalWins}-{teamStats.totalLosses}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Record</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {teamStats.teamBattingAvg.toFixed(3)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Team AVG</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {teamStats.teamERA.toFixed(2)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Team ERA</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        {teamStats.totalRuns}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">Runs Scored</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics />
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-6">
            <StatsBreakdown />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Index;
