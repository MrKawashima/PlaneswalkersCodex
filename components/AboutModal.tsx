import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { X, Zap, Crown, Heart, Hourglass, Users, Code, Globe, BookOpen, Sparkles } from 'lucide-react-native';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { layout } from '@/styles/layout';

const { height } = Dimensions.get('window');

interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AboutModal({ visible, onClose }: AboutModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Crown color={colors.planeswalkerGold} size={20} />
            <Text style={styles.title}>About Planeswalker's Codex</Text>
            <Zap color={colors.planeswalkerGold} size={20} />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X color={colors.lightGray} size={20} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <View style={styles.descriptionContainer}>
              <BookOpen color={colors.planeswalkerGold} size={24} />
              <Text style={styles.description}>
                Your ultimate companion for Magic: The Gathering battles. Track planeswalker vitality, 
                manage temporal magic, and enhance your tabletop experience with this 
                beautifully crafted multiverse tool.
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Sparkles color={colors.planeswalkerGold} size={20} />
              <Text style={styles.sectionTitle}>Planeswalker Abilities</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Heart color={colors.mana.red} size={18} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Life Force Tracking</Text>
                <Text style={styles.featureDescription}>
                  Monitor vitality for 2-6 planeswalkers
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Hourglass color={colors.mana.blue} size={18} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Temporal Magic</Text>
                <Text style={styles.featureDescription}>
                  Manage turn timers and battle duration (looking at you LK, and other blue players)
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <Users color={colors.mana.green} size={18} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Multiverse Support</Text>
                <Text style={styles.featureDescription}>
                  Optimized for tabletop battles
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Code color={colors.planeswalkerGold} size={20} />
              <Text style={styles.sectionTitle}>Author</Text>
            </View>
            <Text style={styles.authorName}>MrKawashima</Text>
            <View style={styles.webContainer}>
              <Globe color={colors.lightGray} size={16} />
              <Text style={styles.authorWeb}>https://overclocked.no/</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitleContainer}>
              <Zap color={colors.planeswalkerGold} size={20} />
              <Text style={styles.sectionTitle}>Codex Version</Text>
            </View>
            <Text style={styles.versionText}>0.0.8</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              "May your mana flow eternal and your spark burn bright across the multiverse."{"\n"}{"\n"}
              Shoutout to Jokke Bjerknes Vape Taco Taxi
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.padding.large,
    paddingTop: layout.padding.xlarge,
    paddingBottom: layout.padding.medium,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    ...typography.heading.medium,
    color: colors.planeswalkerGold,
    marginHorizontal: layout.spacing.small,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.padding.large,
  },
  section: {
    marginVertical: layout.spacing.large,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: layout.spacing.medium,
  },
  description: {
    ...typography.body.large,
    color: colors.lightGray,
    lineHeight: 26,
    flex: 1,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: layout.spacing.medium,
    gap: layout.spacing.small,
  },
  sectionTitle: {
    ...typography.heading.small,
    color: colors.planeswalkerGold,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: layout.spacing.medium,
    paddingVertical: layout.spacing.small,
  },
  featureText: {
    flex: 1,
    marginLeft: layout.spacing.medium,
  },
  featureName: {
    ...typography.body.medium,
    color: colors.white,
    fontFamily: 'Inter-SemiBold',
    marginBottom: layout.spacing.xsmall,
  },
  featureDescription: {
    ...typography.body.small,
    color: colors.lightGray,
    lineHeight: 20,
  },
  authorName: {
    ...typography.body.large,
    color: colors.planeswalkerGold,
    fontFamily: 'Inter-SemiBold',
    marginBottom: layout.spacing.small,
  },
  webContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: layout.spacing.small,
  },
  authorWeb: {
    ...typography.body.medium,
    color: colors.lightGray,
    fontStyle: 'italic',
  },
  versionText: {
    ...typography.body.large,
    color: colors.lightGray,
    fontFamily: 'Inter-Medium',
  },
  footer: {
    alignItems: 'center',
    marginVertical: layout.spacing.xlarge,
    paddingVertical: layout.spacing.large,
    borderTopWidth: 1,
    borderTopColor: colors.darkGray,
  },
  footerText: {
    ...typography.body.medium,
    color: colors.planeswalkerGold,
    textAlign: 'center',
    fontStyle: 'italic',
    opacity: 0.8,
  },
});