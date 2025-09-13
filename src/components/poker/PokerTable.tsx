import { PlayingCard, Card } from "./PlayingCard";
import { cn } from "@/lib/utils";

interface Player {
  id: string;
  name: string;
  chips: number;
  cards: Card[];
  position: number;
  action?: string;
  bet?: number;
  isActive?: boolean;
  isHero?: boolean;
}

interface PokerTableProps {
  players: Player[];
  communityCards: Card[];
  pot: number;
  currentAction?: string;
  className?: string;
}

export const PokerTable = ({ players, communityCards, pot, currentAction, className }: PokerTableProps) => {
  return (
    <div className={cn(
      "relative w-full h-96 bg-gradient-to-br from-poker-felt to-poker-felt-light rounded-[50px] border-4 border-poker-gold shadow-2xl",
      className
    )}>
      {/* Pot display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-card rounded-lg px-4 py-2 shadow-lg border border-poker-gold">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Pot</div>
            <div className="text-lg font-bold text-poker-gold">${pot}</div>
          </div>
        </div>
      </div>

      {/* Community cards */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 flex gap-2">
        {communityCards.map((card, index) => (
          <PlayingCard key={index} card={card} size="md" />
        ))}
        {/* Placeholder cards */}
        {Array.from({ length: 5 - communityCards.length }, (_, index) => (
          <div
            key={`placeholder-${index}`}
            className="w-16 h-22 border-2 border-dashed border-muted rounded-lg bg-muted/10"
          />
        ))}
      </div>

      {/* Players positioned around the table */}
      {players.map((player, index) => {
        const angle = (index * 360) / players.length;
        const radius = 140;
        const x = Math.cos((angle - 90) * Math.PI / 180) * radius;
        const y = Math.sin((angle - 90) * Math.PI / 180) * radius;

        return (
          <div
            key={player.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
            }}
          >
            <PlayerPosition player={player} />
          </div>
        );
      })}

      {/* Current action indicator */}
      {currentAction && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-lg font-medium">
            {currentAction}
          </div>
        </div>
      )}
    </div>
  );
};

const PlayerPosition = ({ player }: { player: Player }) => {
  return (
    <div className={cn(
      "flex flex-col items-center gap-2 p-2 rounded-lg",
      player.isActive && "bg-primary/20 border border-primary",
      player.isHero && "bg-secondary/20 border border-secondary"
    )}>
      {/* Player cards */}
      <div className="flex gap-1">
        {player.cards.map((card, index) => (
          <PlayingCard key={index} card={card} size="sm" />
        ))}
      </div>
      
      {/* Player info */}
      <div className="bg-card rounded px-2 py-1 text-center min-w-20">
        <div className="text-xs font-medium text-card-foreground">{player.name}</div>
        <div className="text-xs text-poker-gold">${player.chips}</div>
        {player.bet && player.bet > 0 && (
          <div className="text-xs text-accent font-bold">Bet: ${player.bet}</div>
        )}
        {player.action && (
          <div className="text-xs text-primary font-medium">{player.action}</div>
        )}
      </div>
    </div>
  );
};