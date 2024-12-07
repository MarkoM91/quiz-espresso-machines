// WordPress integration script
(function() {
  // Create container for the widget
  const container = document.createElement('div');
  container.id = 'espresso-quiz-widget';
  
  // Find the target element (you can customize this selector)
  const targetElement = document.querySelector('.espresso-quiz-placeholder');
  if (targetElement) {
    targetElement.appendChild(container);
    
    // Example of customization options
    const customOptions = {
      buttonStyle: {
        backgroundColor: '#B45309', // Custom brown color
        textColor: '#FFFFFF',
        hoverBackgroundColor: '#8B4513',
        fontSize: '1.2rem',
        padding: '1rem 2rem',
        borderRadius: '9999px', // Fully rounded
      },
      buttonText: 'Take the Espresso Quiz',
      showIcon: true,
      titleText: 'Find Your Perfect Espresso Machine',
      descriptionText: 'Answer a few simple questions to discover the ideal espresso machine for your needs.',
      containerStyle: {
        backgroundColor: '#FFF5E6',
        padding: '3rem',
        maxWidth: '56rem',
        borderRadius: '1rem',
      },
    };
    
    // Initialize the widget with custom options
    window.initializeQuizWidget('espresso-quiz-widget', customOptions);
  }
})();