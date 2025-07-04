import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { setupStyles } from '@/styles/setupStyles';

interface PlayerCountSlideProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  onLayout?: (height: number) => void;
}

export function PlayerCountSlide({ playerCount, onPlayerCountChange, onLayout }: PlayerCountSlideProps) {
  const playerOptions = [
    { count: 2, title: '2 Planeswalkers', subtitle: 'Duel of the fates' },
    { count: 3, title: '3 Planeswalkers', subtitle: 'Triangular alliance' },
    { count: 4, title: '4 Planeswalkers', subtitle: 'Commander conclave' },
  ];

  return (
    <View 
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout?.(height);
      }}
    >
      <View style={setupStyles.lifeOptions}>
        {playerOptions.slice(0, 2).map((option) => (
          <TouchableOpacity
            key={option.count}
            style={[
              setupStyles.lifeOption,
              playerCount === option.count && setupStyles.selectedLifeOption
            ]}
            onPress={() => onPlayerCountChange(option.count)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.lifeOptionTitle,
              playerCount === option.count && setupStyles.selectedLifeOptionTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.lifeOptionSubtitle,
              playerCount === option.count && setupStyles.selectedLifeOptionSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={setupStyles.lifeOptions}>
        {playerOptions.slice(2, 3).map((option) => (
          <TouchableOpacity
            key={option.count}
            style={[
              setupStyles.lifeOption,
              playerCount === option.count && setupStyles.selectedLifeOption
            ]}
            onPress={() => onPlayerCountChange(option.count)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.lifeOptionTitle,
              playerCount === option.count && setupStyles.selectedLifeOptionTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.lifeOptionSubtitle,
              playerCount === option.count && setupStyles.selectedLifeOptionSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={setupStyles.lifeOption} />
      </View>
    </View>
  );
}