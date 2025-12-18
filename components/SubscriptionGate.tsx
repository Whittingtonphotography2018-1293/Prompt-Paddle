import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useRevenueCat } from '@/contexts/RevenueCatContext';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Crown, Lock } from 'lucide-react-native';
import Card from './Card';
import Button from './Button';

interface SubscriptionGateProps {
  children: React.ReactNode;
  featureName?: string;
  customMessage?: string;
}

export default function SubscriptionGate({
  children,
  featureName = 'this feature',
  customMessage,
}: SubscriptionGateProps) {
  const router = useRouter();
  const { isProUser, loading } = useRevenueCat();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Checking subscription...</Text>
      </View>
    );
  }

  if (!isProUser) {
    return (
      <View style={styles.container}>
        <Card style={styles.gateCard}>
          <View style={styles.iconContainer}>
            <View style={styles.lockIconWrapper}>
              <Lock size={32} color={Colors.primary} />
            </View>
            <View style={styles.crownIconWrapper}>
              <Crown size={24} color={Colors.warning} />
            </View>
          </View>

          <Text style={styles.title}>Premium Feature</Text>
          <Text style={styles.message}>
            {customMessage ||
              `Unlock ${featureName} and all premium features with Prompt Paddle Pro.`}
          </Text>

          <View style={styles.benefits}>
            <View style={styles.benefit}>
              <Text style={styles.benefitText}>Unlimited prompt creation</Text>
            </View>
            <View style={styles.benefit}>
              <Text style={styles.benefitText}>Advanced templates</Text>
            </View>
            <View style={styles.benefit}>
              <Text style={styles.benefitText}>Priority support</Text>
            </View>
          </View>

          <Button
            title="Upgrade to Pro"
            onPress={() => router.push('/paywall')}
            size="large"
            style={styles.upgradeButton}
          />

          <Text style={styles.disclaimer}>
            Start your free trial today, cancel anytime
          </Text>
        </Card>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  gateCard: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  lockIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownIconWrapper: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.surface,
  },
  title: {
    ...Typography.h3,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  benefits: {
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.primaryLight + '10',
    borderRadius: 8,
  },
  benefitText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  upgradeButton: {
    width: '100%',
    marginBottom: 12,
  },
  disclaimer: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
});
