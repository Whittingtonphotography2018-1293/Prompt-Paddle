/*
  # Fix RLS Security Policies

  ## Summary
  This migration addresses critical security gaps in Row Level Security (RLS) policies
  to ensure users can only access and modify their own data.

  ## Changes Made

  ### 1. Missing DELETE Policies
  Added DELETE policies for tables that were missing them:
  - `achievements`: Users can delete their own achievement records
  - `learning_modules`: Users can delete their own learning module records
  - `user_progress`: Users can delete their own progress records (if needed for reset)

  ### 2. Profile Protection
  Profiles should NOT be deletable by users to maintain data integrity.
  The profiles table intentionally has no DELETE policy.

  ## Security Rationale
  
  - All policies verify `auth.uid()` matches the record owner
  - DELETE policies follow the same security model as SELECT/UPDATE
  - Stripe tables remain read-only for users (correct behavior)
  - Service role can still perform all operations via Edge Functions

  ## Notes
  - These policies ensure data isolation between users
  - All policies are restrictive and check authentication
  - No data can be accessed or modified without proper ownership verification
*/

-- Add DELETE policy for achievements
DROP POLICY IF EXISTS "Users can delete own achievements" ON public.achievements;
CREATE POLICY "Users can delete own achievements"
  ON public.achievements
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add DELETE policy for learning_modules
DROP POLICY IF EXISTS "Users can delete own learning modules" ON public.learning_modules;
CREATE POLICY "Users can delete own learning modules"
  ON public.learning_modules
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Add DELETE policy for user_progress (for account resets)
DROP POLICY IF EXISTS "Users can delete own progress" ON public.user_progress;
CREATE POLICY "Users can delete own progress"
  ON public.user_progress
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Verify all RLS is enabled on critical tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_orders ENABLE ROW LEVEL SECURITY;
