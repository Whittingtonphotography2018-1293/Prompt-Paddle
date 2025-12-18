# RevenueCat Integration Setup Guide

This guide provides complete instructions for setting up and testing RevenueCat subscriptions in your Prompt Paddle app.

## Prerequisites

Since RevenueCat requires native code, you must:

1. Export this project from Bolt to your local machine
2. Open the project in a local IDE (VS Code, Cursor, etc.)
3. Create an Expo development build to test on a real device

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

The `@revenuecat/purchases-expo` SDK is already added to package.json.

### 2. Configure Your API Key

The API key is already configured in `app.json`:

```json
{
  "plugins": [
    [
      "@revenuecat/purchases-expo",
      {
        "apiKey": "test_AkeCwmiiQBTBpcZrpPqAhjIgqee"
      }
    ]
  ]
}
```

**Important:** Replace this test API key with your production API key before releasing your app.

### 3. Create Development Build

RevenueCat does NOT work in Expo Go. You must create a development build:

```bash
# For iOS
npx expo run:ios

# For Android
npx expo run:android
```

Or use EAS Build:

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Create development build
eas build --profile development --platform ios
```

### 4. Configure Products in RevenueCat Dashboard

1. Go to [RevenueCat Dashboard](https://app.revenuecat.com)
2. Navigate to your project
3. Go to **Products** section
4. Create three products with these identifiers:
   - `weekly` - Weekly subscription
   - `monthly` - Monthly subscription
   - `yearly` - Annual subscription

5. Create an offering called `default` and add all three products to it

6. Configure the entitlement:
   - Entitlement ID: `Prompt Paddle`
   - Attach all three products to this entitlement

### 5. Configure App Store Connect / Google Play

#### For iOS (App Store Connect)

1. Create your subscription products in App Store Connect
2. Use the same product IDs: `weekly`, `monthly`, `yearly`
3. Configure pricing for each subscription
4. Link these products to RevenueCat

#### For Android (Google Play Console)

1. Create your subscription products in Google Play Console
2. Use the same product IDs: `weekly`, `monthly`, `yearly`
3. Configure pricing for each subscription
4. Link these products to RevenueCat

## Implementation Overview

### Context Provider

The `RevenueCatProvider` in `contexts/RevenueCatContext.tsx` handles:

- SDK initialization
- User login/identification
- Customer info management
- Purchase handling
- Restore purchases
- Subscription status

### Components Created

1. **Paywall Screen** (`app/paywall.tsx`)
   - Displays available subscription packages
   - Handles purchase flow
   - Shows pricing and features
   - Restore purchases button

2. **Customer Center** (`components/CustomerCenter.tsx`)
   - View active subscription details
   - Manage subscription
   - Restore purchases
   - Shows subscription status

3. **Subscription Gate** (`components/SubscriptionGate.tsx`)
   - Reusable component for gating premium features
   - Shows upgrade prompt for non-subscribers
   - Customizable messaging

## Usage Examples

### Checking Subscription Status

```typescript
import { useRevenueCat } from '@/contexts/RevenueCatContext';

function MyComponent() {
  const { isProUser, loading } = useRevenueCat();

  if (loading) return <LoadingSpinner />;

  if (isProUser) {
    return <PremiumFeature />;
  } else {
    return <UpgradePrompt />;
  }
}
```

### Gating Features with SubscriptionGate

```typescript
import SubscriptionGate from '@/components/SubscriptionGate';

function PremiumFeature() {
  return (
    <SubscriptionGate
      featureName="advanced templates"
      customMessage="Unlock all advanced templates with Pro"
    >
      <AdvancedTemplates />
    </SubscriptionGate>
  );
}
```

### Showing the Paywall

```typescript
import { useRouter } from 'expo-router';

function UpgradeButton() {
  const router = useRouter();

  return (
    <Button
      title="Upgrade to Pro"
      onPress={() => router.push('/paywall')}
    />
  );
}
```

### Accessing Customer Info

```typescript
import { useRevenueCat } from '@/contexts/RevenueCatContext';

function SubscriptionStatus() {
  const { customerInfo, isProUser } = useRevenueCat();

  const activeEntitlement = customerInfo?.entitlements.active['Prompt Paddle'];
  const expirationDate = activeEntitlement?.expirationDate;

  return (
    <View>
      <Text>Status: {isProUser ? 'Pro' : 'Free'}</Text>
      {expirationDate && (
        <Text>Expires: {new Date(expirationDate).toLocaleDateString()}</Text>
      )}
    </View>
  );
}
```

## Testing Subscriptions

### iOS Testing with Sandbox

1. Create a sandbox test user in App Store Connect
2. Sign out of your Apple ID on your device
3. When prompted during purchase, sign in with sandbox account
4. Subscriptions in sandbox renew much faster than production:
   - 1 week subscription = 3 minutes
   - 1 month subscription = 5 minutes
   - 1 year subscription = 1 hour

### Android Testing with Test Tracks

1. Create a closed or internal testing track in Google Play Console
2. Add test users to the track
3. Install the app from the testing track
4. Purchases will be in test mode automatically

### Testing Restore Purchases

1. Make a purchase on one device
2. Install the app on another device (or delete and reinstall)
3. Sign in with the same account
4. Tap "Restore Purchases" in the paywall or Customer Center
5. Verify the subscription is restored

## Common Issues and Solutions

### Issue: "Purchases are not supported on web"

**Solution:** RevenueCat only works on iOS and Android. The code includes web checks that show appropriate messages.

### Issue: "No offerings found"

**Solutions:**
1. Verify products are configured in RevenueCat Dashboard
2. Check that offering ID is `default`
3. Ensure products are attached to the offering
4. Wait a few minutes for RevenueCat to sync

### Issue: Purchase fails immediately

**Solutions:**
1. Verify you're using a real device (not simulator for production)
2. For iOS: Ensure you're signed in with sandbox account
3. For Android: Ensure app is installed from Play Store testing track
4. Check RevenueCat Dashboard for error logs

### Issue: Entitlement not active after purchase

**Solutions:**
1. Verify entitlement ID matches exactly: `Prompt Paddle`
2. Check that products are attached to the entitlement
3. Call `refreshCustomerInfo()` to force a sync
4. Check RevenueCat Dashboard customer page

## Production Deployment

Before deploying to production:

1. **Update API Key**
   - Replace test API key in `app.json` with production key
   - Get production key from RevenueCat Dashboard

2. **Configure Products**
   - Create production products in App Store Connect / Google Play
   - Link to RevenueCat production environment
   - Test thoroughly in TestFlight / Internal Testing

3. **Test Payment Flow**
   - Test on real devices
   - Verify purchases complete successfully
   - Test restore purchases
   - Test subscription renewal
   - Test subscription cancellation

4. **Review Configuration**
   - Double-check entitlement ID
   - Verify offering configuration
   - Test all subscription tiers
   - Ensure Customer Center works

## Security Best Practices

1. **Never hardcode production API keys in client code**
   - Use Expo's secure storage for sensitive data
   - Consider using environment variables

2. **Validate purchases server-side**
   - Set up webhooks in RevenueCat Dashboard
   - Validate entitlements on your backend
   - Store subscription status in Supabase

3. **Handle edge cases**
   - Expired subscriptions
   - Cancelled subscriptions
   - Refunded purchases
   - Promotional offers

## Additional Resources

- [RevenueCat Documentation](https://www.revenuecat.com/docs)
- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [RevenueCat Expo SDK](https://www.revenuecat.com/docs/getting-started/installation/expo)
- [Testing Subscriptions](https://www.revenuecat.com/docs/test-and-launch/sandbox)

## Support

If you encounter issues:

1. Check RevenueCat Dashboard for errors and logs
2. Review customer info in RevenueCat
3. Enable debug logging in the app (already enabled in development)
4. Contact RevenueCat support with transaction details
