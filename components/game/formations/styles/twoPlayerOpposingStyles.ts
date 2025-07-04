import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '@/styles/colors';

const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const isVerySmallPhone = width < 360;
const isSmallPhone = width >= 360 && width < 414;
const isMediumPhone = width >= 414 && width < 768;
const isTablet = width >= 768 && width < 1024;

// Opposing layout scaling - optimized for side-by-side layout
const scaling = {
  lifeScale: 1.2,
  buttonScale: 0.9,
  paddingScale: 1.0,
  iconScale: 1.1,
  timerScale: 1.0,
  controlScale: 1.1,
};

export const twoPlayerOpposingStyles = StyleSheet.create({
  // Player Zone Content - Scaled for opposing layout
  playerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.paddingScale,
    width: '100%',
    height: '100%',
  },

  // Timer Container - Positioned above life display, centered
  timerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 12 * scaling.timerScale,
    paddingHorizontal: (isVerySmallPhone ? 10 : isSmallPhone ? 12 : 14) * scaling.timerScale,
    paddingVertical: (isVerySmallPhone ? 6 : isSmallPhone ? 8 : 10) * scaling.timerScale,
    borderWidth: 2,
    borderColor: 'rgba(200, 170, 110, 0.4)',
    alignItems: 'center',
    marginBottom: (isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20) * scaling.timerScale,
    minWidth: (isVerySmallPhone ? 100 : isSmallPhone ? 120 : 140) * scaling.timerScale,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 6px rgba(200, 170, 110, 0.3)',
    }),
  },

  // Timer Controls - Horizontal layout with pause/play and menu
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: (isVerySmallPhone ? 140 : isSmallPhone ? 160 : 180) * scaling.timerScale,
  },
  timerControlButton: {
    width: (isVerySmallPhone ? 28 : isSmallPhone ? 32 : 36) * scaling.controlScale,
    height: (isVerySmallPhone ? 28 : isSmallPhone ? 32 : 36) * scaling.controlScale,
    borderRadius: (isVerySmallPhone ? 14 : isSmallPhone ? 16 : 18) * scaling.controlScale,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
    }),
  },
  timerDisplayContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: (isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12) * scaling.timerScale,
  },

  // Timer Icon and Display
  timerIcon: {
    marginBottom: 3 * scaling.timerScale,
  },
  timerDisplay: {
    fontSize: (isVerySmallPhone ? 14 : isSmallPhone ? 16 : 18) * scaling.timerScale,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    lineHeight: (isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20) * scaling.timerScale,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    ...(Platform.OS === 'web' && {
      textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
    }),
  },
  timerWarning: {
    color: colors.warning,
  },
  timerCritical: {
    color: colors.error,
  },
  timerStatus: {
    fontSize: (isVerySmallPhone ? 9 : isSmallPhone ? 10 : 11) * scaling.timerScale,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    marginTop: 2 * scaling.timerScale,
  },

  // Player Menu Button for non-timer modes
  playerMenuButton: {
    width: (isVerySmallPhone ? 36 : isSmallPhone ? 40 : 44) * scaling.controlScale,
    height: (isVerySmallPhone ? 36 : isSmallPhone ? 40 : 44) * scaling.controlScale,
    borderRadius: (isVerySmallPhone ? 18 : isSmallPhone ? 20 : 22) * scaling.controlScale,
    backgroundColor: 'rgba(200, 170, 110, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(200, 170, 110, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: (isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20) * scaling.timerScale,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 6px rgba(200, 170, 110, 0.3)',
    }),
  },

  // Life Display
  lifeDisplay: {
    fontSize: Math.round((isVerySmallPhone ? 40 : isSmallPhone ? 48 : isMediumPhone ? 56 : isTablet ? 64 : 72) * scaling.lifeScale),
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    lineHeight: Math.round((isVerySmallPhone ? 46 : isSmallPhone ? 54 : isMediumPhone ? 62 : isTablet ? 70 : 78) * scaling.lifeScale),
    ...(Platform.OS === 'web' && {
      textShadow: '3px 3px 6px rgba(0,0,0,0.9)',
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

  // Heart Icon
  heartIcon: {
    marginBottom: (isVerySmallPhone ? 6 : isSmallPhone ? 8 : 10) * scaling.paddingScale,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Opposing Layout: Horizontal layout with side buttons
  opposingLifeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : isMediumPhone ? 24 : 28) * scaling.paddingScale,
  },
  centerLifeDisplay: {
    alignItems: 'center',
    flex: 0,
    minWidth: Math.round((isVerySmallPhone ? 100 : isSmallPhone ? 120 : isMediumPhone ? 140 : 160) * scaling.lifeScale),
  },
  sideButton: {
    flex: 0,
  },

  // Pass Turn Button - Under life total
  passTurnButton: {
    backgroundColor: 'rgba(200, 170, 110, 0.25)',
    borderWidth: 2,
    borderColor: colors.planeswalkerGold,
    borderRadius: (isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20) * scaling.controlScale,
    paddingHorizontal: (isVerySmallPhone ? 14 : isSmallPhone ? 16 : 18) * scaling.controlScale,
    paddingVertical: (isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12) * scaling.controlScale,
    marginTop: (isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20) * scaling.timerScale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: (isVerySmallPhone ? 6 : isSmallPhone ? 8 : 10) * scaling.controlScale,
    minWidth: (isVerySmallPhone ? 90 : isSmallPhone ? 100 : 110) * scaling.controlScale,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 6px rgba(200, 170, 110, 0.4)',
    }),
  },
  passTurnText: {
    fontSize: (isVerySmallPhone ? 12 : isSmallPhone ? 13 : 15) * scaling.controlScale,
    fontFamily: 'Inter-SemiBold',
    color: colors.planeswalkerGold,
    textAlign: 'center',
  },

  // Life Buttons
  lifeButton: {
    width: Math.round((isVerySmallPhone ? 50 : isSmallPhone ? 56 : isMediumPhone ? 62 : isTablet ? 68 : 74) * scaling.buttonScale),
    height: Math.round((isVerySmallPhone ? 50 : isSmallPhone ? 56 : isMediumPhone ? 62 : isTablet ? 68 : 74) * scaling.buttonScale),
    borderRadius: Math.round((isVerySmallPhone ? 25 : isSmallPhone ? 28 : isMediumPhone ? 31 : isTablet ? 34 : 37) * scaling.buttonScale),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 3px 6px rgba(0,0,0,0.4)',
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