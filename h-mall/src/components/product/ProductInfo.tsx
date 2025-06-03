'use client';

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/16/solid';

export default function ProductInfo() {
  return (
    <div className="flex flex-col h-full px-4 py-4">
      {/* 1) 상단 제목 */}
      <div className="pb-3 shrink-0">
        <h1 className="text-3xl font-bold text-gray-800">상품 관리</h1>
        <p className="mt-1 text-sm text-gray-600">
          상품 등록, 검색, 필터링, 수정 기능을 제공합니다.
        </p>
      </div>

      {/* 2) 검색/필터/버튼 영역 (높이 고정) */}
      <div className="space-y-2 shrink-0">
        {/* 2-1) 검색 바 */}
        <div className="bg-white rounded-lg pt-2 flex gap-2 items-center">
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
        <div className="bg-white rounded-lg pt-2">
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
        <div className="bg-white rounded-lg pt-1 pb-3 flex justify-between items-center">
          <button className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-medium rounded-md px-3 py-1 transition">
            신규 등록
          </button>
          <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md px-3 py-1 transition">
            <ArrowPathIcon className="w-4 h-4 stroke-2" />
            새로고침
          </button>
        </div>
      </div>

      {/* 3) 테이블 */}
      <div className="flex-1 rounded-lg overflow-hidden">
        <div className="w-full h-full overflow-x-auto">
          <div className="min-w-[768px] h-full flex flex-col">
            <table className="table-fixed w-full">
              <thead className="bg-gray-100">
                <tr className="h-10">
                    <th className="w-16 px-4 ml-2 text-left text-sm font-medium text-gray-700 whitespace-nowrap">수정</th>
                    <th className="w-24 px-2 text-left text-sm font-medium text-gray-700 whitespace-nowrap">대분류</th>
                    <th className="w-24 px-2 text-left text-sm font-medium text-gray-700 whitespace-nowrap">중분류</th>
                    <th className="w-24 px-2 text-left text-sm font-medium text-gray-700 whitespace-nowrap">소분류</th>
                    <th className="w-48 text-left text-sm font-medium text-gray-700 whitespace-nowrap">상품명</th>
                    <th className="w-24 text-left text-sm font-medium text-gray-700 whitespace-nowrap">등록일</th>
                  </tr>
              </thead>
            </table>
            <div className="flex-1 overflow-y-auto">
              <table className="table-fixed w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {[...Array(50)].map((_, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 h-12">
                        <td className="w-16 px-2 text-sm text-gray-600 whitespace-nowrap">
                          <button className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs font-medium rounded-md px-2 py-1 min-w-[40px] transition">
                            수정
                          </button>
                        </td>
                        <td className="w-24 px-2 text-sm text-gray-600 whitespace-nowrap">카테고리 A</td>
                        <td className="w-24 px-2 text-sm text-gray-600 whitespace-nowrap">하위 A1</td>
                        <td className="w-24 px-2 text-sm text-gray-600 whitespace-nowrap">서브 A1-1</td>
                        <td className="w-48 px-2 text-sm font-semibold text-gray-800 whitespace-nowrap">상품 {idx}</td>
                        <td className="w-24 px-2 text-sm text-gray-600 whitespace-nowrap">2025-06-01</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* 4) 페이지네이션: flex-1 바깥, 항상 최하단에 위치 */}
      <div className="pt-3 shrink-0">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-3 px-4 text-center text-gray-600">
      페이지네이션 영역
    </div>
  </div>
    </div>
  );
}
