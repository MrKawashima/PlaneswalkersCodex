import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions, Platform } from 'react-native';
import { Users, Crown } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';
import { SlideNavigation } from './SlideNavigation';
import { PlayerCountSlide } from './slides/PlayerCountSlide';
import { TableLayoutSlide } from './slides/TableLayoutSlide';

const { width } = Dimensions.get('window');

export interface PlayerLayoutSettings {
  playerCount: number;
  selectedLayout: string | null;
}

interface PlayerLayoutSectionProps {
  settings: PlayerLayoutSettings;
  onSettingsChange: (settings: Partial<PlayerLayoutSettings>) => void;
}

export function PlayerLayoutSection({ settings, onSettingsChange }: PlayerLayoutSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideHeights, setSlideHeights] = useState<number[]>([]);
  const [isLayoutComplete, setIsLayoutComplete] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const heightAnimation = useRef(new Animated.Value(200)).current;

  // Calculate responsive slide width
  const getSlideWidth = () => {
    if (Platform.OS === 'web') {
      const isDesktop = width >= 1024;
      const isTablet = width >= 768;
      
      if (isDesktop) {
        const containerPadding = 48;
        const maxWidth = 700;
        return Math.min(width - containerPadding, maxWidth);
      } else if (isTablet) {
        return width - 80;
      }
    }
    return width - 88;
  };

  const navigateToSlide = (slideIndex: number) => {
    if (isAnimating || slideIndex === currentSlide || !isLayoutComplete) return;
    
    setIsAnimating(true);
    const slideWidth = getSlideWidth();
    const targetHeight = slideHeights[slideIndex] || 200;
    
    const finalHeight = Platform.OS === 'web' && width >= 1024 
      ? Math.max(targetHeight + 40, 250) 
      : Math.max(targetHeight + 20, 200);
    
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
      const minHeight = Platform.OS === 'web' && width >= 1024 ? 250 : 200;
      const paddedHeight = Platform.OS === 'web' && width >= 1024 ? height + 40 : height + 20;
      newHeights[slideIndex] = Math.max(paddedHeight, minHeight);
      
      if (newHeights.length >= 2 && newHeights.every(h => h > 0)) {
        setIsLayoutComplete(true);
      }
      
      return newHeights;
    });
  };

  const handlePlayerCountChange = (count: number) => {
    onSettingsChange({ playerCount: count, selectedLayout: null });
    
    // Auto-advance to layout selection after choosing player count
    setTimeout(() => {
      if (isLayoutComplete) {
        navigateToSlide(1);
      }
    }, 600);
  };

  const handleLayoutChange = (layoutId: string) => {
    onSettingsChange({ selectedLayout: layoutId });
  };

  useEffect(() => {
    if (!isLayoutComplete) return;
    
    const slideWidth = getSlideWidth();
    const targetHeight = slideHeights[currentSlide] || 200;
    const finalHeight = Platform.OS === 'web' && width >= 1024 
      ? Math.max(targetHeight + 40, 250) 
      : Math.max(targetHeight + 20, 200);
    
    slideAnimation.setValue(-currentSlide * slideWidth);
    heightAnimation.setValue(finalHeight);
  }, [settings.playerCount, slideHeights, currentSlide, width, isLayoutComplete]);

  const slides = [
    {
      id: 'player-count',
      title: 'Planeswalker Assembly',
      subtitle: 'Choose how many planeswalkers will join the battle',
    },
    {
      id: 'table-layout',
      title: 'Battlefield Formation',
      subtitle: `Choose seating arrangement for ${settings.playerCount} planeswalkers`,
    }
  ];

  const currentSlideData = slides[currentSlide] || slides[0];
  const slideWidth = getSlideWidth();

  return (
    <View style={setupStyles.sectionCard}>
      <View style={setupStyles.sectionHeader}>
        <Crown color={colors.mana.blue} size={24} />
        <Text style={setupStyles.sectionTitle}>{currentSlideData.title}</Text>
      </View>
      <Text style={setupStyles.sectionSubtitle}>{currentSlideData.subtitle}</Text>
      
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNavigate={navigateToSlide}
        isAnimating={isAnimating}
      />

      <Animated.View 
        style={[
          setupStyles.slideContainer,
          {
            height: heightAnimation,
            overflow: 'hidden',
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
          <View 
            style={[
              setupStyles.slide, 
              { 
                width: slideWidth,
                minHeight: Platform.OS === 'web' && width >= 1024 ? 250 : 200,
              }
            ]}
          >
            <PlayerCountSlide
              playerCount={settings.playerCount}
              onPlayerCountChange={handlePlayerCountChange}
              onLayout={(height) => handleSlideLayout(0, height)}
            />
          </View>

          <View 
            style={[
              setupStyles.slide, 
              { 
                width: slideWidth,
                minHeight: Platform.OS === 'web' && width >= 1024 ? 250 : 200,
              }
            ]}
          >
            <TableLayoutSlide
              playerCount={settings.playerCount}
              selectedLayout={settings.selectedLayout}
              onLayoutChange={handleLayoutChange}
              onLayout={(height) => handleSlideLayout(1, height)}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}