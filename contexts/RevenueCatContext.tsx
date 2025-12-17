import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

interface RevenueCatContextType {
  isConfigured: boolean;
  userId: string | null;
  hasActiveEntitlement: boolean;
  offerings: any | null;
  purchasePackage: (pkg: any) => Promise<{ success: boolean; error?: any }>;
  restorePurchases: () => Promise<{ success: boolean; error?: any }>;
  loading: boolean;
}

const RevenueCatContext = createContext<RevenueCatContextType | undefined>(undefined);

export function RevenueCatProvider({ children }: { children: React.ReactNode }) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [hasActiveEntitlement, setHasActiveEntitlement] = useState(false);
  const [offerings, setOfferings] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeRevenueCat();
  }, []);

  const initializeRevenueCat = async () => {
    try {
      if (Platform.OS === 'web') {
        console.log('RevenueCat is not available on web platform');
        setLoading(false);
        return;
      }

      const Purchases = require('react-native-purchases').default;

      const apiKey =
        Platform.OS === 'ios'
          ? process.env.EXPO_PUBLIC_REVENUECAT_IOS_KEY ||
            Constants.expoConfig?.extra?.revenueCatApiKey?.ios
          : process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_KEY ||
            Constants.expoConfig?.extra?.revenueCatApiKey?.android;

      if (!apiKey) {
        console.warn('RevenueCat API key not found');
        setLoading(false);
        return;
      }

      await Purchases.configure({ apiKey });
      setIsConfigured(true);

      await loadOfferings();
      await checkEntitlements();
    } catch (error) {
      console.error('Error initializing RevenueCat:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadOfferings = async () => {
    if (Platform.OS === 'web') return;

    try {
      const Purchases = require('react-native-purchases').default;
      const offerings = await Purchases.getOfferings();
      setOfferings(offerings);
    } catch (error) {
      console.error('Error loading offerings:', error);
    }
  };

  const checkEntitlements = async () => {
    if (Platform.OS === 'web') return;

    try {
      const Purchases = require('react-native-purchases').default;
      const customerInfo = await Purchases.getCustomerInfo();
      const hasPremium =
        typeof customerInfo.entitlements.active.premium !== 'undefined';
      setHasActiveEntitlement(hasPremium);
    } catch (error) {
      console.error('Error checking entitlements:', error);
    }
  };

  const purchasePackage = async (pkg: any) => {
    if (Platform.OS === 'web') {
      return { success: false, error: 'Not available on web' };
    }

    try {
      const Purchases = require('react-native-purchases').default;
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      const hasPremium =
        typeof customerInfo.entitlements.active.premium !== 'undefined';
      setHasActiveEntitlement(hasPremium);
      return { success: true };
    } catch (error: any) {
      if (!error.userCancelled) {
        console.error('Error purchasing package:', error);
      }
      return { success: false, error };
    }
  };

  const restorePurchases = async () => {
    if (Platform.OS === 'web') {
      return { success: false, error: 'Not available on web' };
    }

    try {
      const Purchases = require('react-native-purchases').default;
      const customerInfo = await Purchases.restorePurchases();
      const hasPremium =
        typeof customerInfo.entitlements.active.premium !== 'undefined';
      setHasActiveEntitlement(hasPremium);
      return { success: true };
    } catch (error) {
      console.error('Error restoring purchases:', error);
      return { success: false, error };
    }
  };

  return (
    <RevenueCatContext.Provider
      value={{
        isConfigured,
        userId,
        hasActiveEntitlement,
        offerings,
        purchasePackage,
        restorePurchases,
        loading,
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
