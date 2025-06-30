'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function UserProfileSkeleton() {
  return (
    <div className="flex flex-col md:flex-row w-full bg-hr-gray-90 text-white rounded-md overflow-hidden">
      {[...Array(2)].map((_, idx) => (
        <div
          key={idx}
          className="flex-1 flex flex-col justify-between p-4 md:p-6 border-b md:border-b-0 md:border-r border-hr-gray-70 last:border-r-0"
        >
          <div className="flex items-center gap-1 text-hr-gray-40 text-hr-b4">
            <Skeleton width={40} height={12} />
          </div>
          <div className="mt-2 md:mt-4">
            <Skeleton width="80%" height={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
