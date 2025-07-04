import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Users, Wifi, WifiOff, Sparkles, Info, RotateCcw, Settings, Zap, Crown, Swords } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { landingStyles } from '@/styles/landingStyles';
import { AboutModal } from '@/components/AboutModal';
import { ResetConfirmModal } from '@/components/ResetConfirmModal';
import { SettingsModal } from '@/components/SettingsModal';

export default function LandingScreen() {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const handleSingleDevice = () => {
    router.push('/setup');
  };

  const handleMultipleDevices = () => {
    // Coming soon functionality
  };

  const handleReset = () => {
    // Here you would implement the actual reset logic
    // For now, we'll just show a success message
    Alert.alert(
      'Planeswalker Data Purged',
      'All planeswalker records have been cleansed from the multiverse.',
      [{ text: 'Acknowledged', style: 'default' }]
    );
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }}
      style={landingStyles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={landingStyles.overlay}
      >
        <View style={landingStyles.container}>
          {/* Header */}
          <View style={landingStyles.header}>
            <View style={landingStyles.titleContainer}>
              <Zap color={colors.planeswalkerGold} size={32} />
              <Text style={landingStyles.title}>Planeswalker's Codex</Text>
              <Crown color={colors.planeswalkerGold} size={32} />
            </View>
          </View>

          {/* Game Mode Cards */}
          <View style={landingStyles.cardContainer}>
            {/* Single Device Card */}
            <TouchableOpacity
              style={landingStyles.modeCard}
              onPress={handleSingleDevice}
              activeOpacity={0.8}
            >
              <View style={landingStyles.modeIcon}>
                <Swords color={colors.mana.blue} size={36} />
              </View>
              <View style={landingStyles.modeInfo}>
                <Text style={landingStyles.modeName}>Tabletop Conclave</Text>
                <Text style={landingStyles.modeDescription}>
                  Perfect for gathering around the battlefield with fellow planeswalkers. No planar bridge required.
                </Text>
                <Text style={landingStyles.modeRules}>
                  • 2-6 planeswalkers supported{'\n'}
                  • Optimized for scrying tablets{'\n'}
                  • Local multiverse experience
                </Text>
              </View>
            </TouchableOpacity>

            {/* Multiple Devices Card */}
            <TouchableOpacity
              style={[landingStyles.modeCard, landingStyles.disabledCard]}
              onPress={handleMultipleDevices}
              activeOpacity={0.6}
            >
              <View style={landingStyles.comingSoonBadge}>
                <Text style={landingStyles.comingSoonText}>PLANAR BRIDGE PENDING</Text>
              </View>
              <View style={landingStyles.modeIcon}>
                <Wifi color={colors.gray} size={36} />
              </View>
              <View style={landingStyles.modeInfo}>
                <Text style={[landingStyles.modeName, landingStyles.disabledText]}>Planar Network</Text>
                <Text style={[landingStyles.modeDescription, landingStyles.disabledText]}>
                  Connect multiple scrying devices for individual planeswalker experiences with real-time mana synchronization.
                </Text>
                <Text style={[landingStyles.modeRules, landingStyles.disabledText]}>
                  • 2-4 planeswalkers supported{'\n'}
                  • Private planeswalker screens{'\n'}
                  • Real-time multiverse connectivity
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={landingStyles.footer}>
            <Text style={landingStyles.footerText}>
              "Ignite your spark, command the multiverse"
            </Text>
          </View>

          {/* Bottom Menu */}
          <View style={landingStyles.bottomMenu}>
            <TouchableOpacity
              style={landingStyles.menuButton}
              onPress={() => setAboutModalVisible(true)}
              activeOpacity={0.7}
            >
              <Info color={colors.lightGray} size={16} />
              <Text style={landingStyles.menuButtonText}>Codex</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={landingStyles.menuButton}
              onPress={() => setSettingsModalVisible(true)}
              activeOpacity={0.7}
            >
              <Settings color={colors.lightGray} size={16} />
              <Text style={landingStyles.menuButtonText}>Arcane</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[landingStyles.menuButton, landingStyles.resetButton]}
              onPress={() => setResetModalVisible(true)}
              activeOpacity={0.7}
            >
              <RotateCcw color={colors.red} size={16} />
              <Text style={[landingStyles.menuButtonText, landingStyles.resetButtonText]}>Purge</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modals */}
        <AboutModal
          visible={aboutModalVisible}
          onClose={() => setAboutModalVisible(false)}
        />

        <SettingsModal
          visible={settingsModalVisible}
          onClose={() => setSettingsModalVisible(false)}
        />

        <ResetConfirmModal
          visible={resetModalVisible}
          onClose={() => setResetModalVisible(false)}
          onConfirm={handleReset}
        />
      </LinearGradient>
    </ImageBackground>
  );
}