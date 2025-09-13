import { cn } from "@/lib/utils";

export interface Card {
  rank: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  faceUp?: boolean;
}

interface PlayingCardProps {
  card: Card;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

const suitColors = {
  hearts: 'text-red-500',
  diamonds: 'text-red-500',
  clubs: 'text-gray-900',
  spades: 'text-gray-900'
};

const sizes = {
  sm: 'w-12 h-16 text-xs',
  md: 'w-16 h-22 text-sm',
  lg: 'w-20 h-28 text-base'
};

export const PlayingCard = ({ card, size = 'md', className }: PlayingCardProps) => {
  if (!card.faceUp) {
    return (
      <div className={cn(
        "bg-gradient-to-br from-blue-900 to-blue-700 border border-blue-600 rounded-lg flex items-center justify-center shadow-[var(--shadow-card)]",
        sizes[size],
        className
      )}>
        <div className="text-blue-300 text-2xl">🂠</div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-poker-card-bg border border-poker-card-border rounded-lg shadow-[var(--shadow-card)] flex flex-col justify-between p-1",
      sizes[size],
      className
    )}>
      <div className={cn("font-bold", suitColors[card.suit])}>
        <div className="text-center">{card.rank}</div>
        <div className="text-center">{suitSymbols[card.suit]}</div>
      </div>
      <div className={cn("text-center text-lg", suitColors[card.suit])}>
        {suitSymbols[card.suit]}
      </div>
      <div className={cn("font-bold transform rotate-180", suitColors[card.suit])}>
        <div className="text-center">{card.rank}</div>
        <div className="text-center">{suitSymbols[card.suit]}</div>
      </div>
    </div>
  );
};