import { ProductFormProps } from '@/types/products';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HrInput } from '../common/HrInput';
import { useEffect } from 'react';

type Props = {
  errors: FieldErrors<ProductFormProps>;
  register: UseFormRegister<ProductFormProps>;
  watch: UseFormWatch<ProductFormProps>;
  setValue: UseFormSetValue<ProductFormProps>;
};

export default function ProductPriceForm({
  register,
  watch,
  setValue,
  errors,
}: Props) {
  const price = watch('price');
  const discountRate = watch('discountRate');

  useEffect(() => {
    const p = Number(price);
    const d = Number(discountRate);
    if (!isNaN(p) && !isNaN(d)) {
      const final = Math.floor(p * (1 - d / 100));
      setValue('finalPrice', final);
    }
  }, [price, discountRate, setValue]);
  return (
    <>
      {/* <HrInput name="price" placeholder="가격" required size="md" />
      {errors.price && (
        <p className="text-hr-danger-default text-sm">{errors.price.message}</p>
      )}
      <HrInput
        name="discountRate"
        placeholder="할인율 (%)"
        required
        size="md"
      />
      {errors.discountRate && (
        <p className="text-hr-danger-default text-sm">
          {errors.discountRate.message}
        </p>
      )}
      <HrInput name="price" placeholder="할인후가격" required size="md" />
      {errors.price && (
        <p className="text-hr-danger-default text-sm">{errors.price.message}</p>
      )} */}
      <HrInput name="price" placeholder="가격" required size="md" />
      {errors.price && (
        <p className="text-hr-danger-default text-sm">{errors.price.message}</p>
      )}

      <HrInput
        name="discountRate"
        placeholder="할인율 (%)"
        required
        size="md"
      />
      {errors.discountRate && (
        <p className="text-hr-danger-default text-sm">
          {errors.discountRate.message}
        </p>
      )}

      <HrInput
        name="finalPrice"
        placeholder="할인 후 가격"
        size="md"
        disabled
      />
    </>
  );
}
