import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesPackage,
  LOG_LEVEL,
} from '@revenuecat/purchases-expo';
import { REVENUECAT_CONFIG } from '@/constants/RevenueCat';
import { useAuth } from './AuthContext';

interface RevenueCatContextType {
  customerInfo: CustomerInfo | null;
  offerings: PurchasesOfferings | null;
  isProUser: boolean;
  isPurchasing: boolean;
  isRestoring: boolean;
  loading: boolean;
  error: string | null;
  purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
  restorePurchases: () => Promise<void>;
  refreshCustomerInfo: () => Promise<void>;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(
  undefined
);

export function RevenueCatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [offerings, setOfferings] = useState<PurchasesOfferings | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isProUser =
    customerInfo?.entitlements.active[REVENUECAT_CONFIG.entitlementId] !==
    undefined;

  useEffect(() => {
    if (Platform.OS === 'web') {
      setLoading(false);
      return;
    }

    initializeRevenueCat();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    if (!user) return;

    loginUser(user.id);
  }, [user]);

  const initializeRevenueCat = async () => {
    try {
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);

      Purchases.configure({
        apiKey: REVENUECAT_CONFIG.apiKey,
      });

      const [customerInfoResult, offeringsResult] = await Promise.all([
        Purchases.getCustomerInfo(),
        Purchases.getOfferings(),
      ]);

      setCustomerInfo(customerInfoResult);
      setOfferings(offeringsResult);

      Purchases.addCustomerInfoUpdateListener((info: CustomerInfo) => {
        setCustomerInfo(info);
      });
    } catch (err) {
      console.error('Failed to initialize RevenueCat:', err);
      setError('Failed to load subscription information');
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (userId: string) => {
    try {
      const { customerInfo: info } = await Purchases.logIn(userId);
      setCustomerInfo(info);
    } catch (err) {
      console.error('Failed to login user to RevenueCat:', err);
    }
  };

  const purchasePackage = async (pkg: PurchasesPackage) => {
    if (Platform.OS === 'web') {
      setError('Purchases are not supported on web');
      return;
    }

    setIsPurchasing(true);
    setError(null);

    try {
      const { customerInfo: info } = await Purchases.purchasePackage(pkg);
      setCustomerInfo(info);

      if (
        info.entitlements.active[REVENUECAT_CONFIG.entitlementId] !== undefined
      ) {
        console.log('Purchase successful!');
      }
    } catch (err: any) {
      if (!err.userCancelled) {
        console.error('Purchase failed:', err);
        setError(err.message || 'Purchase failed. Please try again.');
      }
    } finally {
      setIsPurchasing(false);
    }
  };

  const restorePurchases = async () => {
    if (Platform.OS === 'web') {
      setError('Restore is not supported on web');
      return;
    }

    setIsRestoring(true);
    setError(null);

    try {
      const info = await Purchases.restorePurchases();
      setCustomerInfo(info);

      if (
        info.entitlements.active[REVENUECAT_CONFIG.entitlementId] !== undefined
      ) {
        console.log('Purchases restored successfully!');
      } else {
        setError('No active subscriptions found');
      }
    } catch (err: any) {
      console.error('Restore failed:', err);
      setError(err.message || 'Failed to restore purchases');
    } finally {
      setIsRestoring(false);
    }
  };

  const refreshCustomerInfo = async () => {
    if (Platform.OS === 'web') return;

    try {
      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
    } catch (err) {
      console.error('Failed to refresh customer info:', err);
    }
  };

  return (
    <RevenueCatContext.Provider
      value={{
        customerInfo,
        offerings,
        isProUser,
        isPurchasing,
        isRestoring,
        loading,
        error,
        purchasePackage,
        restorePurchases,
        refreshCustomerInfo,
      }}
    >
      {children}
    </RevenueCatContext.Provider>
  );
}

export function useRevenueCat() {
  const context = useContext(RevenueCatContext);
  if (context === undefined) {
    throw new Error('useRevenueCat must be used within a RevenueCatProvider');
  }
  return context;
}
