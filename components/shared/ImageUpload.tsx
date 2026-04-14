"use client";

import React, { useState, useRef } from "react";
import { ImagePlus, X, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface ImageUploadProps {
    onImagesChange: (files: File[]) => void;
}

export function ImageUpload({ onImagesChange }: ImageUploadProps) {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);

            // State update
            const newImages = [...selectedImages, ...filesArray];
            setSelectedImages(newImages);
            onImagesChange(newImages);

            // Preview generation
            const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
            setPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        const updatedPreviews = previews.filter((_, i) => i !== index);

        setSelectedImages(updatedImages);
        setPreviews(updatedPreviews);
        onImagesChange(updatedImages);

        // URL revoke kore memory save kora
        URL.revokeObjectURL(previews[index]);
    };

    return (
        <div className="space-y-4 w-full">
            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition"
            >
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <Input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />
            </div>

            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previews.map((url, index) => (
                        <div key={url} className="relative group aspect-square rounded-md overflow-hidden border">
                            <Image
                                src={url}
                                alt="Upload preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-destructive text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}