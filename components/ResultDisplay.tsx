import React from 'react';
import DownloadIcon from './icons/DownloadIcon';

interface ResultDisplayProps {
  originalImage: string;
  editedImage: string;
}

interface ImageCardProps {
    src: string;
    title: string;
    onDownload?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, title, onDownload }) => (
    <div className="w-full flex flex-col items-center bg-base-200 p-4 rounded-lg shadow-lg">
        <div className="w-full flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            {onDownload && (
                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                    aria-label="Download edited image"
                >
                    <DownloadIcon className="h-5 w-5" />
                    <span>Download</span>
                </button>
            )}
        </div>
        <div className="w-full aspect-video rounded-md overflow-hidden">
            <img src={src} alt={title} className="w-full h-full object-contain"/>
        </div>
    </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, editedImage }) => {
  const handleDownload = () => {
    if (!editedImage) return;

    const link = document.createElement('a');
    link.href = editedImage;

    // Extract file extension from base64 mime type
    const mimeType = editedImage.substring(editedImage.indexOf(':') + 1, editedImage.indexOf(';'));
    const extension = mimeType.split('/')[1] || 'png';
    
    link.download = `ai-colorized-vehicle.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mt-10">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageCard src={originalImage} title="Before"/>
            <ImageCard src={editedImage} title="After" onDownload={handleDownload} />
        </div>
    </div>
  );
};

export default ResultDisplay;
