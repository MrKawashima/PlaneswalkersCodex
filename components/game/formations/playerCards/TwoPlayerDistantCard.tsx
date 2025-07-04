import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Plus, Minus, Skull, Clock, SkipForward, Play, Pause, User } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { twoPlayerDistantStyles } from '@/styles/twoPlayerDistantStyles';
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

interface TwoPlayerDistantCardProps {
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

export function TwoPlayerDistantCard({ 
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
}: TwoPlayerDistantCardProps) {
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
    if (timerType !== 'individual') return twoPlayerDistantStyles.timerDisplay;
    
    const warningLevel = getTimerWarningLevel(playerTimer, calculateTurnTime(turnNumber));
    const baseStyle = [twoPlayerDistantStyles.timerDisplay];
    
    if (warningLevel === 'warning') baseStyle.push(twoPlayerDistantStyles.timerWarning);
    if (warningLevel === 'critical') baseStyle.push(twoPlayerDistantStyles.timerCritical);
    
    return baseStyle;
  };

  const getLifeDisplayStyle = () => {
    if (isDead) return [twoPlayerDistantStyles.lifeDisplay, twoPlayerDistantStyles.deadLifeDisplay];
    if (isCriticalLife) return [twoPlayerDistantStyles.lifeDisplay, twoPlayerDistantStyles.criticalLifeDisplay];
    if (isLowLife) return [twoPlayerDistantStyles.lifeDisplay, twoPlayerDistantStyles.lowLifeDisplay];
    return twoPlayerDistantStyles.lifeDisplay;
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
      twoPlayerDistantStyles.playerContent,
      {
        transform: [{ rotate: `${position.rotation}deg` }],
      }
    ];
  };

  return (
    <View style={getZoneStyle()}>
      <View style={getContentStyle()}>
        {/* Distant Layout: Vertical layout with buttons below */}
        <View style={twoPlayerDistantStyles.distantLifeContainer}>
          {/* Timer Display with Controls - Top */}
          {timerType === 'individual' && (
            <View style={twoPlayerDistantStyles.timerContainer}>
              <View style={twoPlayerDistantStyles.timerControls}>
                {/* Pause/Play Button - Left */}
                <TouchableOpacity
                  style={twoPlayerDistantStyles.timerControlButton}
                  onPress={handleTimerToggle}
                  activeOpacity={0.7}
                  disabled={!isActive}
                >
                  {isActive && isTimerRunning && !isPaused ? (
                    <Pause color={colors.warning} size={18} />
                  ) : (
                    <Play color={colors.mana.green} size={18} />
                  )}
                </TouchableOpacity>

                {/* Timer Display - Center */}
                <View style={twoPlayerDistantStyles.timerDisplayContainer}>
                  <View style={twoPlayerDistantStyles.timerIcon}>
                    <Clock 
                      color={isActive ? colors.planeswalkerGold : colors.gray} 
                      size={20} 
                    />
                  </View>
                  <Text style={getTimerDisplayStyle()}>
                    {formatTime(playerTimer)}
                  </Text>
                  <Text style={twoPlayerDistantStyles.timerStatus}>
                    {isActive ? (isPaused ? 'Paused' : 'Active') : 'Waiting'}
                  </Text>
                </View>

                {/* Player Menu Button - Right */}
                <TouchableOpacity
                  style={twoPlayerDistantStyles.timerControlButton}
                  onPress={() => setIsPlayerMenuVisible(true)}
                  activeOpacity={0.7}
                >
                  <User color={colors.planeswalkerGold} size={18} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Player Menu Button for non-timer modes */}
          {timerType === 'none' && (
            <TouchableOpacity
              style={twoPlayerDistantStyles.playerMenuButton}
              onPress={() => setIsPlayerMenuVisible(true)}
              activeOpacity={0.7}
            >
              <User color={colors.planeswalkerGold} size={24} />
            </TouchableOpacity>
          )}

          {/* Life Display - Center */}
          <View style={twoPlayerDistantStyles.centerLifeDisplay}>
            <View style={twoPlayerDistantStyles.heartIcon}>
              {isDead ? (
                <Skull color={colors.white} size={36} />
              ) : (
                <Heart 
                  color={colors.white} 
                  size={36} 
                  fill={isCriticalLife ? colors.error : isLowLife ? colors.warning : colors.white}
                />
              )}
            </View>
            
            <Text style={getLifeDisplayStyle()}>
              {player.life}
            </Text>
          </View>

          {/* Life Controls - Bottom */}
          {isGameActive && !isDead && (
            <View style={twoPlayerDistantStyles.lifeControls}>
              <TouchableOpacity
                style={[twoPlayerDistantStyles.lifeButton, twoPlayerDistantStyles.decreaseButton]}
                onPress={() => handleLifeChange(-1)}
                activeOpacity={0.7}
              >
                <Minus color={colors.white} size={36} strokeWidth={3} />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[twoPlayerDistantStyles.lifeButton, twoPlayerDistantStyles.increaseButton]}
                onPress={() => handleLifeChange(1)}
                activeOpacity={0.7}
              >
                <Plus color={colors.white} size={36} strokeWidth={3} />
              </TouchableOpacity>
            </View>
          )}

          {/* Pass Turn Button - Bottom */}
          {isGameActive && !isDead && isActive && onPassTurn && (
            <TouchableOpacity
              style={twoPlayerDistantStyles.passTurnButton}
              onPress={handlePassTurn}
              activeOpacity={0.8}
            >
              <SkipForward color={colors.planeswalkerGold} size={22} />
              <Text style={twoPlayerDistantStyles.passTurnText}>
                Pass Turn
              </Text>
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