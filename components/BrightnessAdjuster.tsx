import React from 'react';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';

interface BrightnessAdjusterProps {
  brightness: number;
  setBrightness: React.Dispatch<React.SetStateAction<number>>;
}

const BRIGHTNESS_STEP = 10;
const BRIGHTNESS_MIN = 20;
const BRIGHTNESS_MAX = 100;

const BrightnessAdjuster: React.FC<BrightnessAdjusterProps> = ({ brightness, setBrightness }) => {
  const increaseBrightness = () => {
    setBrightness(prev => Math.min(prev + BRIGHTNESS_STEP, BRIGHTNESS_MAX));
  };

  const decreaseBrightness = () => {
    setBrightness(prev => Math.max(prev - BRIGHTNESS_STEP, BRIGHTNESS_MIN));
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(event.target.value));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
        <style>{`
          /* Custom styles for the range input */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: #2563eb; /* blue-600 */
            cursor: pointer;
            border-radius: 50%;
            margin-top: -8px; /* Center thumb on the track */
          }

          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #2563eb;
            cursor: pointer;
            border-radius: 50%;
          }
        `}</style>
      <div className="flex items-center justify-between space-x-2">
        <button
          onClick={decreaseBrightness}
          aria-label="Diminuir brilho"
          className="p-3 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
          disabled={brightness <= BRIGHTNESS_MIN}
        >
          <MinusIcon className="w-6 h-6" />
        </button>
        <input
          type="range"
          min={BRIGHTNESS_MIN}
          max={BRIGHTNESS_MAX}
          step={BRIGHTNESS_STEP}
          value={brightness}
          onChange={handleSliderChange}
          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          aria-label={`Ajuste de brilho, atual ${brightness}%`}
        />
        <button
          onClick={increaseBrightness}
          aria-label="Aumentar brilho"
          className="p-3 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
          disabled={brightness >= BRIGHTNESS_MAX}
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default BrightnessAdjuster;
