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
      const { data: customerData, error: customerError } = await supabase
        .from('stripe_customers')
        .select('customer_id')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .maybeSingle();

      if (customerError) {
        console.error('Error checking customer:', customerError);
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      if (!customerData || !customerData.customer_id) {
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('stripe_subscriptions')
        .select('status')
        .eq('customer_id', customerData.customer_id)
        .is('deleted_at', null)
        .maybeSingle();

      if (subscriptionError) {
        console.error('Error checking subscription:', subscriptionError);
        setSubscriptionStatus('not_started');
        setLoading(false);
        return;
      }

      if (!subscriptionData || !subscriptionData.status) {
        setSubscriptionStatus('not_started');
      } else if (subscriptionData.status === 'active' || subscriptionData.status === 'trialing') {
        setSubscriptionStatus(subscriptionData.status);
      } else if (subscriptionData.status === 'past_due') {
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
