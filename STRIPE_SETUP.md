# Stripe Paywall Setup Guide

This app now includes a Stripe-powered paywall that blocks access to all features until users subscribe.

## How It Works

1. **Loading Screen**: Users see the initial loading screen
2. **Authentication Check**: System checks if user is logged in
3. **Subscription Check**: System verifies if user has an active subscription
4. **Paywall**: If no active subscription, user is redirected to the paywall screen
5. **Full Access**: After successful subscription, users can access the entire app

## Configuration Required

### 1. Set Your Stripe Price ID

Update the `.env` file with your Stripe price ID:

```
EXPO_PUBLIC_STRIPE_PRICE_ID=price_your_actual_price_id
```

To get your Price ID:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Products
3. Create or select a product
4. Copy the Price ID (starts with `price_`)

### 2. Configure Stripe Webhooks

The webhook endpoint is already set up at:
```
https://olpmknbaxshfqbcazfzv.supabase.co/functions/v1/stripe-webhook
```

In your Stripe Dashboard:
1. Go to Developers > Webhooks
2. Add endpoint with the URL above
3. Select these events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `payment_intent.succeeded`

## Files Added/Modified

### New Files
- `app/paywall.tsx` - Paywall screen with subscription UI
- `hooks/useSubscription.ts` - Hook to check subscription status
- `STRIPE_SETUP.md` - This setup guide

### Modified Files
- `app/index.tsx` - Added subscription check before routing
- `app/_layout.tsx` - Added paywall route
- `types/env.d.ts` - Added Stripe price ID type
- `.env` - Added Stripe price ID variable

## Database Tables

The following tables are already set up in your Supabase database:
- `stripe_customers` - Links users to Stripe customers
- `stripe_subscriptions` - Stores subscription status
- `stripe_orders` - Tracks one-time payments

## Testing

1. Make sure your Stripe secret key is configured in Supabase
2. Update the price ID in `.env`
3. Test the subscription flow:
   - User signs up/logs in
   - Gets redirected to paywall
   - Clicks "Start Subscription"
   - Completes Stripe checkout
   - Gets redirected back and can access the app

## Customization

You can customize the paywall in `app/paywall.tsx`:
- Change the price display
- Modify features list
- Update styling and colors
- Change subscription period (monthly/yearly)
