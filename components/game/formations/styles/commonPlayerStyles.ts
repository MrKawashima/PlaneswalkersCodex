import { StyleSheet, Platform } from 'react-native';
import { colors } from '@/styles/colors';

export const commonPlayerStyles = StyleSheet.create({
  // Player Zone Colors - Bold and vibrant
  playerZoneColor1: {
    backgroundColor: '#FF3B30', // Bright red
  },
  playerZoneColor2: {
    backgroundColor: '#007AFF', // Bright blue
  },
  playerZoneColor3: {
    backgroundColor: '#34C759', // Bright green
  },
  playerZoneColor4: {
    backgroundColor: '#FFCC00', // Bright yellow
  },

  // Zone border styles
  playerZone: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  activePlayerZone: {
    borderColor: colors.planeswalkerGold,
    borderWidth: 6,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 12px rgba(200, 170, 110, 0.4)',
    }),
  },
  deadPlayerZone: {
    borderColor: colors.red,
    borderWidth: 4,
    shadowColor: colors.red,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(211, 32, 42, 0.3)',
    }),
  },
});