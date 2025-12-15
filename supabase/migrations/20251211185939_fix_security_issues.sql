/*
  # Fix Security Issues

  ## Performance Optimization
  1. Add index on `prompts_library.user_id` foreign key
     - Improves query performance for user-specific prompt lookups
     - Covers the foreign key constraint `prompts_library_user_id_fkey`
     - Essential for JOIN operations and foreign key checks

  ## Notes
  - The index will significantly improve performance for queries filtering by user_id
  - This is especially important as the prompts_library table grows
  - Foreign keys should always be indexed for optimal performance
*/

-- Add index for the foreign key on prompts_library.user_id
CREATE INDEX IF NOT EXISTS idx_prompts_library_user_id 
ON public.prompts_library(user_id);

-- Add indexes for other foreign keys to prevent similar issues
CREATE INDEX IF NOT EXISTS idx_achievements_user_id 
ON public.achievements(user_id);

CREATE INDEX IF NOT EXISTS idx_learning_modules_user_id 
ON public.learning_modules(user_id);

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id 
ON public.user_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_platform_preferences_user_id 
ON public.platform_preferences(user_id);