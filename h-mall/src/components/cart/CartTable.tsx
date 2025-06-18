// components/cart/CartTable.tsx
import React from 'react';
import CartItem from '@/components/cart/CartItem';
import type { CartItemProps } from '@/hooks/useCart';

export type CartTableProps = {
  items: CartItemProps[]; // useCart 훅에서 가져온 CartItem 타입
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, qty: number) => void;
};

export default function CartTable({
  items,
  selectedIds,
  toggleSelect,
  removeItem,
  updateItem,
}: CartTableProps) {
  const allIds = items.map((it) => it.id);
  const allSelected = items.length > 0 && selectedIds.length === items.length;

  // 전체 선택/해제 핸들러
  const handleToggleAll = () => {
    if (allSelected) {
      allIds.forEach((id) => toggleSelect(id));
    } else {
      allIds.forEach((id) => toggleSelect(id));
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-t border-b">
            <th className="w-12 py-3 text-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleToggleAll}
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
              id={item.id}
              product={item.product}
              quantity={item.quantity}
              selected={selectedIds.includes(item.id)}
              onSelect={() => toggleSelect(item.id)}
              onRemove={() => removeItem(item.id)}
              onUpdate={(qty) => updateItem(item.id, qty)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
