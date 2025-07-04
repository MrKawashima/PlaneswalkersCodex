import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Trophy, RotateCcw, ArrowLeft, X } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { gameStyles } from '@/styles/gameStyles';

interface Player {
  id: string;
  name: string;
  life: number;
  color: string;
  isActive: boolean;
}

interface VictoryModalProps {
  visible: boolean;
  winners: Player[];
  onClose: () => void;
  onNewGame: () => void;
  onBackToSetup: () => void;
}

export function VictoryModal({ visible, winners, onClose, onNewGame, onBackToSetup }: VictoryModalProps) {
  const isMultipleWinners = winners.length > 1;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={gameStyles.modalOverlay}>
        <View style={gameStyles.modalContainer}>
          {/* Header */}
          <View style={gameStyles.modalHeader}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Trophy color={colors.planeswalkerGold} size={28} />
            </View>
            <TouchableOpacity style={gameStyles.modalCloseButton} onPress={onClose}>
              <X color={colors.lightGray} size={18} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={gameStyles.modalContent}>
            <Text style={gameStyles.victoryIcon}>🏆</Text>
            
            <Text style={gameStyles.modalTitle}>
              {isMultipleWinners ? 'Victory Shared!' : 'Victory Achieved!'}
            </Text>
            
            <View style={gameStyles.winnersList}>
              {winners.map((winner, index) => (
                <View key={winner.id} style={{ alignItems: 'center', marginBottom: 12 }}>
                  <Text style={gameStyles.winnerName}>
                    {winner.name}
                  </Text>
                  <Text style={gameStyles.winnerLife}>
                    {winner.life} Life Remaining
                  </Text>
                </View>
              ))}
            </View>

            <Text style={gameStyles.modalText}>
              {isMultipleWinners 
                ? 'Multiple planeswalkers have emerged victorious from this epic battle!'
                : `${winners[0]?.name} has emerged victorious as the last planeswalker standing!`
              }
            </Text>
          </View>

          {/* Actions */}
          <View style={gameStyles.modalActions}>
            <TouchableOpacity 
              style={[gameStyles.modalButton, gameStyles.modalSecondaryButton]} 
              onPress={onBackToSetup}
            >
              <ArrowLeft color={colors.lightGray} size={16} />
              <Text style={[gameStyles.modalButtonText, gameStyles.modalSecondaryButtonText]}>
                Setup
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[gameStyles.modalButton, gameStyles.modalPrimaryButton]} 
              onPress={onNewGame}
            >
              <RotateCcw color={colors.black} size={16} />
              <Text style={[gameStyles.modalButtonText, gameStyles.modalPrimaryButtonText]}>
                New Battle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}