import React, { useState, useEffect } from 'react';
import { VEHICLE_COLORS } from '../constants';
import type { ColorOption } from '../types';
import AddIcon from './icons/AddIcon';

interface ColorPaletteProps {
  selectedColor: ColorOption | null;
  onColorSelect: (color: ColorOption) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onColorSelect }) => {
  const [customColor, setCustomColor] = useState('#db2777');
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    // Hide the color picker if a predefined color is selected
    if (selectedColor?.name !== 'Custom') {
      setPickerVisible(false);
    }
  }, [selectedColor]);

  const handleCustomColorClick = () => {
    const newPickerState = !isPickerVisible;
    setPickerVisible(newPickerState);
    onColorSelect({ name: 'Custom', hex: customColor });
  };

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = event.target.value;
    setCustomColor(newHex);
    onColorSelect({ name: 'Custom', hex: newHex });
  };

  const isCustomSelected = selectedColor?.name === 'Custom';

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-ink-secondary mb-3">2. Choose a Color</h3>
      <div className="grid grid-cols-5 sm:grid-cols-9 gap-3">
        {VEHICLE_COLORS.map((color) => (
          <button
            key={color.name}
            title={color.name}
            onClick={() => onColorSelect(color)}
            className={`group relative w-full aspect-square transition-all duration-200 transform hover:scale-110
                        ${selectedColor?.hex === color.hex ? 'ring-4 ring-offset-2 ring-offset-paper-2 ring-brand-blue' : 'ring-2 ring-transparent'}`}
            style={{ 
              backgroundColor: color.hex,
              borderRadius: '45% 55% 60% 40% / 55% 45% 55% 45%'
            }}
            aria-label={`Select color ${color.name}`}
          >
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-ink text-paper text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
              {color.name}
            </span>
          </button>
        ))}
        {/* Custom Color Button */}
        <button
          title="Custom Color"
          onClick={handleCustomColorClick}
          className={`group relative w-full aspect-square transition-all duration-200 transform hover:scale-110 flex items-center justify-center
                      ${isCustomSelected ? 'ring-4 ring-offset-2 ring-offset-paper-2 ring-brand-blue' : 'ring-2 ring-ink ring-opacity-50'}`}
          style={{ 
            backgroundColor: customColor,
            borderRadius: '45% 55% 60% 40% / 55% 45% 55% 45%'
          }}
          aria-label="Select custom color"
        >
          {!isCustomSelected && <AddIcon className="w-8 h-8 text-paper" style={{mixBlendMode: 'difference'}} />}
          <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-ink text-paper text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10">
              Custom
          </span>
        </button>
      </div>
      
      {isPickerVisible && (
        <div className="mt-4 flex items-center gap-4 p-3 bg-paper-2 rounded-lg sketch-border">
          <label htmlFor="custom-color-picker" className="font-semibold text-ink-secondary">Pick a shade:</label>
          <input
            id="custom-color-picker"
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-12 h-12 p-0 border-none cursor-pointer"
            style={{
              borderRadius: '50%',
              border: '2px solid #333'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPalette;