'use client';
import { useState } from 'react';
import StarSVG from '@/assets/icons/star.svg';

type Props = {
  rating: number;
  onChange: (newRating: number) => void;
};

export default function HrStarRating({ rating, onChange }: Props) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        // hover 중이거나(hover>=star) 평점(rating)>=star 이면 채운 별
        const filled = hover >= star || (!hover && rating >= star);

        return (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="p-1"
            aria-label={`${star}점`}
          >
            {filled ? (
              <StarSVG className="w-6 h-6 fill-current text-hr-purple-default stroke-current " />
            ) : (
              <StarSVG className="w-6 h-6 text-hr-gray-30" />
            )}
          </button>
        );
      })}
    </div>
  );
}
