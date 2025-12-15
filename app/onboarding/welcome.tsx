import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Heart, Shield, Sparkles } from 'lucide-react-native';

export default function Welcome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/paddle_and_speech_bubble_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Prompt Paddle</Text>
          <Text style={styles.tagline}>
            The easiest way to dip your toe into the AI ocean.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Heart size={32} color={Colors.secondary} />
            </View>
            <Text style={styles.featureTitle}>Learn at Your Pace</Text>
            <Text style={styles.featureText}>
              No pressure, no judgment. Take all the time you need to feel
              comfortable
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Sparkles size={32} color={Colors.accent} />
            </View>
            <Text style={styles.featureTitle}>Build Real Skills</Text>
            <Text style={styles.featureText}>
              Learn how to write great prompts and get helpful results from
              AI tools
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Shield size={32} color={Colors.primary} />
            </View>
            <Text style={styles.featureTitle}>Safe & Private</Text>
            <Text style={styles.featureText}>
              Practice safely, learn the basics, and understand how to protect
              your data
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Get Started"
          onPress={() => router.push('/auth/signup')}
          size="large"
        />
        <Button
          title="I Already Have an Account"
          onPress={() => router.push('/auth/signin')}
          variant="outline"
          size="large"
          style={styles.secondaryButton}
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
    marginTop: 40,
    marginBottom: 48,
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 24,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 36,
    fontWeight: '700',
  },
  tagline: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    maxWidth: '85%',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
  },
  features: {
    gap: 24,
  },
  feature: {
    alignItems: 'center',
    padding: 24,
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 8,
  },
  featureText: {
    ...Typography.body,
    color: Colors.textLight,
    textAlign: 'center',
    maxWidth: '90%',
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
  secondaryButton: {
    marginTop: 4,
  },
});
