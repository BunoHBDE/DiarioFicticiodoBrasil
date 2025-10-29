import React from 'react';
import VoiceNavigationIcon from './icons/VoiceNavigationIcon';

type VoiceStatus = 'idle' | 'listening' | 'processing' | 'error';

interface VoiceIndicatorProps {
  status: VoiceStatus;
}

const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({ status }) => {
  if (status === 'idle') {
    return null;
  }

  const getStatusInfo = () => {
    switch (status) {
      case 'listening':
        return { 
            text: 'Ouvindo...', 
            bgColor: 'bg-green-500', 
            iconColor: 'text-green-100',
            animate: 'animate-pulse' 
        };
      case 'processing':
        return { 
            text: 'Processando...', 
            bgColor: 'bg-blue-500', 
            iconColor: 'text-blue-100',
            animate: 'animate-spin'
        };
      case 'error':
        return { 
            text: 'Comando não reconhecido', 
            bgColor: 'bg-red-500', 
            iconColor: 'text-red-100',
            animate: ''
        };
      default:
        return { text: '', bgColor: 'bg-gray-500', iconColor: 'text-gray-100', animate: '' };
    }
  };

  const { text, bgColor, iconColor, animate } = getStatusInfo();

  return (
    <div 
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center px-4 py-2 rounded-full shadow-lg text-white transition-all duration-300 ${bgColor}`}
      role="status"
      aria-live="assertive"
    >
      <VoiceNavigationIcon className={`w-5 h-5 mr-2 ${iconColor} ${animate}`} />
      <span className="text-sm font-semibold">{text}</span>
    </div>
  );
};

export default VoiceIndicator;