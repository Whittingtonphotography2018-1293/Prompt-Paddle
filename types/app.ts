export type ComfortLevel = 1 | 2 | 3 | 4 | 5;

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  steps: PromptStep[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface PromptStep {
  id: string;
  title: string;
  description: string;
  inputType: 'text' | 'textarea' | 'select' | 'multiselect';
  placeholder?: string;
  options?: string[];
  helpText?: string;
}

export interface AIPlatform {
  id: string;
  name: string;
  description: string;
  logo: string;
  capabilities: string[];
  pros: string[];
  cons: string[];
  pricing: string;
  ease_of_use: number;
  best_for: string[];
  url: string;
  free_tier: boolean;
}

export interface PlatformRecommendation {
  platform: AIPlatform;
  match_score: number;
  reasoning: string;
  alternatives: AIPlatform[];
}

export interface Badge {
  type: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  points: number;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  level: 1 | 2 | 3 | 4;
  duration_minutes: number;
  content: TutorialContent[];
}

export interface TutorialContent {
  type: 'text' | 'image' | 'video' | 'interactive' | 'example';
  content: string;
  title?: string;
}
