'use client';

import { getUserByAdmin } from '@/app/actions/auth';
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

const AdminSelect = <T extends FieldValues>({ register, errors, name }: CustomInputProps<T>) => {
  const [user, setUser] = useState<User[] | null>(null);
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const instructorOptions = useMemo(() => {
    return user?.map((item) => ({
      label: item.name,
      value: item.id
    }))
  }, [user])


  const getInstructor = async () => {
    setLoading(true)
    try {
      const res = await getUserByAdmin({ limit: 100, role: 'instructor' })
      console.log("select input console", res.data.data)
      setUser(res.data.data)
      setError('')
    } catch (error) {
      setError('failed to get instructor')
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getInstructor()
  }, [])


  return <div>
    {loading ? <div className=' w-full space-y-2'>
      <Label>Category</Label>
      <div className=' border py-2 rounded-md px-2'>Loading....</div>
    </div> : instructorOptions && <CustomSelect
      label="Instructor"
      name={name}
      register={register}
      errors={errors}
      options={instructorOptions}
    />}
  </div>;
};

export default AdminSelect;
