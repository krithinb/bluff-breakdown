import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

interface SolverData {
  equity: number;
  expectedValue: number;
  optimalAction: string;
  actionFrequencies: {
    action: string;
    frequency: number;
    ev: number;
  }[];
  leakAnalysis?: {
    severity: 'low' | 'medium' | 'high';
    description: string;
    improvement: string;
  };
}

interface SolverInsightsProps {
  solverData: SolverData;
  playerAction?: string;
  className?: string;
}

export const SolverInsights = ({ solverData, playerAction, className }: SolverInsightsProps) => {
  const isOptimalPlay = playerAction === solverData.optimalAction;
  
  return (
    <div className="space-y-4">
      {/* Equity and EV Overview */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Equity</h3>
              <p className="text-2xl font-bold text-foreground">
                {(solverData.equity * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-primary">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
          <Progress value={solverData.equity * 100} className="mt-2" />
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Expected Value</h3>
              <p className={`text-2xl font-bold ${solverData.expectedValue >= 0 ? 'text-primary' : 'text-destructive'}`}>
                ${solverData.expectedValue.toFixed(2)}
              </p>
            </div>
            <div className={solverData.expectedValue >= 0 ? 'text-primary' : 'text-destructive'}>
              {solverData.expectedValue >= 0 ? (
                <TrendingUp className="h-6 w-6" />
              ) : (
                <TrendingDown className="h-6 w-6" />
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Optimal Action */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Solver Recommendation</h3>
          {isOptimalPlay ? (
            <Badge variant="default" className="bg-primary">
              <CheckCircle className="h-3 w-3 mr-1" />
              Optimal
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              Suboptimal
            </Badge>
          )}
        </div>
        <p className="text-lg font-medium text-primary">
          {solverData.optimalAction}
        </p>
        {playerAction && !isOptimalPlay && (
          <p className="text-sm text-muted-foreground mt-1">
            You played: <span className="text-destructive">{playerAction}</span>
          </p>
        )}
      </Card>

      {/* Action Frequencies */}
      <Card className="p-4">
        <h3 className="font-semibold mb-3">Action Frequencies</h3>
        <div className="space-y-3">
          {solverData.actionFrequencies.map((action, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{action.action}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {(action.frequency * 100).toFixed(1)}%
                  </span>
                  <span className={`text-sm font-medium ${action.ev >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    EV: ${action.ev.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={action.frequency * 100} className="flex-1" />
                {playerAction === action.action && (
                  <Badge variant="secondary" className="text-xs">You</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leak Analysis */}
      {solverData.leakAnalysis && (
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className={`h-5 w-5 ${
              solverData.leakAnalysis.severity === 'high' ? 'text-destructive' :
              solverData.leakAnalysis.severity === 'medium' ? 'text-amber-500' :
              'text-yellow-500'
            }`} />
            <h3 className="font-semibold">Leak Analysis</h3>
            <Badge variant={
              solverData.leakAnalysis.severity === 'high' ? 'destructive' :
              solverData.leakAnalysis.severity === 'medium' ? 'secondary' :
              'outline'
            }>
              {solverData.leakAnalysis.severity.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {solverData.leakAnalysis.description}
          </p>
          <div className="bg-muted rounded-lg p-3">
            <h4 className="text-sm font-medium text-primary mb-1">Improvement Suggestion:</h4>
            <p className="text-sm">{solverData.leakAnalysis.improvement}</p>
          </div>
        </Card>
      )}
    </div>
  );
};