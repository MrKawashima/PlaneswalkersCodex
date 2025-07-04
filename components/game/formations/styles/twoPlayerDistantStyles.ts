import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '@/styles/colors';

const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const isVerySmallPhone = width < 360;
const isSmallPhone = width >= 360 && width < 414;
const isMediumPhone = width >= 414 && width < 768;
const isTablet = width >= 768 && width < 1024;

// Distant layout scaling - optimized for top/bottom layout
const scaling = {
  lifeScale: 1.4, // Bigger life display for distant layout
  buttonScale: 1.1, // Slightly bigger buttons
  paddingScale: 1.2, // More padding
  iconScale: 1.2, // Bigger icons
  timerScale: 1.1, // Slightly bigger timer
  controlScale: 1.2, // Bigger control buttons
};

export const twoPlayerDistantStyles = StyleSheet.create({
  // Player Zone Content - Scaled for distant layout
  playerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.paddingScale,
    width: '100%',
    height: '100%',
  },

  // Timer Container - Positioned at top, bigger for distant layout
  timerContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 14 * scaling.timerScale,
    paddingHorizontal: (isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16) * scaling.timerScale,
    paddingVertical: (isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12) * scaling.timerScale,
    borderWidth: 2,
    borderColor: 'rgba(200, 170, 110, 0.4)',
    alignItems: 'center',
    marginBottom: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.timerScale,
    minWidth: (isVerySmallPhone ? 160 : isSmallPhone ? 180 : 200) * scaling.timerScale,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(200, 170, 110, 0.3)',
    }),
  },

  // Timer Controls - Horizontal layout with bigger buttons
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    minWidth: (isVerySmallPhone ? 180 : isSmallPhone ? 200 : 220) * scaling.timerScale,
  },
  timerControlButton: {
    width: (isVerySmallPhone ? 32 : isSmallPhone ? 36 : 40) * scaling.controlScale,
    height: (isVerySmallPhone ? 32 : isSmallPhone ? 36 : 40) * scaling.controlScale,
    borderRadius: (isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20) * scaling.controlScale,
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
    paddingHorizontal: (isVerySmallPhone ? 10 : isSmallPhone ? 12 : 14) * scaling.timerScale,
  },

  // Timer Icon and Display - Bigger for distant layout
  timerIcon: {
    marginBottom: 4 * scaling.timerScale,
  },
  timerDisplay: {
    fontSize: (isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20) * scaling.timerScale,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    lineHeight: (isVerySmallPhone ? 18 : isSmallPhone ? 20 : 22) * scaling.timerScale,
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
    fontSize: (isVerySmallPhone ? 10 : isSmallPhone ? 11 : 12) * scaling.timerScale,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    marginTop: 3 * scaling.timerScale,
  },

  // Player Menu Button for non-timer modes - Bigger
  playerMenuButton: {
    width: (isVerySmallPhone ? 44 : isSmallPhone ? 48 : 52) * scaling.controlScale,
    height: (isVerySmallPhone ? 44 : isSmallPhone ? 48 : 52) * scaling.controlScale,
    borderRadius: (isVerySmallPhone ? 22 : isSmallPhone ? 24 : 26) * scaling.controlScale,
    backgroundColor: 'rgba(200, 170, 110, 0.25)',
    borderWidth: 2,
    borderColor: 'rgba(200, 170, 110, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.timerScale,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(200, 170, 110, 0.3)',
    }),
  },

  // Life Display - Bigger for distant layout
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

  // Heart Icon - Bigger
  heartIcon: {
    marginBottom: (isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12) * scaling.paddingScale,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Distant Layout: Vertical layout
  distantLifeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: (isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24) * scaling.paddingScale,
  },
  centerLifeDisplay: {
    alignItems: 'center',
    flex: 0,
  },

  // Life Controls - Horizontal layout at bottom
  lifeControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: (isVerySmallPhone ? 24 : isSmallPhone ? 28 : 32) * scaling.paddingScale,
  },

  // Pass Turn Button - At bottom
  passTurnButton: {
    backgroundColor: 'rgba(200, 170, 110, 0.25)',
    borderWidth: 2,
    borderColor: colors.planeswalkerGold,
    borderRadius: (isVerySmallPhone ? 18 : isSmallPhone ? 20 : 22) * scaling.controlScale,
    paddingHorizontal: (isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20) * scaling.controlScale,
    paddingVertical: (isVerySmallPhone ? 10 : isSmallPhone ? 12 : 14) * scaling.controlScale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: (isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12) * scaling.controlScale,
    minWidth: (isVerySmallPhone ? 110 : isSmallPhone ? 120 : 130) * scaling.controlScale,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(200, 170, 110, 0.4)',
    }),
  },
  passTurnText: {
    fontSize: (isVerySmallPhone ? 14 : isSmallPhone ? 15 : 16) * scaling.controlScale,
    fontFamily: 'Inter-SemiBold',
    color: colors.planeswalkerGold,
    textAlign: 'center',
  },

  // Life Buttons - Bigger for distant layout
  lifeButton: {
    width: Math.round((isVerySmallPhone ? 60 : isSmallPhone ? 66 : isMediumPhone ? 72 : isTablet ? 80 : 88) * scaling.buttonScale),
    height: Math.round((isVerySmallPhone ? 60 : isSmallPhone ? 66 : isMediumPhone ? 72 : isTablet ? 80 : 88) * scaling.buttonScale),
    borderRadius: Math.round((isVerySmallPhone ? 30 : isSmallPhone ? 33 : isMediumPhone ? 36 : isTablet ? 40 : 44) * scaling.buttonScale),
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