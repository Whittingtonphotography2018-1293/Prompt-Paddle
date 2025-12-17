# RevenueCat Integration Guide

This guide will help you integrate RevenueCat for handling in-app purchases and subscriptions in your Expo app.

## Prerequisites

- Apple Developer Account
- RevenueCat Account (free to start)
- Local development environment (Xcode for iOS, Android Studio for Android)
- Your app exported from Bolt and opened locally

## Step 1: Create RevenueCat Account

1. Sign up at [RevenueCat](https://www.revenuecat.com/)
2. Create a new project
3. Add your app in the RevenueCat dashboard

## Step 2: Configure Apple App Store Connect

1. **Create In-App Purchase**:
   - Go to [App Store Connect](https://appstoreconnect.apple.com/)
   - Navigate to your app > In-App Purchases
   - Create new Auto-Renewable Subscription
   - Product ID: `com.promptpaddle.premium.monthly` (or your own)
   - Price: $0.99
   - Duration: 1 month

2. **Get App Store Connect API Key**:
   - In App Store Connect, go to Users and Access > Keys
   - Create a new key with "App Manager" access
   - Download the key file (`.p8`)
   - Save the Key ID and Issuer ID

3. **Add to RevenueCat**:
   - In RevenueCat dashboard, go to your project
   - Navigate to Apps > iOS app > App Store Connect
   - Upload your API key
   - Enter Issuer ID and Key ID

## Step 3: Export Project and Install Dependencies

```bash
# Export your Expo project (run locally)
npx expo prebuild

# Install RevenueCat SDK
npm install react-native-purchases

# Install pods (iOS only)
cd ios && pod install && cd ..
```

## Step 4: Configure RevenueCat in Your App

### Update app.json

Add RevenueCat API keys:

```json
{
  "expo": {
    "extra": {
      "revenueCatApiKey": {
        "ios": "appl_YOUR_IOS_KEY",
        "android": "goog_YOUR_ANDROID_KEY"
      }
    }
  }
}
```

### Update .env

Add your RevenueCat API keys:

```
EXPO_PUBLIC_REVENUECAT_IOS_KEY=appl_YOUR_IOS_KEY
EXPO_PUBLIC_REVENUECAT_ANDROID_KEY=goog_YOUR_ANDROID_KEY
```

## Step 5: Create RevenueCat Configuration

The following files have been prepared for you:

- `contexts/RevenueCatContext.tsx` - RevenueCat provider
- `hooks/useRevenueCat.ts` - Hook for accessing subscriptions
- `app/paywall-revenuecat.tsx` - New paywall using RevenueCat

## Step 6: Update Database Schema

Your Supabase database needs a new table for RevenueCat entitlements:

```sql
-- Migration already created: see supabase/migrations/
-- This will track user entitlements from RevenueCat
```

## Step 7: Configure RevenueCat Dashboard

1. **Create Entitlements**:
   - Go to RevenueCat dashboard > Entitlements
   - Create entitlement: "premium"

2. **Create Offerings**:
   - Go to Offerings
   - Create offering: "default"
   - Add package: "Monthly Premium"
   - Link to your App Store product ID

3. **Configure Products**:
   - Add your App Store product: `com.promptpaddle.premium.monthly`

## Step 8: Testing

### iOS Sandbox Testing

1. **Create Sandbox Tester**:
   - App Store Connect > Users and Access > Sandbox Testers
   - Create test account

2. **Test on Device**:
   ```bash
   # Create development build
   npx expo run:ios

   # Or use EAS Build
   eas build --profile development --platform ios
   ```

3. **Sign in with sandbox account** when prompted to purchase

### Important Testing Notes

- Use real devices or simulators (not Bolt preview)
- Always test with sandbox accounts, never real money
- Test subscription flows: purchase, restore, cancel
- Verify RevenueCat dashboard shows transactions

## Step 9: Update Your App Code

### Replace Stripe with RevenueCat

1. **Update _layout.tsx**:
   ```typescript
   import { RevenueCatProvider } from '@/contexts/RevenueCatContext';

   // Wrap your app with RevenueCatProvider
   ```

2. **Update navigation**:
   - Change paywall route to use `paywall-revenuecat.tsx`

3. **Update subscription checks**:
   - Use `useRevenueCat()` hook instead of `useSubscription()`

## Step 10: Webhook Configuration

1. **Configure RevenueCat Webhook**:
   - Go to RevenueCat dashboard > Integrations > Webhooks
   - Add webhook URL: `https://olpmknbaxshfqbcazfzv.supabase.co/functions/v1/revenuecat-webhook`
   - Select events to send:
     - Initial Purchase
     - Renewal
     - Cancellation
     - Expiration
     - Billing Issues
     - Uncancellation
   - Save the webhook configuration

2. **Edge function already deployed**:
   - `supabase/functions/revenuecat-webhook/index.ts`
   - Automatically syncs RevenueCat entitlements to your database

## Common Issues

### "Unable to find Expo modules"
- Run `npx expo prebuild` again
- Clean build folders: `rm -rf ios/build android/build`

### "Purchase failed"
- Verify product ID matches exactly
- Check RevenueCat offering configuration
- Ensure sandbox tester is signed in

### "App crashes on launch"
- Check RevenueCat API keys are correct
- Verify native build is up to date

## Migration from Stripe

Your app currently uses Stripe. To migrate:

1. Keep both systems temporarily for existing subscribers
2. New users go through RevenueCat
3. Gradually migrate existing users
4. Eventually remove Stripe code

## Production Checklist

- [ ] RevenueCat API keys added to environment
- [ ] App Store Connect configured with IAP
- [ ] RevenueCat offerings and entitlements configured
- [ ] Webhook configured and tested
- [ ] Tested purchase flow end-to-end
- [ ] Tested restore purchases
- [ ] Tested subscription cancellation
- [ ] Privacy policy updated with RevenueCat
- [ ] Terms of service reviewed

## Resources

- [RevenueCat Expo Guide](https://www.revenuecat.com/docs/getting-started/installation/expo)
- [RevenueCat Documentation](https://www.revenuecat.com/docs)
- [Apple Sandbox Testing](https://developer.apple.com/documentation/storekit/in-app_purchase/testing_in-app_purchases_in_xcode)

## Need Help?

- RevenueCat Support: https://community.revenuecat.com/
- Expo Forums: https://forums.expo.dev/
