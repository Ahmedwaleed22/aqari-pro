import React from 'react';

interface ResultBoxProps {
  label: string;
  value: number;
  isPrimary?: boolean;
  subtext?: string;
}

export const ResultBox: React.FC<ResultBoxProps> = ({ label, value, isPrimary = false, subtext }) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 ${isPrimary ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-100 shadow-sm'}`}>
      <dt className={`truncate text-sm font-medium ${isPrimary ? 'text-blue-100' : 'text-slate-500'}`}>
        {label}
      </dt>
      <dd className={`mt-2 text-3xl font-bold tracking-tight ${isPrimary ? 'text-white' : 'text-slate-900'}`}>
        {formattedValue} <span className={`text-base font-normal ${isPrimary ? 'text-blue-200' : 'text-slate-400'}`}>ج.م</span>
      </dd>
      {subtext && (
        <p className={`mt-1 text-xs ${isPrimary ? 'text-blue-200' : 'text-slate-400'}`}>
          {subtext}
        </p>
      )}
    </div>
  );
};