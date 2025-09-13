import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HandReplayer } from "@/components/poker/HandReplayer";
import { SolverInsights } from "@/components/poker/SolverInsights";
import { Badge } from "@/components/ui/badge";
import { Spade, Users, BarChart3, Brain } from "lucide-react";

const sampleHandData = {
  id: "hand_001",
  title: "AA vs KK Pre-flop All-in",
  players: [
    {
      id: "hero",
      name: "Hero",
      chips: 1850,
      cards: [
        { rank: "A", suit: "spades", faceUp: true },
        { rank: "A", suit: "hearts", faceUp: true }
      ],
      position: 0,
      action: "All-in",
      bet: 150,
      isHero: true,
      isActive: false
    },
    {
      id: "villain",
      name: "Villain",
      chips: 1700,
      cards: [
        { rank: "K", suit: "clubs", faceUp: true },
        { rank: "K", suit: "diamonds", faceUp: true }
      ],
      position: 1,
      action: "Call",
      bet: 150,
      isActive: true
    }
  ],
  actions: [
    {
      id: "1",
      playerId: "hero",
      action: "raise",
      amount: 25,
      description: "Hero raises to $25 from UTG",
      pot: 35,
      communityCards: []
    },
    {
      id: "2",
      playerId: "villain",
      action: "3bet",
      amount: 75,
      description: "Villain 3-bets to $75 from BB",
      pot: 110,
      communityCards: []
    },
    {
      id: "3",
      playerId: "hero",
      action: "4bet",
      amount: 150,
      description: "Hero 4-bets all-in for $150",
      pot: 260,
      communityCards: []
    },
    {
      id: "4",
      playerId: "villain",
      action: "call",
      amount: 75,
      description: "Villain calls all-in",
      pot: 310,
      communityCards: []
    },
    {
      id: "5",
      playerId: "dealer",
      action: "flop",
      description: "Flop: A♦ K♠ 7♣",
      pot: 310,
      communityCards: [
        { rank: "A", suit: "diamonds", faceUp: true },
        { rank: "K", suit: "spades", faceUp: true },
        { rank: "7", suit: "clubs", faceUp: true }
      ]
    }
  ],
  finalPot: 310
};

const sampleSolverData = {
  equity: 0.823,
  expectedValue: 127.50,
  optimalAction: "4-bet all-in",
  actionFrequencies: [
    { action: "4-bet all-in", frequency: 0.85, ev: 127.50 },
    { action: "Call", frequency: 0.15, ev: 89.20 },
    { action: "Fold", frequency: 0.00, ev: -25.00 }
  ],
  leakAnalysis: {
    severity: "low" as const,
    description: "Excellent play with pocket aces. This is a standard 4-bet all-in spot.",
    improvement: "Continue playing aggressively with premium hands in similar situations."
  }
};

const Index = () => {
  const [selectedHand, setSelectedHand] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Spade className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Poker Tutor Pro</h1>
                <p className="text-sm text-muted-foreground">
                  AI-Powered Hand Analysis & Solver Insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Brain className="h-3 w-3 mr-1" />
                Solver Active
              </Badge>
              <Button variant="outline">Import Hands</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Hand Replayer */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <HandReplayer handData={sampleHandData} />
            </Card>
          </div>

          {/* Right Panel - Analysis */}
          <div className="space-y-6">
            <Tabs defaultValue="solver" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="solver">Solver</TabsTrigger>
                <TabsTrigger value="stats">Stats</TabsTrigger>
                <TabsTrigger value="ai">AI Coach</TabsTrigger>
              </TabsList>

              <TabsContent value="solver" className="mt-4">
                <SolverInsights 
                  solverData={sampleSolverData} 
                  playerAction="4-bet all-in"
                />
              </TabsContent>

              <TabsContent value="stats" className="mt-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Session Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hands Analyzed</span>
                      <span className="font-medium">247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Optimal Plays</span>
                      <span className="font-medium text-primary">78.9%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Major Leaks</span>
                      <span className="font-medium text-destructive">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EV Lost</span>
                      <span className="font-medium text-destructive">-$45.20</span>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="ai" className="mt-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    AI Coaching
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-primary mb-1">Pattern Recognition</h4>
                      <p className="text-sm">
                        You're playing premium hands well but missing value bets on the river. 
                        Consider betting larger with strong hands.
                      </p>
                    </div>
                    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-secondary-foreground mb-1">Trend Analysis</h4>
                      <p className="text-sm">
                        Your 3-bet frequency has improved by 15% this session. 
                        Keep up the aggressive play in position.
                      </p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  New Session
                </Button>
                <Button variant="outline" size="sm">
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  Range Charts
                </Button>
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;