import React from 'react';
import { View } from 'react-native';
import { FourPlayerCard } from './playerCards/FourPlayerCard';
import { fourPlayerFormationStyles } from './styles/fourPlayerFormationStyles';

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

interface FourPlayerFormationProps {
  players: Player[];
  playerPositions: PlayerPosition[];
  currentPlayerIndex: number;
  onLifeChange: (playerId: string, newLife: number) => void;
  isGameActive: boolean;
}

export function FourPlayerFormation({ 
  players, 
  playerPositions, 
  currentPlayerIndex, 
  onLifeChange, 
  isGameActive 
}: FourPlayerFormationProps) {
  return (
    <View style={fourPlayerFormationStyles.container}>
      {players.map((player, index) => {
        const position = playerPositions[index];
        if (!position) return null;

        return (
          <FourPlayerCard
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