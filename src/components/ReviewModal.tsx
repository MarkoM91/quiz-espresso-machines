import React from 'react';
import { RecommendedMachine, Review } from '../types/quiz';
import { X, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ReviewModalProps {
  machine: RecommendedMachine;
  reviews: Review[];
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ machine, reviews, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-scaleIn">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#4A3428]">{machine.name} Reviews</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="text-[#D4B062] w-5 h-5 mr-1" />
                      <span className="font-semibold">{review.rating} / 5</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="flex items-center text-green-600 font-medium mb-2">
                        <ThumbsUp size={16} className="mr-2" />
                        Pros
                      </h4>
                      <ul className="space-y-1">
                        {review.pros.map((pro, index) => (
                          <li key={index} className="text-sm text-gray-600">• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center text-red-600 font-medium mb-2">
                        <ThumbsDown size={16} className="mr-2" />
                        Cons
                      </h4>
                      <ul className="space-y-1">
                        {review.cons.map((con, index) => (
                          <li key={index} className="text-sm text-gray-600">• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews available for this machine yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};