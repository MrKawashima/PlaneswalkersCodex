import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Settings } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { gameStyles } from '@/styles/gameStyles';
import { GameTimer } from '@/components/game/GameTimer';
import { VictoryModal } from '@/components/game/VictoryModal';
import { SettingsModal } from '@/components/game/SettingsModal';
import { TwoPlayerFormation } from '@/components/game/formations/TwoPlayerFormation';
import { ThreePlayerFormation } from '@/components/game/formations/ThreePlayerFormation';
import { FourPlayerFormation } from '@/components/game/formations/FourPlayerFormation';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useGameTimer } from '@/hooks/useGameTimer';
import { getPlayerPositions } from '@/utils/battlefieldLayouts';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const params = useLocalSearchParams();
  
  // Parse game settings from navigation params
  const gameSettings = {
    playerCount: parseInt(params.playerCount as string) || 4,
    startingLife: parseInt(params.startingLife as string) || 20,
    selectedLayout: params.selectedLayout as string || '4-square',
    timerType: params.timerType as string || 'none',
    globalTimerDuration: parseInt(params.globalTimerDuration as string) || 30,
    individualTimerDuration: parseInt(params.individualTimerDuration as string) || 60,
    decayFactor: parseFloat(params.decayFactor as string) || 0.25,
  };

  // Validate player count (only allow 2, 3, 4)
  if (![2, 3, 4].includes(gameSettings.playerCount)) {
    Alert.alert(
      'Invalid Player Count',
      'Only 2, 3, and 4 player games are currently supported.',
      [{ text: 'Return to Setup', onPress: () => router.replace('/setup') }]
    );
    return null;
  }

  // Game state management
  const {
    players,
    currentPlayerIndex,
    gameStartTime,
    isGameActive,
    winners,
    updatePlayerLife,
    setActivePlayer,
    resetGame,
    endGame,
  } = useGameLogic(gameSettings.playerCount, gameSettings.startingLife);

  // Timer management
  const {
    globalTimeRemaining,
    currentPlayerTime,
    isTimerRunning,
    isPaused,
    turnNumber,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    nextTurn,
  } = useGameTimer({
    timerType: gameSettings.timerType as 'none' | 'global' | 'individual',
    globalDuration: gameSettings.globalTimerDuration * 60, // Convert to seconds
    individualDuration: gameSettings.individualTimerDuration,
    decayFactor: gameSettings.decayFactor,
    onTimeUp: (isGlobal) => {
      if (isGlobal) {
        Alert.alert(
          'Planar Rift Collapsed!',
          'The time rift has closed. The battle ends in a draw.',
          [{ text: 'Acknowledge', onPress: () => endGame() }]
        );
      } else {
        Alert.alert(
          'Turn Time Expired!',
          `${players[currentPlayerIndex]?.name}'s turn has ended.`,
          [{ text: 'Next Turn', onPress: () => handleNextTurn() }]
        );
      }
    },
  });

  // Modal states
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [isVictoryModalVisible, setIsVictoryModalVisible] = useState(false);

  // Get player positions based on selected layout
  const playerPositions = getPlayerPositions(gameSettings.selectedLayout, gameSettings.playerCount);

  // Handle game start
  useEffect(() => {
    if (isGameActive && gameSettings.timerType !== 'none') {
      startTimer();
    }
  }, [isGameActive, gameSettings.timerType]);

  // Handle victory condition
  useEffect(() => {
    if (winners.length > 0) {
      setIsVictoryModalVisible(true);
      pauseTimer();
    }
  }, [winners]);

  const handleNextTurn = () => {
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    setActivePlayer(nextPlayerIndex);
    nextTurn();
  };

  const handleResetGame = () => {
    resetGame();
    resetTimer();
    if (gameSettings.timerType !== 'none') {
      startTimer();
    }
  };

  const handleLifeChange = (playerId: string, newLife: number) => {
    updatePlayerLife(playerId, newLife);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerWarningLevel = (remaining: number, total: number): 'normal' | 'warning' | 'critical' => {
    const percentage = remaining / total;
    if (percentage <= 0.1) return 'critical';
    if (percentage <= 0.25) return 'warning';
    return 'normal';
  };

  // Get central area size based on player count (much smaller for 2 players)
  const getCentralAreaSize = () => {
    switch (gameSettings.playerCount) {
      case 2: return { width: 80, height: 80, radius: 40, iconSize: 24, textSize: 10 }; // Much smaller for 2 players
      case 3: return { width: 140, height: 140, radius: 70, iconSize: 40, textSize: 14 };
      case 4: return { width: 120, height: 120, radius: 60, iconSize: 36, textSize: 12 };
      default: return { width: 120, height: 120, radius: 60, iconSize: 36, textSize: 12 };
    }
  };

  const centralSize = getCentralAreaSize();

  // Render the appropriate formation based on player count
  const renderFormation = () => {
    const formationProps = {
      players,
      playerPositions,
      currentPlayerIndex,
      onLifeChange: handleLifeChange,
      isGameActive,
      // Timer props for individual timers
      timerType: gameSettings.timerType as 'none' | 'global' | 'individual',
      currentPlayerTime,
      isTimerRunning,
      isPaused,
      turnNumber,
      individualTimerDuration: gameSettings.individualTimerDuration,
      decayFactor: gameSettings.decayFactor,
      // Pass turn callback for 2-player formation
      onPassTurn: gameSettings.playerCount === 2 ? handleNextTurn : undefined,
      // Timer control callbacks for 2-player formation
      onPauseTimer: gameSettings.playerCount === 2 ? pauseTimer : undefined,
      onResumeTimer: gameSettings.playerCount === 2 ? resumeTimer : undefined,
    };

    switch (gameSettings.playerCount) {
      case 2:
        return <TwoPlayerFormation {...formationProps} />;
      case 3:
        return <ThreePlayerFormation {...formationProps} />;
      case 4:
        return <FourPlayerFormation {...formationProps} />;
      default:
        return <FourPlayerFormation {...formationProps} />;
    }
  };

  return (
    <View style={gameStyles.background}>
      <View style={gameStyles.overlay}>
        {/* Global Timer - Only show for global timer type */}
        {gameSettings.timerType === 'global' && (
          <GameTimer
            timerType="global"
            globalTimeRemaining={globalTimeRemaining}
            currentPlayerTime={currentPlayerTime}
            currentPlayerName={players[currentPlayerIndex]?.name || ''}
            isRunning={isTimerRunning}
            isPaused={isPaused}
            warningLevel={getTimerWarningLevel(globalTimeRemaining, gameSettings.globalTimerDuration * 60)}
            formatTime={formatTime}
          />
        )}

        {/* Battlefield - Full Screen Player Zones */}
        <View style={gameStyles.battlefield}>
          {/* Central Settings Area - Scaled based on player count */}
          <TouchableOpacity 
            style={[
              gameStyles.centralArea,
              {
                width: centralSize.width,
                height: centralSize.height,
                borderRadius: centralSize.radius,
                transform: [
                  { translateX: -centralSize.width / 2 },
                  { translateY: -centralSize.height / 2 }
                ],
              }
            ]}
            onPress={() => setIsSettingsModalVisible(true)}
            activeOpacity={0.8}
          >
            <View style={gameStyles.centralContent}>
              <Settings 
                color={colors.planeswalkerGold} 
                size={centralSize.iconSize} 
                style={gameStyles.centralIcon}
              />
              {centralSize.textSize >= 12 && (
                <Text style={[gameStyles.centralText, { fontSize: centralSize.textSize }]}>
                  Settings
                </Text>
              )}
              {gameSettings.timerType === 'individual' && centralSize.textSize >= 12 && (
                <Text style={[gameStyles.turnIndicator, { fontSize: centralSize.textSize - 2 }]}>
                  {players[currentPlayerIndex]?.name}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Render Formation-Specific Player Layout */}
          {renderFormation()}
        </View>

        {/* Victory Modal */}
        <VictoryModal
          visible={isVictoryModalVisible}
          winners={winners}
          onClose={() => setIsVictoryModalVisible(false)}
          onNewGame={() => {
            setIsVictoryModalVisible(false);
            handleResetGame();
          }}
          onBackToSetup={() => {
            setIsVictoryModalVisible(false);
            router.replace('/setup');
          }}
        />

        {/* Settings Modal */}
        <SettingsModal
          visible={isSettingsModalVisible}
          onClose={() => setIsSettingsModalVisible(false)}
          onResume={() => {
            resumeTimer();
          }}
          onPause={() => {
            pauseTimer();
          }}
          onReset={handleResetGame}
          onNextTurn={gameSettings.timerType === 'individual' ? handleNextTurn : undefined}
          onBackToSetup={() => {
            router.replace('/setup');
          }}
          isGameActive={isGameActive}
          isPaused={isPaused}
          timerType={gameSettings.timerType as 'none' | 'global' | 'individual'}
          currentPlayerName={players[currentPlayerIndex]?.name}
        />
      </View>
    </View>
  );
}