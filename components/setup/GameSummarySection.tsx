import React from 'react';
import { View, Text } from 'react-native';
import { Scroll, Crown } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';
import { TimerSettings } from './TimerSection';

interface GameSummarySectionProps {
  playerCount: number;
  startingLife: number;
  timerSettings: TimerSettings;
}

export function GameSummarySection({ playerCount, startingLife, timerSettings }: GameSummarySectionProps) {
  const getGlobalTimerSummary = () => {
    if (timerSettings.globalTimerDuration === 0) {
      return `${timerSettings.customGlobalTime || '30'}min planar rift`;
    }
    return `${timerSettings.globalTimerDuration}min planar rift`;
  };

  const getIndividualTimerSummary = () => {
    return `${timerSettings.individualTimerDuration}s per turn`;
  };

  const getIncrementSummary = () => {
    return `Exponential acceleration (${timerSettings.decayFactor})`;
  };

  return (
    <View style={setupStyles.summaryCard}>
      <View style={setupStyles.sectionHeader}>
        <Scroll color={colors.planeswalkerGold} size={24} />
        <Text style={setupStyles.sectionTitle}>Battle Codex</Text>
      </View>
      
      <View style={setupStyles.summaryContent}>
        <View style={setupStyles.summaryRow}>
          <Text style={setupStyles.summaryLabel}>Planeswalkers:</Text>
          <Text style={setupStyles.summaryValue}>{playerCount}</Text>
        </View>
        
        <View style={setupStyles.summaryRow}>
          <Text style={setupStyles.summaryLabel}>Life Force:</Text>
          <Text style={setupStyles.summaryValue}>{startingLife}</Text>
        </View>
        
        <View style={setupStyles.summaryRow}>
          <Text style={setupStyles.summaryLabel}>Temporal Magic:</Text>
          <Text style={setupStyles.summaryValue}>
            {timerSettings.timerType === 'none' && 'Timeless'}
            {timerSettings.timerType === 'global' && getGlobalTimerSummary()}
            {timerSettings.timerType === 'individual' && getIndividualTimerSummary()}
          </Text>
        </View>

        {timerSettings.timerType === 'individual' && (
          <View style={setupStyles.summaryRow}>
            <Text style={setupStyles.summaryLabel}>Acceleration:</Text>
            <Text style={setupStyles.summaryValue}>
              {getIncrementSummary()}
            </Text>
          </View>
        )}
        
        <View style={setupStyles.summaryRow}>
          <Text style={setupStyles.summaryLabel}>Configuration:</Text>
          <Text style={setupStyles.summaryValue}>Tabletop Conclave</Text>
        </View>
      </View>
    </View>
  );
}