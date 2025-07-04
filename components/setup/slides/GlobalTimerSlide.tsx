import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CreditCard as Edit3 } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface GlobalTimerSlideProps {
  globalTimerDuration: number;
  customGlobalTime: string;
  onGlobalTimerDurationChange: (duration: number) => void;
  onCustomGlobalTimeChange: (time: string) => void;
  onLayout?: (height: number) => void;
}

export function GlobalTimerSlide({ 
  globalTimerDuration, 
  customGlobalTime, 
  onGlobalTimerDurationChange, 
  onCustomGlobalTimeChange,
  onLayout
}: GlobalTimerSlideProps) {
  const timerOptions = [
    { duration: 15, title: '15 min', subtitle: 'Swift conquest' },
    { duration: 30, title: '30 min', subtitle: 'Standard battle' },
    { duration: 60, title: '60 min', subtitle: 'Extended war' },
    { duration: 90, title: '90 min', subtitle: 'Epic campaign' },
  ];

  return (
    <View 
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout?.(height);
      }}
    >
      <View style={setupStyles.lifeOptions}>
        {timerOptions.slice(0, 2).map((option) => (
          <TouchableOpacity
            key={option.duration}
            style={[
              setupStyles.globalTimerOption,
              globalTimerDuration === option.duration && setupStyles.selectedGlobalTimerOption
            ]}
            onPress={() => onGlobalTimerDurationChange(option.duration)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.globalTimerTitle,
              globalTimerDuration === option.duration && setupStyles.selectedGlobalTimerTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.globalTimerSubtitle,
              globalTimerDuration === option.duration && setupStyles.selectedGlobalTimerSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={setupStyles.lifeOptions}>
        {timerOptions.slice(2, 4).map((option) => (
          <TouchableOpacity
            key={option.duration}
            style={[
              setupStyles.globalTimerOption,
              globalTimerDuration === option.duration && setupStyles.selectedGlobalTimerOption
            ]}
            onPress={() => onGlobalTimerDurationChange(option.duration)}
            activeOpacity={0.8}
          >
            <Text style={[
              setupStyles.globalTimerTitle,
              globalTimerDuration === option.duration && setupStyles.selectedGlobalTimerTitle
            ]}>
              {option.title}
            </Text>
            <Text style={[
              setupStyles.globalTimerSubtitle,
              globalTimerDuration === option.duration && setupStyles.selectedGlobalTimerSubtitle
            ]}>
              {option.subtitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={setupStyles.lifeOptions}>
        <TouchableOpacity
          style={[
            setupStyles.globalTimerOption,
            globalTimerDuration === 0 && setupStyles.selectedGlobalTimerOption
          ]}
          onPress={() => onGlobalTimerDurationChange(0)}
          activeOpacity={0.8}
        >
          <Edit3 color={globalTimerDuration === 0 ? colors.white : colors.gray} size={14} />
          <Text style={[
            setupStyles.globalTimerTitle,
            globalTimerDuration === 0 && setupStyles.selectedGlobalTimerTitle
          ]}>
            Custom
          </Text>
          <Text style={[
            setupStyles.globalTimerSubtitle,
            globalTimerDuration === 0 && setupStyles.selectedGlobalTimerSubtitle
          ]}>
            Set own rift
          </Text>
        </TouchableOpacity>

        <View style={setupStyles.globalTimerOption} />
      </View>

      {globalTimerDuration === 0 && (
        <View style={setupStyles.customInputSection}>
          <Text style={setupStyles.customInputLabel}>Custom Rift Duration (minutes)</Text>
          <TextInput
            style={setupStyles.customInput}
            value={customGlobalTime}
            onChangeText={onCustomGlobalTimeChange}
            placeholder="30"
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      )}
    </View>
  );
}