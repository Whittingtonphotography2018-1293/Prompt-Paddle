/*
  # Fix RLS Performance and Security Issues

  1. Performance Improvements
    - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()`
    - This prevents re-evaluation of auth.uid() for each row, significantly improving query performance at scale
    - Remove unused indexes that are not being utilized

  2. Security Improvements
    - Fix function search_path for `update_updated_at_column` to be immutable

  3. Tables Updated
    - profiles: 3 policies optimized
    - user_progress: 3 policies optimized
    - prompts_library: 4 policies optimized
    - achievements: 3 policies optimized
    - learning_modules: 3 policies optimized
    - platform_preferences: 4 policies optimized

  4. Indexes Removed
    - idx_prompts_user_id (unused)
    - idx_prompts_created_at (unused)
    - idx_platform_preferences_user_id (unused)

  5. Notes
    - All policies maintain the same security model but with better performance
    - The `(select auth.uid())` pattern is evaluated once per query instead of once per row
*/

-- Drop and recreate profiles policies with optimized performance
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

-- Drop and recreate user_progress policies with optimized performance
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;

CREATE POLICY "Users can view own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- Drop and recreate prompts_library policies with optimized performance
DROP POLICY IF EXISTS "Users can view own prompts" ON prompts_library;
DROP POLICY IF EXISTS "Users can insert own prompts" ON prompts_library;
DROP POLICY IF EXISTS "Users can update own prompts" ON prompts_library;
DROP POLICY IF EXISTS "Users can delete own prompts" ON prompts_library;

CREATE POLICY "Users can view own prompts"
  ON prompts_library
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own prompts"
  ON prompts_library
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own prompts"
  ON prompts_library
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own prompts"
  ON prompts_library
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Drop and recreate achievements policies with optimized performance
DROP POLICY IF EXISTS "Users can view own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can insert own achievements" ON achievements;
DROP POLICY IF EXISTS "Users can update own achievements" ON achievements;

CREATE POLICY "Users can view own achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own achievements"
  ON achievements
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Drop and recreate learning_modules policies with optimized performance
DROP POLICY IF EXISTS "Users can view own learning modules" ON learning_modules;
DROP POLICY IF EXISTS "Users can insert own learning modules" ON learning_modules;
DROP POLICY IF EXISTS "Users can update own learning modules" ON learning_modules;

CREATE POLICY "Users can view own learning modules"
  ON learning_modules
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own learning modules"
  ON learning_modules
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own learning modules"
  ON learning_modules
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- Drop and recreate platform_preferences policies with optimized performance
DROP POLICY IF EXISTS "Users can view own platform preferences" ON platform_preferences;
DROP POLICY IF EXISTS "Users can insert own platform preferences" ON platform_preferences;
DROP POLICY IF EXISTS "Users can update own platform preferences" ON platform_preferences;
DROP POLICY IF EXISTS "Users can delete own platform preferences" ON platform_preferences;

CREATE POLICY "Users can view own platform preferences"
  ON platform_preferences
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own platform preferences"
  ON platform_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own platform preferences"
  ON platform_preferences
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own platform preferences"
  ON platform_preferences
  FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- Remove unused indexes
DROP INDEX IF EXISTS idx_prompts_user_id;
DROP INDEX IF EXISTS idx_prompts_created_at;
DROP INDEX IF EXISTS idx_platform_preferences_user_id;

-- Fix function search_path to be immutable (use CREATE OR REPLACE to avoid dependency issues)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;