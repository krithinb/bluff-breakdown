import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PokerTable } from "./PokerTable";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface HandAction {
  id: string;
  playerId: string;
  action: string;
  amount?: number;
  description: string;
  pot: number;
  communityCards: any[];
}

interface HandReplayerProps {
  handData: {
    id: string;
    title: string;
    players: any[];
    actions: HandAction[];
    finalPot: number;
  };
}

export const HandReplayer = ({ handData }: HandReplayerProps) => {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const currentAction = handData.actions[currentActionIndex];
  const progress = ((currentActionIndex + 1) / handData.actions.length) * 100;

  const nextAction = () => {
    if (currentActionIndex < handData.actions.length - 1) {
      setCurrentActionIndex(currentActionIndex + 1);
    }
  };

  const prevAction = () => {
    if (currentActionIndex > 0) {
      setCurrentActionIndex(currentActionIndex - 1);
    }
  };

  const resetHand = () => {
    setCurrentActionIndex(0);
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Hand title and info */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">{handData.title}</h2>
        <p className="text-muted-foreground">
          Action {currentActionIndex + 1} of {handData.actions.length}
        </p>
      </div>

      {/* Poker table */}
      <PokerTable
        players={handData.players}
        communityCards={currentAction?.communityCards || []}
        pot={currentAction?.pot || 0}
        currentAction={currentAction?.description}
      />

      {/* Progress bar */}
      <div className="space-y-2">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Pre-flop</span>
          <span>Flop</span>
          <span>Turn</span>
          <span>River</span>
          <span>Showdown</span>
        </div>
      </div>

      {/* Current action display */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Current Action</h3>
            <div className="text-sm text-muted-foreground">
              Step {currentActionIndex + 1}
            </div>
          </div>
          <p className="text-foreground">{currentAction?.description || "Hand complete"}</p>
          {currentAction?.amount && (
            <p className="text-poker-gold font-medium">
              Amount: ${currentAction.amount}
            </p>
          )}
        </div>
      </Card>

      {/* Playback controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={resetHand}
          className="hover:bg-muted"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={prevAction}
          disabled={currentActionIndex === 0}
          className="hover:bg-muted"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          variant="default"
          size="icon"
          onClick={togglePlayback}
          className="bg-primary hover:bg-primary/90"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={nextAction}
          disabled={currentActionIndex >= handData.actions.length - 1}
          className="hover:bg-muted"
        >
          <SkipForward className="h-4 w-4" />
        </Button>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Speed:</span>
          <select 
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-card border border-border rounded px-2 py-1 text-sm"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};