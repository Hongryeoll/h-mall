// components/cart/ActionButtons.tsx
import React from 'react';

export type ActionButtonProps = {
  onDeleteSelected: () => void;
};

export default function CartActionButton({
  onDeleteSelected,
}: ActionButtonProps) {
  return (
    <div className="flex space-x-4 mt-4">
      <button
        className="px-4 py-2 border border-gray-500 hover:bg-gray-100"
        onClick={onDeleteSelected}
      >
        선택상품 삭제
      </button>
      <button className="px-4 py-2 border border-gray-500 hover:bg-gray-100">
        품절상품 삭제
      </button>
    </div>
  );
}
