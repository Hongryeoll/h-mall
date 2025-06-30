'use client';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function CurrentQnaSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-hr-h5 font-hr-bold">나의 Q&A</h2>
        <div className="flex items-center gap-1 text-hr-b4 text-hr-gray-50">
          <Skeleton width={40} height={12} />
        </div>
      </div>
      <hr className="border-black mt-1 mb-4" />

      <div className="border border-hr-gray-20 p-4 rounded-lg">
        <ul className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <li
              key={idx}
              className="border border-hr-gray-20 p-4 rounded-lg bg-hr-white"
            >
              <div>
                <Skeleton width={60} height={10} />
                <Skeleton width="70%" height={14} className="mt-2" />
                <Skeleton width="90%" height={12} className="mt-2" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
