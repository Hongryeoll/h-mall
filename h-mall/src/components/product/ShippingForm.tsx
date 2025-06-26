import { ProductFormProps } from '@/types/products';
import { FieldErrors } from 'react-hook-form';
import { HrInput } from '../common/HrInput';

type Props = {
  errors: FieldErrors<ProductFormProps>;
};

export default function ShippingForm({ errors }: Props) {
  return (
    <>
      <HrInput name="name" placeholder="상품명" required size="md" />
      {errors.name && (
        <p className="text-hr-danger-default text-sm">{errors.name.message}</p>
      )}
    </>
  );
}
