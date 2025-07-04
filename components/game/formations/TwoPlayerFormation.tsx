import React from 'react';
import { View } from 'react-native';
import { TwoPlayerOpposingCard } from './playerCards/TwoPlayerOpposingCard';
import { TwoPlayerDistantCard } from './playerCards/TwoPlayerDistantCard';
import { twoPlayerFormationStyles } from './styles/twoPlayerFormationStyles';

interface Player {
  id: string;
  name: string;
  life: number;
  color: string;
  isActive: boolean;
}

interface PlayerPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  side: string;
}

interface TwoPlayerFormationProps {
  players: Player[];
  playerPositions: PlayerPosition[];
  currentPlayerIndex: number;
  onLifeChange: (playerId: string, newLife: number) => void;
  isGameActive: boolean;
  // Timer props
  timerType?: 'none' | 'global' | 'individual';
  currentPlayerTime?: number;
  isTimerRunning?: boolean;
  isPaused?: boolean;
  turnNumber?: number;
  individualTimerDuration?: number;
  decayFactor?: number;
  // Pass turn callback
  onPassTurn?: () => void;
  // Timer control callbacks
  onPauseTimer?: () => void;
  onResumeTimer?: () => void;
}

export function TwoPlayerFormation({ 
  players, 
  playerPositions, 
  currentPlayerIndex, 
  onLifeChange, 
  isGameActive,
  timerType = 'none',
  currentPlayerTime = 0,
  isTimerRunning = false,
  isPaused = false,
  turnNumber = 1,
  individualTimerDuration = 60,
  decayFactor = 0.25,
  onPassTurn,
  onPauseTimer,
  onResumeTimer,
}: TwoPlayerFormationProps) {
  
  // Determine layout type from the first position's side
  const layoutType = playerPositions[0]?.side === 'left' ? 'opposing' : 'distant';
  
  return (
    <View style={twoPlayerFormationStyles.container}>
      {players.map((player, index) => {
        const position = playerPositions[index];
        if (!position) return null;

        const commonProps = {
          player,
          position,
          isActive: index === currentPlayerIndex,
          onLifeChange: (newLife: number) => onLifeChange(player.id, newLife),
          isGameActive,
          playerIndex: index,
          timerType,
          currentPlayerTime,
          isTimerRunning,
          isPaused,
          turnNumber,
          individualTimerDuration,
          decayFactor,
          onPassTurn,
          onPauseTimer,
          onResumeTimer,
        };

        // Use different card components based on layout type
        if (layoutType === 'opposing') {
          return <TwoPlayerOpposingCard key={player.id} {...commonProps} />;
        } else {
          return <TwoPlayerDistantCard key={player.id} {...commonProps} />;
        }
      })}
    </View>
  );
}