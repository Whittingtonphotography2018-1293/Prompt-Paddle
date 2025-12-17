import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'not_started' | 'canceled' | 'unpaid' | 'incomplete' | 'loading';

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
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (customerError || !customerData) {
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('stripe_subscriptions')
        .select('status')
        .eq('customer_id', customerData.customer_id)
        .maybeSingle();

      if (subscriptionError || !subscriptionData) {
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      setSubscriptionStatus(subscriptionData.status as SubscriptionStatus);
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
