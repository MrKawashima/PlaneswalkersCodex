import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { 
  X, 
  Crown, 
  Skull, 
  Zap, 
  Shield, 
  Target, 
  Plus, 
  Minus,
  RotateCcw,
  Heart,
  Swords,
  Flame,
  Droplets
} from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { gameStyles } from '@/styles/gameStyles';

interface Player {
  id: string;
  name: string;
  life: number;
  color: string;
  isActive: boolean;
}

interface PlayerMenuModalProps {
  visible: boolean;
  onClose: () => void;
  player: Player;
  playerIndex: number;
  isGameActive: boolean;
}

interface PlayerStats {
  commanderDamage: { [commanderId: string]: number };
  poisonCounters: number;
  energyCounters: number;
  experienceCounters: number;
  monarchStatus: boolean;
  citysBlessingStatus: boolean;
}

export function PlayerMenuModal({ 
  visible, 
  onClose, 
  player, 
  playerIndex,
  isGameActive 
}: PlayerMenuModalProps) {
  // Player-specific stats (in a real app, this would be managed by the parent)
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    commanderDamage: {},
    poisonCounters: 0,
    energyCounters: 0,
    experienceCounters: 0,
    monarchStatus: false,
    citysBlessingStatus: false,
  });

  const [customCommanderName, setCustomCommanderName] = useState('');

  const updateStat = (statKey: keyof PlayerStats, value: any) => {
    setPlayerStats(prev => ({
      ...prev,
      [statKey]: value,
    }));
  };

  const updateCommanderDamage = (commanderId: string, delta: number) => {
    setPlayerStats(prev => ({
      ...prev,
      commanderDamage: {
        ...prev.commanderDamage,
        [commanderId]: Math.max(0, (prev.commanderDamage[commanderId] || 0) + delta),
      },
    }));
  };

  const addCustomCommander = () => {
    if (customCommanderName.trim()) {
      updateCommanderDamage(customCommanderName.trim(), 0);
      setCustomCommanderName('');
    }
  };

  const removeCommander = (commanderId: string) => {
    Alert.alert(
      'Remove Commander',
      `Remove ${commanderId} from commander damage tracking?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => {
            setPlayerStats(prev => {
              const newCommanderDamage = { ...prev.commanderDamage };
              delete newCommanderDamage[commanderId];
              return {
                ...prev,
                commanderDamage: newCommanderDamage,
              };
            });
          }
        }
      ]
    );
  };

  const resetAllStats = () => {
    Alert.alert(
      'Reset All Stats',
      'Reset all counters and status effects for this planeswalker?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset All', 
          style: 'destructive',
          onPress: () => {
            setPlayerStats({
              commanderDamage: {},
              poisonCounters: 0,
              energyCounters: 0,
              experienceCounters: 0,
              monarchStatus: false,
              citysBlessingStatus: false,
            });
          }
        }
      ]
    );
  };

  const getPlayerColor = () => {
    const colors = ['#FF3B30', '#007AFF', '#34C759', '#FFCC00'];
    return colors[playerIndex % colors.length];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[gameStyles.modalContainer, { flex: 1, maxWidth: '100%', borderRadius: 0 }]}>
        {/* Header */}
        <View style={gameStyles.modalHeader}>
          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
            <Crown color={getPlayerColor()} size={24} />
            <Text style={[gameStyles.modalTitle, { color: getPlayerColor(), marginLeft: 12 }]}>
              {player.name}
            </Text>
          </View>
          <TouchableOpacity style={gameStyles.modalCloseButton} onPress={onClose}>
            <X color={colors.lightGray} size={18} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View style={gameStyles.modalContent}>
            {/* Player Status */}
            <View style={gameStyles.settingsSection}>
              <Text style={gameStyles.settingsSectionTitle}>Planeswalker Status</Text>
              
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Heart color={colors.mana.red} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>Life Total</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      Current vitality: {player.life}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={[gameStyles.settingsButtonText, { fontSize: 18, fontWeight: 'bold' }]}>
                    {player.life}
                  </Text>
                </View>
              </View>
            </View>

            {/* Commander Damage */}
            <View style={gameStyles.settingsSection}>
              <Text style={gameStyles.settingsSectionTitle}>Commander Damage</Text>
              
              {Object.entries(playerStats.commanderDamage).map(([commanderId, damage]) => (
                <View key={commanderId} style={gameStyles.settingsItem}>
                  <View style={gameStyles.settingsItemInfo}>
                    <Swords color={colors.mana.colorless} size={20} />
                    <View style={gameStyles.settingsItemText}>
                      <Text style={gameStyles.settingsItemName}>{commanderId}</Text>
                      <Text style={gameStyles.settingsItemDescription}>
                        Commander damage received
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity
                      style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                      onPress={() => updateCommanderDamage(commanderId, -1)}
                    >
                      <Minus color={colors.red} size={14} />
                    </TouchableOpacity>
                    <Text style={[gameStyles.settingsButtonText, { fontSize: 16, minWidth: 24, textAlign: 'center' }]}>
                      {damage}
                    </Text>
                    <TouchableOpacity
                      style={gameStyles.settingsButton}
                      onPress={() => updateCommanderDamage(commanderId, 1)}
                    >
                      <Plus color={colors.planeswalkerGold} size={14} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                      onPress={() => removeCommander(commanderId)}
                    >
                      <X color={colors.red} size={14} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}

              {/* Add Commander */}
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Plus color={colors.mana.colorless} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <TextInput
                      style={{
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                        color: colors.white,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.darkGray,
                        paddingVertical: 4,
                        minWidth: 120,
                      }}
                      placeholder="Commander name..."
                      placeholderTextColor={colors.gray}
                      value={customCommanderName}
                      onChangeText={setCustomCommanderName}
                      onSubmitEditing={addCustomCommander}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={gameStyles.settingsButton}
                  onPress={addCustomCommander}
                  disabled={!customCommanderName.trim()}
                >
                  <Plus color={colors.planeswalkerGold} size={14} />
                  <Text style={gameStyles.settingsButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Counters */}
            <View style={gameStyles.settingsSection}>
              <Text style={gameStyles.settingsSectionTitle}>Counters & Effects</Text>
              
              {/* Poison Counters */}
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Droplets color={colors.mana.green} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>Poison Counters</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      {playerStats.poisonCounters >= 10 ? 'LETHAL - 10+ poison!' : 'Toxic accumulation'}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TouchableOpacity
                    style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                    onPress={() => updateStat('poisonCounters', Math.max(0, playerStats.poisonCounters - 1))}
                  >
                    <Minus color={colors.red} size={14} />
                  </TouchableOpacity>
                  <Text style={[
                    gameStyles.settingsButtonText, 
                    { 
                      fontSize: 16, 
                      minWidth: 24, 
                      textAlign: 'center',
                      color: playerStats.poisonCounters >= 10 ? colors.error : colors.planeswalkerGold
                    }
                  ]}>
                    {playerStats.poisonCounters}
                  </Text>
                  <TouchableOpacity
                    style={gameStyles.settingsButton}
                    onPress={() => updateStat('poisonCounters', playerStats.poisonCounters + 1)}
                  >
                    <Plus color={colors.planeswalkerGold} size={14} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Energy Counters */}
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Zap color={colors.warning} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>Energy Counters</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      Stored energy for abilities
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TouchableOpacity
                    style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                    onPress={() => updateStat('energyCounters', Math.max(0, playerStats.energyCounters - 1))}
                  >
                    <Minus color={colors.red} size={14} />
                  </TouchableOpacity>
                  <Text style={[gameStyles.settingsButtonText, { fontSize: 16, minWidth: 24, textAlign: 'center' }]}>
                    {playerStats.energyCounters}
                  </Text>
                  <TouchableOpacity
                    style={gameStyles.settingsButton}
                    onPress={() => updateStat('energyCounters', playerStats.energyCounters + 1)}
                  >
                    <Plus color={colors.planeswalkerGold} size={14} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Experience Counters */}
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Target color={colors.mana.blue} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>Experience Counters</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      Permanent planeswalker experience
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <TouchableOpacity
                    style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                    onPress={() => updateStat('experienceCounters', Math.max(0, playerStats.experienceCounters - 1))}
                  >
                    <Minus color={colors.red} size={14} />
                  </TouchableOpacity>
                  <Text style={[gameStyles.settingsButtonText, { fontSize: 16, minWidth: 24, textAlign: 'center' }]}>
                    {playerStats.experienceCounters}
                  </Text>
                  <TouchableOpacity
                    style={gameStyles.settingsButton}
                    onPress={() => updateStat('experienceCounters', playerStats.experienceCounters + 1)}
                  >
                    <Plus color={colors.planeswalkerGold} size={14} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Status Effects */}
            <View style={gameStyles.settingsSection}>
              <Text style={gameStyles.settingsSectionTitle}>Status Effects</Text>
              
              {/* Monarch */}
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Crown color={playerStats.monarchStatus ? colors.planeswalkerGold : colors.gray} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>The Monarch</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      {playerStats.monarchStatus ? 'You are the Monarch!' : 'Not the Monarch'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    gameStyles.settingsButton,
                    playerStats.monarchStatus && { backgroundColor: 'rgba(200, 170, 110, 0.3)' }
                  ]}
                  onPress={() => updateStat('monarchStatus', !playerStats.monarchStatus)}
                >
                  <Crown color={colors.planeswalkerGold} size={14} />
                  <Text style={gameStyles.settingsButtonText}>
                    {playerStats.monarchStatus ? 'Remove' : 'Claim'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* City's Blessing */}
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <Shield color={playerStats.citysBlessingStatus ? colors.planeswalkerGold : colors.gray} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>City's Blessing</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      {playerStats.citysBlessingStatus ? 'You have the City\'s Blessing!' : 'No City\'s Blessing'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    gameStyles.settingsButton,
                    playerStats.citysBlessingStatus && { backgroundColor: 'rgba(200, 170, 110, 0.3)' }
                  ]}
                  onPress={() => updateStat('citysBlessingStatus', !playerStats.citysBlessingStatus)}
                >
                  <Shield color={colors.planeswalkerGold} size={14} />
                  <Text style={gameStyles.settingsButtonText}>
                    {playerStats.citysBlessingStatus ? 'Remove' : 'Gain'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Reset Section */}
            <View style={gameStyles.settingsSection}>
              <Text style={gameStyles.settingsSectionTitle}>Reset Options</Text>
              
              <View style={gameStyles.settingsItem}>
                <View style={gameStyles.settingsItemInfo}>
                  <RotateCcw color={colors.red} size={20} />
                  <View style={gameStyles.settingsItemText}>
                    <Text style={gameStyles.settingsItemName}>Reset All Stats</Text>
                    <Text style={gameStyles.settingsItemDescription}>
                      Clear all counters and status effects
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[gameStyles.settingsButton, gameStyles.dangerSettingsButton]}
                  onPress={resetAllStats}
                >
                  <RotateCcw color={colors.red} size={14} />
                  <Text style={[gameStyles.settingsButtonText, gameStyles.dangerSettingsButtonText]}>
                    Reset
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}