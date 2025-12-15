/*
  # Remove Confidence Score Feature

  1. Changes
    - Remove `confidence_score` column from `user_progress` table
    
  2. Notes
    - This removes the confidence tracking feature from the application
*/

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'user_progress' AND column_name = 'confidence_score'
  ) THEN
    ALTER TABLE user_progress DROP COLUMN confidence_score;
  END IF;
END $$;
