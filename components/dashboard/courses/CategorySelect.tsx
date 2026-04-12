'use client';

import { getUserByAdmin } from '@/app/actions/auth';
import { getCategories } from '@/app/actions/category';
import { CustomSelect } from '@/components/shared/CustomSelect';
import { Label } from '@/components/ui/label';
import { User } from '@/types/auth';
import React, { useEffect, useMemo, useState } from 'react';
import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    errors: FieldErrors<T>;
}

const CategorySelect = <T extends FieldValues>({ register, errors, name }: CustomInputProps<T>) => {
    const [user, setUser] = useState<User[] | null>(null);
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState(true)

    const instructorOptions = useMemo(() => {
        return user?.map((item) => ({
            label: item.name,
            value: item.id
        }))
    }, [user])


    const getCategory = async () => {
        setLoading(true)
        try {
            const res = await getCategories()
            console.log("select input console", res.data.data)
            setUser(res.data)
            setError('')
        } catch (error) {
            setError('failed to get instructor')
            return null
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategory()
    }, [])


    return <div>
        {loading ? <>
            <div className=' w-full space-y-2'>
                <Label>Category</Label>
                <div className=' border py-2 px-2 rounded-md'>Loading....</div>
            </div>
        </> : instructorOptions && <CustomSelect
            label="Category"
            name={name}
            register={register}
            errors={errors}
            options={instructorOptions}
        />}
    </div>;
};

export default CategorySelect;
