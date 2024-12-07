import React, { useState } from 'react';
import { Coffee } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './App';

interface QuizWidgetProps {
  containerId: string;
  buttonStyle?: {
    backgroundColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
  };
  buttonText?: string;
  showIcon?: boolean;
  titleText?: string;
  descriptionText?: string;
  containerStyle?: {
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    maxWidth?: string;
    borderRadius?: string;
  };
}

export const QuizWidget: React.FC<QuizWidgetProps> = ({
  containerId,
  buttonStyle = {},
  buttonText = "Find Your Perfect Espresso Machine",
  showIcon = true,
  titleText = "Not sure if this is the right machine for you?",
  descriptionText = "Take our quick quiz to find the perfect espresso machine that matches your needs and preferences.",
  containerStyle = {},
}) => {
  const [showQuiz, setShowQuiz] = useState(false);

  const defaultButtonStyle = {
    backgroundColor: '#D4B062',
    textColor: '#FFFFFF',
    hoverBackgroundColor: '#C4A052',
    fontSize: '1.125rem',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
  };

  const defaultContainerStyle = {
    backgroundColor: '#F5F5F5',
    padding: '2rem',
    margin: '3rem auto',
    maxWidth: '48rem',
    borderRadius: '0.75rem',
  };

  const mergedButtonStyle = { ...defaultButtonStyle, ...buttonStyle };
  const mergedContainerStyle = { ...defaultContainerStyle, ...containerStyle };

  if (showQuiz) {
    return <App />;
  }

  return (
    <div
      className="text-center"
      style={{
        backgroundColor: mergedContainerStyle.backgroundColor,
        padding: mergedContainerStyle.padding,
        margin: mergedContainerStyle.margin,
        maxWidth: mergedContainerStyle.maxWidth,
        borderRadius: mergedContainerStyle.borderRadius,
      }}
    >
      <h2 className="text-[#4A3428] text-3xl font-bold mb-4">
        {titleText}
      </h2>
      <p className="text-gray-600 mb-8">
        {descriptionText}
      </p>
      <button
        onClick={() => setShowQuiz(true)}
        className="inline-flex items-center font-medium group animate-fadeInUp hover:scale-105 transition-all duration-300"
        style={{
          backgroundColor: mergedButtonStyle.backgroundColor,
          color: mergedButtonStyle.textColor,
          fontSize: mergedButtonStyle.fontSize,
          padding: mergedButtonStyle.padding,
          borderRadius: mergedButtonStyle.borderRadius,
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = mergedButtonStyle.hoverBackgroundColor;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = mergedButtonStyle.backgroundColor;
        }}
      >
        {showIcon && (
          <Coffee className="mr-2 group-hover:rotate-12 transition-transform" size={24} />
        )}
        {buttonText}
      </button>
    </div>
  );
};

// Function to initialize the widget with custom options
export function initializeQuizWidget(
  containerId: string,
  options: Omit<QuizWidgetProps, 'containerId'> = {}
) {
  const container = document.getElementById(containerId);
  if (container && !container.hasChildNodes()) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <QuizWidget containerId={containerId} {...options} />
      </StrictMode>
    );
  }
}