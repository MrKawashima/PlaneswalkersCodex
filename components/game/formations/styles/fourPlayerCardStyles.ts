import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '@/styles/colors';

const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const isVerySmallPhone = width < 360;
const isSmallPhone = width >= 360 && width < 414;
const isMediumPhone = width >= 414 && width < 768;
const isTablet = width >= 768 && width < 1024;

// 4-Player specific scaling (base scaling)
const scaling = {
  nameScale: 1.0,
  lifeScale: 1.0,
  buttonScale: 1.0,
  paddingScale: 1.0,
  iconScale: 1.0,
};

export const fourPlayerCardStyles = StyleSheet.create({
  // Player Zone Content - Base scaling for 4 players
  playerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.paddingScale,
    width: '100%',
    height: '100%',
  },
  
  // Player Name - Base size for 4 players
  playerName: {
    fontSize: Math.round((isVerySmallPhone ? 18 : isSmallPhone ? 22 : isMediumPhone ? 26 : isTablet ? 32 : 36) * scaling.nameScale),
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: (isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20) * scaling.paddingScale,
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    lineHeight: Math.round((isVerySmallPhone ? 22 : isSmallPhone ? 26 : isMediumPhone ? 30 : isTablet ? 36 : 40) * scaling.nameScale),
    ...(Platform.OS === 'web' && {
      textShadow: '2px 2px 6px rgba(0,0,0,0.9)',
    }),
  },
  activePlayerName: {
    color: colors.planeswalkerGold,
    textShadowColor: 'rgba(200, 170, 110, 0.3)',
  },
  deadPlayerName: {
    color: colors.red,
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },

  // Life Display - Base size for 4 players
  lifeContainer: {
    alignItems: 'center',
    marginBottom: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.paddingScale,
  },
  lifeDisplay: {
    fontSize: Math.round((isVerySmallPhone ? 48 : isSmallPhone ? 56 : isMediumPhone ? 64 : isTablet ? 80 : 96) * scaling.lifeScale),
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 8,
    lineHeight: Math.round((isVerySmallPhone ? 54 : isSmallPhone ? 62 : isMediumPhone ? 70 : isTablet ? 86 : 102) * scaling.lifeScale),
    ...(Platform.OS === 'web' && {
      textShadow: '4px 4px 8px rgba(0,0,0,0.9)',
    }),
  },
  lowLifeDisplay: {
    color: colors.warning,
  },
  criticalLifeDisplay: {
    color: colors.error,
  },
  deadLifeDisplay: {
    color: colors.red,
    opacity: 0.7,
  },

  // Heart Icon - Base size for 4 players
  heartIcon: {
    marginBottom: (isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12) * scaling.paddingScale,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Life Controls - Horizontal layout for 4 players
  lifeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: (isVerySmallPhone ? 20 : isSmallPhone ? 24 : isMediumPhone ? 28 : 32) * scaling.paddingScale,
  },
  lifeButton: {
    width: Math.round((isVerySmallPhone ? 60 : isSmallPhone ? 70 : isMediumPhone ? 80 : isTablet ? 90 : 100) * scaling.buttonScale),
    height: Math.round((isVerySmallPhone ? 60 : isSmallPhone ? 70 : isMediumPhone ? 80 : isTablet ? 90 : 100) * scaling.buttonScale),
    borderRadius: Math.round((isVerySmallPhone ? 30 : isSmallPhone ? 35 : isMediumPhone ? 40 : isTablet ? 45 : 50) * scaling.buttonScale),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 4px 8px rgba(0,0,0,0.4)',
    }),
  },
  decreaseButton: {
    backgroundColor: 'rgba(211, 32, 42, 0.9)',
    borderColor: colors.red,
  },
  increaseButton: {
    backgroundColor: 'rgba(0, 115, 62, 0.9)',
    borderColor: colors.green,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    opacity: 0.5,
  },
});