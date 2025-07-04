import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Users } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface PlayerCountSectionProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
}

export function PlayerCountSection({ playerCount, onPlayerCountChange }: PlayerCountSectionProps) {
  const playerOptions = [
    { count: 2, title: '2 Players', subtitle: 'Head-to-head duel' },
    { count: 3, title: '3 Players', subtitle: 'Triangle multiplayer' },
    { count: 4, title: '4 Players', subtitle: 'Four-way commander' },
    { count: 5, title: '5 Players', subtitle: 'Five-way chaos' },
    { count: 6, title: '6 Players', subtitle: 'Maximum mayhem' },
  ];

  return (
    <View style={setupStyles.sectionCard}>
      <View style={setupStyles.sectionHeader}>
        <Users color={colors.blue} size={24} />
        <Text style={setupStyles.sectionTitle}>Number of Players</Text>
      </View>
      <Text style={setupStyles.sectionSubtitle}>Choose how many players will be playing</Text>
      
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
        {playerOptions.slice(2, 4).map((option) => (
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
        {playerOptions.slice(4, 5).map((option) => (
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