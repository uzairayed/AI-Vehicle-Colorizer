import React from 'react';
import PaintBrushIcon from './icons/PaintBrushIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-paper-2 py-4 border-b-2 border-ink">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <PaintBrushIcon className="h-8 w-8 text-brand-blue mr-3" />
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-wider">
          AI Vehicle Colorizer
        </h1>
      </div>
    </header>
  );
};

export default Header;