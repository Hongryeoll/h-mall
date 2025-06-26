'use client';

import {
  MagnifyingGlassIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/16/solid';
import { useMemo, useState } from 'react';
import ProductForm from './ProductForm';
import { useCategoryCascade } from '@/hooks/useCategoryCascade';
import HrSelectbox from '@/components/common/HrSelectbox';
import HrPagination from '@/components/common/HrPagination';
import { useProducts } from '@/hooks/useProducts';

export default function ProductInfo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const { selected, set, options } = useCategoryCascade();
  const { data: products, isLoading } = useProducts();

  const filtered = useMemo(() => {
    return (
      products?.filter((p) => {
        const categoryMatch =
          !selected.categoryId ||
          p.subtabs?.subsections?.sections?.category_id === selected.categoryId;

        const sectionMatch =
          !selected.sectionId ||
          p.subtabs?.subsections?.section_id === selected.sectionId;

        const subsectionMatch =
          !selected.subsectionId ||
          p.subtabs?.subsection_id === selected.subsectionId;

        const subtabMatch =
          !selected.subtabId || p.subtab_id === selected.subtabId;

        const searchMatch = !searchTerm
          ? true
          : p.name.toLowerCase().includes(searchTerm.toLowerCase());

        return (
          categoryMatch &&
          sectionMatch &&
          subsectionMatch &&
          subtabMatch &&
          searchMatch
        );
      }) || []
    );
  }, [products, selected, searchTerm]);

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  if (isLoading) return <div>로딩 중...</div>;
  if (!products) return <div>데이터가 없습니다</div>;

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
              placeholder="상품명 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none px-2 sm:px-3 text-xs sm:text-sm text-hr-gray-60 placeholder-hr-gray-40"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-hr-gray-40 hover:text-hr-gray-60"
              >
                <XCircleIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setCurrentPage(1)}
            className="flex items-center gap-1.5 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs font-hr-semi-bold rounded-md px-3 py-2 transition"
          >
            <MagnifyingGlassIcon className="w-5 h-5 stroke-2" />
            검색
          </button>

          <button
            onClick={() => {
              setSearchTerm('');
              set.category('');
              set.section('');
              set.subsection('');
              set.subtab('');
              setCurrentPage(1);
            }}
            className="flex items-center gap-1.5 bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-xs font-hr-semi-bold rounded-md px-3 py-2 transition"
          >
            <ArrowPathIcon className="w-5 h-5 stroke-2" />
            초기화
          </button>
        </div>

        {/* 필터 셀렉트 박스 */}
        <div className="bg-hr-white rounded-lg pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <HrSelectbox
              value={selected.categoryId ?? ''}
              onChange={(v) => set.category(v)}
              placeholder="카테고리 선택"
              options={options.categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
            />
            <HrSelectbox
              value={selected.sectionId ?? ''}
              onChange={(v) => set.section(v)}
              placeholder="섹션 선택"
              options={options.sections.map((sec) => ({
                value: sec.id,
                label: sec.title,
              }))}
            />
            <HrSelectbox
              value={selected.subsectionId ?? ''}
              onChange={(v) => set.subsection(v)}
              placeholder="서브섹션 선택"
              options={options.subsections.map((ss) => ({
                value: ss.id,
                label: ss.title,
              }))}
            />
            <HrSelectbox
              value={selected.subtabId ?? ''}
              onChange={(v) => set.subtab(v)}
              placeholder="서브탭 선택"
              options={options.subtabs.map((st) => ({
                value: st.id,
                label: st.label,
              }))}
            />
          </div>
        </div>

        {/* 신규 등록 버튼 */}
        <div className="bg-hr-white rounded-lg pt-1 pb-3 flex justify-between items-center flex-wrap gap-2">
          <button
            onClick={openNewProductForm}
            className="flex items-center gap-2 bg-hr-purple-default hover:bg-hr-purple-dark text-white text-sm font-hr-semi-bold rounded-md px-3 py-2 transition"
          >
            신규 등록
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-hr-gray-20 hover:bg-hr-gray-30 text-hr-gray-60 text-sm font-hr-semi-bold rounded-md px-3 py-2 transition"
          >
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
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-hr-gray-5 h-12"
                      onClick={() => openEditProductForm(product.id)}
                    >
                      <td className="w-16 px-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditProductForm(product.id);
                          }}
                          className="bg-hr-purple-default hover:bg-hr-purple-dark text-white text-xs sm:text-sm font-medium rounded-md px-2 py-1 min-w-[40px] transition"
                        >
                          수정
                        </button>
                      </td>
                      <td className="w-24 px-2">
                        {product.subtabs?.subsections?.sections?.categories
                          ?.name || '-'}
                      </td>
                      <td className="w-24 px-2">
                        {product.subtabs?.subsections?.sections?.title || '-'}
                      </td>
                      <td className="w-24 px-2">
                        {product.subtabs?.subsections?.title || '-'}
                      </td>
                      <td className="w-48 px-2">{product.name}</td>
                      <td className="w-24 px-2">
                        {product.created_date?.slice(0, 10) || '-'}
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
        {totalPages > 1 && (
          <div className="bg-hr-white rounded-lg border py-3 px-4 flex justify-center">
            <HrPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>

      {/* 모달 - ProductForm */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4 sm:px-6">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto">
            <div className="p-6 sm:p-8">
              <ProductForm productId={editingProductId} onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
