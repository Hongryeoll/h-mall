'use client';

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/16/solid';

export default function ProductInfo() {
  return (
    // 최상단: 부모 높이를 100%로 채우고, flex-col + overflow-hidden
    <div className="flex flex-col overflow-hidden h-full p-[1.5%]">
      {/* 1) 상단 제목 */}
      <div className="pb-3">
        <h1 className="text-3xl font-bold text-gray-800">상품 관리</h1>
        <p className="mt-1 text-sm text-gray-600">
          상품 등록, 검색, 필터링, 수정 기능을 제공합니다.
        </p>
      </div>

      {/* 2) 검색/필터/버튼 영역 (높이 고정) */}
      <div className="space-y-2">
        {/* 2-1) 검색 바 */}
        <div className="bg-white rounded-lg shadow-sm px-4 py-2 flex gap-2 items-center">
          <div className="flex-1 flex items-center bg-gray-50 rounded-md px-3 py-2">
            <MagnifyingGlassIcon className="w-5 text-gray-500 stroke-2" />
            <input
              type="text"
              placeholder="상품명 혹은 코드를 입력하세요"
              className="flex-1 bg-transparent outline-none border-none px-3 text-gray-700 placeholder-gray-400"
            />
            <button className="p-1 text-gray-500 hover:text-gray-700">
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-medium rounded-md px-3 py-2 transition">
            <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
            검색
          </button>
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md px-3 py-2 transition">
            <ArrowPathIcon className="w-5 h-5 stroke-2" />
            초기화
          </button>
        </div>

        {/* 2-2) 필터 셀렉트 박스 */}
        <div className="bg-white rounded-lg shadow-sm px-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* 예시: 6개의 셀렉트 박스 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                대분류
              </label>
              <select className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition">
                <option value="">전체</option>
                <option value="A">카테고리 A</option>
                <option value="B">카테고리 B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                중분류
              </label>
              <select className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition">
                <option value="">전체</option>
                <option value="X">카테고리 X</option>
                <option value="Y">카테고리 Y</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                소분류
              </label>
              <select className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition">
                <option value="">전체</option>
                <option value="X1">서브 X1</option>
                <option value="Y1">서브 Y1</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                상태
              </label>
              <select className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition">
                <option value="">전체</option>
                <option value="active">판매 중</option>
                <option value="inactive">일시 품절</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                브랜드
              </label>
              <select className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition">
                <option value="">전체</option>
                <option value="brand1">브랜드 1</option>
                <option value="brand2">브랜드 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                정렬 기준
              </label>
              <select className="w-full border border-gray-300 rounded-md bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition">
                <option value="">등록일 순</option>
                <option value="name">상품명 순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2-3) 신규 등록 + 새로고침 버튼 */}
        <div className="bg-white rounded-lg shadow-sm px-4 py-2 flex justify-between items-center">
          <button className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-medium rounded-md px-3 py-1 transition">
            신규 등록
          </button>
          <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md px-3 py-1 transition">
            <ArrowPathIcon className="w-4 h-4 stroke-2" />
            새로고침
          </button>
        </div>
      </div>

      {/* 3) “테이블 영역” (flex-1, overflow-auto) → 스크롤은 이 영역 안에서만 발생 */}
      <div className="flex-1 overflow-auto mt-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
          <table className="min-w-full table-fixed divide-y divide-gray-200">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr className="table w-full table-fixed">
                <th className="w-16 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  수정
                </th>
                <th className="w-24 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  상품 코드
                </th>
                <th className="w-24 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  대분류
                </th>
                <th className="w-24 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  중분류
                </th>
                <th className="w-24 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  소분류
                </th>
                <th className="w-48 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  상품명
                </th>
                <th className="w-24 px-4 py-2 text-left text-sm font-medium text-gray-700">
                  등록일
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* 실제 데이터를 map 돌려서 tr을 렌더하세요 */}
              <tr className="table w-full table-fixed hover:bg-gray-50">
                <td className="w-16 px-4 py-2">
                  <button className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs font-medium rounded-md px-2 py-1 transition">
                    수정
                  </button>
                </td>
                <td className="w-24 px-4 py-2 text-sm text-gray-600">
                  PRD-001
                </td>
                <td className="w-24 px-4 py-2 text-sm text-gray-600">
                  카테고리 A
                </td>
                <td className="w-24 px-4 py-2 text-sm text-gray-600">
                  하위 A1
                </td>
                <td className="w-24 px-4 py-2 text-sm text-gray-600">
                  서브 A1-1
                </td>
                <td className="w-48 px-4 py-2 text-sm font-semibold text-gray-800">
                  멋진 상품 1
                </td>
                <td className="w-24 px-4 py-2 text-sm text-gray-600">
                  2025-06-01
                </td>
              </tr>
              {/* …행이 많아지면 이 안에서 스크롤 됩니다. */}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4) 페이지네이션: flex-1 바깥, 항상 최하단에 위치 */}
      <div className="mt-3">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-3 px-4 text-center text-gray-600">
          페이지네이션 영역 (추후 컴포넌트 삽입)
        </div>
      </div>
    </div>
  );
}
