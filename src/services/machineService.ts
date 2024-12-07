import { RecommendedMachine, Review } from '../types/quiz';

// In-memory storage (replace with your actual database)
let machines: RecommendedMachine[] = [];
let reviews: Review[] = [];

export const machineService = {
  // Machine management
  addMachine: (machine: RecommendedMachine) => {
    if (!machine.id) {
      machine.id = Date.now().toString();
    }
    machines.push(machine);
    return machine;
  },

  updateMachine: (id: string, updates: Partial<RecommendedMachine>) => {
    const index = machines.findIndex(m => m.id === id);
    if (index !== -1) {
      machines[index] = { ...machines[index], ...updates };
      return machines[index];
    }
    return null;
  },

  getMachine: (id: string) => machines.find(m => m.id === id),
  
  getAllMachines: () => machines,

  // Review management
  addReview: (review: Review) => {
    if (!review.id) {
      review.id = Date.now().toString();
    }
    reviews.push(review);
    
    // Update machine rating
    const machineReviews = reviews.filter(r => r.machineId === review.machineId);
    const avgRating = machineReviews.reduce((sum, r) => sum + r.rating, 0) / machineReviews.length;
    
    machineService.updateMachine(review.machineId, {
      rating: Number(avgRating.toFixed(1)),
      reviewDate: review.date
    });

    return review;
  },

  getReviewsForMachine: (machineId: string) => reviews.filter(r => r.machineId === machineId),

  // Initialize with default recommendations
  initializeDefaultMachines: () => {
    machines = [
      {
        id: '1',
        name: 'Breville Bambino Plus',
        image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?auto=format&fit=crop&w=800&q=80',
        price: '$499',
        description: 'Perfect for beginners, this compact machine delivers excellent espresso with automatic milk texturing.',
        features: ['Automatic milk texturing', 'Quick heat-up', 'Compact design', 'Easy to use'],
        skillLevel: 'beginner',
        spaceRequired: 'compact',
        rating: 4.5
      },
      // ... other default machines
    ];
  }
};