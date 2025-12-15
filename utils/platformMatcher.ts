import { AIPlatform, PlatformRecommendation, ComfortLevel } from '@/types/app';
import { AI_PLATFORMS } from '@/data/platforms';

interface MatchCriteria {
  category: string;
  comfortLevel: ComfortLevel;
}

export function matchPlatform(criteria: MatchCriteria): PlatformRecommendation {
  const { category, comfortLevel } = criteria;

  let selectedPlatform = AI_PLATFORMS[0];
  let reasoning = '';

  if (category === 'Technical' || category === 'Business') {
    const technicalPlatforms = AI_PLATFORMS.filter(p =>
      p.capabilities.some(c =>
        c.toLowerCase().includes('code') ||
        c.toLowerCase().includes('technical') ||
        c.toLowerCase().includes('analysis')
      )
    );
    selectedPlatform = technicalPlatforms[0] || AI_PLATFORMS[0];
    reasoning = 'Recommended for technical and analytical tasks';
  } else if (category === 'Creative' || category === 'Content Creation') {
    const creativePlatforms = AI_PLATFORMS.filter(p =>
      p.capabilities.some(c =>
        c.toLowerCase().includes('creative') ||
        c.toLowerCase().includes('writing')
      )
    );
    selectedPlatform = creativePlatforms[0] || AI_PLATFORMS[0];
    reasoning = 'Best suited for creative and content generation tasks';
  } else if (category === 'Learning') {
    const learningPlatforms = AI_PLATFORMS.filter(p =>
      p.best_for.some(b =>
        b.toLowerCase().includes('learning') ||
        b.toLowerCase().includes('education')
      )
    );
    selectedPlatform = learningPlatforms[0] || AI_PLATFORMS[0];
    reasoning = 'Excellent for educational and learning purposes';
  } else {
    if (comfortLevel <= 2) {
      const beginnerFriendly = AI_PLATFORMS.filter(p => p.ease_of_use >= 4);
      selectedPlatform = beginnerFriendly[0] || AI_PLATFORMS[0];
      reasoning = 'Very user-friendly, perfect for beginners';
    } else {
      reasoning = 'Great all-around platform for your needs';
    }
  }

  return {
    platform: selectedPlatform,
    match_score: 88,
    reasoning,
    alternatives: AI_PLATFORMS.filter(p => p.id !== selectedPlatform.id).slice(0, 2),
  };
}
