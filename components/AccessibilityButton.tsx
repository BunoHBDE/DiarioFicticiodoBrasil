
import React from 'react';
import AccessibilityIcon from './icons/AccessibilityIcon';

interface AccessibilityButtonProps {
  onClick: () => void;
}

const AccessibilityButton: React.FC<AccessibilityButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-paper rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-200"
      aria-label="Opções de acessibilidade"
      onClick={onClick}
    >
      <AccessibilityIcon className="w-6 h-6" />
    </button>
  );
};

export default AccessibilityButton;
