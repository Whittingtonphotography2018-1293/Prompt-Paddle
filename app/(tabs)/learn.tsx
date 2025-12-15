import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { TUTORIALS } from '@/data/tutorials';
import { CheckCircle2, Circle, Clock, ChevronRight, Award } from 'lucide-react-native';
import { LearningModule } from '@/types/database';

const LEVEL_INFO = {
  1: { name: 'Foundation', color: Colors.success, subtitle: 'Overcoming Fear' },
  2: { name: 'Basics', color: Colors.primary, subtitle: 'Getting Started' },
  3: { name: 'Intermediate', color: Colors.warning, subtitle: 'Skill Building' },
  4: { name: 'Confidence', color: Colors.secondary, subtitle: 'Mastery' },
};

export default function LearnTab() {
  const { user } = useAuth();
  const router = useRouter();
  const [completedModules, setCompletedModules] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadProgress = async () => {
      const { data } = await supabase
        .from('learning_modules')
        .select('module_id, completed')
        .eq('user_id', user.id)
        .eq('completed', true);

      if (data) {
        setCompletedModules(new Set(data.map((m) => m.module_id)));
      }
      setLoading(false);
    };

    loadProgress();
  }, [user]);

  const groupedTutorials = TUTORIALS.reduce((acc, tutorial) => {
    const level = tutorial.level;
    if (!acc[level]) acc[level] = [];
    acc[level].push(tutorial);
    return acc;
  }, {} as Record<number, typeof TUTORIALS>);

  const getLevelProgress = (level: number) => {
    const tutorials = groupedTutorials[level] || [];
    const completed = tutorials.filter((t) =>
      completedModules.has(t.id)
    ).length;
    return tutorials.length > 0 ? (completed / tutorials.length) * 100 : 0;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Learn About AI</Text>
            <Text style={styles.subtitle}>
              Build confidence one lesson at a time
            </Text>
          </View>
          <Image
            source={require('@/assets/images/paddle_and_speech_bubble_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <Award size={32} color={Colors.accent} />
            <View style={styles.overviewStats}>
              <Text style={styles.overviewNumber}>
                {completedModules.size}/{TUTORIALS.length}
              </Text>
              <Text style={styles.overviewLabel}>Lessons Completed</Text>
            </View>
          </View>
        </Card>

        {Object.entries(groupedTutorials)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([level, tutorials]) => {
            const levelNum = Number(level) as 1 | 2 | 3 | 4;
            const levelInfo = LEVEL_INFO[levelNum];
            const progress = getLevelProgress(levelNum);

            return (
              <View key={level} style={styles.levelSection}>
                <View style={styles.levelHeader}>
                  <View>
                    <Text style={styles.levelTitle}>
                      Level {level}: {levelInfo.name}
                    </Text>
                    <Text style={styles.levelSubtitle}>
                      {levelInfo.subtitle}
                    </Text>
                  </View>
                  <View style={styles.levelProgress}>
                    <Text style={styles.progressText}>
                      {Math.round(progress)}%
                    </Text>
                  </View>
                </View>
                <ProgressBar
                  progress={progress}
                  color={levelInfo.color}
                  style={styles.progressBar}
                />

                <View style={styles.tutorials}>
                  {tutorials.map((tutorial) => {
                    const isCompleted = completedModules.has(tutorial.id);
                    return (
                      <TouchableOpacity
                        key={tutorial.id}
                        onPress={() =>
                          router.push(`/tutorial/${tutorial.id}` as any)
                        }
                        activeOpacity={0.7}
                      >
                        <Card style={styles.tutorialCard}>
                          <View style={styles.tutorialContent}>
                            <View style={styles.tutorialIcon}>
                              {isCompleted ? (
                                <CheckCircle2
                                  size={24}
                                  color={Colors.success}
                                />
                              ) : (
                                <Circle size={24} color={Colors.textLight} />
                              )}
                            </View>
                            <View style={styles.tutorialInfo}>
                              <Text
                                style={[
                                  styles.tutorialTitle,
                                  isCompleted && styles.tutorialTitleCompleted,
                                ]}
                              >
                                {tutorial.title}
                              </Text>
                              <Text style={styles.tutorialDescription}>
                                {tutorial.description}
                              </Text>
                              <View style={styles.tutorialMeta}>
                                <Clock size={14} color={Colors.textLight} />
                                <Text style={styles.metaText}>
                                  {tutorial.duration_minutes} min
                                </Text>
                              </View>
                            </View>
                            <ChevronRight size={20} color={Colors.textLight} />
                          </View>
                        </Card>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textLight,
  },
  logo: {
    width: 56,
    height: 56,
  },
  content: {
    padding: 24,
    paddingTop: 8,
    paddingBottom: 100,
  },
  overviewCard: {
    marginBottom: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  overviewStats: {
    flex: 1,
  },
  overviewNumber: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: 4,
  },
  overviewLabel: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  levelSection: {
    marginBottom: 32,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  levelTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 4,
  },
  levelSubtitle: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  levelProgress: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: Colors.surfaceGray,
  },
  progressText: {
    ...Typography.bodySmall,
    color: Colors.text,
    fontWeight: '600',
  },
  progressBar: {
    marginBottom: 16,
  },
  tutorials: {
    gap: 12,
  },
  tutorialCard: {
    padding: 16,
  },
  tutorialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tutorialIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tutorialInfo: {
    flex: 1,
  },
  tutorialTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 4,
  },
  tutorialTitleCompleted: {
    color: Colors.success,
  },
  tutorialDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 6,
  },
  tutorialMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    ...Typography.caption,
    color: Colors.textLight,
  },
});
