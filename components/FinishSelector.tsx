import React from 'react';
import { VEHICLE_FINISHES } from '../constants';

interface FinishSelectorProps {
  selectedFinish: string | null;
  onFinishSelect: (finish: string) => void;
}

const FinishSelector: React.FC<FinishSelectorProps> = ({ selectedFinish, onFinishSelect }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-3">3. Choose a Finish</h3>
      <div className="grid grid-cols-3 gap-3">
        {VEHICLE_FINISHES.map((finish) => (
          <button
            key={finish.name}
            title={finish.description}
            onClick={() => onFinishSelect(finish.name)}
            className={`group relative w-full p-3 rounded-lg text-center font-semibold transition-all duration-200
                        ${selectedFinish === finish.name 
                            ? 'bg-brand-secondary text-white ring-2 ring-offset-2 ring-offset-base-200 ring-brand-secondary' 
                            : 'bg-base-300 hover:bg-opacity-80'}`}
          >
            {finish.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinishSelector;
