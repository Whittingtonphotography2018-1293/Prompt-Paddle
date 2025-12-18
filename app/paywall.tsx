import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PurchasesPackage } from '@revenuecat/purchases-expo';
import { useRevenueCat } from '@/contexts/RevenueCatContext';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { X, Check, Crown, Sparkles, Target, BookOpen } from 'lucide-react-native';
import Button from '@/components/Button';

export default function Paywall() {
  const router = useRouter();
  const {
    offerings,
    isPurchasing,
    isRestoring,
    error,
    purchasePackage,
    restorePurchases,
  } = useRevenueCat();
  const [selectedPackage, setSelectedPackage] = useState<PurchasesPackage | null>(null);

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.webMessage}>
          <Text style={styles.webMessageText}>
            In-app purchases are not available on web. Please use the iOS or Android app.
          </Text>
          <Button title="Go Back" onPress={() => router.back()} />
        </View>
      </SafeAreaView>
    );
  }

  const currentOffering = offerings?.current;
  const availablePackages = currentOffering?.availablePackages || [];

  const getPackageTitle = (pkg: PurchasesPackage) => {
    const identifier = pkg.identifier.toLowerCase();
    if (identifier.includes('weekly')) return 'Weekly';
    if (identifier.includes('monthly')) return 'Monthly';
    if (identifier.includes('yearly')) return 'Annual';
    return pkg.identifier;
  };

  const getPackageDescription = (pkg: PurchasesPackage) => {
    const identifier = pkg.identifier.toLowerCase();
    if (identifier.includes('yearly')) return 'Best Value - Save 40%';
    if (identifier.includes('monthly')) return 'Most Popular';
    if (identifier.includes('weekly')) return 'Try it Out';
    return 'Subscribe now';
  };

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    await purchasePackage(selectedPackage);
    if (!error) {
      router.back();
    }
  };

  const handleRestore = async () => {
    await restorePurchases();
    if (!error) {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.crownIcon}>
            <Crown size={48} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Unlock Prompt Paddle Pro</Text>
          <Text style={styles.subtitle}>
            Master AI prompting with unlimited access to all features
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Check size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Unlimited prompt creation</Text>
          </View>
          <View style={styles.feature}>
            <Check size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Access to all advanced templates</Text>
          </View>
          <View style={styles.feature}>
            <Check size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Priority customer support</Text>
          </View>
          <View style={styles.feature}>
            <Check size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Export prompts to any format</Text>
          </View>
          <View style={styles.feature}>
            <Check size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Exclusive AI learning content</Text>
          </View>
        </View>

        {availablePackages.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Loading subscription options...</Text>
          </View>
        ) : (
          <View style={styles.packages}>
            {availablePackages.map((pkg: PurchasesPackage) => {
              const isSelected = selectedPackage?.identifier === pkg.identifier;
              const isYearly = pkg.identifier.toLowerCase().includes('yearly');

              return (
                <TouchableOpacity
                  key={pkg.identifier}
                  style={[
                    styles.package,
                    isSelected && styles.packageSelected,
                    isYearly && styles.packageBestValue,
                  ]}
                  onPress={() => setSelectedPackage(pkg)}
                  activeOpacity={0.7}
                >
                  {isYearly && (
                    <View style={styles.bestValueBadge}>
                      <Sparkles size={12} color={Colors.surface} />
                      <Text style={styles.bestValueText}>BEST VALUE</Text>
                    </View>
                  )}
                  <View style={styles.packageHeader}>
                    <Text style={styles.packageTitle}>{getPackageTitle(pkg)}</Text>
                    <View style={styles.packagePricing}>
                      <Text style={styles.packagePrice}>
                        {pkg.product.priceString}
                      </Text>
                      <Text style={styles.packagePeriod}>
                        /{pkg.packageType.toLowerCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.packageDescription}>
                    {getPackageDescription(pkg)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={isPurchasing ? 'Processing...' : 'Subscribe Now'}
          onPress={handlePurchase}
          disabled={!selectedPackage || isPurchasing || isRestoring}
          size="large"
        />
        <TouchableOpacity
          onPress={handleRestore}
          style={styles.restoreButton}
          disabled={isPurchasing || isRestoring}
        >
          <Text style={styles.restoreText}>
            {isRestoring ? 'Restoring...' : 'Restore Purchases'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Subscriptions auto-renew unless cancelled 24 hours before the end of the
          current period.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 24,
    paddingBottom: 200,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  crownIcon: {
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
    maxWidth: '85%',
  },
  features: {
    marginBottom: 32,
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 16,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  packages: {
    gap: 12,
    marginBottom: 24,
  },
  package: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.borderLight,
  },
  packageSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '10',
  },
  packageBestValue: {
    position: 'relative',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bestValueText: {
    ...Typography.caption,
    color: Colors.surface,
    fontWeight: '700',
    fontSize: 10,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  packageTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  packagePricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  packagePrice: {
    ...Typography.h3,
    color: Colors.primary,
  },
  packagePeriod: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginLeft: 2,
  },
  packageDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  errorContainer: {
    backgroundColor: Colors.error + '20',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    ...Typography.bodySmall,
    color: Colors.error,
    textAlign: 'center',
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
  },
  restoreButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  restoreText: {
    ...Typography.body,
    color: Colors.primary,
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 12,
  },
  webMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 24,
  },
  webMessageText: {
    ...Typography.body,
    color: Colors.text,
    textAlign: 'center',
  },
});
