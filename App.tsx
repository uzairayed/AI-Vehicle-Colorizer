import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ColorPalette from './components/ColorPalette';
import FinishSelector from './components/FinishSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingOverlay from './components/LoadingOverlay';
import LandingPage from './components/LandingPage';
import { editImageWithColor } from './services/geminiService';
import type { ColorOption } from './types';
import { VEHICLE_FINISHES } from './constants';

// FIX: Removed React.FC type definition to align with modern React patterns and resolve a potential type inference issue.
const App = () => {
    const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
    const [selectedFinish, setSelectedFinish] = useState<string>(VEHICLE_FINISHES[0].name);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleStart = () => {
        setShowLandingPage(false);
    };

    useEffect(() => {
        if (!originalFile) {
            setOriginalImagePreview(null);
            return;
        }
        const objectUrl = URL.createObjectURL(originalFile);
        setOriginalImagePreview(objectUrl);
        
        return () => URL.revokeObjectURL(objectUrl);
    }, [originalFile]);

    const handleImageUpload = (file: File) => {
        setOriginalFile(file);
        setEditedImage(null);
        setError(null);
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleGenerate = async () => {
        if (!originalFile || !selectedColor || !selectedFinish) {
            setError("Please upload an image, select a color, and choose a finish.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setEditedImage(null);

        try {
            const base64Image = await convertFileToBase64(originalFile);
            // If the color name is 'Custom', use its hex value for a more precise AI prompt.
            const colorToUse = selectedColor.name === 'Custom' ? selectedColor.hex : selectedColor.name;
            const newImageSrc = await editImageWithColor(base64Image, originalFile.type, colorToUse, selectedFinish);
            setEditedImage(newImageSrc);
        // FIX: Replaced 'any' typed catch block with a more robust type-safe check. This resolves parsing errors that caused variables to appear out of scope.
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const isGenerateDisabled = !originalFile || !selectedColor || !selectedFinish || isLoading;

    if (showLandingPage) {
        return <LandingPage onStart={handleStart} />;
    }

    return (
        <div className="min-h-screen bg-paper text-ink font-sans fade-in">
            <Header />
            <main className="container mx-auto p-4 sm:p-8 max-w-5xl">
                <div className="bg-paper-2 p-6 sm:p-8 rounded-xl sketch-border">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Column: Uploader & Palette */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-ink-secondary mb-3">1. Upload a Vehicle Photo</h3>
                                <ImageUploader onImageUpload={handleImageUpload} imagePreview={originalImagePreview} />
                            </div>
                            <ColorPalette selectedColor={selectedColor} onColorSelect={setSelectedColor} />
                            <FinishSelector selectedFinish={selectedFinish} onFinishSelect={setSelectedFinish} />
                        </div>

                        {/* Right Column: Action & Status */}
                        <div className="relative bg-paper p-6 rounded-lg h-full flex flex-col justify-center min-h-[300px] sketch-border">
                            {isLoading && <LoadingOverlay />}
                            <div className="text-center space-y-4">
                                <h3 className="text-3xl font-bold text-ink">Ready to Recolor?</h3>
                                <p className="text-ink-secondary text-lg">
                                    Once you've uploaded an image, picked a color and finish, hit the button below to let our AI work its magic.
                                </p>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerateDisabled}
                                    className={`w-full py-3 px-6 text-xl font-bold sketch-button
                                        ${isGenerateDisabled
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-70'
                                            : 'bg-brand-yellow hover:bg-amber-300 text-ink'
                                        }`}
                                >
                                    {isLoading ? 'Coloring...' : 'Apply AI Color'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 bg-brand-red/20 border-2 border-brand-red text-brand-red font-bold px-4 py-3 rounded-lg relative sketch-border" role="alert">
                        <strong className="font-bold">Oh no! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {originalImagePreview && editedImage && (
                    <ResultDisplay originalImage={originalImagePreview} editedImage={editedImage} />
                )}
            </main>
             <footer className="text-center py-4 mt-8 text-ink-secondary text-sm">
                <p>Powered by Gemini API. Designed for creative exploration.</p>
            </footer>
        </div>
    );
};

export default App;
