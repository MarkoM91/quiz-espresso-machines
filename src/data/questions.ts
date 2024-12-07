import { Question } from '../types/quiz';

export const questions: Question[] = [
  {
    id: 'budget',
    text: 'What\'s your budget for your espresso machine?',
    options: [
      { id: 'budget-1', text: 'Under $500', value: 'low' },
      { id: 'budget-2', text: '$500 - $1500', value: 'medium' },
      { id: 'budget-3', text: 'Over $1500', value: 'high' }
    ]
  },
  {
    id: 'experience',
    text: 'How experienced are you with espresso machines?',
    options: [
      { id: 'exp-1', text: 'Beginner', value: 'beginner' },
      { id: 'exp-2', text: 'Intermediate', value: 'intermediate' },
      { id: 'exp-3', text: 'Advanced', value: 'advanced' }
    ]
  },
  {
    id: 'features',
    text: 'Do you need advanced features like pressure profiling?',
    options: [
      { id: 'feat-1', text: 'Yes, I want full control', value: 'advanced' },
      { id: 'feat-2', text: 'No, I prefer simplicity', value: 'basic' }
    ]
  },
  {
    id: 'space',
    text: 'How much counter space can you dedicate to your machine?',
    options: [
      { id: 'space-1', text: 'Compact (under 12" wide)', value: 'compact' },
      { id: 'space-2', text: 'Medium (12-15" wide)', value: 'medium' },
      { id: 'space-3', text: 'Large (over 15" wide)', value: 'large' }
    ]
  }
];