import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { TriangleAlert as AlertTriangle, RotateCcw, X } from 'lucide-react-native';
import { router } from 'expo-router';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { layout } from '@/styles/layout';

interface ResetConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetConfirmModal({ visible, onClose, onConfirm }: ResetConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
    
    // Navigate back to start screen after purging
    setTimeout(() => {
      if (router.canGoBack()) {
        router.replace('/');
      } else {
        router.push('/');
      }
    }, 500);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <AlertTriangle color={colors.warning} size={28} />
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X color={colors.lightGray} size={18} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Purge All Planeswalker Data</Text>
            <Text style={styles.description}>
              This will permanently erase all saved battles, arcane settings, and planeswalker progress. 
              This action cannot be undone across the multiverse.
            </Text>
            
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ All planeswalker records will be lost forever
              </Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Preserve</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <RotateCcw color={colors.white} size={16} />
              <Text style={styles.confirmButtonText}>Purge Everything</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.padding.large,
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: layout.borderRadius.large,
    width: '100%',
    maxWidth: 380,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: layout.padding.large,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: layout.padding.large,
  },
  title: {
    ...typography.heading.medium,
    color: colors.white,
    textAlign: 'center',
    marginBottom: layout.spacing.medium,
  },
  description: {
    ...typography.body.medium,
    color: colors.lightGray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: layout.spacing.large,
  },
  warningBox: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
    borderRadius: layout.borderRadius.medium,
    padding: layout.padding.medium,
  },
  warningText: {
    ...typography.body.small,
    color: colors.warning,
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  actions: {
    flexDirection: 'row',
    padding: layout.padding.large,
    gap: layout.spacing.medium,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: layout.padding.medium + 2,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  cancelButtonText: {
    ...typography.button,
    color: colors.lightGray,
    fontFamily: 'Inter-SemiBold',
  },
  confirmButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: layout.padding.medium + 2,
    borderRadius: layout.borderRadius.medium,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    gap: layout.spacing.small,
    minHeight: 48,
  },
  confirmButtonText: {
    ...typography.button,
    color: colors.white,
    fontFamily: 'Inter-SemiBold',
  },
});