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

// Height-based breakpoints for better vertical spacing
const isShortScreen = height < 700;
const isMediumScreen = height >= 700 && height < 900;
const isTallScreen = height >= 900;

export const setupStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  
  // Header Section - Fixed height to prevent overlap
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.large,
    paddingTop: isVerySmallPhone ? 50 : isSmallPhone ? 60 : isShortScreen ? 60 : 80,
    paddingBottom: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(200, 170, 110, 0.2)',
    flex: 0, // Don't grow or shrink
    minHeight: isVerySmallPhone ? 100 : isSmallPhone ? 110 : isShortScreen ? 110 : 130,
    maxHeight: isVerySmallPhone ? 120 : isSmallPhone ? 130 : isShortScreen ? 130 : 150,
    zIndex: 10,
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 1200,
      alignSelf: 'center',
      width: '100%',
    }),
  },
  backButton: {
    width: isVerySmallPhone ? 40 : isSmallPhone ? 42 : 44,
    height: isVerySmallPhone ? 40 : isSmallPhone ? 42 : 44,
    borderRadius: isVerySmallPhone ? 20 : isSmallPhone ? 21 : 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.3)',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : layout.spacing.small,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.heading.medium,
    fontSize: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 22 : 26,
    color: colors.planeswalkerGold,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
    maxWidth: isVerySmallPhone ? '60%' : isSmallPhone ? '70%' : '80%',
    flexShrink: 1,
    lineHeight: isVerySmallPhone ? 18 : isSmallPhone ? 20 : isMediumPhone ? 22 : isTablet ? 26 : 30,
    ...(Platform.OS === 'web' && {
      textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
    }),
  },
  placeholder: {
    width: isVerySmallPhone ? 40 : isSmallPhone ? 42 : 44,
  },
  
  // Content Section - Flexible middle section
  content: {
    flex: 1,
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.large,
    paddingVertical: isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20,
    ...(Platform.OS === 'web' && isDesktop && {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 1000,
    }),
  },
  sectionCard: {
    backgroundColor: '#1e1b3a',
    borderRadius: isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20,
    padding: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 24 : 28,
    marginVertical: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    borderWidth: 1,
    borderColor: '#2d1b69',
    ...(Platform.OS === 'web' && isDesktop && {
      padding: 32,
      marginVertical: 16,
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    gap: isVerySmallPhone ? 10 : isSmallPhone ? 12 : layout.spacing.medium,
  },
  sectionTitle: {
    fontSize: isVerySmallPhone ? 14 : isSmallPhone ? 15 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    fontFamily: 'Inter-SemiBold',
    color: colors.planeswalkerGold,
    flex: 1,
    lineHeight: isVerySmallPhone ? 18 : isSmallPhone ? 19 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    ...(Platform.OS === 'web' && isDesktop && {
      fontSize: 22,
    }),
  },
  sectionSubtitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-Regular',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20,
    lineHeight: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 17 : isTablet ? 18 : 19,
    ...(Platform.OS === 'web' && isDesktop && {
      fontSize: 16,
      marginBottom: 24,
    }),
  },
  
  // Life Options - Enhanced mobile responsiveness
  lifeOptions: {
    flexDirection: 'row',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    marginBottom: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    ...(Platform.OS === 'web' && isDesktop && {
      justifyContent: 'center',
    }),
  },
  lifeOption: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f37',
    minHeight: isVerySmallPhone ? 60 : isSmallPhone ? 65 : isMediumPhone ? 70 : isTablet ? 75 : 80,
    justifyContent: 'center',
    minWidth: isVerySmallPhone ? 44 : isSmallPhone ? 48 : 52,
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 180,
    }),
  },
  selectedLifeOption: {
    backgroundColor: '#7c2d12',
    borderColor: '#dc2626',
    borderWidth: 2,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(220, 38, 38, 0.3)',
    }),
  },
  lifeOptionTitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
  },
  selectedLifeOptionTitle: {
    color: '#ffffff',
  },
  lifeOptionSubtitle: {
    fontSize: isVerySmallPhone ? 8 : isSmallPhone ? 9 : isMediumPhone ? 10 : isTablet ? 11 : 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
  },
  selectedLifeOptionSubtitle: {
    color: '#fca5a5',
  },
  
  // Timer Type Options - Enhanced mobile layout
  timerTypeOptions: {
    flexDirection: 'column',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    marginBottom: 0,
    ...(Platform.OS === 'web' && isDesktop && {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 700,
    }),
  },
  timerTypeOption: {
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    padding: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f37',
    minHeight: isVerySmallPhone ? 60 : isSmallPhone ? 65 : isMediumPhone ? 70 : isTablet ? 75 : 80,
    minWidth: '100%',
  },
  selectedTimerTypeOption: {
    backgroundColor: '#7c2d12',
    borderColor: '#dc2626',
    borderWidth: 2,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(220, 38, 38, 0.3)',
    }),
  },
  timerTypeIcon: {
    marginRight: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
  },
  timerTypeTitle: {
    fontSize: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
    marginBottom: 2,
    lineHeight: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 17 : isTablet ? 18 : 19,
  },
  selectedTimerTypeTitle: {
    color: '#ffffff',
  },
  timerTypeSubtitle: {
    fontSize: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    lineHeight: isVerySmallPhone ? 12 : isSmallPhone ? 13 : isMediumPhone ? 14 : isTablet ? 15 : 16,
  },
  selectedTimerTypeSubtitle: {
    color: '#fca5a5',
  },

  // Slide Navigation - Enhanced mobile
  slideNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    paddingHorizontal: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    ...(Platform.OS === 'web' && isDesktop && {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 500,
    }),
  },
  slideNavButton: {
    width: isVerySmallPhone ? 36 : isSmallPhone ? 40 : isMediumPhone ? 44 : isTablet ? 48 : 52,
    height: isVerySmallPhone ? 36 : isSmallPhone ? 40 : isMediumPhone ? 44 : isTablet ? 48 : 52,
    borderRadius: isVerySmallPhone ? 18 : isSmallPhone ? 20 : isMediumPhone ? 22 : isTablet ? 24 : 26,
    backgroundColor: 'rgba(200, 170, 110, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideNavButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  slideIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
  },
  slideIndicator: {
    width: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    height: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    borderRadius: isVerySmallPhone ? 4 : isSmallPhone ? 5 : isMediumPhone ? 6 : isTablet ? 7 : 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  slideIndicatorActive: {
    backgroundColor: colors.planeswalkerGold,
    width: isVerySmallPhone ? 24 : isSmallPhone ? 28 : isMediumPhone ? 32 : isTablet ? 36 : 40,
  },

  // Slide Container - Enhanced for mobile
  slideContainer: {
    overflow: 'hidden',
    marginBottom: 0,
    borderRadius: 8,
    ...(Platform.OS === 'web' && isDesktop && {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 800,
      minHeight: 250,
    }),
  },
  slideContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  slide: {
    paddingHorizontal: isVerySmallPhone ? 4 : isSmallPhone ? 6 : 8,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    ...(Platform.OS === 'web' && isDesktop && {
      paddingHorizontal: 12,
    }),
  },

  // Table Layout Grid - Enhanced mobile
  tableLayoutGrid: {
    gap: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
  },
  tableLayoutOption: {
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    borderWidth: 1,
    borderColor: '#1f1f37',
    overflow: 'hidden',
    minHeight: isVerySmallPhone ? 140 : isSmallPhone ? 160 : isMediumPhone ? 180 : isTablet ? 200 : 220,
  },
  selectedTableLayoutOption: {
    backgroundColor: '#1e3a8a',
    borderColor: '#3b82f6',
    borderWidth: 2,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(59, 130, 246, 0.3)',
    }),
  },
  tableLayoutButton: {
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    minHeight: isVerySmallPhone ? 44 : isSmallPhone ? 48 : 52,
  },
  tableLayoutPreviewContainer: {
    height: isVerySmallPhone ? 100 : isSmallPhone ? 120 : isMediumPhone ? 140 : isTablet ? 160 : 180,
    marginBottom: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
  },
  tableLayoutInfo: {
    alignItems: 'center',
  },
  tableLayoutName: {
    fontSize: isVerySmallPhone ? 12 : isSmallPhone ? 13 : isMediumPhone ? 14 : isTablet ? 15 : 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 4 : isSmallPhone ? 5 : 6,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 14 : isSmallPhone ? 15 : isMediumPhone ? 16 : isTablet ? 17 : 18,
  },
  selectedTableLayoutName: {
    color: '#ffffff',
  },
  tableLayoutDescription: {
    fontSize: isVerySmallPhone ? 9 : isSmallPhone ? 10 : isMediumPhone ? 11 : isTablet ? 12 : 13,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    paddingHorizontal: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 0,
  },
  selectedTableLayoutDescription: {
    color: '#93c5fd',
  },

  // Phone Preview Styles - Enhanced for mobile
  phonePreview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
  },
  phoneFrame: {
    width: isVerySmallPhone ? 70 : isSmallPhone ? 80 : isMediumPhone ? 90 : isTablet ? 100 : 110,
    height: isVerySmallPhone ? 126 : isSmallPhone ? 144 : isMediumPhone ? 162 : isTablet ? 180 : 198,
    backgroundColor: '#1a1a1a',
    borderRadius: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    borderWidth: 2,
    borderColor: '#333333',
    padding: isVerySmallPhone ? 4 : isSmallPhone ? 5 : isMediumPhone ? 6 : isTablet ? 7 : 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
    }),
  },
  selectedPhoneFrame: {
    borderColor: '#3b82f6',
    shadowColor: '#3b82f6',
    shadowOpacity: 0.4,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 4px 8px rgba(59, 130, 246, 0.4)',
    }),
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedPhoneScreen: {
    backgroundColor: '#0a0a0a',
  },
  gameTableArea: {
    flex: 1,
    backgroundColor: '#1a1625',
    position: 'relative',
  },
  selectedGameTableArea: {
    backgroundColor: '#1e2a4a',
  },
  playerUI: {
    position: 'absolute',
    width: isVerySmallPhone ? 32 : isSmallPhone ? 36 : isMediumPhone ? 40 : isTablet ? 44 : 48,
    height: isVerySmallPhone ? 24 : isSmallPhone ? 28 : isMediumPhone ? 32 : isTablet ? 36 : 40,
  },
  selectedPlayerUI: {
    // No additional styles needed - handled by inner components
  },
  playerUIInner: {
    flex: 1,
    backgroundColor: '#2d1b69',
    borderRadius: isVerySmallPhone ? 3 : isSmallPhone ? 4 : 5,
    borderWidth: 1,
    borderColor: '#4c1d95',
    padding: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPlayerUIInner: {
    backgroundColor: '#1e40af',
    borderColor: '#3b82f6',
  },
  playerUIText: {
    fontSize: isVerySmallPhone ? 6 : isSmallPhone ? 7 : isMediumPhone ? 8 : isTablet ? 9 : 10,
    fontFamily: 'Inter-Bold',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 1 : 2,
  },
  selectedPlayerUIText: {
    color: '#ffffff',
  },
  lifeCounter: {
    backgroundColor: '#dc2626',
    borderRadius: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
    paddingHorizontal: isVerySmallPhone ? 3 : isSmallPhone ? 4 : 5,
    paddingVertical: isVerySmallPhone ? 1 : 2,
    minWidth: isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20,
    alignItems: 'center',
  },
  selectedLifeCounter: {
    backgroundColor: '#fbbf24',
  },
  lifeCounterText: {
    fontSize: isVerySmallPhone ? 5 : isSmallPhone ? 6 : isMediumPhone ? 7 : isTablet ? 8 : 9,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
  },
  selectedLifeCounterText: {
    color: '#000000',
  },
  centralGameArea: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    width: '20%',
    height: '20%',
    backgroundColor: 'rgba(200, 170, 110, 0.1)',
    borderRadius: isVerySmallPhone ? 3 : isSmallPhone ? 4 : 5,
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCentralGameArea: {
    backgroundColor: 'rgba(200, 170, 110, 0.2)',
    borderColor: 'rgba(200, 170, 110, 0.5)',
  },
  centralGameText: {
    fontSize: isVerySmallPhone ? 10 : isSmallPhone ? 12 : isMediumPhone ? 14 : isTablet ? 16 : 18,
  },
  selectedCentralGameText: {
    // No change needed for emoji
  },
  phoneHomeIndicator: {
    width: isVerySmallPhone ? 24 : isSmallPhone ? 28 : isMediumPhone ? 32 : isTablet ? 36 : 40,
    height: isVerySmallPhone ? 3 : isSmallPhone ? 4 : 5,
    backgroundColor: '#333333',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: isVerySmallPhone ? 3 : isSmallPhone ? 4 : 5,
  },
  selectedPhoneHomeIndicator: {
    backgroundColor: '#666666',
  },

  // Global Timer Options - Enhanced mobile
  globalTimerOption: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f37',
    minHeight: isVerySmallPhone ? 60 : isSmallPhone ? 65 : isMediumPhone ? 70 : isTablet ? 75 : 80,
    justifyContent: 'center',
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 180,
    }),
  },
  selectedGlobalTimerOption: {
    backgroundColor: '#7c2d12',
    borderColor: '#dc2626',
    borderWidth: 2,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(220, 38, 38, 0.3)',
    }),
  },
  globalTimerTitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
  },
  selectedGlobalTimerTitle: {
    color: '#ffffff',
  },
  globalTimerSubtitle: {
    fontSize: isVerySmallPhone ? 8 : isSmallPhone ? 9 : isMediumPhone ? 10 : isTablet ? 11 : 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
  },
  selectedGlobalTimerSubtitle: {
    color: '#fca5a5',
  },

  // Individual Timer Options - Enhanced mobile
  individualTimerOption: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f37',
    minHeight: isVerySmallPhone ? 60 : isSmallPhone ? 65 : isMediumPhone ? 70 : isTablet ? 75 : 80,
    justifyContent: 'center',
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 180,
    }),
  },
  selectedIndividualTimerOption: {
    backgroundColor: '#7c2d12',
    borderColor: '#dc2626',
    borderWidth: 2,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(220, 38, 38, 0.3)',
    }),
  },
  individualTimerTitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
  },
  selectedIndividualTimerTitle: {
    color: '#ffffff',
  },
  individualTimerSubtitle: {
    fontSize: isVerySmallPhone ? 8 : isSmallPhone ? 9 : isMediumPhone ? 10 : isTablet ? 11 : 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
  },
  selectedIndividualTimerSubtitle: {
    color: '#fca5a5',
  },

  // Increment Options - Enhanced mobile
  incrementOptions: {
    flexDirection: 'row',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    marginBottom: 0,
    ...(Platform.OS === 'web' && isDesktop && {
      justifyContent: 'center',
    }),
  },
  incrementOption: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f1f37',
    minHeight: isVerySmallPhone ? 60 : isSmallPhone ? 65 : isMediumPhone ? 70 : isTablet ? 75 : 80,
    justifyContent: 'center',
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 180,
    }),
  },
  selectedIncrementOption: {
    backgroundColor: '#7c2d12',
    borderColor: '#dc2626',
    borderWidth: 2,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 0px 8px rgba(220, 38, 38, 0.3)',
    }),
  },
  incrementTitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 2 : isSmallPhone ? 3 : 4,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
  },
  selectedIncrementTitle: {
    color: '#ffffff',
  },
  incrementSubtitle: {
    fontSize: isVerySmallPhone ? 8 : isSmallPhone ? 9 : isMediumPhone ? 10 : isTablet ? 11 : 12,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
  },
  selectedIncrementSubtitle: {
    color: '#fca5a5',
  },

  // Increment Amount Section - Enhanced mobile
  incrementAmountSection: {
    marginTop: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    paddingTop: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    borderTopWidth: 1,
    borderTopColor: '#1f1f37',
  },
  incrementAmountLabel: {
    fontSize: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
    fontFamily: 'Inter-Medium',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 17 : isTablet ? 18 : 19,
  },
  incrementAmountOptions: {
    flexDirection: 'row',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    marginBottom: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    ...(Platform.OS === 'web' && isDesktop && {
      justifyContent: 'center',
    }),
  },
  incrementAmountOption: {
    flex: 1,
    backgroundColor: '#0f0f23',
    borderRadius: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    padding: isVerySmallPhone ? 10 : isSmallPhone ? 12 : isMediumPhone ? 14 : isTablet ? 16 : 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1f1f37',
    minHeight: isVerySmallPhone ? 48 : isSmallPhone ? 52 : isMediumPhone ? 56 : isTablet ? 60 : 64,
    flexDirection: 'row',
    gap: 3,
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 120,
    }),
  },
  selectedIncrementAmountOption: {
    backgroundColor: '#7c2d12',
    borderColor: '#dc2626',
    borderWidth: 2,
  },
  incrementAmountText: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.lightGray,
  },
  selectedIncrementAmountText: {
    color: '#ffffff',
  },
  exponentialExplanation: {
    fontSize: isVerySmallPhone ? 9 : isSmallPhone ? 10 : isMediumPhone ? 11 : isTablet ? 12 : 13,
    fontFamily: 'Inter-Regular',
    color: colors.gray,
    marginTop: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : isTablet ? 14 : 16,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
  },

  // Exponential Description and Example Card - Enhanced mobile
  exponentialDescription: {
    fontSize: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
    fontFamily: 'Inter-Regular',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: isVerySmallPhone ? 12 : isSmallPhone ? 13 : isMediumPhone ? 14 : isTablet ? 15 : 16,
  },
  exponentialExampleCard: {
    backgroundColor: 'rgba(200, 170, 110, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.2)',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    padding: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    marginTop: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
  },
  exponentialExampleTitle: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-SemiBold',
    color: colors.planeswalkerGold,
    marginBottom: isVerySmallPhone ? 6 : isSmallPhone ? 8 : isMediumPhone ? 10 : isTablet ? 12 : 14,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
  },
  exponentialExampleText: {
    fontSize: isVerySmallPhone ? 9 : isSmallPhone ? 10 : isMediumPhone ? 11 : isTablet ? 12 : 13,
    fontFamily: 'Inter-Regular',
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
  },
  exponentialNote: {
    fontSize: isVerySmallPhone ? 8 : isSmallPhone ? 9 : isMediumPhone ? 10 : isTablet ? 11 : 12,
    fontFamily: 'Inter-Regular',
    color: colors.lightGray,
    textAlign: 'center',
    marginTop: isVerySmallPhone ? 6 : isSmallPhone ? 8 : isMediumPhone ? 10 : isTablet ? 12 : 14,
    fontStyle: 'italic',
    lineHeight: isVerySmallPhone ? 10 : isSmallPhone ? 11 : isMediumPhone ? 12 : isTablet ? 13 : 14,
  },

  // Custom Input Section - Enhanced mobile
  customInputSection: {
    marginTop: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    paddingTop: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    borderTopWidth: 1,
    borderTopColor: '#1f1f37',
  },
  customInputLabel: {
    fontSize: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
    fontFamily: 'Inter-Medium',
    color: colors.lightGray,
    marginBottom: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 17 : isTablet ? 18 : 19,
  },
  customInput: {
    backgroundColor: '#0f0f23',
    borderWidth: 1,
    borderColor: '#1f1f37',
    borderRadius: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    padding: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    fontSize: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 17 : isTablet ? 18 : 19,
    fontFamily: 'Inter-Regular',
    color: colors.white,
    textAlign: 'center',
    minHeight: isVerySmallPhone ? 48 : isSmallPhone ? 52 : 56,
    ...(Platform.OS === 'web' && isDesktop && {
      alignSelf: 'center',
      width: 240,
    }),
  },
  
  // Summary Card - Enhanced mobile
  summaryCard: {
    backgroundColor: 'rgba(200, 170, 110, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.3)',
    borderRadius: isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20,
    padding: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 24 : 28,
    marginVertical: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
  },
  summaryContent: {
    gap: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: isVerySmallPhone ? 28 : isSmallPhone ? 32 : 36,
  },
  summaryLabel: {
    fontSize: isVerySmallPhone ? 12 : isSmallPhone ? 13 : isMediumPhone ? 14 : isTablet ? 15 : 16,
    fontFamily: 'Inter-Regular',
    color: colors.lightGray,
    flex: 1,
    lineHeight: isVerySmallPhone ? 14 : isSmallPhone ? 15 : isMediumPhone ? 16 : isTablet ? 17 : 18,
  },
  summaryValue: {
    fontSize: isVerySmallPhone ? 12 : isSmallPhone ? 13 : isMediumPhone ? 14 : isTablet ? 15 : 16,
    fontFamily: 'Inter-SemiBold',
    color: colors.planeswalkerGold,
    textAlign: 'right',
    lineHeight: isVerySmallPhone ? 14 : isSmallPhone ? 15 : isMediumPhone ? 16 : isTablet ? 17 : 18,
  },
  
  // Bottom Actions - Fixed height to prevent overlap
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.large,
    paddingVertical: isVerySmallPhone ? 16 : isSmallPhone ? 18 : 20,
    gap: isVerySmallPhone ? 12 : isSmallPhone ? 14 : layout.spacing.small,
    borderTopWidth: 1,
    borderTopColor: 'rgba(200, 170, 110, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.15)',
    marginHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.large,
    marginBottom: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.medium,
    flex: 0, // Don't grow or shrink
    minHeight: isVerySmallPhone ? 72 : isSmallPhone ? 76 : 80,
    maxHeight: isVerySmallPhone ? 88 : isSmallPhone ? 92 : 96,
    alignItems: 'center',
    ...(Platform.OS === 'web' && isDesktop && {
      alignSelf: 'center',
      width: '100%',
      maxWidth: 700,
    }),
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmallPhone ? 14 : isSmallPhone ? 16 : layout.spacing.small,
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 18 : layout.spacing.medium,
    borderRadius: layout.borderRadius.small,
    backgroundColor: 'rgba(211, 32, 42, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(211, 32, 42, 0.2)',
    gap: layout.spacing.xsmall,
    minWidth: isVerySmallPhone ? 100 : isSmallPhone ? 110 : 120,
    minHeight: isVerySmallPhone ? 48 : isSmallPhone ? 52 : 56,
    maxHeight: isVerySmallPhone ? 60 : isSmallPhone ? 64 : 68,
  },
  resetButtonText: {
    ...typography.body.small,
    color: colors.red,
    fontSize: isVerySmallPhone ? 12 : isSmallPhone ? 13 : 14,
    fontWeight: '600',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: isVerySmallPhone ? 14 : isSmallPhone ? 16 : layout.spacing.small,
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 18 : layout.spacing.medium,
    borderRadius: layout.borderRadius.small,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    gap: layout.spacing.xsmall,
    flex: 1,
    minWidth: isVerySmallPhone ? 120 : isSmallPhone ? 140 : 160,
    minHeight: isVerySmallPhone ? 48 : isSmallPhone ? 52 : 56,
    maxHeight: isVerySmallPhone ? 60 : isSmallPhone ? 64 : 68,
  },
  startButtonText: {
    ...typography.body.small,
    color: colors.lightGray,
    fontFamily: 'Inter-SemiBold',
    fontSize: isVerySmallPhone ? 12 : isSmallPhone ? 13 : 14,
    fontWeight: '600',
  },
});