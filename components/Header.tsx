
import React from 'react';
import PaintBrushIcon from './icons/PaintBrushIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <PaintBrushIcon className="h-8 w-8 text-brand-secondary mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">
          AI Vehicle Colorizer
        </h1>
      </div>
    </header>
  );
};

export default Header;
