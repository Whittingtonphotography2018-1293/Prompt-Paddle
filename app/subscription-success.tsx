import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Check } from 'lucide-react-native';

export default function SubscriptionSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.replace('/(tabs)');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.successIcon}>
        <Check size={64} color="#FFFFFF" strokeWidth={3} />
      </View>

      <Text style={styles.title}>Welcome to Premium!</Text>
      <Text style={styles.subtitle}>
        Your subscription is now active. You have full access to all features.
      </Text>

      <View style={styles.redirectContainer}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.redirectText}>
          Redirecting in {countdown}...
        </Text>
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
    padding: 24,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
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
    marginBottom: 32,
  },
  redirectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  redirectText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});
