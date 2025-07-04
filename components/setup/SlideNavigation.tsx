import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (slideIndex: number) => void;
  isAnimating: boolean;
}

export function SlideNavigation({ currentSlide, totalSlides, onNavigate, isAnimating }: SlideNavigationProps) {
  const canGoBack = currentSlide > 0;
  const canGoForward = currentSlide < totalSlides - 1;

  return (
    <View style={setupStyles.slideNavigation}>
      <TouchableOpacity
        style={[setupStyles.slideNavButton, !canGoBack && setupStyles.slideNavButtonDisabled]}
        onPress={() => canGoBack && onNavigate(currentSlide - 1)}
        disabled={!canGoBack || isAnimating}
        activeOpacity={0.7}
      >
        <ChevronLeft color={canGoBack ? colors.gold : colors.gray} size={20} />
      </TouchableOpacity>

      <View style={setupStyles.slideIndicators}>
        {Array.from({ length: totalSlides }, (_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              setupStyles.slideIndicator,
              index === currentSlide && setupStyles.slideIndicatorActive
            ]}
            onPress={() => !isAnimating && onNavigate(index)}
            activeOpacity={0.7}
            disabled={isAnimating}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[setupStyles.slideNavButton, !canGoForward && setupStyles.slideNavButtonDisabled]}
        onPress={() => canGoForward && onNavigate(currentSlide + 1)}
        disabled={!canGoForward || isAnimating}
        activeOpacity={0.7}
      >
        <ChevronRight color={canGoForward ? colors.gold : colors.gray} size={20} />
      </TouchableOpacity>
    </View>
  );
}