import React from 'react';

export type QuantityControlProps = {
  quantity: number;
  onDecrease: (newQty: number) => void;
  onIncrease: (newQty: number) => void;
};

export default function QuantityControl({
  quantity,
  onDecrease,
  onIncrease,
}: QuantityControlProps) {
  const handleDecrease = () => {
    if (quantity <= 1) return;
    onDecrease(quantity - 1);
  };

  const handleIncrease = () => {
    onIncrease(quantity + 1);
  };

  return (
    <div className="inline-flex items-center border border-gray-300 rounded">
      <button
        onClick={handleDecrease}
        disabled={quantity <= 1}
        className="px-2"
      >
        –
      </button>
      <span className="px-4">{quantity}</span>
      <button onClick={handleIncrease} className="px-2">
        +
      </button>
    </div>
  );
}
