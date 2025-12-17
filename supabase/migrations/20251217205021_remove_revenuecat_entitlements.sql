/*
  # Remove RevenueCat Entitlements Table

  This migration removes the RevenueCat entitlements table as the app has reverted to using Stripe.

  1. Drops Table
    - `revenuecat_entitlements` - RevenueCat subscription entitlements

  2. Notes
    - All data will be lost
    - This completes the reversion to Stripe
*/

DROP TABLE IF EXISTS revenuecat_entitlements CASCADE;
