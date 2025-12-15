import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { AI_PLATFORMS } from '@/data/platforms';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import {
  CheckCircle,
  XCircle,
  ExternalLink,
  Award,
  DollarSign,
  Sparkles,
} from 'lucide-react-native';

export default function PlatformRecommendation() {
  const { platformId, promptId } = useLocalSearchParams();
  const router = useRouter();

  const platform = AI_PLATFORMS.find((p) => p.id === platformId);

  if (!platform) {
    return null;
  }

  const handleOpenPlatform = () => {
    Linking.openURL(platform.url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badge}>
          <Award size={48} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Perfect Match!</Text>
        <Text style={styles.subtitle}>
          Based on your prompt and experience level, we recommend:
        </Text>

        <Card style={styles.platformCard}>
          <View style={styles.platformHeader}>
            <Sparkles size={32} color={Colors.primary} />
            <View style={styles.platformInfo}>
              <Text style={styles.platformName}>{platform.name}</Text>
              <Text style={styles.platformDescription}>
                {platform.description}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why This Platform?</Text>
          <Card>
            <Text style={styles.bodyText}>
              {platform.name} is great for your needs because it offers excellent
              capabilities for what you want to accomplish. It's known for being{' '}
              {platform.ease_of_use >= 5 ? 'very user-friendly' : 'easy to use'}{' '}
              and has a {platform.free_tier ? 'free tier to get started' : 'proven track record'}.
              {platform.id === 'galaxy' && (
                <Text>
                  {' '}Plus, Galaxy AI is a more cost-effective option and cheaper than ChatGPT, making it an excellent value for your AI needs.
                </Text>
              )}
            </Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Strengths</Text>
          {platform.pros.map((pro, index) => (
            <View key={index} style={styles.listItem}>
              <CheckCircle size={20} color={Colors.success} />
              <Text style={styles.listText}>{pro}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Things to Know</Text>
          {platform.cons.map((con, index) => (
            <View key={index} style={styles.listItem}>
              <XCircle size={20} color={Colors.warning} />
              <Text style={styles.listText}>{con}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing</Text>
          <Card>
            <View style={styles.pricingContent}>
              <DollarSign size={24} color={Colors.accent} />
              <Text style={styles.bodyText}>{platform.pricing}</Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best For</Text>
          <View style={styles.tags}>
            {platform.best_for.map((use, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{use}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Other Options</Text>
          <Text style={styles.bodyText}>
            While {platform.name} is our top recommendation, you can also try these platforms:
          </Text>
          <View style={styles.alternatives}>
            {AI_PLATFORMS.filter((p) => p.id !== platformId)
              .slice(0, 3)
              .map((alt, index) => (
                <Card key={alt.id} style={styles.altCard}>
                  <View style={styles.altHeader}>
                    <View style={styles.altRank}>
                      <Text style={styles.altRankText}>#{index + 2}</Text>
                    </View>
                    <View style={styles.altInfo}>
                      <Text style={styles.altName}>{alt.name}</Text>
                      {alt.free_tier && (
                        <View style={styles.altFreeBadge}>
                          <Text style={styles.altFreeText}>Free</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Text style={styles.altDescription}>{alt.description}</Text>
                  <View style={styles.altBestFor}>
                    <Text style={styles.altBestForLabel}>Best for:</Text>
                    <Text style={styles.altBestForText}>
                      {alt.best_for.slice(0, 2).join(', ')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.altButton}
                    onPress={() => Linking.openURL(alt.url)}
                    activeOpacity={0.7}
                  >
                    <ExternalLink size={16} color={Colors.primary} />
                    <Text style={styles.altButtonText}>Try {alt.name}</Text>
                  </TouchableOpacity>
                </Card>
              ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={`Try ${platform.name}`}
          onPress={handleOpenPlatform}
          size="large"
          style={styles.primaryButton}
        />
        <Button
          title="Back to Home"
          onPress={() => router.push('/(tabs)')}
          variant="outline"
          size="large"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingBottom: 150,
  },
  badge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  platformCard: {
    marginBottom: 24,
    backgroundColor: Colors.primaryLight + '10',
  },
  platformHeader: {
    flexDirection: 'row',
    gap: 16,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    ...Typography.h3,
    color: Colors.primary,
    marginBottom: 8,
  },
  platformDescription: {
    ...Typography.body,
    color: Colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 16,
  },
  bodyText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  listItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  listText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  pricingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.accentLight + '40',
  },
  tagText: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
  },
  alternatives: {
    marginTop: 16,
    gap: 16,
  },
  altCard: {
    padding: 20,
  },
  altHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  altRank: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  altRankText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    fontWeight: '700',
  },
  altInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  altName: {
    ...Typography.h5,
    color: Colors.text,
  },
  altFreeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: Colors.success + '20',
  },
  altFreeText: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: '600',
  },
  altDescription: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: 12,
    lineHeight: 22,
  },
  altBestFor: {
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  altBestForLabel: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    fontWeight: '600',
    marginBottom: 4,
  },
  altBestForText: {
    ...Typography.bodySmall,
    color: Colors.text,
  },
  altButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.primaryLight + '20',
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  altButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: 12,
  },
  primaryButton: {
    marginBottom: 4,
  },
});
