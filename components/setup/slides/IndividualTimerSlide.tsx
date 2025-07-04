import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { setupStyles } from '@/styles/setupStyles';

interface IndividualTimerSlideProps {
  individualTimerDuration: number;
  onIndividualTimerDurationChange: (duration: number) => void;
  onLayout?: (height: number) => void;
}

export function IndividualTimerSlide({ 
  individualTimerDuration, 
  onIndividualTimerDurationChange,
  onLayout
}: IndividualTimerSlideProps) {
  const durationOptions = [
    { duration: 30, title: '30s', subtitle: 'Lightning pace' },
    { duration: 60, title: '1 min', subtitle: 'Swift turns' },
    { duration: 180, title: '3 min', subtitle: 'Standard tempo' },
    { duration: 300, title: '5 min', subtitle: 'Contemplative' },
  ];

  return (
    <View 
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout?.(height);
      }}
    >
      <View style={setupStyles.lifeOptions}>
        {durationOptions.slice(0, 2).map((option) => (
          <TouchableOpacity
            key={option.duration}
            style={[
              setupStyles.individualTimerOption,
              individualTimerDuration === option.duration && setupStyles.selectedIndividualTimerOption
            ]}
            onPress={() => onIndividualTimerDurationChange(option.duration)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.individualTimerTitle,
              individualTimerDuration === option.duration && setupStyles.selectedIndividualTimerTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.individualTimerSubtitle,
              individualTimerDuration === option.duration && setupStyles.selectedIndividualTimerSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={setupStyles.lifeOptions}>
        {durationOptions.slice(2, 4).map((option) => (
          <TouchableOpacity
            key={option.duration}
            style={[
              setupStyles.individualTimerOption,
              individualTimerDuration === option.duration && setupStyles.selectedIndividualTimerOption
            ]}
            onPress={() => onIndividualTimerDurationChange(option.duration)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.individualTimerTitle,
              individualTimerDuration === option.duration && setupStyles.selectedIndividualTimerTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.individualTimerSubtitle,
              individualTimerDuration === option.duration && setupStyles.selectedIndividualTimerSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}