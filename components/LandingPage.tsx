import React from 'react';
import HeroImage from './icons/HeroImage';
import PaintBrushIcon from './icons/PaintBrushIcon';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans flex flex-col items-center justify-center p-4 fade-in">
      <main className="container mx-auto max-w-4xl text-center">
        <div className="bg-paper-2 p-8 sm:p-12 rounded-xl sketch-border">
          <div className="flex justify-center items-center gap-4 mb-6">
            <PaintBrushIcon className="h-10 w-10 text-brand-blue" />
            <h1 className="text-4xl sm:text-5xl font-bold text-ink tracking-wider">
              AI Vehicle Colorizer
            </h1>
          </div>
          
          <HeroImage className="w-full max-w-lg mx-auto mb-6" />

          <h2 className="text-3xl sm:text-4xl font-bold text-ink mb-3">
            Dream it. See it. Drive it.
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto mb-8">
            Upload a photo of your car or bike, pick a new color and finish, and let our AI create a realistic mockup in seconds.
          </p>
          <button
            onClick={onStart}
            className="w-full sm:w-auto py-3 px-10 text-2xl font-bold sketch-button bg-brand-yellow hover:bg-amber-300 text-ink"
          >
            Start Coloring Now
          </button>
        </div>
      </main>
      <footer className="text-center py-4 mt-8 text-ink-secondary text-sm">
          <p>Powered by Gemini API. Designed for creative exploration.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
