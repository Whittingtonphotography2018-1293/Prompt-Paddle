import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Check } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

export default function Paywall() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session, user } = useAuth();
  const { hasActiveSubscription, refetchSubscription } = useSubscription();

  useEffect(() => {
    if (hasActiveSubscription) {
      router.replace('/(tabs)');
    }
  }, [hasActiveSubscription]);

  useEffect(() => {
    const checkForNewSubscription = async () => {
      await refetchSubscription();
    };

    checkForNewSubscription();
  }, []);

  const features = [
    'Unlimited AI-powered prompt generation',
    'Access to all app templates',
    'Platform-specific recommendations',
    'Step-by-step tutorials',
    'Priority support',
    'Regular updates and new features',
  ];

  const handleSubscribe = async () => {
    if (!session) {
      Alert.alert('Error', 'Please sign in to subscribe');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: {
          price_id: process.env.EXPO_PUBLIC_STRIPE_PRICE_ID || 'price_1234567890',
          success_url: `${window.location.origin}`,
          cancel_url: `${window.location.origin}/paywall`,
          mode: 'subscription',
        },
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        Alert.alert('Error', 'Failed to start checkout process. Please try again.');
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        Alert.alert('Error', 'Failed to get checkout URL');
      }
    } catch (err) {
      console.error('Error:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.price}>9.99</Text>
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
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.subscribeButtonText}>Start Subscription</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.disclaimer}>
        By subscribing, you agree to our Terms of Service and Privacy Policy. Your subscription will
        automatically renew until cancelled.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  disclaimer: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
