import React from 'react';

export default function StepIndicator() {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <span className="font-bold">01 SHOPPING BAG</span>
      <span className="text-hr-gray-30">&gt;</span>
      <span className="text-hr-gray-40">02 ORDER</span>
      <span className="text-hr-gray-30">&gt;</span>
      <span className="text-hr-gray-40">03 ORDER CONFIRMED</span>
    </div>
  );
}
