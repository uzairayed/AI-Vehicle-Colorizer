import React from 'react';
import { VEHICLE_FINISHES } from '../constants';

interface FinishSelectorProps {
  selectedFinish: string | null;
  onFinishSelect: (finish: string) => void;
}

const FinishSelector: React.FC<FinishSelectorProps> = ({ selectedFinish, onFinishSelect }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-ink-secondary mb-3">3. Choose a Finish</h3>
      <div className="grid grid-cols-3 gap-3">
        {VEHICLE_FINISHES.map((finish) => (
          <button
            key={finish.name}
            title={finish.description}
            onClick={() => onFinishSelect(finish.name)}
            className={`group relative w-full p-3 text-center transition-all duration-200 sketch-button text-ink
                        ${selectedFinish === finish.name 
                            ? 'bg-brand-blue text-paper' 
                            : 'bg-paper hover:bg-paper-2'}`}
          >
            {finish.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinishSelector;