import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Plus, Minus, Skull } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { threePlayerCardStyles } from '../styles/threePlayerCardStyles';
import { commonPlayerStyles } from '../styles/commonPlayerStyles';

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

interface ThreePlayerCardProps {
  player: Player;
  position: PlayerPosition;
  isActive: boolean;
  onLifeChange: (newLife: number) => void;
  isGameActive: boolean;
  playerIndex: number;
}

export function ThreePlayerCard({ 
  player, 
  position, 
  isActive, 
  onLifeChange, 
  isGameActive, 
  playerIndex
}: ThreePlayerCardProps) {
  const isDead = player.life <= 0;
  const isLowLife = player.life <= 5 && player.life > 0;
  const isCriticalLife = player.life <= 2 && player.life > 0;

  const handleLifeChange = (delta: number) => {
    if (!isGameActive || isDead) return;
    const newLife = Math.max(0, player.life + delta);
    onLifeChange(newLife);
  };

  const getLifeDisplayStyle = () => {
    if (isDead) return [threePlayerCardStyles.lifeDisplay, threePlayerCardStyles.deadLifeDisplay];
    if (isCriticalLife) return [threePlayerCardStyles.lifeDisplay, threePlayerCardStyles.criticalLifeDisplay];
    if (isLowLife) return [threePlayerCardStyles.lifeDisplay, threePlayerCardStyles.lowLifeDisplay];
    return threePlayerCardStyles.lifeDisplay;
  };

  const getPlayerNameStyle = () => {
    if (isDead) return [threePlayerCardStyles.playerName, threePlayerCardStyles.deadPlayerName];
    if (isActive) return [threePlayerCardStyles.playerName, threePlayerCardStyles.activePlayerName];
    return threePlayerCardStyles.playerName;
  };

  const getZoneColorStyle = () => {
    const colorStyles = [
      commonPlayerStyles.playerZoneColor1,
      commonPlayerStyles.playerZoneColor2,
      commonPlayerStyles.playerZoneColor3,
      commonPlayerStyles.playerZoneColor4,
    ];
    return colorStyles[playerIndex % colorStyles.length];
  };

  const getZoneStyle = () => {
    const baseStyle = [commonPlayerStyles.playerZone, getZoneColorStyle()];
    if (isDead) baseStyle.push(commonPlayerStyles.deadPlayerZone);
    else if (isActive) baseStyle.push(commonPlayerStyles.activePlayerZone);
    
    return [
      ...baseStyle,
      {
        left: position.x,
        top: position.y,
        width: position.width,
        height: position.height,
      }
    ];
  };

  const getContentStyle = () => {
    return [
      threePlayerCardStyles.playerContent,
      {
        transform: [{ rotate: `${position.rotation}deg` }],
      }
    ];
  };

  return (
    <View style={getZoneStyle()}>
      <View style={getContentStyle()}>
        <Text style={getPlayerNameStyle()}>
          {player.name}
        </Text>
        
        {/* 3-Player Layout: Vertical layout */}
        <View style={threePlayerCardStyles.lifeContainer}>
          <View style={threePlayerCardStyles.heartIcon}>
            {isDead ? (
              <Skull color={colors.white} size={32} />
            ) : (
              <Heart 
                color={colors.white} 
                size={32} 
                fill={isCriticalLife ? colors.error : isLowLife ? colors.warning : colors.white}
              />
            )}
          </View>
          
          <Text style={getLifeDisplayStyle()}>
            {player.life}
          </Text>
        </View>
        
        {isGameActive && !isDead && (
          <View style={threePlayerCardStyles.lifeControls}>
            <TouchableOpacity
              style={[threePlayerCardStyles.lifeButton, threePlayerCardStyles.decreaseButton]}
              onPress={() => handleLifeChange(-1)}
              activeOpacity={0.7}
            >
              <Minus color={colors.white} size={40} strokeWidth={4} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[threePlayerCardStyles.lifeButton, threePlayerCardStyles.increaseButton]}
              onPress={() => handleLifeChange(1)}
              activeOpacity={0.7}
            >
              <Plus color={colors.white} size={40} strokeWidth={4} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}