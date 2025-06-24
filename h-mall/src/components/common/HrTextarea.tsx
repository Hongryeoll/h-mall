import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface Props {
  name: string;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

export function HrTextarea({
  name,
  placeholder = '',
  maxLength = 1000,
  rows = 3,
}: Props) {
  const { register, control } = useFormContext();

  const text = useWatch({ control, name, defaultValue: '' }) as string;

  return (
    <div className="border border-hr-gray-20 rounded-md p-4">
      <textarea
        id={name}
        aria-describedby={`${name}-count`}
        {...register(name)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className="w-full resize-none outline-none text-hr-b4"
      />
      <div
        id={`${name}-count`}
        className="text-right text-hr-b5 text-hr-gray-50"
      >
        <span className="text-hr-gray-90 font-hr-semi-bold">{text.length}</span>
        /{maxLength}
      </div>
    </div>
  );
}
