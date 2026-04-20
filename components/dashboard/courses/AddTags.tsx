import React, { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface TagInputProps {
    placeholder?: string;
    tags: string[];
    setTags: (tags: string[]) => void;
}

export function AddTags({ placeholder, tags, setTags }: TagInputProps) {
    const [inputValue, setInputValue] = useState("");

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            setTags([...tags, trimmedValue]);
            setInputValue("");
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="w-full space-y-3 border border-gray-200 rounded-2xl p-4">
            <Label>{placeholder}</Label>
            <div className="flex gap-2">
                <Input
                    type="text"
                    placeholder={placeholder || "Add a tag..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="focus-visible:ring-0 py-5 focus-visible:ring-offset-0 flex-1"
                />
                <Button type="button" onClick={addTag} className="py-5 shrink-0">
                    Add
                </Button>
            </div>
            <div className="flex flex-wrap w-full gap-2 pt-2">
                {tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="secondary"
                        className="px-3 py-1 flex items-center gap-1 max-w-full break-all whitespace-normal"
                    >
                        <span className="flex-1">{tag}</span>
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-destructive transition-colors shrink-0"
                        >
                            <X size={14} />
                        </button>
                    </Badge>
                ))}
            </div>
        </div>
    );
}