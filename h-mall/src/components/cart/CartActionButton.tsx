import React from 'react';

export type ActionButtonProps = {
  onDeleteSelected: () => void;
};

export default function CartActionButton({
  onDeleteSelected,
}: ActionButtonProps) {
  return (
    <div className="flex space-x-4 mt-6">
      <button
        className="px-4 py-2 border border-hr-gray-50 hover:bg-hr-gray-10"
        onClick={onDeleteSelected}
      >
        선택상품 삭제
      </button>
    </div>
  );
}
