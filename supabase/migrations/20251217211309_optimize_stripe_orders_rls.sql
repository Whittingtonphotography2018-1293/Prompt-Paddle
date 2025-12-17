/*
  # Optimize stripe_orders RLS policy performance

  Improves query performance by preventing auth.uid() from being re-evaluated for each row.
  
  ## Changes
    - Drop existing "Users can view their own order data" policy
    - Recreate policy with optimized auth.uid() evaluation using subquery
  
  ## Performance Impact
    - auth.uid() now evaluated once per query instead of once per row
    - Significantly improves performance at scale
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;

-- Recreate with optimized auth.uid() evaluation
CREATE POLICY "Users can view their own order data"
  ON stripe_orders
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT stripe_customers.customer_id
      FROM stripe_customers
      WHERE stripe_customers.user_id = (select auth.uid())
        AND stripe_customers.deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );
