'use client';
import { useState } from 'react';
import StarSVG from '@/assets/icons/star.svg';

type Props = {
  rating: number;
  onChange?: (newRating: number) => void; // 선택적
  readOnly?: boolean; // 읽기 전용 모드
};

export default function HrStarRating({ rating, onChange, readOnly }: Props) {
  const [hover, setHover] = useState(0);

  const handleClick = (star: number) => {
    if (readOnly) return;
    onChange?.(star);
  };

  const handleMouseEnter = (star: number) => {
    if (readOnly) return;
    setHover(star);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHover(0);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hover >= star || (!hover && rating >= star);

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className="p-1"
            aria-label={`${star}점`}
            disabled={readOnly}
          >
            {filled ? (
              <StarSVG className="w-6 h-6 fill-current text-hr-purple-default stroke-current" />
            ) : (
              <StarSVG className="w-6 h-6 text-hr-gray-30" />
            )}
          </button>
        );
      })}
    </div>
  );
}
