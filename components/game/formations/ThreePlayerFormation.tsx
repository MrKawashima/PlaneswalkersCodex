import React from 'react';
import { View } from 'react-native';
import { ThreePlayerCard } from './playerCards/ThreePlayerCard';
import { threePlayerFormationStyles } from './styles/threePlayerFormationStyles';

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

interface ThreePlayerFormationProps {
  players: Player[];
  playerPositions: PlayerPosition[];
  currentPlayerIndex: number;
  onLifeChange: (playerId: string, newLife: number) => void;
  isGameActive: boolean;
}

export function ThreePlayerFormation({ 
  players, 
  playerPositions, 
  currentPlayerIndex, 
  onLifeChange, 
  isGameActive 
}: ThreePlayerFormationProps) {
  return (
    <View style={threePlayerFormationStyles.container}>
      {players.map((player, index) => {
        const position = playerPositions[index];
        if (!position) return null;

        return (
          <ThreePlayerCard
            key={player.id}
            player={player}
            position={position}
            isActive={index === currentPlayerIndex}
            onLifeChange={(newLife) => onLifeChange(player.id, newLife)}
            isGameActive={isGameActive}
            playerIndex={index}
          />
        );
      })}
    </View>
  );
}