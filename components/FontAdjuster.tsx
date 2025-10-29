import React from 'react';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import BoldIcon from './icons/BoldIcon';
import LetterSpacingIcon from './icons/LetterSpacingIcon';
import ResetIcon from './icons/ResetIcon';

interface FontAdjusterProps {
  settings: {
    fontSizeMultiplier: number;
    fontWeight: number;
    letterSpacing: number;
  };
  setters: {
    setFontSizeMultiplier: React.Dispatch<React.SetStateAction<number>>;
    setFontWeight: React.Dispatch<React.SetStateAction<number>>;
    setLetterSpacing: React.Dispatch<React.SetStateAction<number>>;
    resetFontSettings: () => void;
  };
}

const FONT_SIZE_STEP = 0.1;
const FONT_SIZE_MIN = 0.8;
const FONT_SIZE_MAX = 1.6;

const LETTER_SPACING_STEP = 0.01;
const LETTER_SPACING_MIN = -0.02;
const LETTER_SPACING_MAX = 0.1;


const FontAdjuster: React.FC<FontAdjusterProps> = ({ settings, setters }) => {

  const increaseFontSize = () => {
    setters.setFontSizeMultiplier(prev => Math.min(prev + FONT_SIZE_STEP, FONT_SIZE_MAX));
  };

  const decreaseFontSize = () => {
    setters.setFontSizeMultiplier(prev => Math.max(prev - FONT_SIZE_STEP, FONT_SIZE_MIN));
  };

  const toggleBold = () => {
    setters.setFontWeight(prev => (prev === 400 ? 700 : 400));
  };

  const increaseLetterSpacing = () => {
    setters.setLetterSpacing(prev => Math.min(prev + LETTER_SPACING_STEP, LETTER_SPACING_MAX));
  };

  const decreaseLetterSpacing = () => {
    setters.setLetterSpacing(prev => Math.max(prev - LETTER_SPACING_STEP, LETTER_SPACING_MIN));
  };

  const isBold = settings.fontWeight === 700;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
      
      {/* Font Size */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">Tamanho da Fonte</span>
        <div className="flex items-center space-x-2">
          <button onClick={decreaseFontSize} aria-label="Diminuir fonte" className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={settings.fontSizeMultiplier <= FONT_SIZE_MIN}>
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold text-gray-800">{(settings.fontSizeMultiplier * 100).toFixed(0)}%</span>
          <button onClick={increaseFontSize} aria-label="Aumentar fonte" className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={settings.fontSizeMultiplier >= FONT_SIZE_MAX}>
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Font Weight */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">Engrossar Letra</span>
        <button onClick={toggleBold} aria-pressed={isBold} className={`p-2 rounded-md ${isBold ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
          <BoldIcon className="w-4 h-4" />
        </button>
      </div>
      
      {/* Letter Spacing */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800">Espaçamento</span>
         <div className="flex items-center space-x-2">
          <button onClick={decreaseLetterSpacing} aria-label="Diminuir espaçamento" className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={settings.letterSpacing <= LETTER_SPACING_MIN}>
            <MinusIcon className="w-4 h-4" />
          </button>
          <LetterSpacingIcon className="w-4 h-4 text-gray-600"/>
          <button onClick={increaseLetterSpacing} aria-label="Aumentar espaçamento" className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50" disabled={settings.letterSpacing >= LETTER_SPACING_MAX}>
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reset */}
      <div className="pt-2 border-t border-gray-200">
        <button onClick={setters.resetFontSettings} className="w-full flex items-center justify-center p-2 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-lg transition-colors">
          <ResetIcon className="w-4 h-4 mr-2" />
          Resetar Ajustes
        </button>
      </div>

    </div>
  );
};

export default FontAdjuster;