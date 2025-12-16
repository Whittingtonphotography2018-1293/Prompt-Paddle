/*
  # Optimize Stripe RLS Policies Performance
  
  ## Summary
  This migration optimizes RLS policies and views on Stripe-related tables to improve
  query performance at scale by using scalar subqueries for auth function calls.
  
  ## Performance Issue
  Calling `auth.uid()` directly in RLS policies causes the function to be re-evaluated
  for each row, which produces suboptimal query performance at scale. Wrapping it in
  a scalar subquery `(SELECT auth.uid())` ensures it's evaluated once per query.
  
  ## Changes Made
  
  ### Tables Optimized
  1. `stripe_customers`: "Users can view their own customer data" policy
  2. `stripe_subscriptions`: "Users can view their own subscription data" policy
  3. `stripe_orders`: "Users can view their own order data" policy
  
  ### Views Recreated
  1. `stripe_user_subscriptions`: Updated WHERE clause to use scalar subquery
  2. `stripe_user_orders`: Updated WHERE clause to use scalar subquery
  
  ## Security
  - No security changes - policies maintain the same access control
  - Only performance optimization applied
  - Users can still only view their own Stripe data
  
  ## Notes
  - This follows the recommended pattern from Supabase performance guidelines
  - The scalar subquery is evaluated once per query instead of once per row
  - All Stripe-related queries will now perform significantly better at scale
*/

-- Optimize RLS policy for stripe_customers
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
CREATE POLICY "Users can view their own customer data"
    ON stripe_customers
    FOR SELECT
    TO authenticated
    USING (user_id = (SELECT auth.uid()) AND deleted_at IS NULL);

-- Optimize RLS policy for stripe_subscriptions
DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
CREATE POLICY "Users can view their own subscription data"
    ON stripe_subscriptions
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (SELECT auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );

-- Optimize RLS policy for stripe_orders
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;
CREATE POLICY "Users can view their own order data"
    ON stripe_orders
    FOR SELECT
    TO authenticated
    USING (
        customer_id IN (
            SELECT customer_id
            FROM stripe_customers
            WHERE user_id = (SELECT auth.uid()) AND deleted_at IS NULL
        )
        AND deleted_at IS NULL
    );

-- Recreate stripe_user_subscriptions view with optimized auth.uid() call
DROP VIEW IF EXISTS stripe_user_subscriptions;
CREATE VIEW stripe_user_subscriptions WITH (security_invoker = true) AS
SELECT
    c.customer_id,
    s.subscription_id,
    s.status as subscription_status,
    s.price_id,
    s.current_period_start,
    s.current_period_end,
    s.cancel_at_period_end,
    s.payment_method_brand,
    s.payment_method_last4
FROM stripe_customers c
LEFT JOIN stripe_subscriptions s ON c.customer_id = s.customer_id
WHERE c.user_id = (SELECT auth.uid())
AND c.deleted_at IS NULL
AND s.deleted_at IS NULL;

GRANT SELECT ON stripe_user_subscriptions TO authenticated;

-- Recreate stripe_user_orders view with optimized auth.uid() call
DROP VIEW IF EXISTS stripe_user_orders;
CREATE VIEW stripe_user_orders WITH (security_invoker = true) AS
SELECT
    c.customer_id,
    o.id as order_id,
    o.checkout_session_id,
    o.payment_intent_id,
    o.amount_subtotal,
    o.amount_total,
    o.currency,
    o.payment_status,
    o.status as order_status,
    o.created_at as order_date
FROM stripe_customers c
LEFT JOIN stripe_orders o ON c.customer_id = o.customer_id
WHERE c.user_id = (SELECT auth.uid())
AND c.deleted_at IS NULL
AND o.deleted_at IS NULL;

GRANT SELECT ON stripe_user_orders TO authenticated;
