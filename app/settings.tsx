import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { ArrowLeft, User, Mail, Target, Calendar, FileText, Shield, CreditCard } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import { Profile } from '@/types/database';
import { useSubscription } from '@/hooks/useSubscription';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [preferredName, setPreferredName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const { subscriptionStatus, hasActiveSubscription, loading: subscriptionLoading, refetchSubscription } = useSubscription();

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
        setPreferredName(data.preferred_name || '');
      }
      setLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        preferred_name: preferredName.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    setSaving(false);

    if (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } else {
      Alert.alert('Success', 'Your profile has been updated!');
      router.back();
    }
  };

  const handleResetComfortLevel = () => {
    Alert.alert(
      'Reset Comfort Level',
      'This will take you back through the onboarding assessment. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            await supabase
              .from('profiles')
              .update({
                onboarding_completed: false,
                comfort_level: 1,
                updated_at: new Date().toISOString(),
              })
              .eq('id', user.id);
            router.replace('/onboarding/welcome');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            await signOut();
            router.replace('/onboarding/welcome');
          },
        },
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your weekly membership? You will lose access to premium features at the end of your current billing period.',
      [
        { text: 'Keep Subscription', style: 'cancel' },
        {
          text: 'Cancel Subscription',
          style: 'destructive',
          onPress: async () => {
            if (!user) return;
            setCanceling(true);

            try {
              const session = await supabase.auth.getSession();
              const token = session.data.session?.access_token;

              if (!token) {
                Alert.alert('Error', 'Unable to authenticate. Please try again.');
                setCanceling(false);
                return;
              }

              const apiUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/stripe-cancel-subscription`;
              const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();

              if (!response.ok) {
                throw new Error(data.error || 'Failed to cancel subscription');
              }

              Alert.alert(
                'Subscription Canceled',
                'Your subscription has been canceled. You will still have access to premium features until the end of your current billing period.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      refetchSubscription();
                    },
                  },
                ]
              );
            } catch (error: any) {
              console.error('Cancel subscription error:', error);
              Alert.alert('Error', error.message || 'Failed to cancel subscription. Please try again.');
            } finally {
              setCanceling(false);
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Image
          source={require('@/assets/images/paddle_and_speech_bubble_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <User size={20} color={Colors.textLight} />
              <Text style={styles.inputLabelText}>Display Name</Text>
            </View>
            <Input
              value={preferredName}
              onChangeText={setPreferredName}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Mail size={20} color={Colors.textLight} />
              <Text style={styles.inputLabelText}>Email</Text>
            </View>
            <View style={styles.readOnlyField}>
              <Text style={styles.readOnlyText}>{profile?.email}</Text>
            </View>
            <Text style={styles.helperText}>
              Email cannot be changed at this time
            </Text>
          </View>

          {profile && (
            <>
              <View style={styles.inputGroup}>
                <View style={styles.inputLabel}>
                  <Target size={20} color={Colors.textLight} />
                  <Text style={styles.inputLabelText}>Comfort Level</Text>
                </View>
                <View style={styles.readOnlyField}>
                  <Text style={styles.readOnlyText}>
                    Level {profile.comfort_level}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleResetComfortLevel}>
                  <Text style={styles.linkText}>Retake assessment</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputGroup}>
                <View style={styles.inputLabel}>
                  <Calendar size={20} color={Colors.textLight} />
                  <Text style={styles.inputLabelText}>Member Since</Text>
                </View>
                <View style={styles.readOnlyField}>
                  <Text style={styles.readOnlyText}>
                    {formatDate(profile.created_at)}
                  </Text>
                </View>
              </View>
            </>
          )}

          <Button
            title={saving ? 'Saving...' : 'Save Changes'}
            onPress={handleSave}
            size="large"
            style={styles.saveButton}
            disabled={saving}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <Text style={styles.sectionDescription}>
            Manage your membership and billing
          </Text>

          {subscriptionLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.primary} />
              <Text style={styles.loadingText}>Loading subscription...</Text>
            </View>
          ) : (
            <>
              <View style={styles.inputGroup}>
                <View style={styles.inputLabel}>
                  <CreditCard size={20} color={Colors.textLight} />
                  <Text style={styles.inputLabelText}>Status</Text>
                </View>
                <View style={styles.readOnlyField}>
                  <Text style={styles.readOnlyText}>
                    {hasActiveSubscription
                      ? subscriptionStatus === 'trialing'
                        ? 'Trial Period'
                        : 'Active Membership'
                      : 'No Active Subscription'}
                  </Text>
                </View>
              </View>

              {hasActiveSubscription && (
                <Button
                  title={canceling ? 'Canceling...' : 'Cancel Subscription'}
                  onPress={handleCancelSubscription}
                  variant="outline"
                  size="large"
                  style={styles.dangerButton}
                  disabled={canceling}
                />
              )}
            </>
          )}
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & Privacy</Text>
          <Text style={styles.sectionDescription}>
            View our policies and legal information
          </Text>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => {
              WebBrowser.openBrowserAsync('https://promptpaddle.com/privacy');
            }}
          >
            <Shield size={20} color={Colors.primary} />
            <Text style={styles.legalLinkText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.legalLink}
            onPress={() => {
              WebBrowser.openBrowserAsync('https://promptpaddle.com/terms');
            }}
          >
            <FileText size={20} color={Colors.primary} />
            <Text style={styles.legalLinkText}>Terms of Service</Text>
          </TouchableOpacity>
        </Card>

        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <Text style={styles.sectionDescription}>
            Manage your account settings and preferences
          </Text>

          <Button
            title="Reset Comfort Assessment"
            onPress={handleResetComfortLevel}
            variant="outline"
            size="large"
            style={styles.actionButton}
          />

          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            variant="outline"
            size="large"
            style={styles.dangerButton}
          />
        </Card>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Prompt Paddle v1.0.0</Text>
          <Text style={styles.footerText}>Made with care for prompt engineers</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: 24,
    paddingTop: 8,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
    padding: 20,
  },
  sectionTitle: {
    ...Typography.h4,
    color: Colors.text,
    marginBottom: 8,
  },
  sectionDescription: {
    ...Typography.bodySmall,
    color: Colors.textLight,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  inputLabelText: {
    ...Typography.h5,
    color: Colors.text,
  },
  readOnlyField: {
    backgroundColor: Colors.surfaceGray,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  readOnlyText: {
    ...Typography.body,
    color: Colors.textLight,
  },
  helperText: {
    ...Typography.caption,
    color: Colors.textLighter,
    marginTop: 6,
  },
  linkText: {
    ...Typography.bodySmall,
    color: Colors.primary,
    marginTop: 8,
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 8,
  },
  actionButton: {
    marginBottom: 12,
  },
  dangerButton: {
    marginBottom: 12,
    borderColor: Colors.error,
  },
  legalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.surfaceGray,
    borderRadius: 12,
    marginBottom: 12,
  },
  legalLinkText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textLighter,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 12,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textLight,
  },
});
