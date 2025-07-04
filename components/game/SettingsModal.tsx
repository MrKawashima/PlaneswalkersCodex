import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { 
  Settings, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowLeft, 
  SkipForward,
  Volume2,
  VolumeX,
  Vibrate,
  Crown,
  Trash2
} from 'lucide-react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/colors';
import { gameStyles } from '@/styles/gameStyles';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onResume?: () => void;
  onPause?: () => void;
  onReset: () => void;
  onNextTurn?: () => void;
  onBackToSetup: () => void;
  isGameActive: boolean;
  isPaused: boolean;
  timerType: 'none' | 'global' | 'individual';
  currentPlayerName?: string;
}

export function SettingsModal({ 
  visible, 
  onClose, 
  onResume,
  onPause,
  onReset, 
  onNextTurn,
  onBackToSetup,
  isGameActive,
  isPaused,
  timerType,
  currentPlayerName
}: SettingsModalProps) {
  
  const handleResetApp = () => {
    Alert.alert(
      'Reset Entire App?',
      'This will completely reset the Planeswalker\'s Codex and return to the main menu. All current battle progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset App', 
          style: 'destructive',
          onPress: () => {
            onClose();
            router.replace('/');
          }
        }
      ]
    );
  };

  const handlePauseResume = () => {
    if (isPaused && onResume) {
      onResume();
      onClose();
    } else if (!isPaused && onPause) {
      onPause();
    }
  };

  const handleNextTurn = () => {
    if (onNextTurn) {
      onNextTurn();
      onClose();
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Battle?',
      'This will reset all planeswalker life totals and restart the current battle.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset Battle', 
          style: 'destructive',
          onPress: () => {
            onReset();
            onClose();
          }
        }
      ]
    );
  };

  const handleBackToSetup = () => {
    Alert.alert(
      'Return to Setup?',
      'This will end the current battle and return to the setup screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Battle', 
          style: 'destructive',
          onPress: () => {
            onBackToSetup();
            onClose();
          }
        }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={gameStyles.modalOverlay}>
        <View style={[gameStyles.modalContainer, { maxWidth: 450 }]}>
          {/* Header */}
          <View style={gameStyles.modalHeader}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Settings color={colors.planeswalkerGold} size={28} />
            </View>
            <TouchableOpacity style={gameStyles.modalCloseButton} onPress={onClose}>
              <X color={colors.lightGray} size={18} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false}>
            <View style={gameStyles.modalContent}>
              <Text style={gameStyles.modalTitle}>
                Battle Settings
              </Text>
              
              <Text style={gameStyles.modalText}>
                Manage your current planeswalker battle and app settings.
              </Text>

              {/* Game Controls Section */}
              <View style={gameStyles.settingsSection}>
                <Text style={gameStyles.settingsSectionTitle}>Battle Controls</Text>
                
                {/* Pause/Resume */}
                {timerType !== 'none' && (
                  <View style={gameStyles.settingsItem}>
                    <View style={gameStyles.settingsItemInfo}>
                      {isPaused ? (
                        <Play color={colors.mana.green} size={20} />
                      ) : (
                        <Pause color={colors.warning} size={20} />
                      )}
                      <View style={gameStyles.settingsItemText}>
                        <Text style={gameStyles.settingsItemName}>
                          {isPaused ? 'Resume Battle' : 'Pause Battle'}
                        </Text>
                        <Text style={gameStyles.settingsItemDescription}>
                          {isPaused ? 'Continue the temporal magic' : 'Suspend time temporarily'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={gameStyles.settingsButton}
                      onPress={handlePauseResume}
                    >
                      {isPaused ? (
                        <Play color={colors.planeswalkerGold} size={16} />
                      ) : (
                        <Pause color={colors.planeswalkerGold} size={16} />
                      )}
                      <Text style={gameStyles.settingsButtonText}>
                        {isPaused ? 'Resume' : 'Pause'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Next Turn */}
                {timerType === 'individual' && onNextTurn && (
                  <View style={gameStyles.settingsItem}>
                    <View style={gameStyles.settingsItemInfo}>
                      <SkipForward color={colors.mana.blue} size={20} />
                      <View style={gameStyles.settingsItemText}>
                        <Text style={gameStyles.settingsItemName}>
                          End Current Turn
                        </Text>
                        <Text style={gameStyles.settingsItemDescription}>
                          {currentPlayerName ? `End ${currentPlayerName}'s turn` : 'Move to next planeswalker'}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={gameStyles.settingsButton}
                      onPress={handleNextTurn}
                    >
                      <SkipForward color={colors.planeswalkerGold} size={16} />
                      <Text style={gameStyles.settingsButtonText}>
                        Next Turn
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Reset Battle */}
                <View style={gameStyles.settingsItem}>
                  <View style={gameStyles.settingsItemInfo}>
                    <RotateCcw color={colors.warning} size={20} />
                    <View style={gameStyles.settingsItemText}>
                      <Text style={gameStyles.settingsItemName}>
                        Reset Battle
                      </Text>
                      <Text style={gameStyles.settingsItemDescription}>
                        Restart with same settings and life totals
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                    onPress={handleReset}
                  >
                    <RotateCcw color={colors.red} size={16} />
                    <Text style={[gameStyles.settingsButtonText, gameStyles.dangerSettingsButtonText]}>
                      Reset
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Navigation Section */}
              <View style={gameStyles.settingsSection}>
                <Text style={gameStyles.settingsSectionTitle}>Navigation</Text>
                
                {/* Back to Setup */}
                <View style={gameStyles.settingsItem}>
                  <View style={gameStyles.settingsItemInfo}>
                    <Crown color={colors.mana.blue} size={20} />
                    <View style={gameStyles.settingsItemText}>
                      <Text style={gameStyles.settingsItemName}>
                        Return to Setup
                      </Text>
                      <Text style={gameStyles.settingsItemDescription}>
                        End battle and configure new game
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={gameStyles.settingsButton}
                    onPress={handleBackToSetup}
                  >
                    <ArrowLeft color={colors.planeswalkerGold} size={16} />
                    <Text style={gameStyles.settingsButtonText}>
                      Setup
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Reset App */}
                <View style={gameStyles.settingsItem}>
                  <View style={gameStyles.settingsItemInfo}>
                    <Trash2 color={colors.red} size={20} />
                    <View style={gameStyles.settingsItemText}>
                      <Text style={gameStyles.settingsItemName}>
                        Reset Entire App
                      </Text>
                      <Text style={gameStyles.settingsItemDescription}>
                        Return to main menu and clear all data
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                    onPress={handleResetApp}
                  >
                    <Trash2 color={colors.red} size={16} />
                    <Text style={[gameStyles.settingsButtonText, gameStyles.dangerSettingsButtonText]}>
                      Reset App
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* App Info Section */}
              <View style={gameStyles.settingsSection}>
                <Text style={gameStyles.settingsSectionTitle}>About</Text>
                
                <View style={gameStyles.settingsItem}>
                  <View style={gameStyles.settingsItemInfo}>
                    <Crown color={colors.planeswalkerGold} size={20} />
                    <View style={gameStyles.settingsItemText}>
                      <Text style={gameStyles.settingsItemName}>
                        Planeswalker's Codex
                      </Text>
                      <Text style={gameStyles.settingsItemDescription}>
                        Version 0.0.9 - Ultimate MTG life tracker
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}