import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { useSubscription } from '@/hooks/useSubscription';
import { Check } from 'lucide-react-native';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { refetchSubscription, hasActiveSubscription } = useSubscription();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));

      await refetchSubscription();

      setChecking(false);

      setTimeout(() => {
        router.replace('/(tabs)');
      }, 1500);
    };

    checkSubscription();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {checking ? (
          <>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.title}>Confirming your subscription...</Text>
            <Text style={styles.subtitle}>Please wait a moment</Text>
          </>
        ) : hasActiveSubscription ? (
          <>
            <View style={styles.iconContainer}>
              <Check size={64} color="#FFFFFF" strokeWidth={3} />
            </View>
            <Text style={styles.title}>Subscription Activated!</Text>
            <Text style={styles.subtitle}>
              Thank you for subscribing. You now have access to all premium features.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>Processing Payment</Text>
            <Text style={styles.subtitle}>
              Your payment is being processed. This may take a few moments.
            </Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 32,
    alignItems: 'center',
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    ...Typography.heading2,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
