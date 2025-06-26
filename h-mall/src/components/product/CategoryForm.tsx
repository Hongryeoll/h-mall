'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import HrSelectbox from '../common/HrSelectbox';
import { ProductFormProps } from '@/types/products';
import type { FieldErrors } from 'react-hook-form';

type Props = {
  selected: {
    categoryId: string | null;
    sectionId: string | null;
    subsectionId: string | null;
    subtabId: string | null;
  };
  set: {
    category: (id: string) => void;
    section: (id: string) => void;
    subsection: (id: string) => void;
    subtab: (id: string) => void;
  };
  options: {
    categories: { id: string; name: string | null }[];
    sections: { id: string; title: string | null }[];
    subsections: { id: string; title: string | null }[];
    subtabs: { id: string; label: string | null }[];
  };
  errors: FieldErrors<ProductFormProps>;
};

export default function CategoryForm({
  selected,
  set,
  options,
  errors,
}: Props) {
  const { register, setValue } = useFormContext<ProductFormProps>();

  useEffect(() => {
    setValue('category_id', selected.categoryId ?? '', {
      shouldValidate: true,
    });
    setValue('section_id', selected.sectionId ?? '', { shouldValidate: true });
    setValue('subsection_id', selected.subsectionId ?? '', {
      shouldValidate: true,
    });
    setValue('subtab_id', selected.subtabId ?? '', { shouldValidate: true });
  }, [
    selected.categoryId,
    selected.sectionId,
    selected.subsectionId,
    selected.subtabId,
    setValue,
  ]);

  return (
    <>
      {/* 숨김 필드 등록 */}
      <input
        type="hidden"
        {...register('category_id', { required: '카테고리를 선택해주세요' })}
      />
      <input
        type="hidden"
        {...register('section_id', { required: '섹션을 선택해주세요' })}
      />
      <input
        type="hidden"
        {...register('subsection_id', { required: '서브섹션을 선택해주세요' })}
      />
      <input
        type="hidden"
        {...register('subtab_id', { required: '서브탭을 선택해주세요' })}
      />

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
            카테고리
          </label>
          <HrSelectbox
            value={selected.categoryId}
            onChange={(v) => set.category(v)}
            placeholder="카테고리 선택"
            options={options.categories.map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          />
        </div>
        <div>
          <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
            섹션
          </label>
          <HrSelectbox
            value={selected.sectionId}
            onChange={(v) => set.section(v)}
            placeholder="섹션 선택"
            options={options.sections.map((s) => ({
              value: s.id,
              label: s.title,
            }))}
          />
        </div>
        <div>
          <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
            서브섹션
          </label>
          <HrSelectbox
            value={selected.subsectionId}
            onChange={(v) => set.subsection(v)}
            placeholder="서브섹션 선택"
            options={options.subsections.map((s) => ({
              value: s.id,
              label: s.title,
            }))}
          />
        </div>
        <div>
          <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
            서브탭
          </label>
          <HrSelectbox
            value={selected.subtabId}
            onChange={(v) => set.subtab(v)}
            placeholder="서브탭 선택"
            options={options.subtabs.map((s) => ({
              value: s.id,
              label: s.label,
            }))}
          />
          <input
            type="hidden"
            {...register('subtab_id', { required: '소탭 ID를 선택해주세요' })}
          />
          {errors.subtab_id && (
            <p className="text-hr-danger-default text-sm">
              {errors.subtab_id.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
