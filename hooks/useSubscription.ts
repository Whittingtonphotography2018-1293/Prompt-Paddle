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
        .from('stripe_user_subscriptions')
        .select('subscription_status')
        .maybeSingle();

      if (error) {
        console.error('Error checking subscription:', error);
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      if (!data || !data.subscription_status) {
        setSubscriptionStatus('not_started');
      } else if (data.subscription_status === 'active' || data.subscription_status === 'trialing') {
        setSubscriptionStatus(data.subscription_status);
      } else if (data.subscription_status === 'past_due') {
        setSubscriptionStatus('past_due');
      } else {
        setSubscriptionStatus('inactive');
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
