import { ProductFormProps } from '@/types/products';
import { FieldErrors } from 'react-hook-form';
import { HrInput } from '../common/HrInput';

type Props = {
  isEditMode: boolean;
  errors: FieldErrors<ProductFormProps>;
};

export default function ProductBasicForm({ isEditMode, errors }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
            상품명
          </label>
          <HrInput name="name" placeholder="상품명" required size="xs" />
          {errors.name && (
            <p className="text-hr-danger-default text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        {isEditMode && (
          <div>
            <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
              상품등록일
            </label>
            <HrInput
              name="created_date"
              placeholder="상품등록일"
              disabled
              size="xs"
            />
            {errors.created_date && (
              <p className="text-hr-danger-default text-sm">
                {errors.created_date.message}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
