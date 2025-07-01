'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StepIndicator from '@/components/cart/StepIndicator';
import CartTable from '@/components/cart/CartTable';
import ActionButton from '@/components/cart/ActionButton';
import Summary from '@/components/cart/Summary';
import { useCart } from '@/hooks/useCart';
import { useModalStore } from '@/store/modal/useModalStore';
import { ROUTES } from '@/types/constants';
import { HrButton } from '../common/HrButton';

export default function CartInfo() {
  const router = useRouter();
  const showModal = useModalStore((state) => state.showModal);
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
        <StepIndicator />
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
      <StepIndicator />
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
      <ActionButton onDeleteSelected={handleDeleteSelected} />
      <Summary
        selectedItems={items.filter((item) => selectedIds.includes(item.id))}
      />
      <div className="mt-6 flex justify-center gap-4">
        <div className="w-full">
          <HrButton
            text="CONTINUE SHOPPING"
            type="line"
            size="xxl"
            onClick={() => router.push(ROUTES.HOME)}
          />
        </div>
        <div className="w-full">
          <HrButton
            text="CHECK OUT"
            type="default"
            size="xxl"
            onClick={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}
