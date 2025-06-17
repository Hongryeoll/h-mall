// components/cart/StepIndicator.tsx
import React from 'react';

export default function CartStepIndicator() {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <span className="font-bold">01 SHOPPING BAG</span>
      <span className="text-gray-300">&gt;</span>
      <span className="text-gray-400">02 ORDER</span>
      <span className="text-gray-300">&gt;</span>
      <span className="text-gray-400">03 ORDER CONFIRMED</span>
    </div>
  );
}
