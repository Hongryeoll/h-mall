'use client';

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/16/solid';

export default function ProductInfo() {
  return (
    // 1) 페이지 전체를 flex 컬럼으로 잡고, min-h-screen을 줘서 하단 Footer까지
    <div className="flex flex-col py-1 px-1">
      {/* 2) 콘텐츠 영역: w-full을 주어 화면 폭 가득 사용 */}
      <div className="flex-1 w-full space-y-2">
        {/* 3) 제목 영역: 흰 배경 카드 (좌우 패딩만 줘서 화면 좌측으로 붙어 보이지 않음) */}

        <div className="bg-white rounded-lg py-1 px-1">
          <h1 className="text-3xl font-bold text-gray-800">상품 관리</h1>
          <p className="mt-1 text-sm text-gray-600">
            상품 등록, 검색, 필터링, 수정 기능을 제공합니다.
          </p>
        </div>

        {/* 4) 검색 & 버튼 영역: 흰 배경 카드 */}
        <div className="bg-white rounded-lg py-1 px-1">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
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

            {/* 검색 버튼 & 초기화 버튼 */}
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-medium rounded-md px-3 py-2 transition">
                <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
                검색
              </button>
              <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md px-3 py-2 transition">
                <ArrowPathIcon className="w-5 h-5 stroke-2" />
                초기화
              </button>
            </div>
          </div>
        </div>

        {/* 5) 필터 셀렉트 박스 영역: 흰 배경 카드 */}
        <div className="bg-white rounded-lg shadow-sm py-1 px-1">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* 대분류 */}
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

            {/* 중분류 */}
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

            {/* 소분류 */}
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

            {/* 상태 */}
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

            {/* 브랜드 */}
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

            {/* 정렬 기준 */}
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

        {/* 6) 신규 등록 + 새로고침 영역: 흰 배경 카드 */}
        <div className="bg-white rounded-lg shadow-sm py-1 px-1 flex justify-between items-center">
          <button className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-medium rounded-md px-3 py-1 transition">
            신규 등록
          </button>
          <button className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-md px-3 py-1 transition">
            <ArrowPathIcon className="w-4 h-4 stroke-2" />
            새로고침
          </button>
        </div>

        {/* 7) 상품 목록 테이블: 흰 배경 카드 (테이블 헤더만 회색) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {/* 테이블 헤더(th)에만 bg-gray-100을 줘서 강조 */}
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    수정
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    상품 코드
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    대분류
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    중분류
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    소분류
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    상품명
                  </th>
                  <th className="px-4 py-2 bg-gray-100 text-left text-sm font-medium text-gray-700">
                    등록일
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto bg-white divide-y divide-gray-200">
                {/* 더미 데이터 예시 2개 */}
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <button className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs font-medium rounded-md px-2 py-1 transition">
                      수정
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">PRD-001</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    카테고리 A
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">하위 A1</td>
                  <td className="px-4 py-2 text-sm text-gray-600">서브 A1-1</td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-800">
                    멋진 상품 1
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    2025-06-01
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <button className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs font-medium rounded-md px-2 py-1 transition">
                      수정
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">PRD-002</td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    카테고리 B
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">하위 B1</td>
                  <td className="px-4 py-2 text-sm text-gray-600">서브 B1-1</td>
                  <td className="px-4 py-2 text-sm font-semibold text-gray-800">
                    예쁜 상품 2
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    2025-06-02
                  </td>
                </tr>

                {/* 데이터 없을 때 */}
                <tr>
                  <td
                    className="px-4 py-4 text-center text-gray-500"
                    colSpan={7}
                  >
                    데이터가 없습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 8) Footer 위치의 페이지네이션 (테이블 카드 바깥)  */}
      <div className="w-full mt-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 py-3 px-4 text-center text-gray-600">
          페이지네이션 영역 (추후 컴포넌트 삽입)
        </div>
      </div>
    </div>
  );
}
