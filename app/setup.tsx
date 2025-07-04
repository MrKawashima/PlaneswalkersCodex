import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, RotateCcw, ArrowLeft, Zap, Crown } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';
import { ResetConfirmModal } from '@/components/ResetConfirmModal';
import { PlayerLayoutSection, PlayerLayoutSettings } from '@/components/setup/PlayerLayoutSection';
import { StartingLifeSection } from '@/components/setup/StartingLifeSection';
import { TimerSection, TimerSettings } from '@/components/setup/TimerSection';
import { GameSummarySection } from '@/components/setup/GameSummarySection';

export default function GameSetupScreen() {
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [playerLayoutSettings, setPlayerLayoutSettings] = useState<PlayerLayoutSettings>({
    playerCount: 4,
    selectedLayout: null,
  });
  const [startingLife, setStartingLife] = useState(20);
  const [timerSettings, setTimerSettings] = useState<TimerSettings>({
    timerType: 'none',
    globalTimerDuration: 30,
    customGlobalTime: '',
    individualTimerDuration: 60,
    timeIncrement: 'fixed',
    incrementAmount: 10,
    customIncrementAmount: '',
    decayFactor: 0.25,
  });

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  const handleStartGame = () => {
    // Validate that a layout is selected
    if (!playerLayoutSettings.selectedLayout) {
      Alert.alert(
        'Battlefield Formation Required',
        'Please select a battlefield formation before starting the battle.',
        [{ text: 'Acknowledge', style: 'default' }]
      );
      return;
    }

    // Navigate to game screen with all settings
    const gameParams = {
      playerCount: playerLayoutSettings.playerCount.toString(),
      selectedLayout: playerLayoutSettings.selectedLayout,
      startingLife: startingLife.toString(),
      timerType: timerSettings.timerType,
      globalTimerDuration: timerSettings.globalTimerDuration.toString(),
      individualTimerDuration: timerSettings.individualTimerDuration.toString(),
      decayFactor: timerSettings.decayFactor.toString(),
    };

    router.push({
      pathname: '/game',
      params: gameParams,
    });
  };

  const handleReset = () => {
    Alert.alert(
      'Planeswalker Data Purged',
      'All planeswalker records have been cleansed from the multiverse.',
      [{ text: 'Acknowledged', style: 'default' }]
    );
  };

  const handlePlayerLayoutSettingsChange = (newSettings: Partial<PlayerLayoutSettings>) => {
    setPlayerLayoutSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleTimerSettingsChange = (newSettings: Partial<TimerSettings>) => {
    setTimerSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }}
      style={setupStyles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
        style={setupStyles.overlay}
      >
        {/* Header */}
        <View style={setupStyles.header}>
          <TouchableOpacity style={setupStyles.backButton} onPress={handleBack}>
            <ArrowLeft color={colors.planeswalkerGold} size={24} />
          </TouchableOpacity>
          
          <View style={setupStyles.titleContainer}>
            <Crown color={colors.planeswalkerGold} size={20} />
            <Text style={setupStyles.title}>Battlefield Preparation</Text>
            <Zap color={colors.planeswalkerGold} size={20} />
          </View>
          
          <View style={setupStyles.placeholder} />
        </View>

        <ScrollView style={setupStyles.content} showsVerticalScrollIndicator={false}>
          <PlayerLayoutSection 
            settings={playerLayoutSettings}
            onSettingsChange={handlePlayerLayoutSettingsChange}
          />

          <StartingLifeSection 
            startingLife={startingLife}
            onStartingLifeChange={setStartingLife}
          />

          <TimerSection 
            settings={timerSettings}
            onSettingsChange={handleTimerSettingsChange}
          />

          <GameSummarySection 
            playerCount={playerLayoutSettings.playerCount}
            startingLife={startingLife}
            timerSettings={timerSettings}
          />
        </ScrollView>

        {/* Bottom Actions */}
        <View style={setupStyles.bottomActions}>
          <TouchableOpacity
            style={setupStyles.resetButton}
            onPress={() => setResetModalVisible(true)}
            activeOpacity={0.8}
          >
            <RotateCcw color={colors.red} size={18} />
            <Text style={setupStyles.resetButtonText}>Purge Codex</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={setupStyles.startButton}
            onPress={handleStartGame}
            activeOpacity={0.8}
          >
            <Zap color={colors.white} size={20} />
            <Text style={setupStyles.startButtonText}>Ignite Sparks</Text>
          </TouchableOpacity>
        </View>

        <ResetConfirmModal
          visible={resetModalVisible}
          onClose={() => setResetModalVisible(false)}
          onConfirm={handleReset}
        />
      </LinearGradient>
    </ImageBackground>
  );
}