import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
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

export const CustomTextarea = <T extends FieldValues>({
  register,
  label,
  name,
  errors,
  placeholder,
}: CustomInputProps<T>) => {
  const error = errors[name];
  return (
    <div className='w-full space-y-2'>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        {...register(name)}
        placeholder={placeholder}
        className={`min-h-[120px] focus-visible:ring-0 ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className='text-xs text-red-500'>{error.message as string}</p>
      )}
    </div>
  );
};
