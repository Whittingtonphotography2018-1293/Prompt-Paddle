import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'not_started' | 'inactive' | 'loading';

export function useSubscription() {
  const { user } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setSubscriptionStatus('not_started');
      setLoading(false);
      return;
    }

    checkSubscription();
  }, [user]);

  const checkSubscription = async () => {
    if (!user) {
      setSubscriptionStatus('not_started');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('revenuecat_entitlements')
        .select('is_active, expires_at')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      if (data) {
        if (data.expires_at) {
          const expiresAt = new Date(data.expires_at);
          const isStillActive = expiresAt > new Date();
          setSubscriptionStatus(isStillActive ? 'active' : 'inactive');
        } else {
          setSubscriptionStatus('active');
        }
      } else {
        setSubscriptionStatus('not_started');
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      setSubscriptionStatus('not_started');
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = subscriptionStatus === 'active' || subscriptionStatus === 'trialing';

  return {
    subscriptionStatus,
    hasActiveSubscription,
    loading,
    refetchSubscription: checkSubscription,
  };
}
