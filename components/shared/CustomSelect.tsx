import { Label } from '../ui/label';
import { UseFormRegister, FieldErrors, FieldValues, Path } from 'react-hook-form';

interface CustomSelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  options: { label: string; value: string | number }[];
}

export const CustomSelect = <T extends FieldValues>({
  register,
  label,
  name,
  errors,
  options,
}: CustomSelectProps<T>) => {
  const error = errors[name];
  return (
    <div className="w-full space-y-2">
      <Label htmlFor={name as string}>{label}</Label>
      <select
        id={name as string}
        {...register(name)}
        className={`w-full p-2.5 bg-white border rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          error ? 'border-red-500' : 'border-gray-200'
        }`}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs font-medium text-red-500 ml-1">
          {error.message as string}
        </p>
      )}
    </div>
  );
};