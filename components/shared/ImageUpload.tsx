'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageUploadProps {
    onImagesChange: (files: File[]) => void;
    maxFiles?: number;
}

export const ImageUpload = ({ onImagesChange, maxFiles = 1 }: ImageUploadProps) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (files: FileList | null) => {
        if (!files) return;

        const newFiles = Array.from(files).slice(0, maxFiles);
        onImagesChange(newFiles);

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviews(newPreviews);
    };

    const removeImage = (index: number) => {
        const updatedPreviews = previews.filter((_, i) => i !== index);
        setPreviews(updatedPreviews);
        // Note: To properly sync with parent, you might need to manage actual File objects state here too
    };

    return (
        <div className="w-full space-y-4">
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFileChange(e.dataTransfer.files);
                }}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-blue-300'}
        `}
            >
                <input
                    type="file"
                    multiple={maxFiles > 1}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(e.target.files)}
                />

                <div className={`p-4 rounded-full mb-4 transition-transform duration-300 ${isDragging ? 'scale-110 bg-blue-100' : 'bg-white shadow-sm'}`}>
                    <Upload className={isDragging ? 'text-blue-600' : 'text-gray-400'} size={32} />
                </div>

                <div className="text-center">
                    <p className="text-sm font-bold text-gray-700">
                        Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                        PNG, JPG or WebP (Max {maxFiles} file)
                    </p>
                </div>
            </div>

            {/* Image Preview Grid */}
            <AnimatePresence>
                {previews.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {previews.map((src, index) => (
                            <motion.div
                                key={src}
                                className="relative group aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-sm"
                            >
                                <Image
                                    src={src}
                                    alt="Preview"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="p-2 bg-white/20 hover:bg-rose-500 backdrop-blur-md text-white rounded-full transition-all"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                                    <CheckCircle2 size={10} /> READY
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};