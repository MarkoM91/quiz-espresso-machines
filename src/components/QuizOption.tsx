import React from 'react';
import { Option } from '../types/quiz';

interface QuizOptionProps {
  option: Option;
  selected: boolean;
  onSelect: (value: string) => void;
}

export const QuizOption: React.FC<QuizOptionProps> = ({ option, selected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(option.value)}
      className={`w-full p-4 mb-3 text-left rounded-lg transition-all duration-300 hover-scale animate-fadeInUp ${
        selected
          ? 'bg-[#4A3428] text-white shadow-lg transform scale-[1.02]'
          : 'bg-white hover:bg-[#F5F5F5] border border-gray-200'
      }`}
    >
      <span className="text-lg">{option.text}</span>
    </button>
  );
};