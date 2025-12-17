/*
  # Remove Stripe Subscription System

  This migration removes all Stripe-related database objects to eliminate the paywall system.

  1. Tables Removed
    - `stripe_customers` - Customer mapping to Stripe
    - `stripe_subscriptions` - Subscription details
    - `stripe_orders` - Order history

  2. Security
    - All RLS policies for these tables will be automatically dropped

  3. Notes
    - This is a permanent removal of the paywall system
    - All subscription data will be deleted
*/

DROP TABLE IF EXISTS stripe_orders CASCADE;
DROP TABLE IF EXISTS stripe_subscriptions CASCADE;
DROP TABLE IF EXISTS stripe_customers CASCADE;

DROP TYPE IF EXISTS stripe_subscription_status CASCADE;
DROP TYPE IF EXISTS stripe_order_status CASCADE;