import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ComfortLevel } from '@/types/app';

const COMFORT_OPTIONS: Array<{
  level: ComfortLevel;
  title: string;
  description: string;
}> = [
  {
    level: 1,
    title: 'Very Nervous',
    description: 'AI feels intimidating and I\'m worried about making mistakes',
  },
  {
    level: 2,
    title: 'A Bit Hesitant',
    description: 'Curious but unsure where to start and need lots of guidance',
  },
  {
    level: 3,
    title: 'Neutral',
    description: 'Open to learning but haven\'t tried AI much yet',
  },
  {
    level: 4,
    title: 'Somewhat Comfortable',
    description: 'I\'ve tried AI a bit and want to learn to use it better',
  },
  {
    level: 5,
    title: 'Pretty Confident',
    description: 'I use AI sometimes and want to refine my skills',
  },
];

export default function ComfortAssessment() {
  const [selected, setSelected] = useState<ComfortLevel | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleContinue = async () => {
    if (!selected || !user) return;

    setLoading(true);

    await supabase
      .from('profiles')
      .update({
        comfort_level: selected,
        onboarding_completed: true,
      })
      .eq('id', user.id);

    await supabase.from('user_progress').upsert({
      user_id: user.id,
    });

    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>How do you feel about AI?</Text>
          <Text style={styles.subtitle}>
            Be honest! This helps us customize your learning experience. You can
            change this later.
          </Text>
        </View>

        <View style={styles.options}>
          {COMFORT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.level}
              style={[
                styles.option,
                selected === option.level && styles.optionSelected,
              ]}
              onPress={() => setSelected(option.level)}
              activeOpacity={0.7}
            >
              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionTitle,
                    selected === option.level && styles.optionTitleSelected,
                  ]}
                >
                  {option.title}
                </Text>
                <Text
                  style={[
                    styles.optionDescription,
                    selected === option.level &&
                      styles.optionDescriptionSelected,
                  ]}
                >
                  {option.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selected}
          loading={loading}
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  options: {
    gap: 12,
  },
  option: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '10',
  },
  optionContent: {
    gap: 6,
  },
  optionTitle: {
    ...Typography.h5,
    color: Colors.text,
  },
  optionTitleSelected: {
    color: Colors.primary,
  },
  optionDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  optionDescriptionSelected: {
    color: Colors.text,
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
});
