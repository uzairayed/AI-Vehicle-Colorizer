import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
    "Warming up the AI paint guns...",
    "Mixing the perfect shade...",
    "Applying the first coat...",
    "Inspecting the new paint job...",
    "Adding the finishing touches...",
    "Revealing your new look...",
];

const LoadingOverlay: React.FC = () => {
    const [message, setMessage] = useState(LOADING_MESSAGES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessage(prevMessage => {
                const currentIndex = LOADING_MESSAGES.indexOf(prevMessage);
                const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                return LOADING_MESSAGES[nextIndex];
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 bg-paper/80 backdrop-blur-sm flex flex-col items-center justify-center z-50 rounded-lg">
            <div className="sketch-spinner"></div>
            <p className="text-ink text-xl mt-4 font-semibold text-center px-4">{message}</p>
        </div>
    );
};

export default LoadingOverlay;