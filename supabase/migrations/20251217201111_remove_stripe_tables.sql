/*
  # Remove Stripe Tables and Types

  This migration removes all Stripe-related database objects as the app is migrating to RevenueCat.

  1. Drops Tables
    - `stripe_subscriptions` - Stripe subscription data
    - `stripe_customers` - Stripe customer mappings
    - `stripe_orders` - Stripe order records

  2. Drops Types
    - `stripe_subscription_status` - Enum for subscription statuses
    - `stripe_order_status` - Enum for order statuses

  3. Notes
    - All data will be lost
    - This is part of migration to RevenueCat
    - No rollback is provided
*/

-- Drop tables (order matters due to foreign keys)
DROP TABLE IF EXISTS stripe_subscriptions CASCADE;
DROP TABLE IF EXISTS stripe_orders CASCADE;
DROP TABLE IF EXISTS stripe_customers CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS stripe_subscription_status CASCADE;
DROP TYPE IF EXISTS stripe_order_status CASCADE;
