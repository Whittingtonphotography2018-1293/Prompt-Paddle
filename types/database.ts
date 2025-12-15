export interface Profile {
  id: string;
  email: string | null;
  comfort_level: number;
  onboarding_completed: boolean;
  preferred_name: string | null;
  created_at: string;
  updated_at: string;
  last_active: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  prompts_created: number;
  tutorials_completed: number;
  total_practice_time: number;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  created_at: string;
  updated_at: string;
}

export interface PromptLibrary {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string;
  recommended_platform: string | null;
  is_favorite: boolean;
  practice_count: number;
  clarity_score: number;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  badge_type: string;
  badge_name: string;
  badge_description: string;
  earned_at: string;
  is_new: boolean;
}

export interface LearningModule {
  id: string;
  user_id: string;
  module_id: string;
  module_title: string;
  module_level: number;
  completed: boolean;
  completed_at: string | null;
  time_spent: number;
  quiz_score: number;
  created_at: string;
}

export interface PlatformPreference {
  id: string;
  user_id: string;
  platform_name: string;
  has_tried: boolean;
  rating: number | null;
  notes: string | null;
  last_used: string | null;
  created_at: string;
}
