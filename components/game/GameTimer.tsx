import React from 'react';
import { View, Text } from 'react-native';
import { Clock, Globe, User } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { gameStyles } from '@/styles/gameStyles';

interface GameTimerProps {
  timerType: 'global' | 'individual';
  globalTimeRemaining: number;
  currentPlayerTime: number;
  currentPlayerName: string;
  isRunning: boolean;
  isPaused: boolean;
  warningLevel: 'normal' | 'warning' | 'critical';
  formatTime: (seconds: number) => string;
}

export function GameTimer({
  timerType,
  globalTimeRemaining,
  currentPlayerTime,
  currentPlayerName,
  isRunning,
  isPaused,
  warningLevel,
  formatTime,
}: GameTimerProps) {
  const getTimerDisplayStyle = () => {
    const baseStyle = [gameStyles.timerDisplay];
    if (warningLevel === 'warning') baseStyle.push(gameStyles.timerWarning);
    if (warningLevel === 'critical') baseStyle.push(gameStyles.timerCritical);
    return baseStyle;
  };

  const getStatusText = () => {
    if (isPaused) return 'Paused';
    if (!isRunning) return 'Stopped';
    return timerType === 'global' ? 'Battle Time' : `${currentPlayerName}'s Turn`;
  };

  const getDisplayTime = () => {
    return timerType === 'global' ? globalTimeRemaining : currentPlayerTime;
  };

  const getIcon = () => {
    return timerType === 'global' ? (
      <Globe color={colors.planeswalkerGold} size={20} />
    ) : (
      <User color={colors.planeswalkerGold} size={20} />
    );
  };

  return (
    <View style={gameStyles.timerContainer}>
      <View style={gameStyles.timerCard}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          {getIcon()}
          <Text style={[gameStyles.timerTitle, { marginLeft: 8, marginBottom: 0 }]}>
            {timerType === 'global' ? 'Planar Rift' : 'Turn Timer'}
          </Text>
        </View>
        
        <Text style={getTimerDisplayStyle()}>
          {formatTime(getDisplayTime())}
        </Text>
        
        <Text style={gameStyles.timerStatus}>
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
}