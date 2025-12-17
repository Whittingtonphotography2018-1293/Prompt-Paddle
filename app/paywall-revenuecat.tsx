import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Check } from 'lucide-react-native';
import { useRevenueCat } from '@/contexts/RevenueCatContext';

export default function PaywallRevenueCat() {
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const router = useRouter();
  const {
    hasActiveEntitlement,
    offerings,
    purchasePackage,
    restorePurchases,
    isConfigured,
    loading: rcLoading,
  } = useRevenueCat();

  useEffect(() => {
    if (hasActiveEntitlement) {
      router.replace('/(tabs)');
    }
  }, [hasActiveEntitlement]);

  const features = [
    'Unlimited AI-powered prompt generation',
    'Access to all app templates',
    'Platform-specific recommendations',
    'Step-by-step tutorials',
    'Regular updates and new features',
  ];

  const handleSubscribe = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Not Available',
        'Subscriptions are only available on iOS and Android devices.'
      );
      return;
    }

    if (!isConfigured) {
      Alert.alert('Error', 'Payment system is not configured');
      return;
    }

    if (!offerings?.current?.availablePackages?.length) {
      Alert.alert('Error', 'No subscription packages available');
      return;
    }

    setLoading(true);

    try {
      const monthlyPackage = offerings.current.availablePackages[0];
      const result = await purchasePackage(monthlyPackage);

      if (result.success) {
        Alert.alert('Success', 'Subscription activated!');
        router.replace('/(tabs)');
      } else if (result.error && !result.error.userCancelled) {
        Alert.alert('Error', 'Failed to complete purchase. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Not Available',
        'Restore purchases is only available on iOS and Android devices.'
      );
      return;
    }

    setRestoring(true);

    try {
      const result = await restorePurchases();

      if (result.success) {
        if (hasActiveEntitlement) {
          Alert.alert('Success', 'Purchases restored successfully!');
          router.replace('/(tabs)');
        } else {
          Alert.alert('No Purchases', 'No active subscriptions found.');
        }
      } else {
        Alert.alert('Error', 'Failed to restore purchases. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setRestoring(false);
    }
  };

  if (rcLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.title}>Subscriptions Not Available</Text>
        <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 16 }]}>
          Subscriptions are only available on iOS and Android devices. Please download the mobile
          app to subscribe.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Unlock Full Access</Text>
        <Text style={styles.subtitle}>
          Get unlimited access to all features and take your app development to the next level
        </Text>
      </View>

      <View style={styles.pricingCard}>
        <View style={styles.priceHeader}>
          <Text style={styles.currency}>$</Text>
          <Text style={styles.price}>0.99</Text>
          <Text style={styles.period}>/month</Text>
        </View>
        <Text style={styles.billingInfo}>Cancel anytime</Text>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>What's included:</Text>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.checkIcon}>
              <Check size={20} color={Colors.primary} strokeWidth={3} />
            </View>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.subscribeButton, loading && styles.subscribeButtonDisabled]}
        onPress={handleSubscribe}
        disabled={loading || !isConfigured}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.subscribeButtonText}>Start Subscription</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.restoreButton}
        onPress={handleRestore}
        disabled={restoring}
      >
        {restoring ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text style={styles.restoreButtonText}>Restore Purchases</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will
        automatically renew until cancelled. Manage your subscription in your device settings.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    ...Typography.heading1,
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pricingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  currency: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 8,
  },
  price: {
    fontSize: 64,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 64,
  },
  period: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginTop: 24,
  },
  billingInfo: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    ...Typography.heading3,
    color: Colors.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  subscribeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  subscribeButtonDisabled: {
    opacity: 0.6,
  },
  subscribeButtonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  restoreButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  restoreButtonText: {
    ...Typography.button,
    color: Colors.primary,
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
