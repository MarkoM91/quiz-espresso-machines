export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
  value: string;
}

export interface UserAnswers {
  [key: string]: string;
}

export interface RecommendedMachine {
  id: string;
  name: string;
  image: string;
  price: string;
  description: string;
  features: string[];
  skillLevel: string;
  spaceRequired: string;
  affiliateUrl?: string;
  rating?: number;
  reviewDate?: string;
}

export interface Review {
  id: string;
  machineId: string;
  content: string;
  pros: string[];
  cons: string[];
  rating: number;
  date: string;
}