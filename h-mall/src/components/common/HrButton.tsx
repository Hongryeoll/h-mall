import { JSX } from 'react';

type Props = {
  text: JSX.Element | string;
  size?: 'xxl' | 'xl' | 'l' | 'm' | 's' | 'xs' | 'xxs';
  type?: 'default' | 'line' | 'light' | 'flat' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
  SvgComp?: React.ReactNode;
  className?: string;
};

export const HrButton = ({
  text,
  size = 'm',
  type = 'default',
  disabled = false,
  onClick,
  SvgComp,
  className = '',
}: Props) => {
  return (
    <>
      <button
        className={`flex items-center justify-center font-semibold leading-none w-full whitespace-nowrap ${
          sizeClasses[size]
        } ${disabled ? disabledClasses : typeClasses[type]} ${className}`}
        disabled={disabled}
        onClick={onClick && onClick}
      >
        {SvgComp && SvgComp}
        {text}
      </button>
    </>
  );
};

const sizeClasses = {
  xxl: 'h-14 text-hr-b1 px-5 py-0 gap-1 rounded-lg',
  xl: 'h-12 text-hr-b2 px-4 py-0 gap-1 rounded-lg',
  l: 'h-10 text-hr-b3 px-3 py-0 gap-0.5 rounded-md',
  m: 'h-9 text-hr-b5 px-3 py-0 gap-0.5 rounded-md',
  s: 'h-8 text-hr-c1 px-3 py-0 gap-0.5 rounded-md',
  xs: 'h-7 text-hr-c2 px-2 py-0 gap-0.5 rounded-sm',
  xxs: 'h-6 text-hr-c2 px-2 py-0 gap-0.5 rounded-[4px]',
};

const typeClasses = {
  default: 'bg-hr-purple-default border-none text-white',
  line: 'bg-hr-white border border-hr-purple-default text-hr-purple-default',
  light: 'bg-hr-white text-hr-gray-40',
  flat: 'bg-hr-gray-10 text-hr-gray-40',
  danger: 'bg-hr-white border border-hr-danger-default text-hr-danger-default',
};

const disabledClasses = 'bg-hr-gray-10 text-hr-gray-40';

// const iconSize = {
//   xxl: 24,
//   xl: 24,
//   l: 20,
//   m: 16,
//   s: 16,
//   xs: 16,
//   xxs: 16,
// };
