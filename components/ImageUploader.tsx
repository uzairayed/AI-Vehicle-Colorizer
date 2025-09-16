import React, { useRef } from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="relative block w-full aspect-video rounded-lg cursor-pointer transition-all duration-300 sketch-border bg-paper"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          id="image-upload"
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        {imagePreview ? (
          <img src={imagePreview} alt="Vehicle preview" className="object-contain w-full h-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-ink-secondary">
            <UploadIcon className="w-12 h-12 mb-2" />
            <span className="font-semibold text-lg">Drag & Drop or Click to Upload</span>
            <span className="text-sm">PNG, JPG, or WEBP</span>
          </div>
        )}
      </label>
      {imagePreview && (
         <button 
            onClick={triggerFileSelect}
            className="mt-4 w-full sketch-button text-ink font-semibold py-2 px-4">
            Change Image
         </button>
      )}
    </div>
  );
};

export default ImageUploader;