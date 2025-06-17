// components/cart/CartTable.tsx
import React from 'react';
import CartItem, { CartItemRowProps } from './CartItem';

export type CartTableProps = {
  items: CartItemRowProps[];
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

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-t border-b">
            <th className="w-12 py-3 text-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() =>
                  allIds.forEach((id) =>
                    toggleSelect(allSelected ? '' /* deselect all */ : id)
                  )
                }
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
