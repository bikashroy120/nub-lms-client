'use client';

import React, { useState } from 'react';
import CustomDialog from '@/components/shared/CustomDialog';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { useDeleteLesson } from '@/hooks/useLesson';

interface UserDeleteProps {
    id: number;
    name: string;
}

const DeleteLesson = ({ id, name }: UserDeleteProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate, isPending } = useDeleteLesson();

    const handleDelete = () => {
        mutate(id, {
            onSuccess: () => setIsOpen(false),
        });
    };

    return (
        <CustomDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Confirm Deletion"
            trigger={
                <Button
                    size={'sm'}
                    variant={'outline'}
                    className='bg-red-50 text-red-600 border border-red-100 cursor-pointer hover:bg-red-600 hover:text-white duration-200'
                >
                    <Trash2 size={16} />
                </Button>
            }
        >
            <div className="flex flex-col items-center gap-4 py-4">
                {/* Warning Icon */}
                <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="text-red-600" size={32} />
                </div>

                <p className="text-center text-gray-600">
                    Are you sure you want to permanently delete <span className="font-bold text-gray-900">"{name}"</span> This action cannot be undone.?
                </p>

                <div className="flex w-full gap-3 pt-4">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsOpen(false)}
                        disabled={isPending}
                    >
                        No, Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Yes, Delete"
                        )}
                    </Button>
                </div>
            </div>
        </CustomDialog>
    );
};

export default DeleteLesson;