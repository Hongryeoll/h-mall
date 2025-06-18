'use client';

import React, { useState } from 'react';
import CartStepIndicator from '@/components/cart/CartStepIndicator';
import CartTable from './CartTable';
import CartActionButton from '@/components/cart/CartActionButton';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';

export default function CartInfo() {
  const { items = [], isLoading, removeItem, updateItem } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleDeleteSelected = async () => {
    await Promise.all(
      selectedIds.map((id) => {
        const item = items.find((it) => it.id === id);
        if (!item) return Promise.resolve();

        return removeItem.mutateAsync({
          product_id: item.product.id,
          size: item.size,
        });
      })
    );
    setSelectedIds([]);
  };

  return (
    <div className="container mx-auto p-6">
      <CartStepIndicator />
      <CartTable
        items={items}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        removeItem={(product_id, size) =>
          removeItem.mutate({ product_id, size })
        }
        updateItem={(product_id, size, qty) =>
          updateItem.mutate({ product_id, size, quantity: qty })
        }
      />
      <CartActionButton onDeleteSelected={handleDeleteSelected} />
      <CartSummary items={items} />
      <div className="mt-6 flex justify-center space-x-4">
        <button className="px-6 py-3 border border-gray-900 hover:bg-gray-100">
          CONTINUE SHOPPING
        </button>
        <button className="px-6 py-3 bg-black text-white hover:opacity-90">
          CHECK OUT
        </button>
      </div>
    </div>
  );
}
