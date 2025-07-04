export const typography = {
  heading: {
    large: {
      fontSize: 32,
      fontFamily: 'Inter-Bold',
      lineHeight: 40,
    },
    medium: {
      fontSize: 24,
      fontFamily: 'Inter-SemiBold',
      lineHeight: 32,
    },
    small: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      lineHeight: 28,
    },
  },
  body: {
    large: {
      fontSize: 18,
      fontFamily: 'Inter-Regular',
      lineHeight: 26,
    },
    medium: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      lineHeight: 24,
    },
    small: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      lineHeight: 20,
    },
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
  },
} as const;