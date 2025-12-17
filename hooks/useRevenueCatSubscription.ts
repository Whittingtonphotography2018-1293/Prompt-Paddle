import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useRevenueCat } from '@/contexts/RevenueCatContext';

export function useRevenueCatSubscription() {
  const { user } = useAuth();
  const { hasActiveEntitlement, loading: rcLoading } = useRevenueCat();
  const [dbHasSubscription, setDbHasSubscription] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDbHasSubscription(false);
      setLoading(false);
      return;
    }

    checkDatabaseSubscription();
  }, [user]);

  const checkDatabaseSubscription = async () => {
    if (!user) {
      setDbHasSubscription(false);
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
        setDbHasSubscription(false);
        setLoading(false);
        return;
      }

      if (data) {
        if (data.expires_at) {
          const expiresAt = new Date(data.expires_at);
          const isStillActive = expiresAt > new Date();
          setDbHasSubscription(isStillActive);
        } else {
          setDbHasSubscription(true);
        }
      } else {
        setDbHasSubscription(false);
      }
    } catch (err) {
      console.error('Error checking subscription:', err);
      setDbHasSubscription(false);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = hasActiveEntitlement || dbHasSubscription;

  return {
    hasActiveSubscription,
    loading: loading || rcLoading,
    refetchSubscription: checkDatabaseSubscription,
  };
}
