import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Copy, CheckCircle, ExternalLink, Sparkles } from 'lucide-react-native';
import { AI_PLATFORMS } from '@/data/platforms';

export default function PromptResult() {
  const { prompt, platformId, templateName, category } = useLocalSearchParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const platform = AI_PLATFORMS.find((p) => p.id === platformId) || AI_PLATFORMS[0];

  const handleCopy = async () => {
    try {
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(prompt as string);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const handleOpenPlatform = async () => {
    try {
      const supported = await Linking.canOpenURL(platform.url);
      if (supported) {
        await Linking.openURL(platform.url);
      } else {
        Alert.alert('Error', `Unable to open ${platform.name}. Please visit ${platform.url} manually.`);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open platform');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Sparkles size={32} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Your Prompt is Ready!</Text>
          <Text style={styles.subtitle}>
            We've crafted the perfect prompt for {templateName}
          </Text>
        </View>

        <Card style={styles.promptCard}>
          <View style={styles.promptHeader}>
            <Text style={styles.promptLabel}>Generated Prompt</Text>
            <TouchableOpacity
              style={[styles.copyButton, copied && styles.copyButtonSuccess]}
              onPress={handleCopy}
              activeOpacity={0.7}
            >
              {copied ? (
                <>
                  <CheckCircle size={16} color={Colors.success} />
                  <Text style={[styles.copyButtonText, styles.copyButtonTextSuccess]}>
                    Copied!
                  </Text>
                </>
              ) : (
                <>
                  <Copy size={16} color={Colors.primary} />
                  <Text style={styles.copyButtonText}>Copy</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.promptScroll} nestedScrollEnabled>
            <Text style={styles.promptText}>{prompt}</Text>
          </ScrollView>
        </Card>

        <Card style={styles.recommendationCard}>
          <Text style={styles.recommendationTitle}>Recommended Platform</Text>
          <View style={styles.platformInfo}>
            <View style={styles.platformHeader}>
              <Text style={styles.platformName}>{platform.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{category}</Text>
              </View>
            </View>
            <Text style={styles.platformDescription}>
              {platform.description}
              {platform.id === 'galaxy' && (
                <Text style={styles.costEffectiveText}>
                  {' '}Plus, Galaxy AI is a more cost-effective option and cheaper than ChatGPT, making it an excellent value for your AI needs.
                </Text>
              )}
            </Text>

            <View style={styles.platformDetails}>
              <Text style={styles.detailsTitle}>Why this platform?</Text>
              <View style={styles.detailsList}>
                {platform.best_for.map((item, index) => (
                  <View key={index} style={styles.detailItem}>
                    <View style={styles.bulletPoint} />
                    <Text style={styles.detailText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.prosConsContainer}>
              <View style={styles.prosContainer}>
                <Text style={styles.prosConsTitle}>Pros</Text>
                {platform.pros.slice(0, 2).map((pro, index) => (
                  <View key={index} style={styles.proConItem}>
                    <CheckCircle size={14} color={Colors.success} />
                    <Text style={styles.proConText}>{pro}</Text>
                  </View>
                ))}
              </View>
            </View>

            {platform.free_tier && (
              <View style={styles.freeTierBadge}>
                <Text style={styles.freeTierText}>Free Tier Available</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.openPlatformButton}
              onPress={handleOpenPlatform}
              activeOpacity={0.7}
            >
              <ExternalLink size={20} color={Colors.surface} />
              <Text style={styles.openPlatformText}>
                Open {platform.name}
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Next Steps:</Text>
          <View style={styles.stepsList}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Copy your prompt using the button above</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>
                Click the "Open {platform.name}" button above to go directly to the platform
              </Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Paste your prompt and get results</Text>
            </View>
          </View>
        </View>

        <View style={styles.alternativesSection}>
          <Text style={styles.alternativesTitle}>Or Try These Platforms:</Text>
          <View style={styles.alternativesList}>
            {AI_PLATFORMS.filter((p) => p.id !== platformId)
              .slice(0, 3)
              .map((alt, index) => (
                <Card key={alt.id} style={styles.alternativeCard}>
                  <View style={styles.alternativeHeader}>
                    <View style={styles.alternativeRank}>
                      <Text style={styles.alternativeRankText}>#{index + 2}</Text>
                    </View>
                    <View style={styles.alternativeInfo}>
                      <Text style={styles.alternativeName}>{alt.name}</Text>
                      {alt.free_tier && (
                        <View style={styles.alternativeFreeBadge}>
                          <Text style={styles.alternativeFreeText}>Free</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Text style={styles.alternativeDescription} numberOfLines={2}>
                    {alt.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.alternativeButton}
                    onPress={() => Linking.openURL(alt.url)}
                    activeOpacity={0.7}
                  >
                    <ExternalLink size={14} color={Colors.primary} />
                    <Text style={styles.alternativeButtonText}>Try {alt.name}</Text>
                  </TouchableOpacity>
                </Card>
              ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Create Another"
          onPress={() => router.push('/create')}
          variant="outline"
          size="large"
        />
        <Button
          title="Done"
          onPress={() => router.push('/')}
          size="large"
          style={styles.doneButton}
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
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
  },
  promptCard: {
    marginBottom: 24,
  },
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  promptLabel: {
    ...Typography.h5,
    color: Colors.text,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight + '20',
  },
  copyButtonSuccess: {
    backgroundColor: Colors.success + '20',
  },
  copyButtonText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    fontWeight: '600',
  },
  copyButtonTextSuccess: {
    color: Colors.success,
  },
  promptScroll: {
    maxHeight: 200,
    backgroundColor: Colors.surfaceGray,
    borderRadius: 12,
    padding: 16,
  },
  promptText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
  recommendationCard: {
    marginBottom: 24,
  },
  recommendationTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 16,
  },
  platformInfo: {},
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  platformName: {
    ...Typography.h5,
    color: Colors.primary,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.surfaceGray,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '600',
  },
  platformDescription: {
    ...Typography.body,
    color: Colors.textLight,
    marginBottom: 16,
  },
  costEffectiveText: {
    ...Typography.body,
    color: Colors.success,
    fontWeight: '600',
  },
  platformDetails: {
    marginBottom: 16,
  },
  detailsTitle: {
    ...Typography.h6,
    color: Colors.text,
    marginBottom: 8,
  },
  detailsList: {
    gap: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
  detailText: {
    ...Typography.bodySmall,
    color: Colors.text,
    flex: 1,
  },
  prosConsContainer: {
    marginBottom: 16,
  },
  prosContainer: {
    gap: 6,
  },
  prosConsTitle: {
    ...Typography.h6,
    color: Colors.text,
    marginBottom: 6,
  },
  proConItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  proConText: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    flex: 1,
  },
  freeTierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.success + '20',
    alignSelf: 'flex-start',
  },
  freeTierText: {
    ...Typography.bodySmall,
    color: Colors.success,
    fontWeight: '600',
  },
  openPlatformButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
  },
  openPlatformText: {
    ...Typography.body,
    color: Colors.surface,
    fontWeight: '700',
  },
  instructions: {
    backgroundColor: Colors.primaryLight + '10',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '30',
  },
  instructionsTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 16,
  },
  stepsList: {
    gap: 16,
  },
  step: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    ...Typography.bodySmall,
    color: Colors.surface,
    fontWeight: '700',
  },
  stepText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
    paddingTop: 3,
  },
  alternativesSection: {
    marginTop: 24,
  },
  alternativesTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 16,
  },
  alternativesList: {
    gap: 12,
  },
  alternativeCard: {
    padding: 16,
  },
  alternativeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  alternativeRank: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surfaceGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativeRankText: {
    ...Typography.caption,
    color: Colors.textLight,
    fontWeight: '700',
  },
  alternativeInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alternativeName: {
    ...Typography.h6,
    color: Colors.text,
  },
  alternativeFreeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: Colors.success + '20',
  },
  alternativeFreeText: {
    fontSize: 10,
    color: Colors.success,
    fontWeight: '600',
  },
  alternativeDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 12,
    lineHeight: 20,
  },
  alternativeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.primaryLight + '15',
    borderWidth: 1,
    borderColor: Colors.primary + '25',
  },
  alternativeButtonText: {
    ...Typography.bodySmall,
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
    flexDirection: 'row',
    gap: 12,
  },
  doneButton: {
    flex: 1,
  },
});
