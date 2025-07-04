import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CreditCard as Edit3 } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { setupStyles } from '@/styles/setupStyles';

interface IncrementSlideProps {
  timeIncrement: 'fixed' | 'exponential';
  incrementAmount: number;
  customIncrementAmount: string;
  decayFactor: number;
  onTimeIncrementChange: (increment: 'fixed' | 'exponential') => void;
  onIncrementAmountChange: (amount: number) => void;
  onCustomIncrementAmountChange: (amount: string) => void;
  onDecayFactorChange: (factor: number) => void;
  onLayout?: (height: number) => void;
}

export function IncrementSlide({
  timeIncrement,
  incrementAmount,
  customIncrementAmount,
  decayFactor,
  onTimeIncrementChange,
  onIncrementAmountChange,
  onCustomIncrementAmountChange,
  onDecayFactorChange,
  onLayout
}: IncrementSlideProps) {
  // Calculate exponential decay formula example
  const calculateExponentialDecayExample = (factor: number) => {
    const baseTime = 30;
    const maxTime = 1200;
    const range = maxTime - baseTime;
    
    const turns = [];
    for (let turnNumber = 1; turnNumber <= 6; turnNumber++) {
      const timeInSeconds = Math.round(baseTime + (range * (1 - Math.exp(-factor * (turnNumber - 1)))));
      const cappedTime = Math.min(timeInSeconds, maxTime);
      
      turns.push({
        turn: turnNumber,
        time: cappedTime,
        bonus: turnNumber === 1 ? 0 : cappedTime - (turnNumber === 2 ? baseTime : turns[turnNumber - 2].time)
      });
    }
    return turns;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return secs > 0 ? `${mins}m ${secs}s` : `${mins}m`;
    }
    return `${secs}s`;
  };

  const getDecayFactorDescription = (factor: number) => {
    switch (factor) {
      case 0.15: return 'Gradual Acceleration';
      case 0.25: return 'Balanced Acceleration';
      case 0.35: return 'Swift Acceleration';
      case 0.5: return 'Rapid Acceleration';
      default: return 'Custom Acceleration';
    }
  };

  // Auto-select exponential when component mounts
  React.useEffect(() => {
    if (timeIncrement !== 'exponential') {
      onTimeIncrementChange('exponential');
    }
  }, []);

  return (
    <View 
      onLayout={(event) => {
        const { height } = event.nativeEvent.layout;
        onLayout?.(height);
      }}
    >
      <Text style={setupStyles.exponentialDescription}>
        Uses temporal acceleration designed for Commander battles. Time increases gradually to handle growing battlefield complexity.
      </Text>
      
      <View style={setupStyles.incrementAmountSection}>
        <Text style={setupStyles.incrementAmountLabel}>Acceleration Factor</Text>
        <Text style={setupStyles.exponentialDescription}>
          Controls temporal acceleration rate. Formula: 30 + (1170 × (1 - e^(-factor × (turn - 1))))
        </Text>
        
        <View style={setupStyles.incrementAmountOptions}>
          {[0.15, 0.25, 0.35, 0.5].map((factor) => (
            <TouchableOpacity
              key={factor}
              style={[
                setupStyles.incrementAmountOption,
                decayFactor === factor && setupStyles.selectedIncrementAmountOption
              ]}
              onPress={() => onDecayFactorChange(factor)}
              activeOpacity={0.8}
            >
              <Text style={[
                setupStyles.incrementAmountText,
                decayFactor === factor && setupStyles.selectedIncrementAmountText
              ]}>
                {factor}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={setupStyles.exponentialExampleCard}>
          <Text style={setupStyles.exponentialExampleTitle}>
            ⚡ {getDecayFactorDescription(decayFactor)} (Factor: {decayFactor}):
          </Text>
          {(() => {
            const example = calculateExponentialDecayExample(decayFactor);
            return (
              <Text style={setupStyles.exponentialExampleText}>
                {example.map((turn, index) => 
                  `Turn ${turn.turn}: ${formatTime(turn.time)}${turn.bonus > 0 ? ` (+${formatTime(turn.bonus)})` : ' (base)'}`
                ).join('\n')}
              </Text>
            );
          })()}
          <Text style={setupStyles.exponentialNote}>
            🔮 Formula caps at 20 minutes per turn for balance
          </Text>
        </View>
      </View>
    </View>
  );
}