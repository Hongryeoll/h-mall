// 'use client';

// import {
//   MagnifyingGlassIcon,
//   ArrowPathIcon,
// } from '@heroicons/react/24/outline';
// import { XCircleIcon } from '@heroicons/react/16/solid';
// import { useState } from 'react';
// import ProductForm from './ProductForm';

// export default function ProductInfo() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [editingProductId, setEditingProductId] = useState<string | null>(null);

//   const openNewProductForm = () => {
//     setEditingProductId(null);
//     setModalOpen(true);
//   };

//   const openEditProductForm = (productId: string) => {
//     setEditingProductId(productId);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     setEditingProductId(null);
//   };

//   return (
//     <div className="flex flex-col h-full px-4 py-4">
//       {/* 1) 상단 제목 */}
//       <div className="pb-3 shrink-0">
//         <h1 className="text-hr-h3 font-hr-bold text-hr-gray-80 font-pretendard">
//           상품 관리
//         </h1>
//         <p className="mt-1 text-hr-b4 text-hr-gray-50 font-pretendard">
//           상품 등록, 검색, 필터링, 수정 기능을 제공합니다.
//         </p>
//       </div>

//       {/* 2) 검색/필터/버튼 영역 (높이 고정) */}
//       <div className="space-y-2 shrink-0">
//         {/* 2-1) 검색 바 */}
//         <div className="bg-hr-white rounded-lg pt-2 flex gap-1.5 sm:gap-2 items-center flex-wrap">
//           <div className="flex-1 flex items-center bg-hr-gray-5 rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2">
//             <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-hr-gray-40 stroke-2" />
//             <input
//               type="text"
//               placeholder="상품명 혹은 코드를 입력하세요"
//               className="flex-1 bg-transparent outline-none border-none px-2 sm:px-3 text-xs sm:text-sm text-hr-gray-60 placeholder-hr-gray-40"
//             />
//             <button className="p-1 text-hr-gray-40 hover:text-hr-gray-60">
//               <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
//             </button>
//           </div>

//           <button className="flex items-center gap-1.5 sm:gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs sm:text-sm font-hr-semi-bold rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 transition">
//             <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
//             검색
//           </button>

//           <button className="flex items-center gap-1.5 sm:gap-2 bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-xs sm:text-sm font-hr-semi-bold rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 transition">
//             <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
//             초기화
//           </button>
//         </div>

//         {/* 2-2) 필터 셀렉트 박스 */}
//         <div className="bg-hr-white rounded-lg pt-2">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
//             {[
//               { label: '대분류', options: ['A', 'B'] },
//               { label: '중분류', options: ['X', 'Y'] },
//               { label: '소분류', options: ['X1', 'Y1'] },
//               {
//                 label: '상태',
//                 options: ['판매 중', '일시 품절'],
//                 value: ['active', 'inactive'],
//               },
//               {
//                 label: '브랜드',
//                 options: ['브랜드 1', '브랜드 2'],
//                 value: ['brand1', 'brand2'],
//               },
//               {
//                 label: '정렬 기준',
//                 options: ['등록일 순', '상품명 순'],
//                 value: ['', 'name'],
//               },
//             ].map((item, idx) => (
//               <div key={idx} className="w-full">
//                 <label className="block mb-1 font-hr-semi-bold text-hr-gray-60 text-sm sm:text-sm md:text-sm lg:text-base">
//                   {item.label}
//                 </label>
//                 <select
//                   className="w-full max-w-full border border-hr-gray-30 rounded-md bg-hr-white text-hr-gray-60
//             text-xs sm:text-sm md:text-sm lg:text-base
//             px-2 sm:px-3 py-1.5 sm:py-2
//             focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition"
//                 >
//                   <option value="">전체</option>
//                   {item.options.map((opt, i) => (
//                     <option key={i} value={item.value?.[i] || opt}>
//                       {opt}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 2-3) 신규 등록 + 새로고침 버튼 */}
//         <div className="bg-hr-white rounded-lg pt-1 pb-3 flex justify-between items-center flex-wrap gap-2">
//           <button
//             className="flex items-center gap-1.5 sm:gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs sm:text-sm font-hr-semi-bold rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 transition"
//             onClick={openNewProductForm}
//           >
//             신규 등록
//           </button>
//           <button className="flex items-center gap-1.5 sm:gap-2 bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-xs sm:text-sm font-hr-semi-bold rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 transition">
//             <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5 stroke-2" />
//             새로고침
//           </button>
//         </div>
//       </div>

//       {/* 3) 테이블 */}
//       <div className="flex-1 rounded-lg overflow-hidden">
//         <div className="w-full h-full overflow-x-auto">
//           <div className="min-w-[768px] h-full flex flex-col">
//             {/* 헤더 */}
//             <table className="table-fixed w-full">
//               <thead className="bg-hr-gray-10">
//                 <tr className="h-10">
//                   {[
//                     '수정',
//                     '대분류',
//                     '중분류',
//                     '소분류',
//                     '상품명',
//                     '등록일',
//                   ].map((col, idx) => (
//                     <th
//                       key={idx}
//                       className={`text-left px-2 whitespace-nowrap text-xs sm:text-sm md:text-base font-hr-semi-bold text-hr-gray-60 ${
//                         idx === 0 ? 'w-16' : idx === 4 ? 'w-48' : 'w-24'
//                       }`}
//                     >
//                       {col}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//             </table>

//             {/* 바디 */}
//             <div className="flex-1 overflow-y-auto">
//               <table className="table-fixed w-full divide-y divide-hr-gray-20">
//                 <tbody className="divide-y divide-hr-gray-20">
//                   {[...Array(50)].map((_, idx) => (
//                     <tr key={idx} className="hover:bg-hr-gray-5 h-12">
//                       <td className="w-16 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
//                         <button className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs sm:text-sm font-medium rounded-md px-2 py-1 min-w-[40px] transition">
//                           수정
//                         </button>
//                       </td>
//                       <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
//                         카테고리 A
//                       </td>
//                       <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
//                         하위 A1
//                       </td>
//                       <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
//                         서브 A1-1
//                       </td>
//                       <td className="w-48 px-2 text-xs sm:text-sm md:text-base font-semibold text-hr-gray-80 whitespace-nowrap">
//                         상품 {idx}
//                       </td>
//                       <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
//                         2025-06-01
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 4) 페이지네이션: flex-1 바깥, 항상 최하단에 위치 */}
//       <div className="pt-3 shrink-0">
//         <div className="bg-hr-white rounded-lg shadow-sm border border-gray-200 py-3 px-4 text-center text-hr-gray-50">
//           페이지네이션 영역
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';
import ProductForm from './ProductForm';

export default function ProductInfo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const openNewProductForm = () => {
    setEditingProductId(null);
    setModalOpen(true);
  };

  const openEditProductForm = (productId: string) => {
    setEditingProductId(productId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProductId(null);
  };

  return (
    <div className="flex flex-col h-full px-4 py-4">
      {/* 상단 제목 */}
      <div className="pb-3 shrink-0">
        <h1 className="text-hr-h3 font-hr-bold text-hr-gray-80 font-pretendard">
          상품 관리
        </h1>
        <p className="mt-1 text-hr-b4 text-hr-gray-50 font-pretendard">
          상품 등록, 검색, 필터링, 수정 기능을 제공합니다.
        </p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="space-y-2 shrink-0">
        {/* 검색 바 */}
        <div className="bg-hr-white rounded-lg pt-2 flex gap-1.5 sm:gap-2 items-center flex-wrap">
          <div className="flex-1 flex items-center bg-hr-gray-5 rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2">
            <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5 text-hr-gray-40 stroke-2" />
            <input
              type="text"
              placeholder="상품명 혹은 코드를 입력하세요"
              className="flex-1 bg-transparent outline-none border-none px-2 sm:px-3 text-xs sm:text-sm text-hr-gray-60 placeholder-hr-gray-40"
            />
            <button className="p-1 text-hr-gray-40 hover:text-hr-gray-60">
              <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          <button className="flex items-center gap-1.5 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs font-hr-semi-bold rounded-md px-3 py-2 transition">
            <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
            검색
          </button>

          <button className="flex items-center gap-1.5 bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-xs font-hr-semi-bold rounded-md px-3 py-2 transition">
            <ArrowPathIcon className="w-5 h-5 stroke-2" />
            초기화
          </button>
        </div>

        {/* 신규 등록 버튼 */}
        <div className="bg-hr-white rounded-lg pt-1 pb-3 flex justify-between items-center flex-wrap gap-2">
          <button
            onClick={openNewProductForm}
            className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-hr-semi-bold rounded-md px-3 py-2 transition"
          >
            신규 등록
          </button>
          <button className="flex items-center gap-2 bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-sm font-hr-semi-bold rounded-md px-3 py-2 transition">
            <ArrowPathIcon className="w-5 h-5 stroke-2" />
            새로고침
          </button>
        </div>
      </div>

      {/* 테이블 */}
      <div className="flex-1 rounded-lg overflow-hidden">
        <div className="w-full h-full overflow-x-auto">
          <div className="min-w-[768px] h-full flex flex-col">
            {/* 헤더 */}
            <table className="table-fixed w-full">
              <thead className="bg-hr-gray-10">
                <tr className="h-10">
                  {[
                    '수정',
                    '대분류',
                    '중분류',
                    '소분류',
                    '상품명',
                    '등록일',
                  ].map((col, idx) => (
                    <th
                      key={idx}
                      className={`text-left px-2 whitespace-nowrap text-xs sm:text-sm md:text-base font-hr-semi-bold text-hr-gray-60 ${
                        idx === 0 ? 'w-16' : idx === 4 ? 'w-48' : 'w-24'
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
            {/* 바디 */}
            <div className="flex-1 overflow-y-auto">
              <table className="table-fixed w-full divide-y divide-hr-gray-20">
                <tbody className="divide-y divide-hr-gray-20">
                  {[...Array(50)].map((_, idx) => (
                    <tr key={idx} className="hover:bg-hr-gray-5 h-12">
                      <td className="w-16 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
                        <button className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs sm:text-sm font-medium rounded-md px-2 py-1 min-w-[40px] transition">
                          수정
                        </button>
                      </td>
                      <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
                        카테고리 A
                      </td>
                      <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
                        하위 A1
                      </td>
                      <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
                        서브 A1-1
                      </td>
                      <td className="w-48 px-2 text-xs sm:text-sm md:text-base font-semibold text-hr-gray-80 whitespace-nowrap">
                        상품 {idx}
                      </td>
                      <td className="w-24 px-2 text-xs sm:text-sm md:text-base text-hr-gray-50 whitespace-nowrap">
                        2025-06-01
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="pt-3 shrink-0">
        <div className="bg-hr-white rounded-lg border py-3 px-4 text-center text-hr-gray-50">
          페이지네이션 영역
        </div>
      </div>

      {/* 모달 - ProductForm */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <ProductForm productId={editingProductId} onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
