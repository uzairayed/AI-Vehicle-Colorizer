import React from 'react';
import { VEHICLE_COLORS } from '../constants';
import type { ColorOption } from '../types';

interface ColorPaletteProps {
  selectedColor: ColorOption | null;
  onColorSelect: (color: ColorOption) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-200 mb-3">2. Choose a Color</h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {VEHICLE_COLORS.map((color) => (
          <button
            key={color.name}
            title={color.name}
            onClick={() => onColorSelect(color)}
            className={`group relative w-full aspect-square rounded-full transition-all duration-200 transform hover:scale-110
                        ${selectedColor?.name === color.name ? 'ring-4 ring-offset-2 ring-offset-base-100 ring-brand-secondary' : 'ring-2 ring-transparent'}`}
            style={{ backgroundColor: color.hex }}
            aria-label={`Select color ${color.name}`}
          >
            {/* Tooltip */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-base-300 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
