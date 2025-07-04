import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Clock, Globe, User, Hourglass } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface TimerTypeSlideProps {
  timerType: 'none' | 'global' | 'individual';
  onTimerTypeChange: (type: 'none' | 'global' | 'individual') => void;
  onLayout?: (height: number) => void;
}

export function TimerTypeSlide({ timerType, onTimerTypeChange, onLayout }: TimerTypeSlideProps) {
  const timerOptions = [
    {
      type: 'none' as const,
      icon: Hourglass,
      title: 'Timeless Battle',
      subtitle: 'Fight without temporal constraints'
    },
    {
      type: 'global' as const,
      icon: Globe,
      title: 'Planar Time Rift',
      subtitle: 'Total battle countdown'
    },
    {
      type: 'individual' as const,
      icon: User,
      title: 'Turn Chronometer',
      subtitle: 'Per-planeswalker turn timers'
    }
  ];

  return (
    <View 
      style={setupStyles.timerTypeOptions}
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout?.(height);
      }}
    >
      {timerOptions.map((option) => {
        const IconComponent = option.icon;
        const isSelected = timerType === option.type;
        
        return (
          <TouchableOpacity
            key={option.type}
            style={[
              setupStyles.timerTypeOption,
              isSelected && setupStyles.selectedTimerTypeOption
            ]}
            onPress={() => onTimerTypeChange(option.type)}
            activeOpacity={0.8}
          >
            <View style={setupStyles.timerTypeIcon}>
              <IconComponent color={isSelected ? colors.white : colors.gray} size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[
                setupStyles.timerTypeTitle,
                isSelected && setupStyles.selectedTimerTypeTitle
              ]}>
                {option.title}
              </Text>
              <Text style={[
                setupStyles.timerTypeSubtitle,
                isSelected && setupStyles.selectedTimerTypeSubtitle
              ]}>
                {option.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}