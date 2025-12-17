/*
  # Optimize stripe_customers RLS policy performance

  Improves query performance by preventing auth.uid() from being re-evaluated for each row.
  
  ## Changes
    - Drop existing "Users can view their own customer data" policy
    - Recreate policy with optimized auth.uid() evaluation using subquery
  
  ## Performance Impact
    - auth.uid() now evaluated once per query instead of once per row
    - Significantly improves performance at scale
*/

-- Drop existing policy
DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;

-- Recreate with optimized auth.uid() evaluation
CREATE POLICY "Users can view their own customer data"
  ON stripe_customers
  FOR SELECT
  TO authenticated
  USING (
    user_id = (select auth.uid()) 
    AND deleted_at IS NULL
  );
