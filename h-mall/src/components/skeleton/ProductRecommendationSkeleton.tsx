'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  title: string;
};

export default function ProductRecommendationSkeleton({ title }: Props) {
  return (
    <section className="w-full mb-10">
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Skeleton width={40} height={16} />
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto px-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-[180px] flex-shrink-0 border rounded-md p-2"
          >
            <div className="relative w-full h-44 mb-2">
              <Skeleton width="100%" height="100%" />
            </div>
            <div className="text-sm">
              <Skeleton width="100%" height={14} />
            </div>
            <div className="font-semibold mt-1">
              <Skeleton width={80} height={16} />
            </div>
            <div className="text-red-500 text-xs mt-1">
              <Skeleton width={40} height={10} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
