import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { X, Settings as SettingsIcon, Volume2, VolumeX, Vibrate, Moon, Sun, Users, Clock, Heart, Palette, Shield, CircleHelp as HelpCircle, Crown } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { layout } from '@/styles/layout';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsModal({ visible, onClose }: SettingsModalProps) {
  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [confirmActions, setConfirmActions] = useState(true);
  const [keepScreenOn, setKeepScreenOn] = useState(false);

  const handleDefaultLifeTotal = () => {
    Alert.alert(
      'Default Life Force',
      'Choose the default starting life force for new battles',
      [
        { text: '20 Life Force (Standard)', onPress: () => {} },
        { text: '30 Life Force (Casual)', onPress: () => {} },
        { text: '40 Life Force (Commander)', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handlePlayerCount = () => {
    Alert.alert(
      'Default Planeswalker Count',
      'Choose the default number of planeswalkers for new battles',
      [
        { text: '2 Planeswalkers', onPress: () => {} },
        { text: '3 Planeswalkers', onPress: () => {} },
        { text: '4 Planeswalkers', onPress: () => {} },
        { text: '6 Planeswalkers', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleTimerSettings = () => {
    Alert.alert(
      'Temporal Magic Settings',
      'Configure default temporal magic settings',
      [
        { text: '5 minutes per turn', onPress: () => {} },
        { text: '10 minutes per turn', onPress: () => {} },
        { text: '15 minutes per turn', onPress: () => {} },
        { text: 'Timeless battle', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleTheme = () => {
    Alert.alert(
      'Planar Theme Selection',
      'Choose your preferred planar theme',
      [
        { text: 'Dark Multiverse (Current)', onPress: () => {} },
        { text: 'Light Realm', onPress: () => {} },
        { text: 'Planeswalker Gold', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      'Planeswalker Guidance',
      'Get guidance with using the Planeswalker\'s Codex',
      [
        { text: 'View Tutorial', onPress: () => {} },
        { text: 'Contact Artificer', onPress: () => {} },
        { text: 'Report Anomaly', onPress: () => {} },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Crown color={colors.planeswalkerGold} size={20} />
            <Text style={styles.title}>Arcane Configuration</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color={colors.lightGray} size={20} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* Audio & Feedback Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sensory Enchantments</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                {soundEnabled ? (
                  <Volume2 color={colors.mana.blue} size={20} />
                ) : (
                  <VolumeX color={colors.gray} size={20} />
                )}
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Arcane Sounds</Text>
                  <Text style={styles.settingDescription}>
                    Play mystical sounds for temporal alerts and battle events
                  </Text>
                </View>
              </View>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: colors.darkGray, true: colors.mana.blue }}
                thumbColor={soundEnabled ? colors.white : colors.gray}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Vibrate color={vibrationEnabled ? colors.mana.green : colors.gray} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Planar Vibrations</Text>
                  <Text style={styles.settingDescription}>
                    Haptic feedback for spell casting and alerts
                  </Text>
                </View>
              </View>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: colors.darkGray, true: colors.mana.green }}
                thumbColor={vibrationEnabled ? colors.white : colors.gray}
              />
            </View>
          </View>

          {/* Game Defaults Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Battle Defaults</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleDefaultLifeTotal}>
              <View style={styles.settingInfo}>
                <Heart color={colors.mana.red} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Default Life Force</Text>
                  <Text style={styles.settingDescription}>
                    Starting vitality for new battles (Currently: 20)
                  </Text>
                </View>
              </View>
              <Text style={styles.settingValue}>20</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handlePlayerCount}>
              <View style={styles.settingInfo}>
                <Users color={colors.mana.blue} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Default Planeswalkers</Text>
                  <Text style={styles.settingDescription}>
                    Number of planeswalkers for new battles
                  </Text>
                </View>
              </View>
              <Text style={styles.settingValue}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem} onPress={handleTimerSettings}>
              <View style={styles.settingInfo}>
                <Clock color={colors.warning} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Temporal Magic</Text>
                  <Text style={styles.settingDescription}>
                    Default turn chronometer configuration
                  </Text>
                </View>
              </View>
              <Text style={styles.settingValue}>10m</Text>
            </TouchableOpacity>
          </View>

          {/* Appearance Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planar Aesthetics</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleTheme}>
              <View style={styles.settingInfo}>
                <Palette color={colors.planeswalkerGold} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Planar Theme</Text>
                  <Text style={styles.settingDescription}>
                    Choose your visual realm
                  </Text>
                </View>
              </View>
              <Text style={styles.settingValue}>Dark Multiverse</Text>
            </TouchableOpacity>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                {keepScreenOn ? (
                  <Sun color={colors.warning} size={20} />
                ) : (
                  <Moon color={colors.gray} size={20} />
                )}
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Eternal Vigilance</Text>
                  <Text style={styles.settingDescription}>
                    Prevent scrying screen from dimming during battles
                  </Text>
                </View>
              </View>
              <Switch
                value={keepScreenOn}
                onValueChange={setKeepScreenOn}
                trackColor={{ false: colors.darkGray, true: colors.warning }}
                thumbColor={keepScreenOn ? colors.white : colors.gray}
              />
            </View>
          </View>

          {/* Privacy & Security Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Arcane Protection</Text>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield color={autoSave ? colors.mana.green : colors.gray} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Auto-Preserve Battles</Text>
                  <Text style={styles.settingDescription}>
                    Automatically save battle progress
                  </Text>
                </View>
              </View>
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ false: colors.darkGray, true: colors.mana.green }}
                thumbColor={autoSave ? colors.white : colors.gray}
              />
            </View>

            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Shield color={confirmActions ? colors.mana.blue : colors.gray} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Confirm Spells</Text>
                  <Text style={styles.settingDescription}>
                    Ask for confirmation on destructive actions
                  </Text>
                </View>
              </View>
              <Switch
                value={confirmActions}
                onValueChange={setConfirmActions}
                trackColor={{ false: colors.darkGray, true: colors.mana.blue }}
                thumbColor={confirmActions ? colors.white : colors.gray}
              />
            </View>
          </View>

          {/* Help Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Planeswalker Guidance</Text>
            
            <TouchableOpacity style={styles.settingItem} onPress={handleHelp}>
              <View style={styles.settingInfo}>
                <HelpCircle color={colors.info} size={20} />
                <View style={styles.settingText}>
                  <Text style={styles.settingName}>Guidance & Support</Text>
                  <Text style={styles.settingDescription}>
                    Get help, tutorials, and planeswalker support
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              "May your configurations serve you well across the multiverse, Planeswalker."
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.padding.large,
    paddingTop: layout.padding.xlarge,
    paddingBottom: layout.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.heading.medium,
    color: colors.planeswalkerGold,
    marginLeft: layout.spacing.small,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.padding.large,
  },
  section: {
    marginVertical: layout.spacing.large,
  },
  sectionTitle: {
    ...typography.heading.small,
    color: colors.planeswalkerGold,
    marginBottom: layout.spacing.medium,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.medium,
    paddingHorizontal: layout.spacing.medium,
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.medium,
    marginBottom: layout.spacing.small,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    flex: 1,
    marginLeft: layout.spacing.medium,
  },
  settingName: {
    ...typography.body.medium,
    color: colors.white,
    fontFamily: 'Inter-SemiBold',
    marginBottom: layout.spacing.xsmall,
  },
  settingDescription: {
    ...typography.body.small,
    color: colors.lightGray,
    lineHeight: 18,
  },
  settingValue: {
    ...typography.body.medium,
    color: colors.planeswalkerGold,
    fontFamily: 'Inter-Medium',
    marginLeft: layout.spacing.medium,
  },
  footer: {
    alignItems: 'center',
    marginVertical: layout.spacing.xlarge,
    paddingVertical: layout.spacing.large,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
  },
  footerText: {
    ...typography.body.medium,
    color: colors.planeswalkerGold,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});