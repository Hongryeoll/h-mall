// components/cart/QuantityControl.tsx
import React from 'react';

export type QuantityControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function CartQuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) {
  return (
    <div className="inline-flex items-center border border-gray-300 rounded">
      <button onClick={onDecrease} disabled={quantity <= 1} className="px-2">
        –
      </button>
      <span className="px-4">{quantity}</span>
      <button onClick={onIncrease} className="px-2">
        +
      </button>
    </div>
  );
}
