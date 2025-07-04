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

export const landingStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : isMediumPhone ? 24 : layout.padding.large,
    paddingVertical: isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24,
    justifyContent: 'space-between',
    minHeight: height,
    ...(Platform.OS === 'web' && {
      maxWidth: isDesktop ? 1200 : '100%',
      alignSelf: 'center',
      width: '100%',
    }),
  },
  
  // Header Section - Fixed height to prevent overlap
  header: {
    alignItems: 'center',
    paddingTop: isVerySmallPhone ? 40 : isSmallPhone ? 50 : isMediumPhone ? 60 : isShortScreen ? 50 : 80,
    paddingBottom: isVerySmallPhone ? 20 : isSmallPhone ? 24 : 28,
    paddingHorizontal: isVerySmallPhone ? 12 : 16,
    flex: 0, // Don't grow or shrink
    minHeight: isVerySmallPhone ? 120 : isSmallPhone ? 140 : isMediumPhone ? 160 : isShortScreen ? 140 : 180,
    maxHeight: isVerySmallPhone ? 140 : isSmallPhone ? 160 : isMediumPhone ? 180 : isShortScreen ? 160 : 220,
    zIndex: 10,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20,
    justifyContent: 'center',
    paddingHorizontal: isVerySmallPhone ? 8 : 12,
    flexWrap: 'nowrap',
    maxWidth: '100%',
  },
  title: {
    ...typography.heading.large,
    fontSize: isVerySmallPhone ? 18 : isSmallPhone ? 22 : isMediumPhone ? 26 : isTablet ? 30 : 34,
    color: colors.planeswalkerGold,
    marginHorizontal: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: isVerySmallPhone ? 22 : isSmallPhone ? 26 : isMediumPhone ? 30 : isTablet ? 34 : 38,
    fontWeight: '700',
    flexShrink: 1,
    ...(Platform.OS === 'web' && {
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
    }),
  },
  subtitle: {
    ...typography.body.large,
    fontSize: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : isTablet ? 18 : 20,
    color: colors.lightGray,
    textAlign: 'center',
    opacity: 0.9,
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24,
    lineHeight: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 22 : 24,
    maxWidth: '100%',
  },
  
  // Card Container - Flexible middle section
  cardContainer: {
    flex: 1,
    paddingHorizontal: isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20,
    justifyContent: 'center',
    maxWidth: isDesktop ? 900 : '100%',
    alignSelf: 'center',
    width: '100%',
    paddingVertical: isVerySmallPhone ? 20 : isSmallPhone ? 24 : 28,
    minHeight: isVerySmallPhone ? 280 : isSmallPhone ? 320 : 360,
  },
  modeCard: {
    backgroundColor: '#1a1625',
    borderRadius: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : 24,
    padding: isVerySmallPhone ? 16 : isSmallPhone ? 18 : isMediumPhone ? 20 : isTablet ? 24 : 28,
    marginBottom: isVerySmallPhone ? 12 : isSmallPhone ? 14 : isMediumPhone ? 16 : 20,
    flexDirection: isTablet || isDesktop ? 'row' : 'column',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#2d1b69',
    minHeight: isVerySmallPhone ? 120 : isSmallPhone ? 140 : isMediumPhone ? 160 : isTablet ? 100 : 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    ...(Platform.OS === 'web' && {
      boxShadow: '0px 8px 12px rgba(0,0,0,0.3)',
    }),
  },
  disabledCard: {
    backgroundColor: '#1a1a1a',
    borderColor: '#333333',
    opacity: 0.7,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    right: isVerySmallPhone ? 8 : isSmallPhone ? 10 : 12,
    backgroundColor: colors.red,
    paddingHorizontal: isVerySmallPhone ? 6 : isSmallPhone ? 8 : 10,
    paddingVertical: isVerySmallPhone ? 3 : isSmallPhone ? 4 : 5,
    borderRadius: 6,
    zIndex: 1,
    maxWidth: isVerySmallPhone ? 120 : 140,
  },
  comingSoonText: {
    fontSize: isVerySmallPhone ? 8 : isSmallPhone ? 9 : 10,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 10 : isSmallPhone ? 11 : 12,
  },
  modeIcon: {
    marginBottom: isTablet || isDesktop ? 0 : (isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16),
    marginRight: isTablet || isDesktop ? 20 : 0,
    alignSelf: 'flex-start',
    marginLeft: isVerySmallPhone ? 4 : 0,
  },
  modeInfo: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    width: '100%',
    paddingRight: isVerySmallPhone ? 8 : isSmallPhone ? 12 : 16,
  },
  modeName: {
    fontSize: isVerySmallPhone ? 14 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: isVerySmallPhone ? 6 : isSmallPhone ? 8 : isMediumPhone ? 10 : 12,
    textAlign: 'left',
    lineHeight: isVerySmallPhone ? 18 : isSmallPhone ? 20 : isMediumPhone ? 22 : isTablet ? 24 : 26,
    width: '100%',
  },
  modeDescription: {
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 13 : isTablet ? 14 : 15,
    fontFamily: 'Inter-Regular',
    color: '#9ca3af',
    marginBottom: isVerySmallPhone ? 8 : isSmallPhone ? 10 : isMediumPhone ? 12 : 14,
    lineHeight: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 17 : isTablet ? 18 : 19,
    textAlign: 'left',
    width: '100%',
  },
  modeRules: {
    fontSize: isVerySmallPhone ? 9 : isSmallPhone ? 10 : isMediumPhone ? 11 : isTablet ? 12 : 13,
    fontFamily: 'Inter-Regular',
    color: '#6b7280',
    lineHeight: isVerySmallPhone ? 13 : isSmallPhone ? 14 : isMediumPhone ? 15 : isTablet ? 16 : 17,
    textAlign: 'left',
    width: '100%',
  },
  disabledText: {
    color: colors.gray,
  },
  
  // Footer Section - Fixed height to prevent overlap
  footer: {
    alignItems: 'center',
    paddingHorizontal: isVerySmallPhone ? 20 : isSmallPhone ? 24 : 28,
    paddingVertical: isVerySmallPhone ? 12 : isSmallPhone ? 16 : 20,
    flex: 0, // Don't grow or shrink
    minHeight: isVerySmallPhone ? 60 : isSmallPhone ? 70 : 80,
    maxHeight: isVerySmallPhone ? 80 : isSmallPhone ? 90 : 100,
    justifyContent: 'center',
  },
  footerText: {
    ...typography.body.medium,
    fontSize: isVerySmallPhone ? 11 : isSmallPhone ? 12 : isMediumPhone ? 14 : isTablet ? 16 : 18,
    color: colors.planeswalkerGold,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
    lineHeight: isVerySmallPhone ? 15 : isSmallPhone ? 16 : isMediumPhone ? 18 : isTablet ? 20 : 22,
    maxWidth: '100%',
  },
  
  // Bottom Menu - Fixed height to prevent overlap
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : layout.padding.small,
    paddingVertical: isVerySmallPhone ? 12 : isSmallPhone ? 14 : 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: layout.borderRadius.medium,
    borderWidth: 1,
    borderColor: 'rgba(200, 170, 110, 0.15)',
    gap: isVerySmallPhone ? 8 : isSmallPhone ? 10 : layout.spacing.small,
    alignItems: 'center',
    marginHorizontal: isVerySmallPhone ? 16 : isSmallPhone ? 20 : 24,
    flex: 0, // Don't grow or shrink
    minHeight: isVerySmallPhone ? 64 : isSmallPhone ? 68 : 72,
    maxHeight: isVerySmallPhone ? 80 : isSmallPhone ? 84 : 88,
    flexWrap: 'nowrap',
    ...(Platform.OS === 'web' && isDesktop && {
      maxWidth: 600,
      alignSelf: 'center',
    }),
  },
  menuButton: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: isVerySmallPhone ? 8 : isSmallPhone ? 10 : layout.spacing.small,
    paddingHorizontal: isVerySmallPhone ? 8 : isSmallPhone ? 10 : layout.spacing.medium,
    borderRadius: layout.borderRadius.small,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    gap: isVerySmallPhone ? 3 : isSmallPhone ? 4 : layout.spacing.xsmall,
    minWidth: isVerySmallPhone ? 60 : isSmallPhone ? 70 : 80,
    justifyContent: 'center',
    flex: 1,
    maxWidth: isVerySmallPhone ? 90 : isSmallPhone ? 110 : 130,
    minHeight: isVerySmallPhone ? 48 : isSmallPhone ? 52 : 56,
    maxHeight: isVerySmallPhone ? 60 : isSmallPhone ? 64 : 68,
  },
  resetButton: {
    backgroundColor: 'rgba(211, 32, 42, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(211, 32, 42, 0.2)',
  },
  menuButtonText: {
    ...typography.body.small,
    color: colors.lightGray,
    fontSize: isVerySmallPhone ? 9 : isSmallPhone ? 10 : 12,
    textAlign: 'center',
    lineHeight: isVerySmallPhone ? 11 : isSmallPhone ? 12 : 14,
    fontWeight: '500',
  },
  resetButtonText: {
    color: colors.red,
  },
});