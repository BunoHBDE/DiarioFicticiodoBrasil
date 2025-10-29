import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from './icons/CloseIcon';
import FontSizeIcon from './icons/FontSizeIcon';
import SoundIcon from './icons/SoundIcon';
import VoiceNavigationIcon from './icons/VoiceNavigationIcon';
import BrightnessIcon from './icons/BrightnessIcon';
import ContrastIcon from './icons/ContrastIcon';
import FontAdjuster from './FontAdjuster';
import BrightnessAdjuster from './BrightnessAdjuster';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
  fontSettings: any;
  fontSetters: any;
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
  isReadAloudActive: boolean;
  toggleReadAloud: () => void;
  isVoiceNavigationActive: boolean;
  toggleVoiceNavigation: () => void;
  voiceCommands: string[];
  isHighContrast: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ 
  isOpen, 
  onClose, 
  fontSettings, 
  fontSetters,
  brightness,
  setBrightness,
  isReadAloudActive,
  toggleReadAloud,
  isVoiceNavigationActive,
  toggleVoiceNavigation,
  voiceCommands,
  isHighContrast,
  toggleHighContrast,
}) => {
  const [isFontAdjusterVisible, setIsFontAdjusterVisible] = useState(false);
  const [isBrightnessAdjusterVisible, setIsBrightnessAdjusterVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // State for dragging functionality
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Effect to handle closing when clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Effect to capture initial position from CSS
  useEffect(() => {
    if (isOpen && menuRef.current && !position) {
        const rect = menuRef.current.getBoundingClientRect();
        setPosition({ x: rect.left, y: rect.top });
    }
  }, [isOpen, position]);


  // Effect to handle the dragging movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging || !menuRef.current) return;

      const newX = event.clientX - offset.x;
      const newY = event.clientY - offset.y;
      
      // Constrain movement within the viewport
      const constrainedX = Math.max(0, Math.min(newX, window.innerWidth - menuRef.current.offsetWidth));
      const constrainedY = Math.max(0, Math.min(newY, window.innerHeight - menuRef.current.offsetHeight));

      setPosition({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);
  
  const handleMouseDown = (event: React.MouseEvent<HTMLHeadingElement>) => {
    if (menuRef.current) {
      setIsDragging(true);
      const rect = menuRef.current.getBoundingClientRect();
      setOffset({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className={`fixed z-[100] bg-white rounded-lg shadow-2xl p-4 w-80 transition-opacity duration-300 ease-in-out transform-gpu animate-fade-in-up ${!position ? 'bottom-20 right-6 opacity-0' : 'opacity-100'}`}
      style={position ? { top: `${position.y}px`, left: `${position.x}px`, right: 'auto', bottom: 'auto' } : {}}
      role="dialog"
      aria-labelledby="accessibility-menu-title"
    >
        <style>{`
          @keyframes fade-in-up {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.2s ease-out forwards;
          }
        `}</style>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Fechar menu de acessibilidade"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        <h2 
          id="accessibility-menu-title" 
          className="text-lg font-bold text-gray-900 mb-4 text-center cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
        >
          Acessibilidade
        </h2>

        <div className="space-y-2">
          <button 
            id="font-adjuster-toggle"
            className="w-full flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsFontAdjusterVisible(!isFontAdjusterVisible)}
            aria-expanded={isFontAdjusterVisible}
          >
            <FontSizeIcon className="w-5 h-5 mr-3 text-blue-600" />
            <span className="font-bold text-gray-800 text-sm">Ajuste de Fonte</span>
          </button>

          {isFontAdjusterVisible && (
            <FontAdjuster settings={fontSettings} setters={fontSetters} />
          )}

          <button
            className="w-full flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsBrightnessAdjusterVisible(!isBrightnessAdjusterVisible)}
            aria-expanded={isBrightnessAdjusterVisible}
          >
            <BrightnessIcon className="w-5 h-5 mr-3 text-blue-600" />
            <span className="font-bold text-gray-800 text-sm">Ajuste de Brilho</span>
          </button>
          
          {isBrightnessAdjusterVisible && (
            <BrightnessAdjuster brightness={brightness} setBrightness={setBrightness} />
          )}

          <button 
            onClick={toggleHighContrast}
            aria-pressed={isHighContrast}
            className={`w-full flex items-center p-3 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${isHighContrast ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <ContrastIcon className={`w-5 h-5 mr-3 ${isHighContrast ? 'text-white' : 'text-blue-600'}`} />
            <span className={`font-bold text-sm ${isHighContrast ? 'text-white' : 'text-gray-800'}`}>Alto Contraste</span>
          </button>

          <button 
            onClick={toggleReadAloud}
            aria-pressed={isReadAloudActive}
            className={`w-full flex items-center p-3 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${isReadAloudActive ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            <SoundIcon className={`w-5 h-5 mr-3 ${isReadAloudActive ? 'text-white' : 'text-blue-600'}`} />
            <span className={`font-bold text-sm ${isReadAloudActive ? 'text-white' : 'text-gray-800'}`}>Leitura com Som</span>
          </button>
          
          <div>
            <button 
              onClick={toggleVoiceNavigation}
              aria-pressed={isVoiceNavigationActive}
              className={`w-full flex items-center p-3 rounded-lg transition-colors text-left focus:outline-none focus:ring-2 focus:ring-blue-500 ${isVoiceNavigationActive ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <VoiceNavigationIcon className={`w-5 h-5 mr-3 ${isVoiceNavigationActive ? 'text-white' : 'text-blue-600'}`} />
              <span className={`font-bold text-sm ${isVoiceNavigationActive ? 'text-white' : 'text-gray-800'}`}>Navegação por Voz</span>
            </button>
            {isVoiceNavigationActive && (
              <div className="p-3 bg-gray-50 rounded-b-lg border border-t-0 border-gray-200 -mt-1 pt-4 transition-all duration-300">
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Comandos disponíveis:</h4>
                <ul className="space-y-1 text-xs text-gray-700 list-disc list-inside">
                  {voiceCommands.map((command, index) => (
                    <li key={index}>{command}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default AccessibilityMenu;