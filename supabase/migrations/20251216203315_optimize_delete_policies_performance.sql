/*
  # Optimize DELETE Policy Performance
  
  ## Summary
  This migration optimizes RLS DELETE policies to improve query performance at scale
  by using scalar subqueries for auth function calls.
  
  ## Performance Issue
  Calling `auth.uid()` directly in RLS policies causes the function to be re-evaluated
  for each row, which produces suboptimal query performance at scale. Wrapping it in
  a scalar subquery `(SELECT auth.uid())` ensures it's evaluated once per query.
  
  ## Changes Made
  
  ### DELETE Policies Optimized
  - `user_progress`: "Users can delete own progress" policy
  - `achievements`: "Users can delete own achievements" policy
  - `learning_modules`: "Users can delete own learning modules" policy
  
  All policies now use `(SELECT auth.uid())` instead of `auth.uid()` for optimal performance.
  
  ## Security
  - No security changes - policies maintain the same access control
  - Only performance optimization applied
  - Users can still only delete their own records
  
  ## Notes
  - This follows the recommended pattern from Supabase performance guidelines
  - The scalar subquery is evaluated once per query instead of once per row
  - Other policies (SELECT, INSERT, UPDATE) were already optimized in previous migrations
*/

-- Optimize DELETE policy for user_progress
DROP POLICY IF EXISTS "Users can delete own progress" ON public.user_progress;
CREATE POLICY "Users can delete own progress"
  ON public.user_progress
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Optimize DELETE policy for achievements
DROP POLICY IF EXISTS "Users can delete own achievements" ON public.achievements;
CREATE POLICY "Users can delete own achievements"
  ON public.achievements
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Optimize DELETE policy for learning_modules
DROP POLICY IF EXISTS "Users can delete own learning modules" ON public.learning_modules;
CREATE POLICY "Users can delete own learning modules"
  ON public.learning_modules
  FOR DELETE
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);
