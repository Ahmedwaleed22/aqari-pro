import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputGroupProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (val: string) => void;
  icon?: LucideIcon;
  placeholder?: string;
  suffix?: string;
  type?: 'text' | 'number';
}

export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  placeholder,
  suffix,
  type = 'text' // Default to text to allow commas
}) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          </div>
        )}
        <input
          type={type === 'number' ? 'number' : 'text'}
          inputMode={type === 'number' ? 'numeric' : 'decimal'}
          name={id}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full rounded-xl border-0 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${
            Icon ? 'pr-10' : ''
          } ${suffix ? 'pl-12' : ''} bg-white transition-all`}
          placeholder={placeholder}
          autoComplete="off"
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 sm:text-sm font-medium">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};