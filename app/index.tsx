import { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/lib/supabase';
import { Colors } from '@/constants/Colors';

export default function Index() {
  const { user, loading: authLoading } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    if (authLoading || subscriptionLoading) return;

    const checkAccess = async () => {
      if (!user) {
        router.replace('/onboarding/welcome');
        return;
      }

      if (!hasActiveSubscription) {
        router.replace('/paywall');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', user.id)
        .maybeSingle();

      if (!profile?.onboarding_completed) {
        router.replace('/onboarding/comfort-assessment');
      } else {
        router.replace('/(tabs)');
      }
    };

    checkAccess();
  }, [user, authLoading, hasActiveSubscription, subscriptionLoading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});
