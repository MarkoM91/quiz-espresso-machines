import { UserAnswers, RecommendedMachine } from '../types/quiz';

// Score weights for different criteria
const WEIGHTS = {
  budget: 0.4,
  experience: 0.3,
  features: 0.2,
  space: 0.1,
};

// Budget ranges in dollars
const BUDGET_RANGES = {
  low: { min: 0, max: 500 },
  medium: { min: 500, max: 1500 },
  high: { min: 1500, max: Infinity },
};

export function calculateMachineScore(
  machine: RecommendedMachine,
  answers: UserAnswers
): number {
  let score = 0;

  // Budget match
  const machinePrice = parseInt(machine.price.replace(/[^0-9]/g, ''));
  const budgetRange = BUDGET_RANGES[answers.budget as keyof typeof BUDGET_RANGES];
  if (machinePrice >= budgetRange.min && machinePrice <= budgetRange.max) {
    score += WEIGHTS.budget;
  }

  // Skill level match
  if (machine.skillLevel === answers.experience) {
    score += WEIGHTS.experience;
  } else if (
    (machine.skillLevel === 'intermediate' && answers.experience === 'advanced') ||
    (machine.skillLevel === 'beginner' && answers.experience === 'intermediate')
  ) {
    score += WEIGHTS.experience * 0.5;
  }

  // Features match
  if (
    (answers.features === 'advanced' && machine.features.some(f => f.toLowerCase().includes('pid') || f.toLowerCase().includes('pressure'))) ||
    (answers.features === 'basic' && machine.skillLevel === 'beginner')
  ) {
    score += WEIGHTS.features;
  }

  // Space match
  if (machine.spaceRequired === answers.space) {
    score += WEIGHTS.space;
  } else if (
    (machine.spaceRequired === 'compact' && answers.space === 'medium') ||
    (machine.spaceRequired === 'medium' && answers.space === 'large')
  ) {
    score += WEIGHTS.space * 0.5;
  }

  return score;
}