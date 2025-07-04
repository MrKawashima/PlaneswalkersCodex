import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions, Platform } from 'react-native';
import { Clock, Hourglass } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';
import { SlideNavigation } from './SlideNavigation';
import { TimerTypeSlide } from './slides/TimerTypeSlide';
import { GlobalTimerSlide } from './slides/GlobalTimerSlide';
import { IndividualTimerSlide } from './slides/IndividualTimerSlide';
import { IncrementSlide } from './slides/IncrementSlide';

const { width } = Dimensions.get('window');

export interface TimerSettings {
  timerType: 'none' | 'global' | 'individual';
  globalTimerDuration: number;
  customGlobalTime: string;
  individualTimerDuration: number;
  timeIncrement: 'fixed' | 'exponential';
  incrementAmount: number;
  customIncrementAmount: string;
  decayFactor: number;
}

interface TimerSectionProps {
  settings: TimerSettings;
  onSettingsChange: (settings: Partial<TimerSettings>) => void;
}

export function TimerSection({ settings, onSettingsChange }: TimerSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideHeights, setSlideHeights] = useState<number[]>([]);
  const [isLayoutComplete, setIsLayoutComplete] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const heightAnimation = useRef(new Animated.Value(150)).current;

  // Calculate responsive slide width
  const getSlideWidth = () => {
    if (Platform.OS === 'web') {
      const isDesktop = width >= 1024;
      const isTablet = width >= 768;
      
      if (isDesktop) {
        // On desktop, use full available width within the section card
        const containerPadding = 48; // Total horizontal padding
        const maxWidth = 700; // Maximum container width
        return Math.min(width - containerPadding, maxWidth);
      } else if (isTablet) {
        return width - 80;
      }
    }
    // On mobile, use the original calculation
    return width - 88;
  };

  const navigateToSlide = (slideIndex: number) => {
    if (isAnimating || slideIndex === currentSlide || !isLayoutComplete) return;
    
    setIsAnimating(true);
    const slideWidth = getSlideWidth();
    const targetHeight = slideHeights[slideIndex] || 150;
    
    // Add extra padding for desktop to ensure content fits
    const finalHeight = Platform.OS === 'web' && width >= 1024 
      ? Math.max(targetHeight + 40, 200) 
      : Math.max(targetHeight + 20, 150);
    
    // Animate both position and height simultaneously
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: -slideIndex * slideWidth,
        duration: 350,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(heightAnimation, {
        toValue: finalHeight,
        duration: 350,
        useNativeDriver: false, // Changed to false for web compatibility
      })
    ]).start(() => {
      setCurrentSlide(slideIndex);
      setIsAnimating(false);
    });
  };

  const handleSlideLayout = (slideIndex: number, height: number) => {
    setSlideHeights(prev => {
      const newHeights = [...prev];
      // Add extra padding for desktop layouts
      const minHeight = Platform.OS === 'web' && width >= 1024 ? 200 : 150;
      const paddedHeight = Platform.OS === 'web' && width >= 1024 ? height + 40 : height + 20;
      newHeights[slideIndex] = Math.max(paddedHeight, minHeight);
      
      // Mark layout as complete when we have heights for all slides
      const slides = getSlides();
      if (newHeights.length >= slides.length && newHeights.every(h => h > 0)) {
        setIsLayoutComplete(true);
      }
      
      return newHeights;
    });
  };

  const handleTimerTypeChange = (newTimerType: 'none' | 'global' | 'individual') => {
    onSettingsChange({ timerType: newTimerType });
    
    // Reset to first slide when timer type changes
    slideAnimation.setValue(0);
    setCurrentSlide(0);
    setIsLayoutComplete(false);
    
    if (newTimerType !== 'none') {
      // Wait for layout to complete before auto-advancing
      setTimeout(() => {
        if (isLayoutComplete) {
          navigateToSlide(1);
        }
      }, 800);
    }
  };

  const handleIndividualTimerDurationChange = (duration: number) => {
    onSettingsChange({ individualTimerDuration: duration });
    
    // Auto-advance to increment slide after selecting duration
    setTimeout(() => {
      if (isLayoutComplete) {
        navigateToSlide(2);
      }
    }, 700);
  };

  useEffect(() => {
    if (!isLayoutComplete) return;
    
    const slideWidth = getSlideWidth();
    const targetHeight = slideHeights[currentSlide] || 150;
    const finalHeight = Platform.OS === 'web' && width >= 1024 
      ? Math.max(targetHeight + 40, 200) 
      : Math.max(targetHeight + 20, 150);
    
    // Update position and height when slides change
    slideAnimation.setValue(-currentSlide * slideWidth);
    heightAnimation.setValue(finalHeight);
  }, [settings.timerType, slideHeights, currentSlide, width, isLayoutComplete]);

  const getSlides = () => {
    const slides = [
      {
        id: 'type',
        title: 'Temporal Magic',
        subtitle: 'Choose how you want to manage battlefield timing',
        component: (
          <TimerTypeSlide
            timerType={settings.timerType}
            onTimerTypeChange={handleTimerTypeChange}
            onLayout={(height) => handleSlideLayout(0, height)}
          />
        )
      }
    ];

    if (settings.timerType === 'global') {
      slides.push({
        id: 'global-settings',
        title: 'Planar Time Rift',
        subtitle: 'Set the total battle duration',
        component: (
          <GlobalTimerSlide
            globalTimerDuration={settings.globalTimerDuration}
            customGlobalTime={settings.customGlobalTime}
            onGlobalTimerDurationChange={(duration) => onSettingsChange({ globalTimerDuration: duration })}
            onCustomGlobalTimeChange={(time) => onSettingsChange({ customGlobalTime: time })}
            onLayout={(height) => handleSlideLayout(1, height)}
          />
        )
      });
    }

    if (settings.timerType === 'individual') {
      slides.push(
        {
          id: 'individual-duration',
          title: 'Turn Chronometer',
          subtitle: 'Set the base time limit for each planeswalker turn',
          component: (
            <IndividualTimerSlide
              individualTimerDuration={settings.individualTimerDuration}
              onIndividualTimerDurationChange={handleIndividualTimerDurationChange}
              onLayout={(height) => handleSlideLayout(1, height)}
            />
          )
        },
        {
          id: 'individual-increment',
          title: 'Temporal Acceleration',
          subtitle: 'Add bonus time after each turn',
          component: (
            <IncrementSlide
              timeIncrement={settings.timeIncrement}
              incrementAmount={settings.incrementAmount}
              customIncrementAmount={settings.customIncrementAmount}
              decayFactor={settings.decayFactor}
              onTimeIncrementChange={(increment) => onSettingsChange({ timeIncrement: increment })}
              onIncrementAmountChange={(amount) => onSettingsChange({ incrementAmount: amount })}
              onCustomIncrementAmountChange={(amount) => onSettingsChange({ customIncrementAmount: amount })}
              onDecayFactorChange={(factor) => onSettingsChange({ decayFactor: factor })}
              onLayout={(height) => handleSlideLayout(2, height)}
            />
          )
        }
      );
    }

    return slides;
  };

  const slides = getSlides();
  const currentSlideData = slides[currentSlide] || slides[0];
  const slideWidth = getSlideWidth();

  return (
    <View style={setupStyles.sectionCard}>
      <View style={setupStyles.sectionHeader}>
        <Hourglass color={colors.mana.colorless} size={24} />
        <Text style={setupStyles.sectionTitle}>{currentSlideData?.title}</Text>
      </View>
      <Text style={setupStyles.sectionSubtitle}>{currentSlideData?.subtitle}</Text>
      
      {slides.length > 1 && (
        <SlideNavigation
          currentSlide={currentSlide}
          totalSlides={slides.length}
          onNavigate={navigateToSlide}
          isAnimating={isAnimating}
        />
      )}

      <Animated.View 
        style={[
          setupStyles.slideContainer,
          {
            height: heightAnimation,
            overflow: 'hidden', // Always keep overflow hidden for proper sliding
          }
        ]}
      >
        <Animated.View 
          style={[
            setupStyles.slideContent,
            {
              transform: [{ translateX: slideAnimation }],
              width: slides.length * slideWidth,
            }
          ]}
        >
          {slides.map((slide, index) => (
            <View 
              key={slide.id} 
              style={[
                setupStyles.slide, 
                { 
                  width: slideWidth,
                  minHeight: Platform.OS === 'web' && width >= 1024 ? 200 : 150,
                }
              ]}
            >
              {slide.component}
            </View>
          ))}
        </Animated.View>
      </Animated.View>
    </View>
  );
}