import React, { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';
import { questions } from './data/questions';
import { QuizProgress } from './components/QuizProgress';
import { QuizOption } from './components/QuizOption';
import { ResultCard } from './components/ResultCard';
import { UserAnswers } from './types/quiz';
import { calculateMachineScore } from './utils/recommendationEngine';
import { machineService } from './services/machineService';

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    machineService.initializeDefaultMachines();
  }, []);

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[currentStep];
    setAnswers({ ...answers, [currentQuestion.id]: value });

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendations = () => {
    const machines = machineService.getAllMachines();
    return machines
      .map(machine => ({
        machine,
        score: calculateMachineScore(machine, answers)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ machine }) => machine);
  };

  if (showResults) {
    const recommendedMachines = getRecommendations();
    
    return (
      <div className="min-h-screen bg-[#F5F5F5] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fadeInDown">
            <div className="flex items-center justify-center mb-4">
              <Coffee size={32} className="text-[#4A3428]" />
            </div>
            <h1 className="text-3xl font-bold text-[#4A3428] mb-4">Your Perfect Espresso Machine</h1>
            <p className="text-gray-600 mb-8">Based on your preferences, here are our top recommendations:</p>
            <button
              onClick={resetQuiz}
              className="bg-[#4A3428] text-white px-6 py-2 rounded-lg hover:bg-[#3A2418] transition-colors hover-scale"
            >
              Start Over
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedMachines.map((machine, index) => (
              <ResultCard key={machine.id} machine={machine} index={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12 animate-fadeInDown">
          <div className="flex items-center justify-center mb-4">
            <Coffee size={32} className="text-[#4A3428]" />
          </div>
          <h1 className="text-3xl font-bold text-[#4A3428] mb-2">Find Your Perfect Espresso Machine</h1>
          <p className="text-gray-600">Answer a few questions to get personalized recommendations</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 animate-scaleIn">
          <QuizProgress currentStep={currentStep + 1} totalSteps={questions.length} />
          
          <h2 className="text-xl font-semibold text-[#4A3428] mb-6">{currentQuestion.text}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <QuizOption
                key={option.id}
                option={option}
                selected={answers[currentQuestion.id] === option.value}
                onSelect={handleAnswer}
              />
            ))}
          </div>

          {currentStep > 0 && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={handlePrevious}
                className="px-4 py-2 text-sm border border-[#4A3428] text-[#4A3428] rounded-lg hover:bg-[#4A3428] hover:text-white transition-colors"
              >
                Previous
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};