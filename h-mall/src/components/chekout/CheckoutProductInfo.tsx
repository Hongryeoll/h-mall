'use client';

import React from 'react';

const mockProduct = {
  id: 1,
  imageUrl: '/images/product-beige.jpg',
  brand: '브랜드',
  name: '멀티 패커블 보스턴백 - 베이지',
  option: '[색상]01_베이지',
  price: '59,000원',
  quantity: 1,
  couponAppliedPrice: '50,740원',
};

export default function CheckoutProductInfo() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        쿠폰 사용 및 상품 정보 / 총 {mockProduct.quantity}개
      </h2>
      <div className="bg-gray-50 p-4 rounded mb-4 flex">
        <img
          src={mockProduct.imageUrl}
          alt={mockProduct.name}
          className="w-24 h-24 object-cover rounded mr-4"
        />
        <div className="flex-1">
          <div className="text-sm text-gray-500">{mockProduct.brand}</div>
          <div className="font-medium mb-1">{mockProduct.name}</div>
          <div className="text-sm text-gray-600 mb-1">
            옵션 : {mockProduct.option}
          </div>
          <div className="text-sm text-gray-600">
            {mockProduct.price} / 수량 {mockProduct.quantity}{' '}
            {mockProduct.couponAppliedPrice && (
              <span className="text-red-500">
                쿠폰적용가 : {mockProduct.couponAppliedPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
