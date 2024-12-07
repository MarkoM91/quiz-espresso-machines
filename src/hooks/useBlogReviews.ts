import { useEffect } from 'react';
import { blogService, BlogReview } from '../services/blogService';

export const useBlogReviews = (reviews: BlogReview[]) => {
  useEffect(() => {
    // Process all blog reviews when the component mounts
    blogService.processExistingReviews(reviews);
  }, [reviews]);
};