import { RecommendedMachine } from '../types/quiz';
import { machineService } from './machineService';

export interface BlogReview {
  id: string;
  title: string;
  content: string;
  machineSpecs: {
    name: string;
    price: string;
    imageUrl: string;
    features: string[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced';
    spaceRequired: 'compact' | 'medium' | 'large';
  };
  rating: number;
  pros: string[];
  cons: string[];
  affiliateUrl?: string;
  publishDate: string;
}

export const blogService = {
  // This method should be called whenever a new blog review is published
  processNewReview: (review: BlogReview) => {
    const machine: RecommendedMachine = {
      id: review.id,
      name: review.machineSpecs.name,
      image: review.machineSpecs.imageUrl,
      price: review.machineSpecs.price,
      description: review.content.substring(0, 200) + '...', // First 200 chars as summary
      features: [...review.machineSpecs.features],
      skillLevel: review.machineSpecs.skillLevel,
      spaceRequired: review.machineSpecs.spaceRequired,
      affiliateUrl: review.affiliateUrl,
      rating: review.rating,
      reviewDate: review.publishDate
    };

    // Add or update the machine in recommendations
    const existingMachine = machineService.getMachine(review.id);
    if (existingMachine) {
      machineService.updateMachine(review.id, machine);
    } else {
      machineService.addMachine(machine);
    }

    return machine;
  },

  // Example method to process multiple existing reviews
  processExistingReviews: (reviews: BlogReview[]) => {
    return reviews.map(review => blogService.processNewReview(review));
  }
};