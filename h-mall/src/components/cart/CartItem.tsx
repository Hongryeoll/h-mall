'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import CartQuantityControl from '@/components/cart/CartQuantityControl';
import { HrButton } from '@/components/common/HrButton';
import type { CartItemProps } from '@/types/cart';

export interface CartItemComponentProps extends CartItemProps {
  id: string;
  selected: boolean;
  onSelect: () => void;
  onRemove: (product_id: string, size: string) => void;
  onUpdate: (product_id: string, size: string, newQty: number) => void;
  handleBuynow: (id: string) => void;
}
export default function CartItem({
  id,
  size,
  product,
  quantity,
  selected,
  onSelect,
  onRemove,
  onUpdate,
  handleBuynow,
}: CartItemComponentProps) {
  const totalPrice = useMemo(
    () => quantity * product.final_price,
    [quantity, product.final_price]
  );
  const shippingText =
    totalPrice >= 49000 ? (
      <div className="text-center">
        <div className="text-hr-b2 text-hr-gray-90 font-hr-semi-bold">
          조건무료 업체배송
        </div>
        <div className="text-hr-b5 text-hr-gray-60">
          [{product.brand}]제품으로만 50,000원 이상 구매시 무료배송됩니다.
        </div>
      </div>
    ) : (
      <div className="text-center">
        <div className="text-hr-b2 text-hr-gray-90 font-hr-semi-bold">
          3,000원 업체배송
        </div>
        <div className="text-hr-b5 text-hr-gray-60">
          [{product.brand}]제품으로만 50,000원 이상 구매시 무료배송됩니다.
        </div>
      </div>
    );

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
          <p className="text-hr-b4 text-hr-gray-50">{product.brand}</p>
          <p className="font-hr-regular truncate">{product.name}</p>
          <p className="text-hr-c1 text-hr-gray-50">옵션: [{size}]</p>
          <div className="flex items-center space-x-2 mb-2">
            <p className="line-through text-hr-c1 text-hr-gray-40">
              {product.price.toLocaleString()}원
            </p>
            <p className="text-hr-c1 text-hr-yellow-default font-hr-semi-bold">
              {product.discount_rate}%
            </p>
          </div>
        </div>
        <button
          className="text-hr-gray-40 hover:text-hr-gray-60"
          onClick={() => onRemove(product.id, size)}
        >
          &times;
        </button>
      </td>
      <td className="py-4 text-center">
        <CartQuantityControl
          quantity={quantity}
          onDecrease={() => onUpdate(product.id, size, quantity - 1)}
          onIncrease={() => onUpdate(product.id, size, quantity + 1)}
        />
      </td>
      <td className="py-4 text-center align-middle">
        <div className="flex flex-col items-center space-y-2">
          <p className="font-hr-bold text-hr-h5">
            {totalPrice.toLocaleString()}원
          </p>
          <HrButton
            text="바로 구매하기"
            onClick={() => handleBuynow(id)}
            size="xs"
          />
        </div>
      </td>
      <td className="py-4 text-center">{shippingText}</td>
    </tr>
  );
}
