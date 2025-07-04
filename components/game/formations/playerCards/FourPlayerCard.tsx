import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Plus, Minus, Skull } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { fourPlayerCardStyles } from '@/components/game/formations/styles/fourPlayerCardStyles';
import { commonPlayerStyles } from '@/components/game/formations/styles/commonPlayerStyles';

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

interface FourPlayerCardProps {
  player: Player;
  position: PlayerPosition;
  isActive: boolean;
  onLifeChange: (newLife: number) => void;
  isGameActive: boolean;
  playerIndex: number;
}

export function FourPlayerCard({ 
  player, 
  position, 
  isActive, 
  onLifeChange, 
  isGameActive, 
  playerIndex
}: FourPlayerCardProps) {
  const isDead = player.life <= 0;
  const isLowLife = player.life <= 5 && player.life > 0;
  const isCriticalLife = player.life <= 2 && player.life > 0;

  const handleLifeChange = (delta: number) => {
    if (!isGameActive || isDead) return;
    const newLife = Math.max(0, player.life + delta);
    onLifeChange(newLife);
  };

  const getLifeDisplayStyle = () => {
    if (isDead) return [fourPlayerCardStyles.lifeDisplay, fourPlayerCardStyles.deadLifeDisplay];
    if (isCriticalLife) return [fourPlayerCardStyles.lifeDisplay, fourPlayerCardStyles.criticalLifeDisplay];
    if (isLowLife) return [fourPlayerCardStyles.lifeDisplay, fourPlayerCardStyles.lowLifeDisplay];
    return fourPlayerCardStyles.lifeDisplay;
  };

  const getPlayerNameStyle = () => {
    if (isDead) return [fourPlayerCardStyles.playerName, fourPlayerCardStyles.deadPlayerName];
    if (isActive) return [fourPlayerCardStyles.playerName, fourPlayerCardStyles.activePlayerName];
    return fourPlayerCardStyles.playerName;
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
      fourPlayerCardStyles.playerContent,
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
        
        {/* 4-Player Layout: Vertical layout */}
        <View style={fourPlayerCardStyles.lifeContainer}>
          <View style={fourPlayerCardStyles.heartIcon}>
            {isDead ? (
              <Skull color={colors.white} size={28} />
            ) : (
              <Heart 
                color={colors.white} 
                size={28} 
                fill={isCriticalLife ? colors.error : isLowLife ? colors.warning : colors.white}
              />
            )}
          </View>
          
          <Text style={getLifeDisplayStyle()}>
            {player.life}
          </Text>
        </View>
        
        {isGameActive && !isDead && (
          <View style={fourPlayerCardStyles.lifeControls}>
            <TouchableOpacity
              style={[fourPlayerCardStyles.lifeButton, fourPlayerCardStyles.decreaseButton]}
              onPress={() => handleLifeChange(-1)}
              activeOpacity={0.7}
            >
              <Minus color={colors.white} size={36} strokeWidth={4} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[fourPlayerCardStyles.lifeButton, fourPlayerCardStyles.increaseButton]}
              onPress={() => handleLifeChange(1)}
              activeOpacity={0.7}
            >
              <Plus color={colors.white} size={36} strokeWidth={4} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}