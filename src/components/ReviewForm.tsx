import React, { useState } from 'react';
import { machineService } from '../services/machineService';
import { RecommendedMachine } from '../types/quiz';

interface ReviewFormProps {
  onSubmit: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [machine, setMachine] = useState<RecommendedMachine>({
    id: '',
    name: '',
    image: '',
    price: '',
    description: '',
    features: [],
    skillLevel: 'beginner',
    spaceRequired: 'compact',
    affiliateUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    machineService.addMachine(machine);
    onSubmit();
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...machine.features];
    newFeatures[index] = value;
    setMachine({ ...machine, features: newFeatures });
  };

  const addFeature = () => {
    setMachine({ ...machine, features: [...machine.features, ''] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Machine Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.name}
          onChange={(e) => setMachine({ ...machine, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.image}
          onChange={(e) => setMachine({ ...machine, image: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.price}
          onChange={(e) => setMachine({ ...machine, price: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.description}
          onChange={(e) => setMachine({ ...machine, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Features</label>
        {machine.features.map((feature, index) => (
          <input
            key={index}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={addFeature}
          className="mt-2 px-4 py-2 bg-gray-100 rounded-md"
        >
          Add Feature
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Level</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.skillLevel}
          onChange={(e) => setMachine({ ...machine, skillLevel: e.target.value })}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Space Required</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.spaceRequired}
          onChange={(e) => setMachine({ ...machine, spaceRequired: e.target.value })}
        >
          <option value="compact">Compact</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Affiliate URL</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={machine.affiliateUrl || ''}
          onChange={(e) => setMachine({ ...machine, affiliateUrl: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#4A3428] text-white rounded-md hover:bg-[#3A2418]"
      >
        Add Machine
      </button>
    </form>
  );
};