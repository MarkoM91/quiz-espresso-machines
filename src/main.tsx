import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QuizWidget } from './QuizWidget';
import './index.css';
import './styles/animations.css';

// Make the initialization function available globally
declare global {
  interface Window {
    initializeQuizWidget: (containerId: string) => void;
  }
}

// Export the initialization function
window.initializeQuizWidget = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <QuizWidget containerId={containerId} />
      </StrictMode>
    );
  }
};

// If running in development mode, initialize the widget automatically
if (process.env.NODE_ENV === 'development') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <QuizWidget containerId="root" />
      </StrictMode>
    );
  }
}