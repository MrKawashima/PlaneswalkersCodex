import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { layout } from './layout';

const { width, height } = Dimensions.get('window');

// Enhanced responsive breakpoints
const isVerySmallPhone = width < 360;
const isSmallPhone = width >= 360 && width < 414;
const isMediumPhone = width >= 414 && width < 768;
const isTablet = width >= 768 && width < 1024;
const isDesktop = width >= 1024;

// Height-based breakpoints
const isShortScreen = height < 700;
const isMediumScreen = height >= 700 && height < 900;
const isTallScreen = height >= 900;

export const gameStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
  },
  overlay: {
    flex: 1,
  },

  // Full-Screen Battlefield Container - No padding for menus
  battlefield: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  // Central Settings Area - Floating in center (size will be set dynamically)
  // FIXED: Ensure equal distance for both players in 2-player mode
  centralArea: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    borderWidth: 3,
    borderColor: colors.planeswalkerGold,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
    shadowColor: colors.planeswalkerGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 16,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 16px rgba(200, 170, 110, 0.6)',
    }),
  },
  centralContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralIcon: {
    marginBottom: isVerySmallPhone ? 4 : isSmallPhone ? 6 : 8,
  },
  centralText: {
    fontFamily: 'Inter-Bold',
    color: colors.planeswalkerGold,
    textAlign: 'center',
    marginTop: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
  },
  turnIndicator: {
    fontFamily: 'Inter-Regular',
    color: colors.lightGray,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 2,
  },

  // Timer Section - Floating overlay at top
  timerContainer: {
    position: 'absolute',
    top: isVerySmallPhone ? 20 : isSmallPhone ? 30 : 40,
    left: isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20,
    right: isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20,
    zIndex: 90,
  },
  timerCard: {
    backgroundColor: 'rgba(30, 27, 58, 0.95)',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.4)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
    }),
  },
  timerTitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : 13,
    fontFamily: 'Inter-Medium',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 4 : isSmallPhone ? 6 : 8,
    textAlign: 'center',
  },
  timerDisplay: {
    fontSize: isVerySmallPhone ? 20 : isSmallPhone ? 24 : isMediumPhone ? 28 : 32,
    fontFamily: 'Inter-Bold',
    color: colors.planeswalkerGold,
    textAlign: 'center',
  },
  timerWarning: {
    color: colors.warning,
  },
  timerCritical: {
    color: colors.error,
  },
  timerStatus: {
    fontSize: isVerySmallPhone ? 9 : isSmallPhone ? 10 : 11,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    marginTop: isVerySmallPhone ? 4 : isSmallPhone ? 6 : 8,
    textAlign: 'center',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.padding.large,
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: layout.padding.large,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  modalTitle: {
    ...typography.heading.medium,
    color: colors.planeswalkerGold,
    flex: 1,
    textAlign: 'center',
  },
  modalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: layout.padding.large,
    alignItems: 'center',
  },
  modalText: {
    ...typography.body.medium,
    color: colors.lightGray,
    textAlign: 'center',
    marginBottom: layout.spacing.large,
    lineHeight: 22,
  },
  modalActions: {
    flexDirection: 'row',
    padding: layout.padding.large,
    gap: layout.spacing.medium,
  },
  modalButton: {
    flex: 1,
    paddingVertical: layout.padding.medium + 2,
    borderRadius: layout.borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    flexDirection: 'row',
    gap: 8,
  },
  modalPrimaryButton: {
    backgroundColor: colors.planeswalkerGold,
  },
  modalSecondaryButton: {
    backgroundColor: colors.darkGray,
  },
  modalDangerButton: {
    backgroundColor: colors.red,
  },
  modalButtonText: {
    ...typography.button,
    fontFamily: 'Inter-SemiBold',
  },
  modalPrimaryButtonText: {
    color: colors.black,
  },
  modalSecondaryButtonText: {
    color: colors.lightGray,
  },
  modalDangerButtonText: {
    color: colors.white,
  },

  // Victory Modal Specific
  victoryIcon: {
    fontSize: 64,
    marginBottom: layout.spacing.large,
  },
  winnersList: {
    alignItems: 'center',
    marginBottom: layout.spacing.large,
  },
  winnerName: {
    ...typography.heading.small,
    color: colors.planeswalkerGold,
    marginBottom: layout.spacing.small,
  },
  winnerLife: {
    ...typography.body.large,
    color: colors.lightGray,
  },

  // Settings Modal Specific Styles
  settingsSection: {
    width: '100%',
    marginBottom: layout.spacing.large,
  },
  settingsSectionTitle: {
    ...typography.heading.small,
    color: colors.planeswalkerGold,
    marginBottom: layout.spacing.medium,
    textAlign: 'left',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: layout.spacing.medium,
    paddingHorizontal: layout.spacing.medium,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: layout.borderRadius.medium,
    marginBottom: layout.spacing.small,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingsItemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemText: {
    flex: 1,
    marginLeft: layout.spacing.medium,
  },
  settingsItemName: {
    ...typography.body.medium,
    color: colors.white,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  settingsItemDescription: {
    ...typography.body.small,
    color: colors.lightGray,
    lineHeight: 18,
  },
  settingsButton: {
    paddingVertical: layout.spacing.small,
    paddingHorizontal: layout.spacing.medium,
    borderRadius: layout.borderRadius.small,
    backgroundColor: 'rgba(200, 170, 110, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  settingsButtonText: {
    ...typography.body.small,
    color: colors.planeswalkerGold,
    fontFamily: 'Inter-SemiBold',
  },
  dangerSettingsButton: {
    backgroundColor: 'rgba(211, 32, 42, 0.2)',
    borderColor: 'rgba(211, 32, 42, 0.4)',
  },
  dangerSettingsButtonText: {
    color: colors.red,
  },
});