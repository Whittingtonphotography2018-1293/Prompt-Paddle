import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { BADGES } from '@/data/tutorials';
import { Trophy, Flame, Target, BookOpen, Settings } from 'lucide-react-native';
import { UserProgress, Profile, Achievement } from '@/types/database';

export default function ProfileTab() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      const [profileResult, progressResult, achievementsResult] =
        await Promise.all([
          supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
          supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle(),
          supabase
            .from('achievements')
            .select('*')
            .eq('user_id', user.id)
            .order('earned_at', { ascending: false }),
        ]);

      if (profileResult.data) setProfile(profileResult.data);
      if (progressResult.data) setProgress(progressResult.data);
      if (achievementsResult.data) setAchievements(achievementsResult.data);
      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/onboarding/welcome');
        },
      },
    ]);
  };

  const earnedBadgeTypes = new Set(achievements.map((a) => a.badge_type));
  const totalBadges = BADGES.length;
  const earnedCount = earnedBadgeTypes.size;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/paddle_and_speech_bubble_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Your Progress</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => router.push('/settings')}
        >
          <Settings size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(profile?.preferred_name || profile?.email || 'U')[0].toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {profile?.preferred_name || 'AI Learner'}
              </Text>
              <Text style={styles.profileEmail}>{profile?.email}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Target size={28} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>
              {progress?.prompts_created || 0}
            </Text>
            <Text style={styles.statLabel}>Prompts</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Flame size={28} color={Colors.secondary} />
            </View>
            <Text style={styles.statValue}>{progress?.current_streak || 0}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <BookOpen size={28} color={Colors.accent} />
            </View>
            <Text style={styles.statValue}>
              {progress?.tutorials_completed || 0}
            </Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </Card>

          <Card style={styles.statCard}>
            <View style={styles.statIcon}>
              <Trophy size={28} color={Colors.warning} />
            </View>
            <Text style={styles.statValue}>
              {earnedCount}/{totalBadges}
            </Text>
            <Text style={styles.statLabel}>Badges</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {BADGES.map((badge) => {
            const earned = earnedBadgeTypes.has(badge.type);
            return (
              <Card
                key={badge.type}
                style={earned ? styles.badgeCard : [styles.badgeCard, styles.badgeCardLocked] as any}
              >
                <View style={styles.badgeContent}>
                  <View
                    style={[
                      styles.badgeIcon,
                      !earned && styles.badgeIconLocked,
                    ]}
                  >
                    <Trophy
                      size={24}
                      color={earned ? Colors.warning : Colors.textLighter}
                    />
                  </View>
                  <View style={styles.badgeInfo}>
                    <Text
                      style={[
                        styles.badgeName,
                        !earned && styles.badgeNameLocked,
                      ]}
                    >
                      {badge.name}
                    </Text>
                    <Text
                      style={[
                        styles.badgeDescription,
                        !earned && styles.badgeDescriptionLocked,
                      ]}
                    >
                      {badge.description}
                    </Text>
                    <Text style={styles.badgeRequirement}>
                      {badge.requirement}
                    </Text>
                  </View>
                  {earned && (
                    <View style={styles.earnedBadge}>
                      <Text style={styles.earnedText}>Earned!</Text>
                    </View>
                  )}
                </View>
              </Card>
            );
          })}
        </View>

        <Button
          title="Sign Out"
          onPress={handleSignOut}
          variant="outline"
          size="large"
          style={styles.signOutButton}
        />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
    marginLeft: 12,
  },
  settingsButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    paddingTop: 8,
    paddingBottom: 100,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...Typography.h2,
    color: Colors.surface,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    ...Typography.bodySmall,
    color: Colors.textLight,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
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
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 16,
  },
  badgeCard: {
    marginBottom: 12,
  },
  badgeCardLocked: {
    opacity: 0.6,
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.warning + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconLocked: {
    backgroundColor: Colors.surfaceGray,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeName: {
    ...Typography.h5,
    color: Colors.text,
    marginBottom: 4,
  },
  badgeNameLocked: {
    color: Colors.textLight,
  },
  badgeDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 4,
  },
  badgeDescriptionLocked: {
    color: Colors.textLighter,
  },
  badgeRequirement: {
    ...Typography.caption,
    color: Colors.textLight,
  },
  earnedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: Colors.success + '20',
  },
  earnedText: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: '600',
  },
  signOutButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});
