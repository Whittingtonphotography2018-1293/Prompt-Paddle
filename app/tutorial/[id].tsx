import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { TUTORIALS } from '@/data/tutorials';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, CheckCircle, BookOpen } from 'lucide-react-native';

export default function TutorialViewer() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const tutorial = TUTORIALS.find((t) => t.id === id);
  const [currentSection, setCurrentSection] = useState(0);
  const [loading, setLoading] = useState(false);

  if (!tutorial) {
    return null;
  }

  const isLastSection = currentSection === tutorial.content.length - 1;
  const section = tutorial.content[currentSection];

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);

    await supabase.from('learning_modules').upsert({
      user_id: user.id,
      module_id: tutorial.id,
      module_title: tutorial.title,
      module_level: tutorial.level,
      completed: true,
      completed_at: new Date().toISOString(),
    });

    const { data: currentProgress } = await supabase
      .from('user_progress')
      .select('tutorials_completed')
      .eq('user_id', user.id)
      .maybeSingle();

    const newCount = (currentProgress?.tutorials_completed || 0) + 1;

    await supabase
      .from('user_progress')
      .upsert({
        user_id: user.id,
        tutorials_completed: newCount,
        updated_at: new Date().toISOString(),
      });

    setLoading(false);
    router.back();
  };

  const handleNext = () => {
    if (isLastSection) {
      handleComplete();
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{tutorial.title}</Text>
          <Text style={styles.headerSubtitle}>
            Section {currentSection + 1} of {tutorial.content.length}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.progressDots}>
          {tutorial.content.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSection && styles.dotActive,
                index < currentSection && styles.dotCompleted,
              ]}
            />
          ))}
        </View>

        {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}

        {section.type === 'text' && (
          <Card style={styles.contentCard}>
            <Text style={styles.contentText}>{section.content}</Text>
          </Card>
        )}

        {section.type === 'example' && (
          <Card style={styles.exampleCard}>
            <View style={styles.exampleHeader}>
              <BookOpen size={24} color={Colors.accent} />
              <Text style={styles.exampleTitle}>
                {section.title || 'Example'}
              </Text>
            </View>
            <Text style={styles.exampleText}>{section.content}</Text>
          </Card>
        )}

        <View style={styles.sectionNav}>
          {currentSection > 0 && (
            <Button
              title="Previous"
              onPress={() => setCurrentSection(currentSection - 1)}
              variant="outline"
              size="medium"
            />
          )}
          <Button
            title={isLastSection ? 'Complete Lesson' : 'Next'}
            onPress={handleNext}
            loading={loading}
            size="medium"
            style={styles.nextButton}
          />
        </View>

        {isLastSection && (
          <Card style={styles.completionCard}>
            <CheckCircle size={48} color={Colors.success} />
            <Text style={styles.completionTitle}>Great Job!</Text>
            <Text style={styles.completionText}>
              You're about to complete this lesson. Keep up the great work
              building your AI confidence!
            </Text>
          </Card>
        )}
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  content: {
    padding: 24,
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.borderLight,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  dotCompleted: {
    backgroundColor: Colors.success,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 24,
  },
  contentCard: {
    marginBottom: 24,
  },
  contentText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 28,
  },
  exampleCard: {
    backgroundColor: Colors.accentLight + '20',
    marginBottom: 24,
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  exampleTitle: {
    ...Typography.h5,
    color: Colors.accent,
  },
  exampleText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  sectionNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 24,
  },
  nextButton: {
    flex: 1,
  },
  completionCard: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.success + '10',
  },
  completionTitle: {
    ...Typography.h3,
    color: Colors.success,
    marginTop: 16,
    marginBottom: 12,
  },
  completionText: {
    ...Typography.body,
    color: Colors.text,
    textAlign: 'center',
  },
});
