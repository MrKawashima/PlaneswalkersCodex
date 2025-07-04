import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Plus, Minus, Skull, Clock, SkipForward, Play, Pause, User } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { twoPlayerOpposingStyles } from '../styles/twoPlayerOpposingStyles';
import { commonPlayerStyles } from '../styles/commonPlayerStyles';
import { PlayerMenuModal } from '@/components/game/PlayerMenuModal';

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

interface TwoPlayerOpposingCardProps {
  player: Player;
  position: PlayerPosition;
  isActive: boolean;
  onLifeChange: (newLife: number) => void;
  isGameActive: boolean;
  playerIndex: number;
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

export function TwoPlayerOpposingCard({ 
  player, 
  position, 
  isActive, 
  onLifeChange, 
  isGameActive, 
  playerIndex,
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
}: TwoPlayerOpposingCardProps) {
  const isDead = player.life <= 0;
  const isLowLife = player.life <= 5 && player.life > 0;
  const isCriticalLife = player.life <= 2 && player.life > 0;

  // Local timer state for this player
  const [playerTimer, setPlayerTimer] = useState(individualTimerDuration);
  const [isPlayerMenuVisible, setIsPlayerMenuVisible] = useState(false);

  // Calculate exponential decay time for individual turns
  const calculateTurnTime = (turn: number): number => {
    const baseTime = individualTimerDuration;
    const maxTime = 1200; // 20 minutes cap
    const range = maxTime - baseTime;
    
    const timeInSeconds = Math.round(baseTime + (range * (1 - Math.exp(-decayFactor * (turn - 1)))));
    return Math.min(timeInSeconds, maxTime);
  };

  // Update player timer when it's their turn
  useEffect(() => {
    if (timerType === 'individual' && isActive) {
      setPlayerTimer(currentPlayerTime);
    } else if (timerType === 'individual' && !isActive) {
      // Set to the calculated turn time for this turn number
      const turnTime = calculateTurnTime(turnNumber);
      setPlayerTimer(turnTime);
    }
  }, [isActive, currentPlayerTime, timerType, turnNumber, individualTimerDuration, decayFactor]);

  const handleLifeChange = (delta: number) => {
    if (!isGameActive || isDead) return;
    const newLife = Math.max(0, player.life + delta);
    onLifeChange(newLife);
  };

  const handlePassTurn = () => {
    if (onPassTurn && isActive && isGameActive && !isDead) {
      onPassTurn();
    }
  };

  const handleTimerToggle = () => {
    if (!isActive || timerType !== 'individual') return;
    
    if (isPaused && onResumeTimer) {
      onResumeTimer();
    } else if (!isPaused && onPauseTimer) {
      onPauseTimer();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerWarningLevel = (remaining: number, total: number): 'normal' | 'warning' | 'critical' => {
    const percentage = remaining / total;
    if (percentage <= 0.1) return 'critical';
    if (percentage <= 0.25) return 'warning';
    return 'normal';
  };

  const getTimerDisplayStyle = () => {
    if (timerType !== 'individual') return twoPlayerOpposingStyles.timerDisplay;
    
    const warningLevel = getTimerWarningLevel(playerTimer, calculateTurnTime(turnNumber));
    const baseStyle = [twoPlayerOpposingStyles.timerDisplay];
    
    if (warningLevel === 'warning') baseStyle.push(twoPlayerOpposingStyles.timerWarning);
    if (warningLevel === 'critical') baseStyle.push(twoPlayerOpposingStyles.timerCritical);
    
    return baseStyle;
  };

  const getLifeDisplayStyle = () => {
    if (isDead) return [twoPlayerOpposingStyles.lifeDisplay, twoPlayerOpposingStyles.deadLifeDisplay];
    if (isCriticalLife) return [twoPlayerOpposingStyles.lifeDisplay, twoPlayerOpposingStyles.criticalLifeDisplay];
    if (isLowLife) return [twoPlayerOpposingStyles.lifeDisplay, twoPlayerOpposingStyles.lowLifeDisplay];
    return twoPlayerOpposingStyles.lifeDisplay;
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
      twoPlayerOpposingStyles.playerContent,
      {
        transform: [{ rotate: `${position.rotation}deg` }],
      }
    ];
  };

  return (
    <View style={getZoneStyle()}>
      <View style={getContentStyle()}>
        {/* Opposing Layout: Life display with side buttons */}
        <View style={twoPlayerOpposingStyles.opposingLifeContainer}>
          {/* Decrease Button - Left Side */}
          {isGameActive && !isDead && (
            <TouchableOpacity
              style={[twoPlayerOpposingStyles.lifeButton, twoPlayerOpposingStyles.decreaseButton, twoPlayerOpposingStyles.sideButton]}
              onPress={() => handleLifeChange(-1)}
              activeOpacity={0.7}
            >
              <Minus color={colors.white} size={32} strokeWidth={3} />
            </TouchableOpacity>
          )}
          
          {/* Life Display with Timer and Heart */}
          <View style={twoPlayerOpposingStyles.centerLifeDisplay}>
            {/* Timer Display with Controls - Centered above life */}
            {timerType === 'individual' && (
              <View style={twoPlayerOpposingStyles.timerContainer}>
                <View style={twoPlayerOpposingStyles.timerControls}>
                  {/* Pause/Play Button - Left */}
                  <TouchableOpacity
                    style={twoPlayerOpposingStyles.timerControlButton}
                    onPress={handleTimerToggle}
                    activeOpacity={0.7}
                    disabled={!isActive}
                  >
                    {isActive && isTimerRunning && !isPaused ? (
                      <Pause color={colors.warning} size={16} />
                    ) : (
                      <Play color={colors.mana.green} size={16} />
                    )}
                  </TouchableOpacity>

                  {/* Timer Display - Center */}
                  <View style={twoPlayerOpposingStyles.timerDisplayContainer}>
                    <View style={twoPlayerOpposingStyles.timerIcon}>
                      <Clock 
                        color={isActive ? colors.planeswalkerGold : colors.gray} 
                        size={18} 
                      />
                    </View>
                    <Text style={getTimerDisplayStyle()}>
                      {formatTime(playerTimer)}
                    </Text>
                    <Text style={twoPlayerOpposingStyles.timerStatus}>
                      {isActive ? (isPaused ? 'Paused' : 'Active') : 'Waiting'}
                    </Text>
                  </View>

                  {/* Player Menu Button - Right */}
                  <TouchableOpacity
                    style={twoPlayerOpposingStyles.timerControlButton}
                    onPress={() => setIsPlayerMenuVisible(true)}
                    activeOpacity={0.7}
                  >
                    <User color={colors.planeswalkerGold} size={16} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Player Menu Button for non-timer modes */}
            {timerType === 'none' && (
              <TouchableOpacity
                style={twoPlayerOpposingStyles.playerMenuButton}
                onPress={() => setIsPlayerMenuVisible(true)}
                activeOpacity={0.7}
              >
                <User color={colors.planeswalkerGold} size={20} />
              </TouchableOpacity>
            )}

            <View style={twoPlayerOpposingStyles.heartIcon}>
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

            {/* Pass Turn Button - Under life total */}
            {isGameActive && !isDead && isActive && onPassTurn && (
              <TouchableOpacity
                style={twoPlayerOpposingStyles.passTurnButton}
                onPress={handlePassTurn}
                activeOpacity={0.8}
              >
                <SkipForward color={colors.planeswalkerGold} size={20} />
                <Text style={twoPlayerOpposingStyles.passTurnText}>
                  Pass Turn
                </Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Increase Button - Right Side */}
          {isGameActive && !isDead && (
            <TouchableOpacity
              style={[twoPlayerOpposingStyles.lifeButton, twoPlayerOpposingStyles.increaseButton, twoPlayerOpposingStyles.sideButton]}
              onPress={() => handleLifeChange(1)}
              activeOpacity={0.7}
            >
              <Plus color={colors.white} size={32} strokeWidth={3} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Player Menu Modal */}
      <PlayerMenuModal
        visible={isPlayerMenuVisible}
        onClose={() => setIsPlayerMenuVisible(false)}
        player={player}
        playerIndex={playerIndex}
        isGameActive={isGameActive}
      />
    </View>
  );
}