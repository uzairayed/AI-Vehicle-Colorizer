import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ColorPalette from './components/ColorPalette';
import FinishSelector from './components/FinishSelector';
import ResultDisplay from './components/ResultDisplay';
import LoadingOverlay from './components/LoadingOverlay';
import { editImageWithColor } from './services/geminiService';
import type { ColorOption } from './types';
import { VEHICLE_FINISHES } from './constants';

const App: React.FC = () => {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
    const [selectedFinish, setSelectedFinish] = useState<string>(VEHICLE_FINISHES[0].name);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
            const newImageSrc = await editImageWithColor(base64Image, originalFile.type, selectedColor.name, selectedFinish);
            setEditedImage(newImageSrc);
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const isGenerateDisabled = !originalFile || !selectedColor || !selectedFinish || isLoading;

    return (
        <div className="min-h-screen bg-base-100 text-gray-100 font-sans">
            <Header />
            <main className="container mx-auto p-4 sm:p-8 max-w-5xl">
                <div className="bg-base-200 p-6 sm:p-8 rounded-xl shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Column: Uploader & Palette */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-200 mb-3">1. Upload a Vehicle Photo</h3>
                                <ImageUploader onImageUpload={handleImageUpload} imagePreview={originalImagePreview} />
                            </div>
                            <ColorPalette selectedColor={selectedColor} onColorSelect={setSelectedColor} />
                            <FinishSelector selectedFinish={selectedFinish} onFinishSelect={setSelectedFinish} />
                        </div>

                        {/* Right Column: Action & Status */}
                        <div className="relative bg-base-300 p-6 rounded-lg h-full flex flex-col justify-center min-h-[300px]">
                            {isLoading && <LoadingOverlay />}
                            <div className="text-center space-y-4">
                                <h3 className="text-2xl font-bold text-white">Ready to Recolor?</h3>
                                <p className="text-gray-300">
                                    Once you've uploaded an image, picked a color and finish, hit the button below to let our AI work its magic.
                                </p>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerateDisabled}
                                    className={`w-full py-3 px-6 text-lg font-bold rounded-lg transition-all duration-300 transform hover:scale-105
                                        ${isGenerateDisabled
                                            ? 'bg-gray-500 cursor-not-allowed'
                                            : 'bg-brand-secondary hover:bg-blue-500 text-white shadow-lg'
                                        }`}
                                >
                                    {isLoading ? 'Generating...' : 'Apply AI Color'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-6 bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded-lg relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                {originalImagePreview && editedImage && (
                    <ResultDisplay originalImage={originalImagePreview} editedImage={editedImage} />
                )}
            </main>
             <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
                <p>Powered by Gemini API. Designed for creative exploration.</p>
            </footer>
        </div>
    );
};

export default App;
