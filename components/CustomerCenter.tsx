import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useRevenueCat } from '@/contexts/RevenueCatContext';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Crown, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react-native';
import Card from './Card';
import Button from './Button';

export default function CustomerCenter() {
  const router = useRouter();
  const {
    customerInfo,
    isProUser,
    isRestoring,
    restorePurchases,
    refreshCustomerInfo,
  } = useRevenueCat();
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <Card style={styles.card}>
        <View style={styles.webMessage}>
          <AlertCircle size={24} color={Colors.textLight} />
          <Text style={styles.webMessageText}>
            Subscription management is not available on web. Please use the iOS
            or Android app.
          </Text>
        </View>
      </Card>
    );
  }

  const activeEntitlement =
    customerInfo?.entitlements.active['Prompt Paddle'];
  const expirationDate = activeEntitlement?.expirationDate;
  const willRenew = activeEntitlement?.willRenew;
  const productIdentifier = activeEntitlement?.productIdentifier;

  const getSubscriptionType = () => {
    if (!productIdentifier) return 'Unknown';
    if (productIdentifier.includes('yearly')) return 'Annual';
    if (productIdentifier.includes('monthly')) return 'Monthly';
    if (productIdentifier.includes('weekly')) return 'Weekly';
    return productIdentifier;
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshCustomerInfo();
    setIsRefreshing(false);
  };

  const handleManageSubscription = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('https://apps.apple.com/account/subscriptions');
    } else if (Platform.OS === 'android') {
      Linking.openURL(
        'https://play.google.com/store/account/subscriptions'
      );
    }
  };

  if (!isProUser) {
    return (
      <Card style={styles.card}>
        <View style={styles.notSubscribed}>
          <Crown size={48} color={Colors.textLight} />
          <Text style={styles.notSubscribedTitle}>No Active Subscription</Text>
          <Text style={styles.notSubscribedText}>
            Unlock all features with Prompt Paddle Pro
          </Text>
          <Button
            title="View Plans"
            onPress={() => router.push('/paywall')}
            style={styles.upgradeButton}
          />
        </View>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.statusHeader}>
          <View style={styles.statusIcon}>
            <Crown size={24} color={Colors.primary} />
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>Prompt Paddle Pro</Text>
            <Text style={styles.statusSubtitle}>Active Subscription</Text>
          </View>
          <TouchableOpacity
            onPress={handleRefresh}
            disabled={isRefreshing}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <RefreshCw
              size={20}
              color={Colors.primary}
              style={isRefreshing && { opacity: 0.5 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.subscriptionDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Plan</Text>
            <Text style={styles.detailValue}>{getSubscriptionType()}</Text>
          </View>

          {expirationDate && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>
                {willRenew ? 'Renews on' : 'Expires on'}
              </Text>
              <Text style={styles.detailValue}>
                {new Date(expirationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: willRenew ? Colors.success : Colors.warning },
                ]}
              />
              <Text
                style={[
                  styles.statusBadgeText,
                  { color: willRenew ? Colors.success : Colors.warning },
                ]}
              >
                {willRenew ? 'Active' : 'Expiring'}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleManageSubscription}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Manage Subscription</Text>
          <ExternalLink size={20} color={Colors.primary} />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.actionButton}
          onPress={restorePurchases}
          disabled={isRestoring}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>
            {isRestoring ? 'Restoring...' : 'Restore Purchases'}
          </Text>
          <RefreshCw size={20} color={Colors.primary} />
        </TouchableOpacity>
      </Card>

      <Text style={styles.disclaimer}>
        Manage your subscription directly through your {Platform.OS === 'ios' ? 'App Store' : 'Play Store'} account. Changes may take a few minutes to reflect.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 2,
  },
  statusSubtitle: {
    ...Typography.bodySmall,
    color: Colors.success,
  },
  subscriptionDetails: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...Typography.body,
    color: Colors.textLight,
  },
  detailValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.surface,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusBadgeText: {
    ...Typography.bodySmall,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    ...Typography.body,
    color: Colors.primary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 8,
  },
  notSubscribed: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  notSubscribedTitle: {
    ...Typography.h4,
    color: Colors.text,
  },
  notSubscribedText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
  },
  upgradeButton: {
    marginTop: 8,
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  webMessage: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },
  webMessageText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
  },
});
