import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { layout } from '@/styles/layout';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Arcane Configuration</Text>
        <Text style={styles.subtitle}>Settings interface manifesting soon...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: layout.padding.large,
  },
  title: {
    ...typography.heading.large,
    color: colors.planeswalkerGold,
    marginBottom: layout.spacing.medium,
  },
  subtitle: {
    ...typography.body.large,
    color: colors.lightGray,
    textAlign: 'center',
  },
});