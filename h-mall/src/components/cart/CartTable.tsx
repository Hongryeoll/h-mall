import React from 'react';
import Image from 'next/image';
import CartQuantityControl from '@/components/cart/CartQuantityControl';
import CartItem from '@/components/cart/CartItem';
import { HrButton } from '@/components/common/HrButton';
import type { CartItemProps } from '@/types/cart';

export type CartTableProps = {
  items: CartItemProps[];
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
  handleBuynow: (id: string) => void;
  removeItem: (product_id: string, size: string) => void;
  updateItem: (product_id: string, size: string, qty: number) => void;
};

export default function CartTable({
  items,
  selectedIds,
  toggleSelect,
  toggleSelectAll,
  handleBuynow,
  removeItem,
  updateItem,
}: CartTableProps) {
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-t border-b">
              <th className="w-12 py-3 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="text-left py-3">상품 정보</th>
              <th className="w-32 py-3 text-center">수량</th>
              <th className="w-32 py-3 text-right">주문금액</th>
              <th className="w-32 py-3 text-center">배송비</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                id={item.id}
                selected={selectedIds.includes(item.id)}
                onSelect={() => toggleSelect(item.id)}
                onRemove={() => removeItem(item.product.id, item.size)}
                onUpdate={updateItem}
                handleBuynow={handleBuynow}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="block md:hidden space-y-4">
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleSelectAll}
          />
          <span className="text-hr-b4">
            전체선택 ({selectedIds.length}/{items.length})
          </span>
        </div>
        {items.map((item) => {
          const totalPrice = item.quantity * item.product.final_price;
          const originalPrice = item.quantity * item.product.price;
          const discountRate = Math.floor(
            100 - (totalPrice / originalPrice) * 100
          );

          return (
            <div
              key={item.id}
              className="border p-4 rounded-md shadow-sm relative"
            >
              <button
                className="absolute top-2 right-4 text-hr-gray-40 hover:text-hr-gray-60 text-xl"
                onClick={() => removeItem(item.product.id, item.size)}
              >
                &times;
              </button>
              <div className="flex items-start space-x-4">
                <div className="w-24 h-24 relative flex-shrink-0">
                  <Image
                    src={item.product.product_images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                  <p className="text-hr-b4 text-hr-gray-50">
                    {item.product.brand}
                  </p>
                  <p className="font-hr-regular">{item.product.name}</p>
                  <p className="text-hr-c1 text-hr-gray-50">
                    옵션: [{item.size}]
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <p className="text-hr-b4 line-through text-hr-gray-40">
                      {originalPrice.toLocaleString()}원
                    </p>
                    <p className="text-hr-b4 text-hr-yellow-default font-hr-semi-bold">
                      {discountRate}%
                    </p>
                  </div>
                  <p className="text-base font-hr-bold">
                    {totalPrice.toLocaleString()}원
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <CartQuantityControl
                    quantity={item.quantity}
                    onDecrease={() =>
                      updateItem(item.product.id, item.size, item.quantity - 1)
                    }
                    onIncrease={() =>
                      updateItem(item.product.id, item.size, item.quantity + 1)
                    }
                  />
                </div>
              </div>
              <div className="mt-4">
                <HrButton
                  text="바로 구매하기"
                  onClick={() => handleBuynow(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
