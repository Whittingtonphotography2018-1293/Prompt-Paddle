# Stripe Setup Guide

This guide will help you set up Stripe payments for your app.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Access to your Supabase project dashboard
- Your app deployed or running locally

## Step 1: Get Your Stripe Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers** → **API Keys**
3. Copy the following keys:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

## Step 2: Create a Product and Price

1. In Stripe Dashboard, go to **Products** → **Add Product**
2. Enter product details:
   - Name: "Premium Subscription"
   - Description: "Full access to all features"
3. Add a price:
   - Pricing model: Recurring
   - Price: $0.99
   - Billing period: Weekly
4. Click **Save product**
5. Copy the **Price ID** (starts with `price_`)

## Step 3: Configure Supabase Edge Functions

1. In your Supabase project dashboard, go to **Edge Functions**
2. Navigate to **Settings**
3. Add the following secrets:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: (We'll set this in Step 5)

## Step 4: Update Environment Variables

Update your `.env` file:

```
EXPO_PUBLIC_STRIPE_PRICE_ID=your_price_id_here
```

Update `app.json`:

```json
{
  "extra": {
    "stripePriceId": "your_price_id_here"
  }
}
```

Update `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_STRIPE_PRICE_ID": "your_price_id_here"
      }
    }
  }
}
```

## Step 5: Set Up Webhooks

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL:
   - Format: `https://[YOUR_PROJECT_REF].supabase.co/functions/v1/stripe-webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add this to your Supabase Edge Functions secrets as `STRIPE_WEBHOOK_SECRET`

## Step 6: Deploy Edge Functions

The following edge functions are already created in your project:

- `stripe-checkout`: Creates a checkout session
- `stripe-webhook`: Handles Stripe webhook events
- `stripe-cancel-subscription`: Cancels a subscription

Make sure these functions are deployed to your Supabase project.

## Step 7: Test Your Integration

1. Run your app and navigate to the paywall
2. Click "Start Subscription"
3. Complete the checkout process using a test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
4. Verify that:
   - The subscription is created in Stripe Dashboard
   - The user is redirected to the success page
   - The subscription data appears in your Supabase database

## Troubleshooting

### Checkout fails to start
- Verify that `STRIPE_SECRET_KEY` is set correctly in Supabase
- Check that the Price ID in your environment variables is correct
- Look at the Edge Function logs for errors

### Webhook not working
- Ensure `STRIPE_WEBHOOK_SECRET` is set correctly
- Verify webhook endpoint URL is correct
- Check that all required events are selected in Stripe

### Subscription not updating in database
- Check webhook logs in Stripe Dashboard
- Verify RLS policies are not blocking webhook updates
- Ensure Edge Function has access to `SUPABASE_SERVICE_ROLE_KEY`

## Security Notes

- Never commit your Stripe secret key to version control
- Always use test mode during development
- Enable Stripe webhook signature verification
- Use HTTPS for all webhook endpoints
- Implement proper error handling in production

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Stripe Testing Cards](https://stripe.com/docs/testing)
