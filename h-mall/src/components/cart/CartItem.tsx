// components/cart/CartItemRow.tsx
'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import CartQuantityControl, {
  QuantityControlProps,
} from './CartQuantityControl';

export type CartItemRowProps = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    final_price: number;
    product_images: string[];
  };
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onUpdate: (newQty: number) => void;
};

export default function CartItem({
  id,
  product,
  quantity,
  selected,
  onSelect,
  onRemove,
  onUpdate,
}: CartItemRowProps) {
  const totalPrice = useMemo(
    () => quantity * product.final_price,
    [quantity, product.final_price]
  );
  const shippingText =
    totalPrice >= 49000 ? '무료 업체배송' : '조건부 무료배송 (3,000원)';

  return (
    <tr className="border-b">
      <td className="text-center py-4">
        <input type="checkbox" checked={selected} onChange={onSelect} />
      </td>
      <td className="py-4 flex items-start space-x-4">
        <div className="w-20 h-20 relative">
          <Image
            src={product.product_images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500">브랜드명</p>
          <p className="font-medium truncate">{product.name}</p>
          <p className="text-xs text-gray-500">옵션: [SIZE]F</p>
        </div>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={onRemove}
        >
          &times;
        </button>
      </td>
      <td className="py-4 text-center">
        <CartQuantityControl
          quantity={quantity}
          onDecrease={() => onUpdate(quantity - 1)}
          onIncrease={() => onUpdate(quantity + 1)}
        />
      </td>
      <td className="py-4 text-right">
        <p className="font-semibold">{totalPrice.toLocaleString()}원</p>
        <button className="mt-2 px-4 py-1 border border-black text-sm">
          바로 구매하기
        </button>
      </td>
      <td className="py-4 text-center">
        <p>{shippingText}</p>
      </td>
    </tr>
  );
}
