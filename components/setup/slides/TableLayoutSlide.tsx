import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';
import { TableLayoutPreview } from '../TableLayoutPreview';

interface TableLayoutSlideProps {
  playerCount: number;
  selectedLayout: string | null;
  onLayoutChange: (layoutId: string) => void;
  onLayout?: (height: number) => void;
}

export function TableLayoutSlide({ 
  playerCount, 
  selectedLayout, 
  onLayoutChange, 
  onLayout 
}: TableLayoutSlideProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const getLayoutOptions = (count: number) => {
    switch (count) {
      case 2:
        return [
          { id: '2-opposite-long', name: 'Opposing Forces', description: 'Face each other across the battlefield' },
          { id: '2-opposite-short', name: 'Distant Rivals', description: 'Command from opposite ends' },
        ];
      case 3:
        return [
          { id: '3-balanced', name: 'Balanced Trinity', description: 'Strategic triangle formation' },
          { id: '3-close', name: 'Allied Formation', description: 'Two allies, one rival' },
        ];
      case 4:
        return [
          { id: '4-square', name: 'Planar Square', description: 'One commander per realm' },
          { id: '4-long-sides', name: 'Parallel Forces', description: 'Two armies on each flank' },
        ];
      default:
        return [];
    }
  };

  const handleLayoutPress = (layoutId: string) => {
    // Animate selection with web-compatible animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false, // Changed to false for web compatibility
      }),
    ]).start();

    onLayoutChange(layoutId);
  };

  const layoutOptions = getLayoutOptions(playerCount);

  return (
    <View 
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout?.(height);
      }}
    >
      <View style={setupStyles.tableLayoutGrid}>
        {layoutOptions.map((layout) => (
          <Animated.View
            key={layout.id}
            style={[
              setupStyles.tableLayoutOption,
              selectedLayout === layout.id && setupStyles.selectedTableLayoutOption,
              { transform: [{ scale: selectedLayout === layout.id ? scaleAnim : 1 }] }
            ]}
          >
            <TouchableOpacity
              onPress={() => handleLayoutPress(layout.id)}
              activeOpacity={0.8}
              style={setupStyles.tableLayoutButton}
            >
              <View style={setupStyles.tableLayoutPreviewContainer}>
                <TableLayoutPreview 
                  layoutId={layout.id} 
                  playerCount={playerCount}
                  isSelected={selectedLayout === layout.id}
                />
              </View>
              
              <View style={setupStyles.tableLayoutInfo}>
                <Text style={[
                  setupStyles.tableLayoutName,
                  selectedLayout === layout.id && setupStyles.selectedTableLayoutName
                ]}>
                  {layout.name}
                </Text>
                <Text style={[
                  setupStyles.tableLayoutDescription,
                  selectedLayout === layout.id && setupStyles.selectedTableLayoutDescription
                ]}>
                  {layout.description}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}