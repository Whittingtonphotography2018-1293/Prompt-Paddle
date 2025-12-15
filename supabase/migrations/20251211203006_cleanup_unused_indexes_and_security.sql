/*
  # Security and Performance Optimization
  
  ## Changes
  
  1. **Remove Unused Indexes**
     - Drop `idx_platform_preferences_user_id` - table is not used in the application
     - Keep other indexes as they're used by active RLS policies and queries
  
  2. **Auth Configuration Notes**
     The following settings should be configured in the Supabase Dashboard:
     
     a) **Leaked Password Protection** (Auth > Settings > Password Protection)
        - Enable "Prevent signups with leaked passwords"
        - This checks passwords against HaveIBeenPwned.org
        - Navigate to: Dashboard > Authentication > Settings > Password Protection
     
     b) **Database Connection Strategy** (Database > Connection Pooling)
        - Change Auth server connection strategy from fixed to percentage-based
        - Recommended: Set to 10% of available connections
        - This allows better scaling when instance size increases
        - Navigate to: Dashboard > Database > Connection Pooling
  
  ## Notes
  - Indexes on `prompts_library`, `user_progress`, `achievements`, and `learning_modules` 
    are kept because they're actively used by RLS policies and application queries
  - Low index usage counts are expected for new/lightly-used databases
  - These indexes improve performance as the database grows
*/

-- Drop the index on platform_preferences since the table is not used in the app
DROP INDEX IF EXISTS idx_platform_preferences_user_id;

-- Note: The following indexes are kept because they're used by active features:
-- - idx_prompts_library_user_id (used in library and prompt creation)
-- - idx_user_progress_user_id (used in profile, onboarding, tutorials)
-- - idx_achievements_user_id (used in profile)
-- - idx_learning_modules_user_id (used in learn tab and tutorials)

-- These indexes are essential for:
-- 1. RLS policy performance (WHERE user_id = auth.uid())
-- 2. Foreign key constraint checks
-- 3. JOIN operations
-- 4. User-specific data queries
