import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  label?: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  type?: string;
  placeholder?: string;
}

const CustomInput = <T extends FieldValues>({
  register,
  label,
  name,
  errors,
  type = 'text',
  placeholder,
}: CustomInputProps<T>) => {
  const error = errors[name];

  return (
    <div className='w-full space-y-2'>
      {label && <Label htmlFor={name as string}>{label}</Label>}

      <div className='relative'>
        <Input
          id={name as string}
          type={type}
          placeholder={placeholder}
          {...register(name)}
          className={`pl-3 focus-visible:ring-0 py-5 focus-visible:ring-offset-0 ${
            error ? 'border-red-500 focus-visible:ring-red-500' : ''
          }`}
        />
      </div>

      {error && (
        <p className='text-xs font-medium text-red-500 ml-1'>
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
