'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  isHiddenLeftIcon?: boolean;
  showAdmin?: boolean;
};

export const HrHeaderSkeleton = ({
  className = '',
  style = {},
  isHiddenLeftIcon = false,
  showAdmin = false,
}: Props) => {
  return (
    <div
      className={`
        sticky top-0 z-50 w-full flex items-center h-[56px] border-b border-gray-200 bg-hr-white px-4 ${className}
      `}
      style={style}
    >
      {/* Left Logo */}
      <div className="flex items-center">
        {!isHiddenLeftIcon && (
          <span className="p-3">
            <Skeleton circle width={30} height={30} />
          </span>
        )}
      </div>

      {/* Right Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        {/* SEARCH */}
        <span className="inline-flex items-center gap-1 p-2">
          <Skeleton circle width={18} height={18} />
          <div className="hidden lg:block">
            <Skeleton width={60} height={12} />
          </div>
        </span>

        {/* MY PAGE */}
        <span className="inline-flex items-center gap-1 p-2">
          <Skeleton circle width={18} height={18} />
          <div className="hidden lg:block">
            <Skeleton width={60} height={12} />
          </div>
        </span>

        {/* SHOPPING BAG */}
        <span className="inline-flex items-center gap-1 p-2">
          <Skeleton circle width={18} height={18} />
          <div className="hidden lg:block">
            <Skeleton width={80} height={12} />
          </div>
        </span>

        {/* LOGIN/LOGOUT */}
        <span className="inline-flex items-center gap-1 p-2">
          <Skeleton circle width={18} height={18} />
          <div className="hidden lg:block">
            <Skeleton width={50} height={12} />
          </div>
        </span>

        {/* ADMIN (Optional) */}
        {showAdmin && (
          <span className="inline-flex items-center gap-1 p-2">
            <Skeleton circle width={18} height={18} />
            <div className="hidden lg:block">
              <Skeleton width={55} height={12} />
            </div>
          </span>
        )}
      </div>
    </div>
  );
};
