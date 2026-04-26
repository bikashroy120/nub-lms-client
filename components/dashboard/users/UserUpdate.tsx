'use client';

import React, { useState } from 'react';
import CustomDialog from '@/components/shared/CustomDialog';
import { Button } from '@/components/ui/button';
import { Edit, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CustomInput from '@/components/shared/CustomInput';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { useUpdateUser } from '@/hooks/useUsers';
import { User } from '@/types/auth';

interface UserUpdateProps {
    user: User;
}

const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Instructor', value: 'instructor' },
    { label: 'User', value: 'user' },
];

const UserUpdate = ({ user }: UserUpdateProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate, isPending } = useUpdateUser();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user.name,
            role: user.role,
            address: user.address || '',
            phone: user.phone || '',
        }
    });

    const onSubmit = (data: any) => {
        mutate({ id: user.id, data }, {
            onSuccess: () => setIsOpen(false)
        });
    };

    return (
        <CustomDialog
            open={isOpen}
            onOpenChange={setIsOpen}
            title="Update User Info"
            description="Make changes to the user profile here. Click save when you're done."
            trigger={
                <Button size="sm" variant="outline" className="flex items-center gap-2 cursor-pointer">
                    <Edit size={14} />
                </Button>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <CustomInput
                    label="Full Name"
                    name="name"
                    register={register}
                    errors={errors}
                />
                <CustomSelect
                    label="Role"
                    name="role"
                    register={register}
                    errors={errors}
                    options={roleOptions}
                />
                <CustomInput
                    label="Phone"
                    name="phone"
                    register={register}
                    errors={errors}
                />

                <CustomInput
                    label="Address"
                    name="address"
                    register={register}
                    errors={errors}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        className=''
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </div>
            </form>
        </CustomDialog>
    );
};

export default UserUpdate;