import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Heart, Zap } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface StartingLifeSectionProps {
  startingLife: number;
  onStartingLifeChange: (life: number) => void;
}

export function StartingLifeSection({ startingLife, onStartingLifeChange }: StartingLifeSectionProps) {
  const lifeOptions = [
    { life: 20, title: '20 Life Force', subtitle: 'Standard planeswalker vitality' },
    { life: 40, title: '40 Life Force', subtitle: 'Commander/EDH planeswalker power' },
  ];

  return (
    <View style={setupStyles.sectionCard}>
      <View style={setupStyles.sectionHeader}>
        <Zap color={colors.mana.red} size={24} />
        <Text style={setupStyles.sectionTitle}>Planeswalker Vitality</Text>
      </View>
      <Text style={setupStyles.sectionSubtitle}>Choose the starting life force for all planeswalkers</Text>
      
      <View style={setupStyles.lifeOptions}>
        {lifeOptions.map((option) => (
          <TouchableOpacity
            key={option.life}
            style={[
              setupStyles.lifeOption,
              startingLife === option.life && setupStyles.selectedLifeOption
            ]}
            onPress={() => onStartingLifeChange(option.life)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.lifeOptionTitle,
              startingLife === option.life && setupStyles.selectedLifeOptionTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.lifeOptionSubtitle,
              startingLife === option.life && setupStyles.selectedLifeOptionSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}