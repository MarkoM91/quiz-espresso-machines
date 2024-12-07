import React, { useState } from 'react';
import { RecommendedMachine } from '../types/quiz';
import { Check } from 'lucide-react';
import { ReviewModal } from './ReviewModal';
import { machineService } from '../services/machineService';

interface ResultCardProps {
  machine: RecommendedMachine;
  index: number;
}

export const ResultCard: React.FC<ResultCardProps> = ({ machine, index }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const reviews = machineService.getReviewsForMachine(machine.id);

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden hover-float animate-fadeInUp"
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        <img 
          src={machine.image} 
          alt={machine.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-[#4A3428] mb-4">{machine.name}</h3>
          <p className="text-gray-600 mb-4">{machine.description}</p>
          <div className="space-y-2 mb-6">
            {machine.features.map((feature, index) => (
              <div key={index} className="flex items-center animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <Check size={16} className="text-[#D4B062] mr-2" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <a
              href={machine.affiliateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 text-center px-4 py-2 rounded-md ${
                machine.affiliateUrl
                  ? 'bg-[#D4B062] text-white hover:bg-[#C4A052] transition-colors'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              onClick={(e) => !machine.affiliateUrl && e.preventDefault()}
            >
              Check Price
            </a>
            <button
              onClick={() => setShowReviewModal(true)}
              className="flex-1 px-4 py-2 border border-[#B45309] text-[#B45309] rounded-md hover:bg-[#B45309] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={reviews.length === 0}
            >
              Read Review
            </button>
          </div>
        </div>
      </div>
      
      {showReviewModal && (
        <ReviewModal
          machine={machine}
          reviews={reviews}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
};