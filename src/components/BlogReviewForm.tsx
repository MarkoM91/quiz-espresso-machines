import React, { useState } from 'react';
import { BlogReview } from '../services/blogService';

interface BlogReviewFormProps {
  onSubmit: (review: BlogReview) => void;
}

export const BlogReviewForm: React.FC<BlogReviewFormProps> = ({ onSubmit }) => {
  const [review, setReview] = useState<BlogReview>({
    id: Date.now().toString(),
    title: '',
    content: '',
    machineSpecs: {
      name: '',
      price: '',
      imageUrl: '',
      features: [],
      skillLevel: 'beginner',
      spaceRequired: 'compact'
    },
    rating: 0,
    pros: [],
    cons: [],
    publishDate: new Date().toISOString()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(review);
  };

  const addListItem = (list: 'pros' | 'cons' | 'features') => {
    if (list === 'features') {
      setReview({
        ...review,
        machineSpecs: {
          ...review.machineSpecs,
          features: [...review.machineSpecs.features, '']
        }
      });
    } else {
      setReview({
        ...review,
        [list]: [...review[list], '']
      });
    }
  };

  const updateListItem = (list: 'pros' | 'cons' | 'features', index: number, value: string) => {
    if (list === 'features') {
      const newFeatures = [...review.machineSpecs.features];
      newFeatures[index] = value;
      setReview({
        ...review,
        machineSpecs: {
          ...review.machineSpecs,
          features: newFeatures
        }
      });
    } else {
      const newList = [...review[list]];
      newList[index] = value;
      setReview({
        ...review,
        [list]: newList
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Review Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Machine Name</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.machineSpecs.name}
          onChange={(e) => setReview({
            ...review,
            machineSpecs: { ...review.machineSpecs, name: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.machineSpecs.price}
          onChange={(e) => setReview({
            ...review,
            machineSpecs: { ...review.machineSpecs, price: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.machineSpecs.imageUrl}
          onChange={(e) => setReview({
            ...review,
            machineSpecs: { ...review.machineSpecs, imageUrl: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Review Content</label>
        <textarea
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.content}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Features</label>
        {review.machineSpecs.features.map((feature, index) => (
          <input
            key={index}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={feature}
            onChange={(e) => updateListItem('features', index, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={() => addListItem('features')}
          className="mt-2 px-4 py-2 bg-gray-100 rounded-md"
        >
          Add Feature
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pros</label>
        {review.pros.map((pro, index) => (
          <input
            key={index}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={pro}
            onChange={(e) => updateListItem('pros', index, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={() => addListItem('pros')}
          className="mt-2 px-4 py-2 bg-gray-100 rounded-md"
        >
          Add Pro
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cons</label>
        {review.cons.map((con, index) => (
          <input
            key={index}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={con}
            onChange={(e) => updateListItem('cons', index, e.target.value)}
          />
        ))}
        <button
          type="button"
          onClick={() => addListItem('cons')}
          className="mt-2 px-4 py-2 bg-gray-100 rounded-md"
        >
          Add Con
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <input
          type="number"
          min="0"
          max="5"
          step="0.1"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: parseFloat(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skill Level</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={review.machineSpecs.skillLevel}
          onChange={(e) => setReview({
            ...review,
            machineSpecs: {
              ...review.machineSpecs,
              skillLevel: e.target.value as 'beginner' | 'intermediate' | 'advanced'
            }
          })}
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
          value={review.machineSpecs.spaceRequired}
          onChange={(e) => setReview({
            ...review,
            machineSpecs: {
              ...review.machineSpecs,
              spaceRequired: e.target.value as 'compact' | 'medium' | 'large'
            }
          })}
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
          value={review.affiliateUrl || ''}
          onChange={(e) => setReview({ ...review, affiliateUrl: e.target.value })}
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#4A3428] text-white rounded-md hover:bg-[#3A2418]"
      >
        Publish Review
      </button>
    </form>
  );
};