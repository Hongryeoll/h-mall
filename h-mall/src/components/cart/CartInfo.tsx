'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CartStepIndicator from '@/components/cart/CartStepIndicator';
import CartTable from './CartTable';
import CartActionButton from '@/components/cart/CartActionButton';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/hooks/useCart';
import { useModal } from '@/components/provider/ModalProvider';
import { ROUTES } from '@/types/constants';
import { HrButton } from '../common/HrButton';

export default function CartInfo() {
  const router = useRouter();
  const { showModal } = useModal();
  const { items = [], isLoading, removeItem, updateItem } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleCheckout = () => {
    if (selectedIds.length === 0) {
      showModal({
        title: '주문실패',
        description: '선택된 상품이 없습니다.',
      });
      return;
    }

    const query = new URLSearchParams();
    query.set('ids', selectedIds.join(','));
    router.push(`${ROUTES.MALL_CHECKOUT}?${query.toString()}`);
  };
  const handleBuynow = (id: string) => {
    router.push(`${ROUTES.MALL_CHECKOUT}?ids=${id}`);
  };

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleSelectAll = () => {
    const allIds = items.map((item) => item.id);
    const isAllSelected = selectedIds.length === allIds.length;
    setSelectedIds(isAllSelected ? [] : allIds);
  };

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

  if (isLoading) {
    return null;
  }

  if (!isLoading && items.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <CartStepIndicator />
        <hr className="border-t border-black my-10" />
        <p className="text-hr-h5 font-hr-bold mb-6">
          장바구니에 담은 상품이 없습니다.
        </p>
        <HrButton
          text="CONTINUE SHOPPING"
          type="line"
          onClick={() => router.push(ROUTES.HOME)}
        />
        <hr className="border-t border-black mt-10" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <CartStepIndicator />
      <CartTable
        items={items}
        selectedIds={selectedIds}
        toggleSelect={toggleSelect}
        toggleSelectAll={toggleSelectAll}
        handleBuynow={handleBuynow}
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
        <button className="px-6 py-3 border border-hr-gray-90 hover:bg-hr-gray-10">
          CONTINUE SHOPPING
        </button>
        <button
          className="px-6 py-3 bg-black text-white hover:opacity-90"
          onClick={handleCheckout}
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
}
