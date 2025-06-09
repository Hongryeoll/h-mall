import { ProductFormProps } from '@/types/products';
import HrSelectbox from '../common/HrSelectbox';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { HrInput } from '../common/HrInput';

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
  register: UseFormRegister<ProductFormProps>;
};

export default function ProductBasicForm({
  register,
  selected,
  set,
  options,
  errors,
}: Props) {
  return (
    <>
      <HrSelectbox
        value={selected.categoryId}
        onChange={(v) => set.category(v)}
        placeholder="카테고리 선택"
        options={options.categories.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
      />
      <HrSelectbox
        value={selected.sectionId}
        onChange={(v) => set.section(v)}
        placeholder="섹션 선택"
        options={options.sections.map((s) => ({
          value: s.id,
          label: s.title,
        }))}
      />
      <HrSelectbox
        value={selected.subsectionId}
        onChange={(v) => set.subsection(v)}
        placeholder="서브섹션 선택"
        options={options.subsections.map((s) => ({
          value: s.id,
          label: s.title,
        }))}
      />
      <HrSelectbox
        value={selected.subtabId}
        onChange={(v) => set.subtab(v)}
        placeholder="서브탭 선택"
        options={options.subtabs.map((s) => ({
          value: s.id,
          label: s.label,
        }))}
      />
      <HrInput name="name" placeholder="상품명" required size="md" />
      {errors.name && (
        <p className="text-hr-danger-default text-sm">{errors.name.message}</p>
      )}
      <input
        type="hidden"
        {...register('subtab_id', { required: '소탭 ID를 선택해주세요' })}
      />
      {errors.subtab_id && (
        <p className="text-hr-danger-default text-sm">
          {errors.subtab_id.message}
        </p>
      )}
    </>
  );
}
