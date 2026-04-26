'use client';

import React, { useState } from 'react';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    onImagesChange: (files: File[]) => void;
    maxFiles?: number;
}

export const ImageUpload = ({ onImagesChange, maxFiles = 1 }: ImageUploadProps) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileChange = (files: FileList | null) => {
        if (!files) return;

        // নতুন ফাইলগুলো অ্যারেতে রূপান্তর করা এবং লিমিট চেক করা
        const fileArray = Array.from(files).slice(0, maxFiles);
        setSelectedFiles(fileArray);
        onImagesChange(fileArray);

        // প্রিভিউ তৈরি করা
        const newPreviews = fileArray.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const removeImage = (index: number) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);

        setSelectedFiles(updatedFiles);
        setPreviews(updatedPreviews);
        onImagesChange(updatedFiles);
    };

    return (
        <div className="w-full space-y-4">
            {/* Dropzone Area */}
            <div className="relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-gray-100 transition-all cursor-pointer">
                <input
                    type="file"
                    multiple={maxFiles > 1}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e.target.files)}
                />

                <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                    <Upload className="text-gray-400" size={24} />
                </div>

                <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">Click to upload image</p>
                    <p className="text-xs text-gray-400 mt-1 uppercase">
                        PNG, JPG or WebP (Max {maxFiles} file)
                    </p>
                </div>
            </div>

            {/* Preview Section */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previews.map((src, index) => (
                        <div key={src} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                            <Image
                                src={src}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />

                            {/* Delete Button */}
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={14} />
                            </button>

                            {/* Status Badge */}
                            <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-white/90 rounded text-[9px] font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 size={10} /> SELECTED
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};