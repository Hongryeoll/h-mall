'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

type HrSelectboxProps = {
  value: string | null;
  onChange: (value: string) => void;
  options: { value: string; label: string | null }[];
  placeholder?: string;
  className?: string;
};

export default function HrSelectbox({
  value,
  onChange,
  options,
  placeholder = '선택해주세요',
  className,
}: HrSelectboxProps) {
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder;

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={clsx('relative', className)}>
        <ListboxButton
          className="w-full border border-hr-gray-30 rounded-md bg-hr-white py-2 pl-3 pr-10 text-left text-sm text-hr-gray-60
                    focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition"
        >
          <span className="block truncate">{selectedLabel}</span>
          <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
            <ChevronUpDownIcon className="h-4 w-4 text-hr-gray-40" />
          </span>
        </ListboxButton>

        <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-hr-white py-1 text-sm shadow-lg ring-1 ring-hr-gray-20">
          {options.length === 0 && (
            <div className="px-4 py-2 text-hr-gray-40 italic">
              선택 가능한 항목이 없습니다
            </div>
          )}

          {/* 선택된 값이 없을 때 표시할 안내 메시지 옵션 */}
          {value === null && options.length > 0 && (
            <ListboxOption
              value=""
              disabled
              className="cursor-default select-none px-4 py-2 text-hr-gray-40 italic"
            >
              옵션을 선택해주세요
            </ListboxOption>
          )}

          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={({ active, selected }) =>
                clsx(
                  'cursor-pointer select-none px-4 py-2',
                  active
                    ? 'bg-hr-purple-bg text-hr-purple-default'
                    : 'text-hr-gray-70',
                  selected && 'font-hr-bold'
                )
              }
            >
              {({ selected }) => (
                <div className="flex justify-between items-center">
                  <span className="block truncate">{option.label ?? ''}</span>
                  {selected && (
                    <CheckIcon
                      className="h-4 w-4 text-hr-purple-default"
                      aria-hidden="true"
                    />
                  )}
                </div>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
