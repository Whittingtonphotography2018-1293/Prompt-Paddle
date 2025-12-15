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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Target, Flame, BookOpen, ArrowRight } from 'lucide-react-native';
import { UserProgress, Profile } from '@/types/database';

export default function HomeTab() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const [profileResult, progressResult] = await Promise.all([
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(),
        supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle(),
      ]);

      if (profileResult.data) setProfile(profileResult.data);
      if (progressResult.data) setProgress(progressResult.data);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getEncouragement = () => {
    if (!progress) return 'Ready to start your AI journey?';

    const totalActivity = (progress.prompts_created || 0) + (progress.tutorials_completed || 0);

    if (totalActivity === 0) {
      return 'Every expert was once a beginner!';
    } else if (totalActivity < 5) {
      return 'You\'re making great progress!';
    } else {
      return 'Look how far you\'ve come!';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.name}>
              {profile?.preferred_name || 'Friend'}
            </Text>
          </View>
          <Image
            source={require('@/assets/images/paddle_and_speech_bubble_logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Card style={styles.encouragementCard}>
          <Text style={styles.encouragement}>{getEncouragement()}</Text>
        </Card>

        <View style={styles.stats}>
          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Target size={24} color={Colors.secondary} />
            </View>
            <Text style={styles.statValue}>{progress?.prompts_created || 0}</Text>
            <Text style={styles.statLabel}>Prompts Created</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Flame size={24} color={Colors.accent} />
            </View>
            <Text style={styles.statValue}>{progress?.current_streak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <BookOpen size={24} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>
              {progress?.tutorials_completed || 0}
            </Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/create')}
            activeOpacity={0.7}
          >
            <View style={styles.actionContent}>
              <View>
                <Text style={styles.actionTitle}>Create Your First Prompt</Text>
                <Text style={styles.actionDescription}>
                  Use our guided wizard to build an effective prompt
                </Text>
              </View>
              <ArrowRight size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(tabs)/learn')}
            activeOpacity={0.7}
          >
            <View style={styles.actionContent}>
              <View>
                <Text style={styles.actionTitle}>Start Learning</Text>
                <Text style={styles.actionDescription}>
                  Quick lessons to build your confidence
                </Text>
              </View>
              <ArrowRight size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Tip of the Day</Text>
          <Card style={styles.tipCard}>
            <Text style={styles.tipText}>
              Be specific with your requests! Instead of asking "Tell me about
              marketing," try "Explain 3 simple social media strategies for a
              small bakery."
            </Text>
          </Card>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 4,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
  },
  logo: {
    width: 56,
    height: 56,
  },
  encouragementCard: {
    marginBottom: 24,
    backgroundColor: Colors.primaryLight + '10',
  },
  encouragement: {
    ...Typography.body,
    color: Colors.text,
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textLight,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 16,
  },
  actionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionTitle: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 4,
  },
  actionDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  tipCard: {
    backgroundColor: Colors.accentLight + '20',
  },
  tipText: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 24,
  },
});
